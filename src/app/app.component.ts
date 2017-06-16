import { Component } from '@angular/core';
import APP_CONFIG from './app.config';
import {Node, Link, NodeService} from './d3';
import {Message, GraphService} from "./graph.service";
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smrtgraph';
  nodes: Node[] = [];
  links: Link[] = [];
  subscription: Subscription;
  clickedNode: Node;
  constructor(
    private graphService : GraphService,
    private nodeService : NodeService
  ) {
    this.graphService.messages.subscribe(msg => {
      let record = JSON.parse(msg)._fields[0];
      console.log(record);
      let segments = record.segments;

      if(segments) {
        for (let l of segments) {
          var start: Node;
          //check to make sure the nodes don't already exist
          //TODO: probably pretty expensive operation
          let start = this.findId(l.start.identity.low);
          if (!start) {
            console.log("make new start thing");
            //make new node
            start = new Node(l.start.identity.low, l.start, l.labels);
            //start.linkCount++;
            this.nodes.push(start);
          }

          let end = this.findId(l.end.identity.low);
          console.log(end);
          if (!end) {
            console.log("make new end thing");
            end = new Node(l.end.identity.low, l.end, l.labels);
            //end.linkCount++;
            this.nodes.push(end);
          }


          /*   var end = new Node(l.end.identity.low, l.end);
           // end.linkCount++;
           this.nodes.push(end);*/

//remove duplicate nodes
          //TODO will not draw correctly without doing this
          this.nodes = this.nodes.filter((node, index, self) => self.findIndex((t) => {return t.id === node.id}) === index);
          //make link
          start.linkCount++;
          end.linkCount++;

      //    console.log(this.nodes);
          this.links.push(new Link(start, end, l.relationship.type, l.properties));
       //   console.log(this.links);
        }
      }else{
        var n = new Node(record.identity.low, record, record.labels);
        //this forces random scattering of unconnected nodes
      //  n.fx = this.getRandomInt(this.options.width - 100);
      //  n.fy = this.getRandomInt(this.options.height - 100);
        this.nodes.push(n);
      }

    });
  }

  ngOnInit() {
    this.subscription = this.nodeService.node$
      .subscribe(node => this.clickedNode = node);
    console.log(this.clickedNode);
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

  findId(id : string) {
    let ret:Node = this.nodes.find(x => x.id == id);
   // ret.linkCount++;
    return ret;
  }

  findIndex(id : string) {
    let ret:number = this.nodes.findIndex(x => x.id == id);
    return ret;
  }

  getRandomInt(max:number) {
  let min = 0;
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

  private _options: {width, height} = {width: 800, height: 600};

  get options() {
    return this._options;
  }

  pushIt(){
    this.graphService.messages.next('MATCH (n {lychi: \'111J98B1B-B3C9ZWZR7T-BTP3PUK1NGR-BTRUZSDGKSKT\'})-[r*2]-() RETURN r');
  }
}
