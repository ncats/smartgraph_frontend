import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Node, Link} from '../d3';
import {Message, MessageService} from "./message.service";
import {DataConnectionService} from "./data-connection.service";
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
  private _nodeHistorySource = new Subject<any>();
  private _linkHistorySource = new Subject<any>();
  private _graphHistorySource = new Subject<any>();
  masterNodeMap:Map<string, Node> = new Map();
  masterLinkMap:Map<string, Link> = new Map();
  nodeMap:Map<string, Node> = new Map();
  linkMap:Map<string, Link> = new Map();
  historyMap:Map<string, any> = new Map();
  graphhistory$ = this._graphHistorySource.asObservable();
  originalEvent: string;
responses: any = [];
nodeList: any = [];
linkList: any = [];

constructor(
  private dataConnectionService:DataConnectionService,
  private messageService: MessageService
){

  this.dataConnectionService.messages.subscribe(msg => {
    let response = JSON.parse(msg);
    switch(response.type) {
      case 'targets':
      case 'expand':
      case 'path':
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
  parseRecords(records, event:any) {
    //neo4j websocket returns one record at a time, so looping isn't necessary, but still probably a good idea
    for (let r of records) {
      if (r.segments) {
        for (let l of r.segments) {
          let start = this.makeNode(l.start.identity.low, l.start);
          let end = this.makeNode(l.end.identity.low, l.end);
          let id = start.id.toString().concat(end.id.toString());
          let nodes = [start,end];
          this.nodeList.push(...nodes);
          let link = new Link(start.id, end.id, l.relationship.type, l.properties, id);
          this.linkList.push(link);
          this.masterNodeMap.set(start.id, start);
          this.masterNodeMap.set(end.id, end);
          this.masterLinkMap.set( id, link);
        }
      } else {
        if (!r.start && !r.end) {
          this.nodeList.push(this.makeNode(r.identity.low, r));
          this.masterNodeMap.set(r.identity.low, this.makeNode(r.identity.low, r));
        } else {
          let start = this.makeNode(r.start.low, {});
          let end = this.makeNode(r.end.low, {});
          let nodes = [start,end];
          let id = start.id.toString().concat(end.id.toString());
          this.nodeList.push(...nodes);
          let link = new Link(start.id, end.id, r.type, r.properties, id);
          this.linkList.push(link);
          this.masterNodeMap.set(start.id, start);
          this.masterNodeMap.set(end.id, end);
          this.masterLinkMap.set(id, link);
        }
      }
    }
  }



  makeGraph(eventType: string):void {
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
    diff.removedNodes.forEach(node => {
      this.graph.nodes.splice(this.graph.nodes.indexOf(node), 1);
  //      this.nodeMap.delete(node.id);
    });
    diff.addedNodes.forEach(node => this.graph.nodes.push(node));

    diff.removedLinks.forEach(link => {
      this.graph.links.splice(this.graph.links.indexOf(link), 1);
   //   this.linkMap.delete(link.id);
    });
    diff.addedLinks.forEach(link => {
      this.graph.links.push(link);
   //   this.linkMap.set(link.id, link);
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
    let source:Node =  this.masterNodeMap.get(l.source.id ? l.source.id : l.source);
    source.linkCount ++;
    this.masterNodeMap.set(l.source.id, source);
    let target:Node =  this.masterNodeMap.get(l.target.id ? l.target.id : l.target);
    target.linkCount ++;
    this.masterNodeMap.set(l.target.id, target);
  }
}

  //searches to see if a node exists. if it does, it returns the node with the sent data merged, if it doesn't exist, it makes a new node with the data
  makeNode(id:string, data:any):Node {
return this.masterNodeMap.get(id) ? Object.assign(this.masterNodeMap.get(id), data) : new Node(id, data);
  }

  clearGraph():void{
    this.nodeMap.clear();
    this.linkMap.clear();
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
    console.log(node);
    console.log(label);
    console.log(this.historyMap);
//get the expand object to delete the nodes added
    let diff = this.historyMap.get('expand').get(node.id).diff;
    console.log(diff);
    diff.addedLinks.forEach(link => {
      this.graph.links.splice(this.graph.links.indexOf(link), 1);
      this.linkMap.delete(link.id);
    });
    diff.addedNodes.forEach(node => {
      this.graph.nodes.splice(this.graph.nodes.indexOf(node), 1);
     // this.nodeMap.delete(node.id);
    });

    diff.removedLinks.forEach(link =>{
      this.graph.links.push(link);
      this.linkMap.set(link.id, link);
    });

    //todo: it is possible to expand a node connected to an expanded node. If the original node is closed, the second expanded nodes are still visible
    this.countLinks();
    this._graphHistorySource.next(this.graph);

  }
}
