import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class HistoryService {
graphHistory =[];
nodeHistory =[];
  // Observable navItem source
  private _nodeHistorySource = new Subject<any>();
  private _graphHistorySource = new Subject<any>();
  // Observable navItem stream
  nodehistory$ = this._nodeHistorySource.asObservable();
  graphhistory$ = this._graphHistorySource.asObservable();

  // service command
  nodeClick(node:String) {
      console.log(node);
    this.nodeHistory.push(node);
    console.log(this.nodeHistory);
      this._nodeHistorySource.next(this.nodeHistory);
  }

  graphChange(graph){
    this.graphHistory.push(graph);
    this._graphHistorySource.next(this.graphHistory);
  }

  graphRevert(){
    this._graphHistorySource.next(this.graphHistory);
  }
}
