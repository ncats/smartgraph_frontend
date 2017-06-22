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
  nodeMap: Map<string, Node> = new Map();
  linkMap: Map<string, Link> = new Map();
  subscription: Subscription;
  clickedNode: Node;
  constructor(
    private graphService : GraphService,
    private nodeService : NodeService
  ) {
    this.graphService.messages.subscribe(msg => {

      //map - get - update - set


    //  console.log(msg);
      let records = JSON.parse(msg)._fields;
    //  console.log(records);
      for (let r of records) {
        //r.start and r.end are the nodes if an object is a relationship -- this saves them as nodes
        if(r.start && r.start.identity){
          this.nodeMap.set(r.start.identity.low, this.makeNode(r.start.identity.low, r.start));
        }
        if(r.end && r.end.identity){
          this.nodeMap.set(r.end.identity.low, this.makeNode(r.end.identity.low, r.end));
        }
        //this covers the relationship itself, and creates the link object
        if (r.segments) {
          for (let l of r.segments) {
            //make link
          let start = this.makeNode(r.start.identity.low, r.start);
           let end = this.makeNode(r.end.identity.low, r.end);
            start.linkCount++;
            end.linkCount++;
          //  this.nodes.
            //todo make sure link doesn't already exist
            let id = start.id.toString().concat(end.id.toString());
            let newLink = this.linkMap.get(id);
            if(newLink){
              if(newLink.id == id){
                console.error("they're the same!");
                console.log(newLink.type);
                console.log(r.type);
              }
            }else{
              newLink = new Link(start.id, end.id, r.type, r.properties, id);
            }
            this.links.push(new Link(start.id, end.id, l.relationship.type, l.properties , id));
           // this.updateLink(id, l.relationship.type, l.properties);
            this.nodeMap.set(r.start.identity.low, start);
            this.nodeMap.set(r.end.identity.low, end);
          }
        } else {
          //this covers nodes from a nearest neighbor search
          if(!r.start && !r.end) {
            this.nodeMap.set(r.identity.low, this.makeNode(r.identity.low, r));
          }else{
            //this makes the links from a nearest node search
            //nodes listed in these links don't have the identity property
            //once the graph has uuids, this will be much easier
            //todo: look into return search type from api
            let start = this.makeNode(r.start.low, r);
            //this will result in properties being lost
            let end = this.makeNode(r.end.low, r);
            start.linkCount++;
            end.linkCount++;
            //todo make sure link doesn't already exist
            let id = start.id.toString().concat(end.id.toString());
            let newLink = this.linkMap.get(id);
            if(newLink){
             if(newLink.id == id){
               console.error("they're the same!");
               console.log(newLink.type);
               console.log(r.type);
             }
            }else{
              newLink = new Link(start.id, end.id, r.type, r.properties, id);
            }
          //  this.linkMap.set(id, );
           // console.log(id);
            this.links.push(new Link(start.id, end.id, r.type, r.properties, id));
            this.nodeMap.set(r.start.low, start);
            this.nodeMap.set(r.end.low, end);
          }
        }



      /*  this.nodes = this.nodes
          .filter((node, index, self) => self.findIndex((t) => {
          return t.id === node.id
        }) === index)
          .sort((a,b) => {return b.linkCount - a.linkCount});*/
      }
      this.nodes = [...this.nodeMap.values()];
    });
  }

  /*this.graphService.messages.subscribe(msg => {
      console.log(msg);
      let records = JSON.parse(msg)._fields;
      console.log(records);
      for (let r of records) {
        //r.start and r.end are the nodes if an object is a relationship -- this saves them as nodes
        if(r.start && r.start.identity){
          this.nodes.push(this.makeNode(r.start.identity.low, r.start));
        }
        if(r.end && r.end.identity){
          this.nodes.push(this.makeNode(r.end.identity.low, r.end));
        }
        //this covers the relationship itself, and creates the link object
        if (r.segments) {
          for (let l of r.segments) {
            //make link
            //grab nodes out of the nodes list
            let start = this.makeNode(r.start.identity.low, r.start);
            let end = this.makeNode(r.end.identity.low, r.end);
            start.linkCount++;
            end.linkCount++;
          //  this.nodes.
            //todo make sure link doesn't already exist
            this.links.push(new Link(start.id, end.id, l.relationship.type, l.properties));
          }
        } else {
          //this covers nodes from a nearest neighbor search
          if(!r.start && !r.end) {
            var n = this.makeNode(r.identity.low, r);
            this.nodes.push(n);
          }else{
            //this makes the links from a nearest node search
            //nodes listed in these links don't have the identity property
            //once the graph has uuids, this will be much easier
            //todo: look into return search type from api
            let start = this.makeNode(r.start.low, r);
            //this will result in properties being lost
            let end = this.makeNode(r.end.low, r);
            start.linkCount++;
            end.linkCount++;
            //todo make sure link doesn't already exist
            this.links.push(new Link(start.id, end.id, r.type, r.properties));
          }
        }



        //TODO will not draw correctly without doing this
//        console.log(Object.assign({}, this.nodes));
        let cloned = this.nodes.map(x => Object.assign({}, x));
console.log(cloned);
        this.nodes = this.nodes
          .filter((node, index, self) => self.findIndex((t) => {
          return t.id === node.id
        }) === index)
          .sort((a,b) => {return b.linkCount - a.linkCount});
        let cloned2 = this.nodes.map(x => Object.assign({}, x));
        console.log(cloned2);
      }
    });
  }

  */
  //searches to see if a node exists. if it does, it returns the node with the sent data merged, if it doesn't exist, it makes a new node with the data
  makeNode(id: string, data: any) : Node{
    //todo: if a node has nested properties like a start or end node, these are also merged, as is identity
    //return this.findId(id) ? Object.assign(this.findId(id), data) : new Node(id, data, data.labels);
    return this.nodeMap.get(id) ? Object.assign(this.nodeMap.get(id), data) : new Node(id, data, data.labels);
  }

  //searches to see if a node exists. if it does, it returns the node with the sent data merged, if it doesn't exist, it makes a new node with the data
  updateNode(id: string, data: any) :Node {
    return this.nodeMap.get(id) ? Object.assign(this.nodeMap.get(id), data) : new Node(id, data, data.labels);
  }

  //searches to see if a link exists. if it does, it returns the link with the sent data merged, if it doesn't exist, it makes a new link with the data
  updateLink(id: string, type: any, properties: any) {
  //  return this.linkMap.get(id) ? Object.assign(this.linkMap.get(id), data) : new Link(id, data, data.labels);
  }

  ngOnInit() {
    this.subscription = this.nodeService.node$
      .subscribe(node => {
        console.log("changes to t othe graph");
        this.clickedNode = node;
        let message = this.extractFields();
       // console.log(this.clickedNode);
        console.log(JSON.stringify(message));
        this.graphService.messages.next(node.id);
      });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

  extractFields(){
    //return    'MATCH (n {lychi: \'111J98B1B-B3C9ZWZR7T-BTP3PUK1NGR-BTRUZSDGKSKT\'})-[r*2]-() RETURN r';
   // return    'MATCH (n {pref_name: \'Dihydrofolate reductase\'})-[r*2]-() RETURN r';Message
    return 'MATCH (n) WHERE id (n) = 0 MATCH (n)-[r]-(b) RETURN n, r, b'
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

  onKey(term: string){
    console.log(term);

  }

  onEnter(term: string){
    console.log(term);

  }

  pushIt(){
  //  this.graphService.messages.next('MATCH (n {lychi: \'111J98B1B-B3C9ZWZR7T-BTP3PUK1NGR-BTRUZSDGKSKT\'})-[r*2]-() RETURN r');
  }
}
