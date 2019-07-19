import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import {environment} from "../../environments/environment";


const DATA_URL = environment.DATA_URL;


@Injectable({
  providedIn: 'root'
})
export class DataConnectionService {
  subject;
  responses: WebSocketSubject<any>;

  public messages: Subject<any> = new Subject<any>();

  constructor() {
    this.responses = webSocket(DATA_URL);

    this.responses.subscribe(
      msg => msg, // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );

    this.messages.subscribe(message => {
      this.responses.next(message)})
  }
} //  end class DataService
