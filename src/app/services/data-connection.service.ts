import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {WebSocketService} from './websocket.service';
import {Observable} from "rxjs/Observable";
import {map, catchError, share} from "rxjs/operators";

const DATA_URL = 'ws://localhost:1337';

@Injectable()
export class DataConnectionService {
  public messages: Subject<any> = new Subject<any>();
  private messagesEmitter: any;
  constructor(private wsService: WebSocketService) {

    // subscribe to websocket
    this.messagesEmitter  = <Subject<any>>this.wsService
      .connect(DATA_URL).pipe(
      map((response: MessageEvent): string => response.data),
    catchError(error => Observable.empty())
      );

    this.messages = this.messagesEmitter.pipe(
      share()
    )
  }
} // end class DataService
