import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})
export class GraphDataService {
  graph = {
    nodes: [],
    links: []
  };

  eventData: any;

  history = [];
  //  Observable navItem source
  private _graphHistorySource = new Subject<any>();
  historyMap: Map<string, any> = new Map();
  graphhistory$ = this._graphHistorySource.asObservable();
  originalEvent: string;
  noResults: boolean = false;
  filter: boolean = false;
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

    this.dataConnectionService.responses.subscribe(response => {
      if(response.data) {
        this.originalEvent = response.type.toString();
        const records = response.data._fields;
        if (records.length == 0) {
          console.error(response);
        } else {
          switch (response.type) {
            case 'path': {
              this.filter = true;
              this.noResults = true;
              this.parseRecords(records);
              break;
            }
            case 'startNodeSearch':
            case 'endNodeSearch': {
              this.filter = true;
              this.noResults = false;
              this.parseRecords(records);
              break;
            }
            case 'prediction': {
              // todo this should display a warning, but not clear the graph
              this.filter = false;
              this.noResults = false;
              this.parseRecords(records);
              break;
            }
            case 'expand': {
              this.filter = false;
              this.noResults = false;
              this.parseRecords(records);
              break;
            }
          }
        }
      }else{
        //no new results added
        // todo: still want an alert if no predictions are found.
        if (this.noResults && (this.nodeList.length === 0 && this.linkList.length === 0)) {
          this.clearGraph();
          this._graphHistorySource.next(this.graph);
          alert('no path found');
        } else {
          this.makeGraph();
        }
        this.loadingService.toggleVisible(false);
      }
    });
  }


  parseRecords(path) {
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
        this.historyMap.set(this.eventData.id, diff);
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
      l.source.linkCount ++;
      l.target.linkCount ++;
    }
  }

  clearGraph(): void{
    this.graph.links = [];
    this.graph.nodes = [];
    this._graphHistorySource.next(this.graph);
  }

  getNodes(): string[] {
    return this.graph.nodes.map(node => node.uuid);
  }

  nodeExpand(id: string, type:string, properties: any): void {
    const message: Message = this.messageService.getMessage(id, type, properties);
    // right now this is only creating a skeleton map object without the diff
    // this happens here because node id and label is needed for tracking.
    this.eventData = {id: id, diff:{}};
    this.dataConnectionService.messages.next(message);
  }

  nodeCollapse(node: Node): void{
    this.filter = true;
// get the expand object to delete the nodes added
    const diff = this.historyMap.get(node.uuid);

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

  // download button uses this
  returnGraph():any{
    return this.graph;
  }
}

