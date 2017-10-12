import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {WebSocketService} from './websocket.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {Observable} from "rxjs";

const DATA_URL = 'ws://localhost:1337';

@Injectable()
export class DataConnectionService {
  public messages: Subject<any> = new Subject<any>();

  constructor(private wsService: WebSocketService) {

    // subscribe to websocket
    this.messages  = <Subject<any>>this.wsService
      .connect(DATA_URL)
      .map((response: MessageEvent): string => {
      return response.data;
      })
      .catch(error => {
        console.error(error);
        return Observable.empty();
      })
     .share();
  }
} // end class DataService
