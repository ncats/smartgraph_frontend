import 'reflect-metadata';
import {Node, Link} from '../../app/d3';
import * as TextEncoder from 'text-encoding'

let nodes: Node[] = [];
let links: Link[] = [];
let nodeMap: Map<string, Node> = new Map();
let linkMap: Map<string, Link> = new Map();
let decoder = new TextDecoder();
let encoder = new TextEncoder.TextEncoder();

//searches to see if a node exists. if it does, it returns the node with the sent data merged, if it doesn't exist, it makes a new node with the data

function makeNode(id: string, data: any) : Node{
  return nodeMap.get(id) ? Object.assign(nodeMap.get(id), data) : new Node(id, data, data.labels);
}

export function workerProcessor( event: any, done: Function ) {
  console.log(event.data);
 let data =  JSON.parse(decoder.decode(event.data))._fields;
  console.log(data);
  for (let r of data) {
    //r.start and r.end are the nodes if an object is a relationship -- this saves them as nodes
    if(r.start && r.start.identity){
      nodeMap.set(r.start.identity.low, makeNode(r.start.identity.low, r.start));
    }
    if(r.end && r.end.identity){
      nodeMap.set(r.end.identity.low, makeNode(r.end.identity.low, r.end));
    }
    //this covers the relationship itself, and creates the link object
    if (r.segments) {
      for (let l of r.segments) {
        //make link
        let start = makeNode(r.start.identity.low, r.start);
        let end = makeNode(r.end.identity.low, r.end);
        start.linkCount++;
        end.linkCount++;
        //todo make sure link doesn't already exist
        let id = start.id.toString().concat(end.id.toString());
        let newLink = linkMap.get(id);
        if(newLink){
          if(newLink.id == id){
            console.error("they're the same!");
            console.log(newLink.type);
            console.log(r.type);
          }
        }else{
          newLink = new Link(start.id, end.id, r.type, r.properties, id);
        }
        links.push(new Link(start.id, end.id, l.relationship.type, l.properties , id));
        // this.updateLink(id, l.relationship.type, l.properties);
        nodeMap.set(r.start.identity.low, start);
        nodeMap.set(r.end.identity.low, end);
      }
    } else {
      //this covers nodes from a nearest neighbor search
      if(!r.start && !r.end) {
        nodeMap.set(r.identity.low, makeNode(r.identity.low, r));
      }else{
        //this makes the links from a nearest node search
        //nodes listed in these links don't have the identity property
        //once the graph has uuids, this will be much easier
        //todo: look into return search type from api
        let start = makeNode(r.start.low, r);
        //this will result in properties being lost
        let end = makeNode(r.end.low, r);
        start.linkCount++;
        end.linkCount++;
        //todo make sure link doesn't already exist
        let id = start.id.toString().concat(end.id.toString());
        let newLink = linkMap.get(id);
        if(newLink){
          if(newLink.id == id){
            //      console.error("they're the same!");
            //      console.log(newLink.type);
            //     console.log(r.type);
          }
        }else{
          newLink = new Link(start.id, end.id, r.type, r.properties, id);
          linkMap.set(id, new Link(start.id, end.id, r.type, r.properties, id));
        }
        //  this.linkMap.set(id, );
        // console.log(id);
        links.push(new Link(start.id, end.id, r.type, r.properties, id));
        nodeMap.set(r.start.low, start);
        nodeMap.set(r.end.low, end);
      }
    }
  }
  nodes = [...nodeMap.values()];

  /*


   console.log('Web Worker TWO: Message received from main script');
   console.log('Web Worker TWO: Posting message back to main script');

   _.each(data, ( item ) => {
   const workerResult: string = 'Result: ' + event.data + ' iteration ' + item + ' with imported lodash.';
   done(this.nodes);*/
  //});
  console.log(nodes);
  let bytes = encoder.encode(JSON.stringify({nodes: nodes, links:links}));

  done(bytes);
}

