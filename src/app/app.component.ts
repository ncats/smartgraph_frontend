import { Component } from '@angular/core';
import APP_CONFIG from './app.config';
import {Node, Link, NodeService} from './d3';
import {Message, DataService} from "./services/data.service";
import {Subscription} from 'rxjs/Subscription';
import {SearchService} from "./services/search.service";
import {Subject} from "rxjs";



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
  searchTerm$ = new Subject<string>();
  subscription: Subscription;
  clickedNode: Node;
  results: Object;
  constructor(
    private dataService : DataService,
    private nodeService : NodeService,
    private searchService : SearchService
  ) {
    this.dataService.messages.subscribe(msg => {
      let records = JSON.parse(msg)._fields;
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
              this.linkMap.set(id, new Link(start.id, end.id, r.type, r.properties, id));5
            }
          //  this.linkMap.set(id, );
           // console.log(id);
            this.links.push(new Link(start.id, end.id, r.type, r.properties, id));
            this.nodeMap.set(r.start.low, start);
            this.nodeMap.set(r.end.low, end);
          }
        }
      }
      this.nodes = [...this.nodeMap.values()];
    });

    this.searchService.search(this.searchTerm$)
      .subscribe(results => {
        console.log(results);
        this.results = results;
      });
  }

  //searches to see if a node exists. if it does, it returns the node with the sent data merged, if it doesn't exist, it makes a new node with the data
  makeNode(id: string, data: any) : Node{
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
        let message = this.createMessage("nodeclick", node.id);
        this.dataService.messages.next(message);
        //this.dataService.messages.next(node.id);
      });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

  createMessage(type: string, params: any) {
    let message:string;
switch(type){
  case "nodeclick": {
    message = 'MATCH (n) WHERE id (n) = {qParam} MATCH (n)-[r]-(b) RETURN n, r, b';
    break;
  }

  case "search": {
    message = 'MATCH (n) WHERE name (n) = {qParam} MATCH (n)-[r]-(b) RETURN n, r, b';
    break;
  }

  case "chembl": {
    message = 'MATCH (n:Target) WHERE n.chembl_id= {qParam} MATCH (n)-[r]-(b) RETURN n, r, b';
    break;
  }


}
//let ret:Message =};
return {message : message, params: {qParam: params}};
    //return    'MATCH (n {lychi: \'111J98B1B-B3C9ZWZR7T-BTP3PUK1NGR-BTRUZSDGKSKT\'})-[r*2]-() RETURN r';
   // return    'MATCH (n {pref_name: \'Dihydrofolate reductase\'})-[r*2]-() RETURN r';Message
  //  return 'MATCH (n) WHERE id (n) = 0 MATCH (n)-[r]-(b) RETURN n, r, b'
  }

  findId(id : string):Node {
    return this.nodes.find(x => x.id == id);
  }

  findIndex(id : string):Number {
    return this.nodes.findIndex(x => x.id == id);
  }

  getRandomInt(max:number):Number {
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
    this.searchTerm$.next(term);
  }

  onEnter(term: string){
    console.log(term);
    let message = this.createMessage("chembl", term);
    this.nodeMap.clear();
    this.links = [];
    this.nodes = [];
    this.dataService.messages.next(message);

  }

  pushIt(){
  //  this.dataService.messages.next('MATCH (n {lychi: \'111J98B1B-B3C9ZWZR7T-BTP3PUK1NGR-BTRUZSDGKSKT\'})-[r*2]-() RETURN r');
  }
}
