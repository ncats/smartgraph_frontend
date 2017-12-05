import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Link} from '../d3/models/link';
import {Node} from '../d3/models/node';
import {Message, MessageService} from './message.service';
import {DataConnectionService} from './data-connection.service';
import {NodeService} from '../d3/models/node.service';
import {LinkService} from '../d3/models/link.service';
import {LoadingService} from './loading.service';
/*
import {WebWorkerService} from "./services/web-worker.service";
*/


export interface Event {
//   type:string;
  label: string;
  diff: Object;
}


@Injectable()
export class GraphDataService {
graph = {
  nodes: [],
  links: []
};

eventData: any;

history = [];
  //  Observable navItem source
  private _graphHistorySource = new Subject<any>();
  masterLinkMap: Map<string, Link> = new Map();
  historyMap: Map<string, any> = new Map();
  graphhistory$ = this._graphHistorySource.asObservable();
  originalEvent: string;
  filter = false;
nodeList: any = [];
linkList: any = [];
nodes: any  = [];

constructor(
  private dataConnectionService: DataConnectionService,
  private messageService: MessageService,
  private nodeService: NodeService,
  private linkService: LinkService,
  private loadingService: LoadingService
){

  // todo: with the added search variables, it is extremely likely no results will come back. this needs to be shown

  this.dataConnectionService.messages.subscribe(msg => {
    const response = JSON.parse(msg);
    switch (response.type) {
      case 'path': {
        this.filter = true;
        // intentional absence of break to allow fall through
      }
      case 'startNodeSearch':
      case 'endNodeSearch':
      case 'prediction':
      case 'expand':
      case 'load': {
        this.originalEvent = response.type;
        const records = response.data._fields;
        //   let bytes = encoder.encode(msg);
        //  this.webWorkerService.reportParser.postMessage(bytes.buffer, [bytes.buffer]);
        if (records.length == 0) {
          console.error(response);
        } else {
          this.parseRecords(records, response.type);
          this.makeGraph();

        }
        break;
      }
      case 'done': {
        this.loadingService.toggleVisible(false);
        break;
      }
    }
  });
}

  setFilter(filter: boolean): void{
  this.filter = filter;
  }

  parseRecords(path, event: any) {
    // neo4j websocket returns one record at a time, so looping isn't necessary, but still probably a good idea
    for (const r of path) {
      if (r.segments) {
        for (const l of r.segments) {
          // this ignores the initial start and end nodes, but they are added in the segments of the path
          const start: Node = this.nodeService.makeNode(l.start.properties.uuid, l.start);
          const end: Node = this.nodeService.makeNode(l.end.properties.uuid, l.end);
          this.nodeList.push(...[start, end]);
          const link: Link = this.linkService.makeLink(l.relationship.properties.uuid, start, end, l.relationship);
          this.linkList.push(link);
          this.nodeService.setNode(start);
          this.nodeService.setNode(end);
          this.linkService.setLink( link);
        }
      } else {
        if (!r.start && !r.end) {
          // this is for node groups that aren't a path
          const n: Node = this.nodeService.makeNode(r.properties.uuid, r);
          this.nodeList.push(n);
          this.nodeService.setNode(n);
        } else {
          // this is the separate path for expanding nodes -- this does not have a uuid associated with the start or end nodes, so neo4j's id needs to be used to create the nodes
          const start = this.nodeService.makeNode(r.properties.uuid, {});
          const end = this.nodeService.makeNode(r.properties.uuid, {});
          const nodes = [start, end];
          this.nodeList.push(...nodes);
          const link = this.linkService.makeLink(r.properties.uuid, start, end, r);
          this.nodeService.setNode(start);
          this.nodeService.setNode(end);
          this.linkService.setLink( link);
        }
      }

    }
  }

  makeGraph(): void {
    const newNodes = this.nodeList.filter((elem, pos, arr) => {
        return arr.indexOf(elem) == pos;
      });
   const newLinks = this.linkList.filter((elem, pos, arr) => {
     return arr.indexOf(elem) == pos;
   });

    const diff = {
      removedNodes: this.graph.nodes.filter(node => newNodes.indexOf(node) === -1),
      addedNodes: newNodes.filter(node => this.graph.nodes.indexOf(node) === -1),
      removedLinks: this.graph.links.filter(link => newLinks.indexOf(link) === -1),
      addedLinks: newLinks.filter(link => this.graph.links.indexOf(link) === -1)
    };

    if (this.eventData){
      this.eventData.event.diff = diff;
      const eventList = this.historyMap.get('expand') ? this.historyMap.get('expand') : new Map();
    if (eventList){
    //   eventList.push(eventMap);
      eventList.set(this.eventData.id, this.eventData.event);
      this.historyMap.set('expand', eventList);
/*    }else{
      eventMap.set(this.eventData.id, this.eventData.event);
      this.historyMap.set("expand", eventMap);
    */}
    }
    // todo setting the history for load events probably isn't necessary
    if (this.originalEvent != 'load'){
      this.historyMap.get(this.originalEvent);
    }
    // apply diff to current graph
    this.applyDiff(diff);
    this.countLinks();
    // update graph
    this._graphHistorySource.next(this.graph);
    this.nodeList = [];
     this.linkList = [];
     this.filter = false;
  }

  applyDiff(diff: any): void{
    // todo: it is possible to expand a node connected to an expanded node. If the original node is closed, the second expanded nodes are still visible
    // todo: need to iterate over remaining nodes and links and remove them
    if (this.filter == true) {
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

countLinks(): void{
    this.graph.nodes.forEach(node => node.linkCount = 1);
  for (const l of this.graph.links) {
    const source: Node =  this.nodeService.getById(l.source.uuid ? l.source.uuid : l.source);
    source.linkCount ++;
    this.nodeService.setNode(source);
    const target: Node =  this.nodeService.getById(l.target.uuid ? l.target.uuid : l.target);
    target.linkCount ++;
    this.nodeService.setNode(target);
  }
}

  clearGraph(): void{
    this.graph.links = [];
    this.graph.nodes = [];
  }

  nodeExpand(id: string, properties: any): void {
    const message: Message = this.messageService.getMessage(id, 'expand', properties);

    // right now this is only creating a skeleton map object without the diff
    // this happens here because node id and label is needed for tracking.
    const event: Event = {
      //   type: "expand",
      label: properties,
      diff: {
        addedNodes: [],
        removedNodes: [],
        addedLinks: [],
        removedLinks: []
      }
    };
  this.eventData = {id: id, event: event};
    this.dataConnectionService.messages.next(message);
  }

  nodeCollapse(node: Node, label: any ): void{
    this.filter = true;
// get the expand object to delete the nodes added
    const diff = this.historyMap.get('expand').get(node.uuid).diff;
console.log(this.historyMap);
    const undoDiff = {
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

  returnGraph():any{
    return this.graph;
  }
}
