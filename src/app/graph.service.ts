import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {WebSocketService} from './websocket.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

//const DATA_URL = 'ws://localhost:7687';
//const DATA_URL = 'ws://localhost:9000/stream';
const DATA_URL = 'ws://localhost:1337';

/*export interface Message {
  statements: [
    {
      statement: string,
      "resultDataContents" : [string]
    }
    ]
}*/

export interface Message {
     message: string;
}


@Injectable()
export class GraphService {
  public messages: Subject<string>  = new Subject<string>();

  constructor(private wsService: WebSocketService) {

    // 1. subscribe to websocket
    this.messages  = <Subject<string>>this.wsService
      .connect(DATA_URL)
      .map((response: MessageEvent): string => {
      /*  console.log(response);
        let data = JSON.parse(response.data);
        console.log(data);*/
      /*  return {
          statements : data
        //  statements: data.statements
        }*/
      return response.data;
      });
  }
  /*Injectable()
export class GraphService {
  public messages: Subject<Message>  = new Subject<Message>();

  constructor(private wsService: WebSocketService) {

    // 1. subscribe to websocket
    this.messages  = <Subject<Message>>this.wsService
      .connect(DATA_URL)
      .map((response: MessageEvent): Message => {
        console.log(response);
        let data = JSON.parse(response.data);
        console.log(data);
      /!*  return {
          statements : data
        //  statements: data.statements
        }*!/
      return data;
      });
  }*/
} // end class GraphService
