import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Link} from '../d3/models/link';
import {Node} from '../d3/models/node';
import {Message, MessageService} from "./message.service";
import {DataConnectionService} from "./data-connection.service";
import {NodeService} from "../d3/models/node.service";
import {LinkService} from "../d3/models/link.service";
import {LoadingService} from "./loading.service";
/*
import {WebWorkerService} from "./services/web-worker.service";
*/


export interface Event {
//  type:string;
  label:string;
  diff:Object;
}


@Injectable()
export class GraphDataService {
graph ={
  nodes: [],
  links:[]
};

eventData:any;

history =[];
  // Observable navItem source
  private _graphHistorySource = new Subject<any>();
  masterLinkMap:Map<string, Link> = new Map();
  historyMap:Map<string, any> = new Map();
  graphhistory$ = this._graphHistorySource.asObservable();
  originalEvent: string;
  filter: boolean = false;
nodeList: any = [];
linkList: any = [];
nodes: any  =[];

constructor(
  private dataConnectionService:DataConnectionService,
  private messageService: MessageService,
  private nodeService: NodeService,
  private linkService: LinkService,
  private loadingService: LoadingService
){


  this.dataConnectionService.messages.subscribe(msg => {
    let response = JSON.parse(msg);
    switch(response.type) {
      case 'path':{
        this.filter = true;
        //intention absence of break to allow fall through
      }
      case 'startNodeSearch':
      case 'endNodeSearch':
      case 'expand':
      case 'load': {
        this.originalEvent = response.type;
        //  let bytes = encoder.encode(msg);
        // this.webWorkerService.reportParser.postMessage(bytes.buffer, [bytes.buffer]);
        let records = response.data._fields;
        if (records.length == 0) {
          console.error(response);
        } else {
          this.parseRecords(records, response.type);
        }
        break;
      }
      case 'done':{
        this.makeGraph();
        this.loadingService.toggleVisible(false);
        break;
      }
    }
  });
}

  setFilter(filter:boolean):void{
  this.filter=filter;
  };

  parseRecords(path, event:any) {
    //neo4j websocket returns one record at a time, so looping isn't necessary, but still probably a good idea
    for (let r of path) {
      if (r.segments) {
        for (let l of r.segments) {
          //this ignores the initial start and end nodes, but they are added in the segments of the path
          let start:Node = this.nodeService.makeNode(l.start.properties.uuid, l.start);
          let end:Node = this.nodeService.makeNode(l.end.properties.uuid, l.end);
         // let id = start.id.toString().concat(end.id.toString());
         // let nodes:Node[] = ;
          this.nodeList.push(...[start,end]);
          let link:Link = this.linkService.makeLink(l.relationship.properties.uuid, start, end, l.relationship);
          this.linkList.push(link);
          this.nodeService.setNode(start);
          this.nodeService.setNode(end);
          this.linkService.setLink( link);
        }
      } else {
      //  console.error(r);
        if (!r.start && !r.end) {
      //    console.error(r);
          //this is for node groups that aren't a path
          let n:Node = this.nodeService.makeNode(r.properties.uuid, r);
          this.nodeList.push(n);
          this.nodeService.setNode(n);
        } else {
          //this is the separate path for expanding nodes -- this does not have a uuid associated with the start or end nodes, so neo4j's id needs to be used to create the nodes
       //   console.log(r);
          let start = this.nodeService.makeNode(r.properties.uuid, {});
          let end = this.nodeService.makeNode(r.properties.uuid, {});
          let nodes = [start,end];
       //   let id = start.id.toString().concat(end.id.toString());
          this.nodeList.push(...nodes);
          let link = this.linkService.makeLink(r.properties.uuid, start, end, r);
          //   let link = new Link(start, end, r.type, r.properties, r.properties.uuid);
       //   this.linkList.push(link);
          this.nodeService.setNode(start);
          this.nodeService.setNode(end);
          this.linkService.setLink( link);
          //    this.masterLinkMap.set(r.properties.uuid, link);
        }
      }

    }
  }

