import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Node, Link} from '../d3';

@Injectable()
export class HistoryService {
graph ={
  nodes: [],
  links:[]
};
nodeHistory =[];
  // Observable navItem source
  private _nodeHistorySource = new Subject<any>();
  private _linkHistorySource = new Subject<any>();
  private _graphHistorySource = new Subject<any>();
  // Observable navItem stream
  nodehistory$ = this._nodeHistorySource.asObservable();
  linkhistory$ = this._linkHistorySource.asObservable();
  graphhistory$ = this._graphHistorySource.asObservable();

  // service command
  nodeClick(node:String) {
      console.log(node);
    this.nodeHistory.push(node);
    console.log(this.nodeHistory);
      this._nodeHistorySource.next(this.nodeHistory);
  }

  graphChange(graph,event){
   // this.graph.push({graph, event});
    this._graphHistorySource.next(this.graph);
  }

  graphRevert(){
    this._graphHistorySource.next(this.graph);
  }

  setGraph(nodes:[Node], links:[Link]){
    this.nodeHistory = nodes;
    this.graph = {nodes: nodes, links: links};
    this._graphHistorySource.next(this.graph);
  }

  setNodes(nodes:Node[]){
    console.log(nodes);
    this.nodeHistory = nodes;
    this.graph.nodes= nodes;
    this._nodeHistorySource.next(this.graph);
  }

  setLinks(links:Link[]){
    console.log(links);
    this.graph.links= links;
    this._linkHistorySource.next(this.graph);
  }


  nodeCollapse(node:Node ){
    //todo:remove nodes here?
    //should be watched by graph service and pushed into from app;
  }
}
