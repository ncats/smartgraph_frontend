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
  //  console.log(event);
    //neo4j websocket returns one record at a time, so looping isn't necessary, but still probably a good idea
    for (let r of records) {
      //r.start and r.end are the nodes if an object is a relationship -- this saves them as nodes
      if (r.start && r.start.identity) {
        this.nodeMap.set(r.start.identity.low, this.makeNode(r.start.identity.low, r.start));
      }
      if (r.end && r.end.identity) {
        this.nodeMap.set(r.end.identity.low, this.makeNode(r.end.identity.low, r.end));
      }
      //this covers the relationship itself, and creates the link object
      if (r.segments) {
        for (let l of r.segments) {
          //make link
          let start = this.makeNode(l.start.identity.low, l.start);
          let end = this.makeNode(l.end.identity.low, l.end);
          start.linkCount++;
          end.linkCount++;

          //todo make sure link doesn't already exist
          let id = start.id.toString().concat(end.id.toString());
          let newLink = this.linkMap.get(id);
          if (newLink) {
            if (newLink.id == id) {
              console.error("they're the same!");
/*              console.log(newLink.type);
              console.log(r.type);*/
            }
          } else {
            newLink = new Link(start.id, end.id, l.relationship.type, l.properties, id);
            this.linkMap.set(id, newLink);
          }
          this.nodeMap.set(l.start.identity.low, start);
          this.nodeMap.set(l.end.identity.low, end);
        }
      } else {
        //this covers nodes from a nearest neighbor search
        if (!r.start && !r.end) {
          this.nodeMap.set(r.identity.low, this.makeNode(r.identity.low, r));
        } else {
          //this makes the links from a nearest node search
          //once the graph has uuids, this will be much easier
          let start = this.makeNode(r.start.low, {});
          let end = this.makeNode(r.end.low, {});
          start.linkCount++;
          end.linkCount++;
          //todo make sure link doesn't already exist
          let id = start.id.toString().concat(end.id.toString());
          let newLink = this.linkMap.get(id);
          if (newLink) {
            if (newLink.id == id) {
              //      console.error("they're the same!");
              //      console.log(newLink.type);
              //     console.log(r.type);
            }
          } else {
            newLink = new Link(start.id, end.id, r.type, r.properties, id);
            this.linkMap.set(id, newLink);
          }
          this.nodeMap.set(r.start.low, start);
          this.nodeMap.set(r.end.low, end);
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
/*    console.log(newNodes);
    console.log(newLinks);
    console.log(this.graph);*/

    //create diff from maps
    let diff2 ={
      removedNodes:[],
      addedNodes:[],
      removedLinks:[],
      addedLinks:[]
    };

    newNodes.filter(node => {
      if(this.graph.nodes.indexOf(node) === -1) {
        diff2.addedNodes.push(node);
      }else{
        diff2.removedNodes.push(node);
      }
      });

    newLinks.filter(link => {
      if(this.graph.links.indexOf(link) === -1) {
        diff2.addedLinks.push(link);
      }else{
        diff2.removedLinks.push(link);
      }
      });

    let diff = {
      removedNodes: this.graph.nodes.filter(node => {
       console.log(node);
        console.log(newNodes);
        console.log(newNodes.indexOf(node));
        if(newNodes.indexOf(node) === -1){
          console.log(node);
        }
       return newNodes.indexOf(node) === -1
      }),
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

    //push to event history
    //histData right now only comes from node expansion
/*    if (this.histData) {
      console.log(this.histData);
   //   let eventMap:Map<string, any> = this.historyMap.get(this.originalEvent);
   //   console.log(eventMap);
      let nodeHistory = this.historyMap.get(this.histData.node);
      if (nodeHistory) {
        let eventHistory = nodeHistory.get(this.histData.event.type + '-' + this.histData.event.label);
        //todo: this should always exist since the histData.event object is initialized with an empty diff object
        if (eventHistory) {
          //push added or removed nodes
          this.histData.event.diff.addedNodes = this.histData.event.diff.addedNodes.concat(diff.addedNodes);
          this.histData.event.diff.removedNodes = this.histData.event.diff.removedNodes.concat(diff.removedNodes);
          this.histData.event.diff.addedLinks = this.histData.event.diff.addedLinks.concat(diff.addedLinks);
          this.histData.event.diff.removedLinks = this.histData.event.diff.removedLinks.concat(diff.removedLinks);
        }
      } else {
        let events = new Map();
        events.set(this.histData.event.type + '-' + this.histData.event.label, this.histData.event.diff);
        this.historyMap.set(this.histData.node, events);
      }

    }*/
console.log(diff);

    //apply diff to current graph
    diff.removedNodes.forEach(node => this.graph.nodes.splice(this.graph.nodes.indexOf(node), 1));
    diff.addedNodes.forEach(node => this.graph.nodes.push(node));
    diff.removedLinks.forEach(link => this.graph.links.splice(this.graph.links.indexOf(link), 1));
    diff.addedLinks.forEach(link => this.graph.links.push(link));

    // this.graph.links = newLinks;
    //  this.historyService.setNodes(this.nodes);
    // this.historyService.setLinks(this.links);


    // this.graph.push({graph, event});
    //    console.log(this.graph);

    //update graph
    this._graphHistorySource.next(this.graph);



  }





  //searches to see if a node exists. if it does, it returns the node with the sent data merged, if it doesn't exist, it makes a new node with the data
  makeNode(id:string, data:any):Node {
    return this.nodeMap.get(id) ? Object.assign(this.nodeMap.get(id), data) : new Node(id, data, data.labels);
  }

  graphRevert(){
    this._graphHistorySource.next(this.graph);
  }

  setGraph(nodes:[Node], links:[Link]){
    this.graph = {nodes: nodes, links: links};
    this._graphHistorySource.next(this.graph);
  }

  clearGraph():void{
    this.nodeMap.clear();
    this.linkMap.clear();
    this.graph.links = [];
    this.graph.nodes = [];
  }

  setNodes(nodes:Node[]):void{
    //these are set on node click as well, but there is no way to track the origin
    this.graph.nodes= nodes;
    this._graphHistorySource.next(this.graph);
  }

  setLinks(links:Link[]):void{
    this.graph.links= links;
    this._graphHistorySource.next(this.graph);
  }

  nodeExpand(id:string, properties: any):void {
    let message: Message = this.messageService.getMessage(id, "expand", properties);

    //right now this is only creating a skeleton map object without the diff
    //this happens here because node id and label is needed for tracking.

    //todo if a node is expanded, then collapsed, and another node is expanded, the first node expands as well
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
    diff.addedLinks.forEach(link => this.graph.links.splice(this.graph.links.indexOf(link), 1));
    diff.addedNodes.forEach(node => this.graph.nodes.splice(this.graph.nodes.indexOf(node), 1));
    //diff.added.forEach(node => this.graph.links.splice(this.graph.links.indexOf(node), 1));
    this._graphHistorySource.next(this.graph);
      //todo need to redraw each node, because the link count will change

  }
}
