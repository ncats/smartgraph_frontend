import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Node, Link} from '../d3';
import {Message, MessageService} from "./message.service";
import {DataConnectionService} from "./data-connection.service";
import {NodeService} from "../d3/models/node.service";
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

constructor(
  private dataConnectionService:DataConnectionService,
  private messageService: MessageService,
  private nodeService: NodeService,
){


  this.dataConnectionService.messages.subscribe(msg => {
    let response = JSON.parse(msg);
    switch(response.type) {
      case 'path':
      case 'targets':
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
        this.makeGraph(response.type);
        break;
      }
    }
  });
}
  parseRecords(path, event:any) {
    //neo4j websocket returns one record at a time, so looping isn't necessary, but still probably a good idea
    for (let r of path) {
      if (r.segments) {
        for (let l of r.segments) {
          //this ignores the initial start and end nodes, but they are added in the segments of the path
          let start = this.nodeService.makeNode(l.start.identity.low, l.start);
          let end = this.nodeService.makeNode(l.end.identity.low, l.end);
          let id = start.id.toString().concat(end.id.toString());
          let nodes = [start,end];
          this.nodeList.push(...nodes);
          let link = new Link(start, end, l.relationship.type, l.relationship.properties, id);
          this.linkList.push(link);
          this.nodeService.setNode(start);
          this.nodeService.setNode(end);
          this.masterLinkMap.set( id, link);
        }
      } else {
        if (!r.start && !r.end) {
          //this is for node groups that aren't a path
          this.nodeList.push(this.nodeService.makeNode(r.identity.low, r));
          this.nodeService.setNode(this.nodeService.makeNode(r.identity.low, r));
        } else {
          let start = this.nodeService.makeNode(r.start.low, {});
          let end = this.nodeService.makeNode(r.end.low, {});
          let nodes = [start,end];
          let id = start.id.toString().concat(end.id.toString());
          this.nodeList.push(...nodes);
          let link = new Link(start, end, r.type, r.properties, id);
          this.linkList.push(link);
          this.nodeService.setNode(start);
          this.nodeService.setNode(end);
          this.masterLinkMap.set(id, link);
        }
      }

    }
  }



  makeGraph(eventType: string):void {
    console.log(eventType);
    let newNodes =this.nodeList.filter((elem, pos, arr) => {
        return arr.indexOf(elem) == pos;
      });
   let newLinks = this.linkList.filter((elem, pos, arr) => {
     return arr.indexOf(elem) == pos;
   });

    //todo: by not flitering, the expand/collapse node history is preserved, the start and end nodes are left in place
    //todo: however, if filtered, the distance search doesn't work, because the removed nodes aren't discovered

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
console.log(diff);
    //apply diff to current graph

    //todo: by not flitering, the expand/collapse node history is preserved, the start and end nodes are left in place
    //todo: however, if filtered, the distance search doesn't work, because the removed nodes aren't discovered
      diff.removedNodes.forEach(node => {
        this.graph.nodes.splice(this.graph.nodes.indexOf(node), 1);
      });
      diff.removedLinks.forEach(link => {
        this.graph.links.splice(this.graph.links.indexOf(link), 1);
      });

    diff.addedNodes.forEach(node => this.graph.nodes.push(node));

    diff.addedLinks.forEach(link => {
      this.graph.links.push(link);
    });

    this.countLinks();
    //update graph
   this._graphHistorySource.next(this.graph);
     this.nodeList = [];
     this.linkList = [];
  }

countLinks():void{
    this.graph.nodes.forEach(node => node.linkCount =1);
  for (let l of this.graph.links) {
    let source:Node =  this.nodeService.getById(l.source.id ? l.source.id : l.source);
    source.linkCount ++;
    if(source.labels[0] =="Lychi"){
      console.log(source);
    }
    this.nodeService.setNode(source);
    let target:Node =  this.nodeService.getById(l.target.id ? l.target.id : l.target);
    target.linkCount ++;
    if(target.labels[0] =="Lychi"){
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
    console.log(this.historyMap);
    this.dataConnectionService.messages.next(message);
  }

  nodeCollapse(node:Node, label:any ):void{
    console.log(node);
    console.log(label);
    console.log(this.historyMap);
//get the expand object to delete the nodes added
    let diff = this.historyMap.get('expand').get(node.id).diff;
    console.log(diff);
    diff.addedLinks.forEach(link => {
      this.graph.links.splice(this.graph.links.indexOf(link), 1);
    });
    diff.addedNodes.forEach(node => {
      this.graph.nodes.splice(this.graph.nodes.indexOf(node), 1);
    });

    diff.removedLinks.forEach(link =>{
      this.graph.links.push(link);
    });

    diff.removedNodes.forEach(node =>{
      this.graph.nodes.push(node);
    });

    //todo: it is possible to expand a node connected to an expanded node. If the original node is closed, the second expanded nodes are still visible
    this.countLinks();
    this._graphHistorySource.next(this.graph);

  }
}
