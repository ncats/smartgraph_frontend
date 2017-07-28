import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {WebSocketService} from './websocket.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

const DATA_URL = 'ws://localhost:1337';

@Injectable()
export class DataService {
  public messages: Subject<any> = new Subject<any>();

  constructor(private wsService: WebSocketService) {

    // subscribe to websocket
    this.messages  = <Subject<any>>this.wsService
      .connect(DATA_URL)
      .map((response: MessageEvent): string => {
      return response.data;
      }).share();
  }
} // end class DataService