  makeGraph():void {
    let newNodes =this.nodeList.filter((elem, pos, arr) => {
        return arr.indexOf(elem) == pos;
      });
   let newLinks = this.linkList.filter((elem, pos, arr) => {
     return arr.indexOf(elem) == pos;
   });

    let diff = {
      removedNodes: this.graph.nodes.filter(node =>newNodes.indexOf(node) === -1),
      addedNodes: newNodes.filter(node =>this.graph.nodes.indexOf(node) === -1),
      removedLinks: this.graph.links.filter(link => newLinks.indexOf(link) === -1),
      addedLinks: newLinks.filter(link => this.graph.links.indexOf(link) === -1)
    };

    if(this.eventData){
      this.eventData.event.diff = diff;
      let eventList = this.historyMap.get("expand") ? this.historyMap.get("expand") : new Map();
    if(eventList){
    //  eventList.push(eventMap);
      eventList.set(this.eventData.id, this.eventData.event);
      this.historyMap.set("expand", eventList);
/*    }else{
      eventMap.set(this.eventData.id, this.eventData.event);
      this.historyMap.set("expand", eventMap);
    */}
    }
    //todo setting the history for load events probably isn't necessary
    if(this.originalEvent !='load'){
      this.historyMap.get(this.originalEvent);
    }
    //apply diff to current graph
    this.applyDiff(diff);
    this.countLinks();
    //update graph
    this._graphHistorySource.next(this.graph);
    this.nodeList = [];
     this.linkList = [];
     this.filter = false;
  }

  applyDiff(diff:any):void{
    //todo: it is possible to expand a node connected to an expanded node. If the original node is closed, the second expanded nodes are still visible
    //todo: need to iterate over remaining nodes and links and remove them
    if(this.filter == true) {
      diff.removedNodes.forEach(node => {
        this.graph.nodes.splice(this.graph.nodes.indexOf(node), 1);
      });
      diff.removedLinks.forEach(link => {
        this.graph.links.splice(this.graph.links.indexOf(link), 1);
      });
    }
    diff.addedNodes.forEach(node => this.graph.nodes.push(node));
    diff.addedLinks.forEach(link => {
      this.graph.links.push(link);
    });
  }

countLinks():void{
    this.graph.nodes.forEach(node => node.linkCount = 1);
  for (let l of this.graph.links) {
    let source:Node =  this.nodeService.getById(l.source.id ? l.source.id : l.source);
    source.linkCount ++;
    //todo: not sure why this was put here...
    if(source.labels[0] =="Compound"){
      //console.log(source);
    }
    this.nodeService.setNode(source);
    let target:Node =  this.nodeService.getById(l.target.id ? l.target.id : l.target);
    //todo: not sure why this was put here...
    target.linkCount ++;
    if(target.labels[0] =="Compound"){
      console.log(target);
    }
    this.nodeService.setNode(target);
  }
}

  clearGraph():void{
    this.graph.links = [];
    this.graph.nodes = [];
  }

  nodeExpand(id:string, properties: any):void {
    let message: Message = this.messageService.getMessage(id, "expand", properties);

    //right now this is only creating a skeleton map object without the diff
    //this happens here because node id and label is needed for tracking.
    let event: Event = {
      //  type: "expand",
      label: properties,
      diff: {
        addedNodes:[],
        removedNodes:[],
        addedLinks:[],
        removedLinks:[]
      }
    };
  this.eventData ={id:id, event: event};
    this.dataConnectionService.messages.next(message);
  }

  nodeCollapse(node:Node, label:any ):void{
    this.filter = true;
//get the expand object to delete the nodes added
    let diff = this.historyMap.get('expand').get(node.id).diff;

    let undoDiff = {
      addedNodes: [],
      removedNodes: diff.addedNodes,
      addedLinks: [],
      removedLinks: diff.addedLinks
    };

    this.applyDiff(undoDiff);

    this.countLinks();
    this._graphHistorySource.next(this.graph);
    this.filter = false;
    this.loadingService.toggleVisible(false);

  }
}
