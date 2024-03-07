import { Injectable, OnInit } from '@angular/core';
import {Observable, Subject, Observer} from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private subject: Subject<MessageEvent>;
  session: any;

  public connect(url: string): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Connected.');
    }
    return this.subject;
  }

  private create(url: string): Subject<MessageEvent> {
    const ws = new WebSocket(url);

    const observable = Observable.create(
      (obs: Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror   = obs.error.bind(obs);
        ws.onclose   = obs.complete.bind(obs);
        return ws.close.bind(ws);
      });

    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };

    return Subject.create(observer, observable);
  }
} //  end class WebSocketService

