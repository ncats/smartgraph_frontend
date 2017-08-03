import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Node, Link} from '../d3';
import {Message, MessageService} from "./message.service";
import {DataConnectionService} from "./data-connection.service";

export interface Event {
  type:string;
  label:string;
  diff:Object;
}


@Injectable()
export class GraphDataService {
graph ={
  nodes: [],
  links:[]
};

histData:any;

history =[];
  // Observable navItem source
  private _nodeHistorySource = new Subject<any>();
  private _linkHistorySource = new Subject<any>();
  private _graphHistorySource = new Subject<any>();
  nodeMap:Map<string, Node> = new Map();
  linkMap:Map<string, Link> = new Map();
  historyMap:Map<string, any> = new Map();
  eventMap:Map<string, any> = new Map();
  // Observable navItem stream
  nodehistory$ = this._nodeHistorySource.asObservable();
  linkhistory$ = this._linkHistorySource.asObservable();
  graphhistory$ = this._graphHistorySource.asObservable();
/*
  // service command
  nodeClick(node:String) {
    this.nodeHistory.push(node);
      this._nodeHistorySource.next(this.nodeHistory);
  }*/
constructor(
  private dataConnectionService:DataConnectionService,
  private messageService: MessageService
){

  this.dataConnectionService.messages.subscribe(msg => {
  let response = JSON.parse(msg);
  switch(response.type) {
    case 'expand':
    case 'load': {
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
}
});
}
  parseRecords(records, event:any){
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
          //  this.nodes.
          //todo make sure link doesn't already exist
          let id = start.id.toString().concat(end.id.toString());
          let newLink = this.linkMap.get(id);
          if (newLink) {
            if (newLink.id == id) {
              console.error("they're the same!");
              console.log(newLink.type);
              console.log(r.type);
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
    let newNodes = [...this.nodeMap.values()].sort((n1,n2) => {
      if (n1.linkCount > n2.linkCount) {
        return 1;
      }

      if (n1.linkCount < n2.linkCount) {
        return -1;
      }

      return 0;
    });

    let newLinks = [...this.linkMap.values()];

    const diff = {
      removedNodes: this.graph.nodes.filter(node => newNodes.indexOf(node) === -1),
      addedNodes: newNodes.filter(node => this.graph.nodes.indexOf(node) === -1),
      removedLinks: this.graph.links.filter(link => newLinks.indexOf(link) === -1),
      addedLinks: newLinks.filter(link => this.graph.links.indexOf(link) === -1)
    };

    if(this.histData){
      let nodeHistory = this.historyMap.get(this.histData.node);
      if(nodeHistory){
        let eventHistory = nodeHistory.get(this.histData.event.type +'-'+this.histData.event.label);
          //todo: this should always exist since the histData.event object is initialized with an empty diff object
          if(eventHistory){
            //push added or removed nodes
            this.histData.event.diff.addedNodes = this.histData.event.diff.addedNodes.concat(diff.addedNodes);
            this.histData.event.diff.removedNodes = this.histData.event.diff.removedNodes.concat(diff.removedNodes);
            this.histData.event.diff.addedLinks = this.histData.event.diff.addedLinks.concat(diff.addedLinks);
            this.histData.event.diff.removedLinks = this.histData.event.diff.removedLinks.concat(diff.removedLinks);
          }
      }else{
        let events = new Map();
        events.set(this.histData.event.type +'-'+this.histData.event.label, this.histData.event.diff );
        this.historyMap.set(this.histData.node, events);
      }

    }
    diff.removedNodes.forEach(node => this.graph.nodes.splice(this.graph.nodes.indexOf(node), 1));
    diff.addedNodes.forEach(node => this.graph.nodes.push(node));
    diff.removedLinks.forEach(link => this.graph.links.splice(this.graph.links.indexOf(link), 1));
    diff.addedLinks.forEach(link => this.graph.links.push(link));

   // this.graph.links = newLinks;
  //  this.historyService.setNodes(this.nodes);
   // this.historyService.setLinks(this.links);


   // this.graph.push({graph, event});
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
    let event: Event = {
      type: "expand",
      label: properties,
      diff: {addedNodes:[],
              removedNodes:[],
              addedLinks:[],
              removedLinks:[]
      }
    };
    this.histData= {node:id, event: event};
    this.dataConnectionService.messages.next(message);
  }

  nodeCollapse(node:Node, label:any ):void{
    console.log(node);
    console.log(label);
    console.log(this.historyMap);
//get the expand object to delete the nodes added
    let diff = this.historyMap.get(node.id).get('expand-' + node.labels[0]);
    console.log(diff);
    diff.addedLinks.forEach(link => this.graph.links.splice(this.graph.links.indexOf(link), 1));
    diff.addedNodes.forEach(node => this.graph.nodes.splice(this.graph.nodes.indexOf(node), 1));
    //diff.added.forEach(node => this.graph.links.splice(this.graph.links.indexOf(node), 1));
    this._graphHistorySource.next(this.graph);

/*    let removedLinks = this.graph.links.filter(link => link.source.id == node.id || link.target.id == node.id);
    removedLinks.forEach(link => {
      console.log(link);
      this.graph.links.splice(this.graph.links.indexOf(link), 1);
    });*/
    /*    const diff = {
          removedLinks: this.graph.links.filter(link => link.source.id == node.id || link.target.id == node.id),
        };*/
/*
    diff.added.forEach(node => this.nodes.push(node));*/
/*console.log(diff);
    diff.removedLinks.forEach(link => {
      console.log(link);
      this.graph.links.splice(this.graph.links.indexOf(link), 1);
      /!*if(link.source !== node) {
        console.log(link.source);
        this.graph.nodes.splice(this.graph.nodes.indexOf(link.source), 1);
      }
      if(link.target !== node) {
        console.log(link.target);
        this.graph.nodes.splice(this.graph.nodes.indexOf(link.target), 1);
      }*!/
      //todo need to redraw each node, because the link count will change
    });
*/
    //should be watched by graph service and pushed into from app;
  }
}
