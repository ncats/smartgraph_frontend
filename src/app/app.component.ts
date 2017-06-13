import { Component } from '@angular/core';
import APP_CONFIG from './app.config';
import { Node, Link } from './d3';
import {Message, GraphService} from "./graph.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
/*  nodes: Node[] = [];
  links: Link[] = [];*/

  constructor(
 //   private graphService : GraphService
  ) {

 /*   this.graphService.messages.subscribe(msg => {
      console.log(JSON.parse(msg)._fields[0]);
      var start = new Node(this.nodes.length, JSON.parse(msg)._fields[0].start);
      start.linkCount++;
      this.nodes.push(start);
      var end = new Node(this.nodes.length, JSON.parse(msg)._fields[0].end);
      end.linkCount++;
      this.nodes.push(end);
      var link = new Link(start, end);
  //    this.nodes.push(new Node( JSON.parse(msg)._fields[0].end.labels[0]));
      this.links.push(link);
      console.log(this.nodes);
      console.log(this.links);
    });
*/
    const N = APP_CONFIG.N,
      getIndex = number => number - 1;

  /*  /!** constructing the nodes array *!/
    for (let i = 1; i <= N; i++) {
      this.nodes.push(new Node(i));
    }

    for (let i = 1; i <= N; i++) {
      for (let m = 2; i * m <= N; m++) {
        /!** increasing connections toll on connecting nodes *!/
      //  this.nodes[getIndex(i)].linkCount++;
      //  this.nodes[getIndex(i * m)].linkCount++;

        /!** connecting the nodes before starting the simulation *!/
        this.links.push(new Link(i, i * m));
      }
    }*/
  }
}
