import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Message, GraphService} from "app/graph.service";
import { Node, Link } from 'app/d3';





@Injectable()
export class DataService {
  nodes: Node[] = [];
  links: Link[] = [];
  constructor(private graphService : GraphService
  ) {
    this.graphService.messages.subscribe(msg => {
      console.log(JSON.parse(msg));
      var start = new Node(this.nodes.length, JSON.parse(msg)._fields[0].start);
     // start.linkCount++;
      this.nodes.push(start);
      var end = new Node(this.nodes.length, JSON.parse(msg)._fields[0].end);
     // end.linkCount++;
      this.nodes.push(end);
      var link = new Link(start, end);
      //    this.nodes.push(new Node( JSON.parse(msg)._fields[0].end.labels[0]));
      this.links.push(link);
      console.log(this.nodes);
      console.log(this.links);
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
