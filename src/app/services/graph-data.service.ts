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
  nodeMap:Map<string, Node> = new Map();
  linkMap:Map<string, Link> = new Map();
  historyMap:Map<string, any> = new Map();
  graphhistory$ = this._graphHistorySource.asObservable();
  originalEvent: string;


constructor(
  private dataConnectionService:DataConnectionService,
  private messageService: MessageService,
 // private webWorkerService: WebWorkerService
){

 //  let decoder = new TextDecoder();

  //todo move this to the websocket return- a string is alread given, it needs to be sorted and an array returned that can be converted here into classed objects
  //using web workers is an interesting idea- to offload the parsing of the message, but it does not pass full objects, esp ones with methods back
  //the array buffer idea could be used straight from the websocket however to make a first pass at organizing the data
  //the returned data can then be converted to Node or Link classes to have the built in scaling functions
  //also note that the link object seems to work better with Node classes, rather than Node ids
  //todo: this returns a string, will need to be converted to objects, from here, the diff needs to be created, saved in history and passed to the graph
/*  this.webWorkerService.reportParser.onmessage = (message) => {
    //todo: this kind of sucks --- see if it is any faster than the above version
    this.nodes = JSON.parse(decoder.decode(message.data)).nodes.map(item => new Node(item.id, item.properties, item.labels, item.linkCount));
    this.links = JSON.parse(decoder.decode(message.data)).links.map(item => new Link(item.source, item.target, item.properties));
  };*/

  this.dataConnectionService.messages.subscribe(msg => {
  let response = JSON.parse(msg);
 //   console.log(response);
    switch(response.type) {
    case 'expand':
    case 'targets':
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
      //console.log("done");
   //   console.log(this.originalEvent);
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
       //   start.linkCount++;
      //    end.linkCount++;
          let id = start.id.toString().concat(end.id.toString());
          this.linkMap.set( id, new Link(start.id, end.id, l.relationship.type, l.properties, id));
          this.nodeMap.set(start.id, start);
          this.nodeMap.set(end.id, end);
        }
      } else {
        if (!r.start && !r.end) {
          this.nodeMap.set(r.identity.low, this.makeNode(r.identity.low, r));
        } else {
          let start = this.makeNode(r.start.low, {});
          let end = this.makeNode(r.end.low, {});
        //  start.linkCount++;
        //  end.linkCount++;
          let id = start.id.toString().concat(end.id.toString());
          this.linkMap.set(id, new Link(start.id, end.id, r.type, r.properties, id));
          this.nodeMap.set(start.id, start);
          this.nodeMap.set(end.id, end);
        }
      }
    }
  }



  makeGraph(eventType: string):void {
    let eventMap:Map<string, Event> = new Map();

    //flatten maps
    let newNodes = [...this.nodeMap.values()].sort((n1, n2) => {
      if (n1.linkCount > n2.linkCount) {
        return 1;
      }
      if (n1.linkCount < n2.linkCount) {
        return -1;
      }

      return 0;
    });
    let newLinks = [...this.linkMap.values()];

    let diff = {
      removedNodes: this.graph.nodes.filter(node =>newNodes.indexOf(node) === -1),
      addedNodes: newNodes.filter(node =>this.graph.nodes.indexOf(node) === -1),
      removedLinks: this.graph.links.filter(link => newLinks.indexOf(link) === -1),
      addedLinks: newLinks.filter(link => this.graph.links.indexOf(link) === -1)
    };

  //  console.log(this.originalEvent);


    if(this.eventData){
      console.log(diff);
      this.eventData.event.diff = diff;
      console.log(this.eventData);
      let eventList = this.historyMap.get("expand") ? this.historyMap.get("expand") : new Map();
    if(eventList){
    //  eventList.push(eventMap);
      eventList.set(this.eventData.id, this.eventData.event);
      console.log(eventList);
      this.historyMap.set("expand", eventList);
/*    }else{
      eventMap.set(this.eventData.id, this.eventData.event);
      this.historyMap.set("expand", eventMap);
    */}
    }
console.log(this.historyMap);

    //todo setting the history for load events probably isn't necessary
    if(this.originalEvent !='load'){
      this.historyMap.get(this.originalEvent);
    }
console.log(diff);

    //apply diff to current graph
    diff.removedNodes.forEach(node => {
      this.graph.nodes.splice(this.graph.nodes.indexOf(node), 1);
        this.nodeMap.delete(node.id);
    });
    diff.addedNodes.forEach(node => this.graph.nodes.push(node));

    diff.removedLinks.forEach(link => {
      this.graph.links.splice(this.graph.links.indexOf(link), 1);
      this.linkMap.delete(link.id);
    });
    diff.addedLinks.forEach(link => {
      this.graph.links.push(link);
      this.linkMap.set(link.id, link);
    });

    this.countLinks();
    //update graph
    this._graphHistorySource.next(this.graph);



  }

countLinks():void{
    console.log(this.graph);
    this.graph.nodes.forEach(node => node.linkCount =1);
  for (let l of this.graph.links) {
    console.log(l);
    let source:Node =  this.nodeMap.get(l.source.id ? l.source.id : l.source);
    console.log(source);
    source.linkCount ++;
    this.nodeMap.set(l.source.id, source);
    let target:Node =  this.nodeMap.get(l.target.id ? l.target.id : l.target);
    target.linkCount ++;
    this.nodeMap.set(l.target.id, target);
  }
}



  //searches to see if a node exists. if it does, it returns the node with the sent data merged, if it doesn't exist, it makes a new node with the data
  makeNode(id:string, data:any):Node {
    return this.nodeMap.get(id) ? Object.assign(this.nodeMap.get(id), data) : new Node(id, data);
  }

  clearGraph():void{
    this.nodeMap.clear();
    this.linkMap.clear();
    this.graph.links = [];
    this.graph.nodes = [];
  }

/*  graphRevert(){
    this._graphHistorySource.next(this.graph);
  }

  setGraph(nodes:[Node], links:[Link]){
    this.graph = {nodes: nodes, links: links};
    this._graphHistorySource.next(this.graph);
  }



  setNodes(nodes:Node[]):void{
    //these are set on node click as well, but there is no way to track the origin
    this.graph.nodes= nodes;
    this._graphHistorySource.next(this.graph);
  }

  setLinks(links:Link[]):void{
    this.graph.links= links;
    this._graphHistorySource.next(this.graph);
  }*/

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
      this.nodeMap.delete(node.id);
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
