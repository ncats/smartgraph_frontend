import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Observer} from "rxjs/Observer";
//import { v1 as neo4j } from 'neo4j-driver';

@Injectable()
export class WebSocketService {

  constructor() { }

  private subject: Subject<MessageEvent>;
  private subjectData: Subject<number>;
 // public _global: GlobalRef;
  session : any;

  public connect(url: string): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("connected");
    }
    console.log(this.subject);
    return this.subject;
  }

  private create(url: string): Subject<MessageEvent> {
    console.log(this);
   // console.log(neo4j);
  //  console.log(this._global.nativeGlobal);
    let ws = new WebSocket(url);
    //  var neo4j = require('neo4j-driver');
    //  console.log(neo4j);

    /* var temp = this._global.nativeGlobal;
     this.neo4j = temp;
     this.neo4j = window.window.neo4j;
     //  console.log(neo4jdriver);
     //  var neo4j = new neo4jdriver;
     var driver = this.neo4j.v1.driver("bolt://localhost:7687", this.neo4j.v1.auth.basic("neo4j", "tim"));
     console.log(driver);
     this.session = driver.session();
     console.log(ws);
     console.log(this.session);*/

    let observable = Observable.create(
      (obs: Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror   = obs.error.bind(obs);
        ws.onclose   = obs.complete.bind(obs);
        console.log(ws);
        return ws.close.bind(ws);
      });

    let observer = {
      next: (data: Object) => {
        console.log(data);
        console.log(ws.readyState);
        console.log(WebSocket.OPEN);
        if (ws.readyState === WebSocket.OPEN) {
          console.log(data);
          ws.send(JSON.stringify(data));
        }
      }
    };

    return Subject.create(observer, observable);
  }

  // For random numbers
  public connectData(url: string): Subject<number> {
    if (!this.subjectData) {
      this.subjectData = this.createData(url);
    }
    return this.subjectData;
  }

  private createData(url: string): Subject<number> {
    let ws = new WebSocket(url);

    let observable = Observable.create(
      (obs: Observer<number>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror   = obs.error.bind(obs);
        ws.onclose   = obs.complete.bind(obs);

        return ws.close.bind(ws);
      });

    let observer = {
      next: (data: Object) => {
        console.log(data);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };

    return Subject.create(observer, observable);
  }
} // end class WebSocketService