/*
  this.dataConnectionService.responses.subscribe(msg => {
    const response = JSON.parse(msg);
    if(response.data) {
      this.originalEvent = response.type.toString();
      const records = response.data._fields;
      if (records.length == 0) {
        console.error(response);
      } else {
        switch (response.type) {
          case 'path':
          {
            this.filter = true;
            this.noResults = true;
            this.parseRecords(records);
            break;
          }
          case 'startNodeSearch':
          case 'endNodeSearch':{
            this.filter = true;
            this.noResults = false;
            this.parseRecords(records);
            break;
          }
          case 'prediction':
          {
            // todo this should display a warning, but not clear the graph
            this.filter = false;
            this.noResults = false;
            this.parseRecords(records);
            break;
          }
          case 'expand':{
            this.filter = false;
            this.noResults = false;
            this.parseRecords(records);
            break;
          }
        }
      }
    }else{
      //no new results added
      // todo: still want an alert if no predictions are found.
      if (this.noResults && (this.nodeList.length === 0 && this.linkList.length === 0)) {
        this.clearGraph();
        this._graphHistorySource.next(this.graph);
        alert('no path found');
      } else {
        console.log('done');
        this.cleanGraph();
      }
      this.loadingService.toggleVisible(false);
    }
  });

}

  private parseRecords(path:any) {
    // neo4j websocket returns one record at a time, so looping isn't necessary, but still probably a good idea
    for (const r of path) {
      if (r.segments) {
        for (const l of r.segments) {
          const start: Node = this.nodeService.makeNode(l.start.properties.uuid, l.start);
          const end: Node = this.nodeService.makeNode(l.end.properties.uuid, l.end);
          this.nodeList.push(...[start, end]);
          const link: Link = this.linkService.makeLink(l.relationship.properties.uuid, start, end, l.relationship);
          this.linkList.push(link);
          this.nodeService.setNode(start);
          this.nodeService.setNode(end);
          this.linkService.setLink(link);
        }
      } else {
        if (!r.start && !r.end) {
          // this is for node groups that aren't a path
          const n: Node = this.nodeService.makeNode(r.properties.uuid, r);
          this.nodeList.push(n);
          this.nodeService.setNode(n);
        } else {
          // this is the separate path for expanding nodes -- this does not have a uuid associated with the start or end nodes, so neo4j's id needs to be used to create the nodes
         console.error(r);
/!*          const start = this.nodeService.makeNode(r.properties.uuid, {});
          const end = this.nodeService.makeNode(r.properties.uuid, {});
          this.nodeList.push(...[start, end]);
          const link = this.linkService.makeLink(r.properties.uuid, start, end, r);
          this.linkList.push(link);
          this.nodeService.setNode(start);
          this.nodeService.setNode(end);
          this.linkService.setLink(link);*!/
        }
      }
      this.nodeList = this.nodeList.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
      this.linkList = this.linkList.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
      this.graph.nodes.push(...this.nodeList.filter(node => this.graph.nodes.indexOf(node) === -1));
      this.graph.links.push(...this.linkList.filter(link => this.graph.links.indexOf(link) === -1));
      this._graphHistorySource.next(this.graph);
    }
  }

  cleanGraph(): void {
    console.log(JSON.parse(JSON.stringify(this.graph)));
    console.log(JSON.parse(JSON.stringify(this.nodeList)));
    console.log(JSON.parse(JSON.stringify(this.linkList)));

    const diff = {
      //nodes in the graph that aren't in the new list
      removedNodes: this.graph.nodes.filter(node => this.nodeList.indexOf(node) === -1),
      // nodes in the new list that aren't in the graph'
      addedNodes: this.nodeList.filter(node => this.graph.nodes.indexOf(node) === -1),
      //links in the graph that aren't in the new list
      removedLinks: this.graph.links.filter(link => this.linkList.indexOf(link) === -1),
      // links in the new list that aren't in the graph'
      addedLinks: this.linkList.filter(link => this.graph.links.indexOf(link) === -1)
    };

    // apply diff to current graph
    this.applyDiff(diff);
    this.countLinks();
    // update graph
  //  this._graphHistorySource.next(this.graph);
 //
  }
  applyDiff(diff: any): void{
    console.log(this);
    console.log(diff);

    // todo: it is possible to expand a node connected to an expanded node. If the original node is closed, the second expanded nodes are still visible
    // todo: need to iterate over remaining nodes and links and remove them
    if (this.filter == true) {
      diff.removedNodes.forEach(node => {
        console.log(node);
        this.graph.nodes.splice(this.graph.nodes.indexOf(node), 1);
      });
      diff.removedLinks.forEach(link => {
        this.graph.links.splice(this.graph.links.indexOf(link), 1);
      });
      this.nodeList = [];
      this.linkList = [];
      this.filter = false;
    }
    diff.addedNodes.forEach(node => this.graph.nodes.push(node));
    diff.addedLinks.forEach(link => {
      this.graph.links.push(link);
    });

    if (this.eventData){
     /!* const diff2 = {
        removedNodes: this.oldGraph.nodes.filter(node => this.graph.nodes.indexOf(node) === -1),
        addedNodes: this.graph.nodes.filter(node => this.oldGraph.nodes.indexOf(node) === -1),
        removedLinks: this.oldGraph.links.filter(link => this.graph.nodes.indexOf(link) === -1),
        addedLinks: this.graph.nodes.filter(link => this.oldGraph.links.indexOf(link) === -1)
      };
*!/
      console.log(this.eventData);
      console.log(diff);
   //   console.log(diff2);
      this.historyMap.set(this.eventData.id, diff);
    }
  }



  nodeCollapse(node: Node): void{
// get the expand object to delete the nodes added
    const diff = this.historyMap.get(node.uuid);
    console.log(diff);
    this.graph.nodes = diff.removedNodes;
    this.graph.nodes.push(node);
    this.graph.links = diff.removedLinks;
   /!* diff.removedNodes.forEach(node => {
      console.log(node);
     // this.graph.nodes.splice(this.graph.nodes.indexOf(node), 1);
    });*!/
  /!*  diff.addedLinks.forEach(link => {
      this.graph.links.splice(this.graph.links.indexOf(link), 1);
    });*!/
    console.log(this.graph);
    this.countLinks();
    this._graphHistorySource.next(this.graph);

    this.loadingService.toggleVisible(false);
  }




 /!*
  }

  private appendGraph(): void {

    // removes duplicates
   // this.nodeList = this.nodeList.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
  //  this.linkList = this.linkList.reduce((x, y) => x.includes(y) ? x : [...x, y], []);

// filters out what was just added that isn't already in the graph
/!*    const diff = {
      removedNodes: [],
      addedNodes: this.nodeList.filter(node => this.graph.nodes.indexOf(node) === -1),
      removedLinks: [],
      addedLinks:  this.linkList.filter(link => this.graph.links.indexOf(link) === -1)
    };*!/


    // saves the event if it is an "expand" event

    //this needs to save a version of the graph on first click, then run the diff after done
    if (this.eventData){
  /!*    console.log(this.oldGraph);
      console.log(this.eventData);
      console.log(this.nodeList);
      console.log(this.linkList);
      console.log(this.graph);
      this.eventData.event.diff = diff;
      this.historyMap.set(this.eventData.id, this.eventData.event);
      console.log(this.historyMap);*!/
    }

    // apply diff to current graph
   // this.applyDiff(diff);
    // update link counts
    this.countLinks();
    // update graph
    this.graph.nodes.push(...this.nodeList.filter(node => this.graph.nodes.indexOf(node) === -1));
    this.graph.links.push(...this.linkList.filter(link => this.graph.links.indexOf(link) === -1));
    this._graphHistorySource.next(this.graph);

     this.filter = false;
  }

  cleanGraph():void{
     this.nodeList = this.nodeList.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
     this.linkList = this.linkList.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
// filters out what was just added that isn't already in the graph
    console.log(this.nodeList);
    console.log(this.linkList);
    console.log(this.graph);

    let diff = {
        removedNodes: this.graph.nodes.filter(node => this.nodeList.indexOf(node) === -1),
        addedNodes: this.nodeList.filter(node =>
        {
          //this doesnt work because the graph is fully populated at this pint, so nothing is "added"
          console.log(node);
          console.log(this.graph.nodes);
          console.log(this.graph.nodes.indexOf(node) === -1);
          return this.graph.nodes.indexOf(node) === -1;
        }),
    removedLinks: this.graph.links.filter(link =>  this.linkList.indexOf(link) === -1),
      addedLinks:  this.linkList.filter(link => this.graph.links.indexOf(link) === -1)
  };
    console.log(JSON.parse(JSON.stringify(diff)));
        // apply diff to current graph
     this.applyDiff(diff);
    /!*
      // update link counts
     this.countLinks();
     // update graph
     this._graphHistorySource.next(this.graph);
     *!/
     if(this.filter) {
     this.nodeList = [];
     this.linkList = [];
     }
     this.filter = false;
  }

  applyDiff(diff: any): void{

    if (this.eventData){
      console.log("event");
    //  diff.removedNodes.push(this.nodeService.getById(this.eventData.id));
       this.historyMap.set(this.eventData.id, diff);
       console.log(this.historyMap);
    }
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
    this.graph.nodes.push(...diff.addedNodes);
    this.graph.links.push(...diff.addedLinks);
  }

  nodeCollapse(node: Node, label: any ): void{
    this.filter = true;
// get the expand object to delete the nodes added
    const diff = this.historyMap.get(node.uuid);
console.log(this.historyMap);
console.log(diff);
    const undoDiff = {
      addedNodes: [],
      removedNodes: diff.addedNodes,
      addedLinks: [],
      removedLinks: diff.addedLinks
    };

      diff.addedNodes.forEach(node => {
        this.graph.nodes.splice(this.graph.nodes.indexOf(node), 1);
      });
      diff.addedLinks.forEach(link => {
        this.graph.links.splice(this.graph.links.indexOf(link), 1);
      });
   // this.clearGraph();
    this.graph.nodes.push(...diff.removedNodes, this.nodeService.getById(node.uuid));
    this.graph.links.push(...diff.removedLinks);
    this.countLinks();
    this._graphHistorySource.next(this.graph);
    this.filter = false;
    this.loadingService.toggleVisible(false);

  }
*!/


}
*/
