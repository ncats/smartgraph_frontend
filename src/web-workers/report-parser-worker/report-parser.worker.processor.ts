import 'reflect-metadata';
import {Node, Link} from '../../app/d3';
import * as TextEncoder from 'text-encoding'

let nodes: Node[] = [];
let links: Link[] = [];
let nodeMap: Map<string, Node> = new Map();
let linkMap: Map<string, Link> = new Map();
let decoder = new TextDecoder();
let encoder = new TextEncoder.TextEncoder();

//this webworker receives a string from the database, creates the object

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
    if (r.start && r.start.identity) {
      this.nodeMap.set(r.start.identity.low, this.makeNode(r.start.identity.low, r.start));
    }
    if (r.end && r.end.identity) {
      this.nodeMap.set(r.end.identity.low, this.makeNode(r.end.identity.low, r.end));
    }
    //this covers the relationship itself, and creates the link object
    if (r.segments) {
      for (let l of r.segments) {
        //make link
        let start = this.makeNode(l.start.identity.low, l.start);
        let end = this.makeNode(l.end.identity.low, l.end);
        start.linkCount++;
        end.linkCount++;
        //  this.nodes.
        //todo make sure link doesn't already exist
        let id = start.id.toString().concat(end.id.toString());
        let newLink = this.linkMap.get(id);
        if (newLink) {
          if (newLink.id == id) {
            console.error("they're the same!");
            console.log(newLink.type);
            console.log(r.type);
          }
        } else {
          newLink = new Link(start.id, end.id, l.relationship.type, l.properties, id);
          this.linkMap.set(id, newLink);
        }
        this.nodeMap.set(l.start.identity.low, start);
        this.nodeMap.set(l.end.identity.low, end);
      }
    } else {
      //this covers nodes from a nearest neighbor search
      if (!r.start && !r.end) {
        this.nodeMap.set(r.identity.low, this.makeNode(r.identity.low, r));
      } else {
        //this makes the links from a nearest node search
        //once the graph has uuids, this will be much easier
        let start = this.makeNode(r.start.low, {});
        let end = this.makeNode(r.end.low, {});
        start.linkCount++;
        end.linkCount++;
        //todo make sure link doesn't already exist
        let id = start.id.toString().concat(end.id.toString());
        let newLink = this.linkMap.get(id);
        if (newLink) {
          if (newLink.id == id) {
            //      console.error("they're the same!");
            //      console.log(newLink.type);
            //     console.log(r.type);
          }
        } else {
          newLink = new Link(start.id, end.id, r.type, r.properties, id);
          this.linkMap.set(id, newLink);
        }
        this.nodeMap.set(r.start.low, start);
        this.nodeMap.set(r.end.low, end);
      }
    }
  }
    let newNodes = [...this.nodeMap.values()].sort((n1, n2) => {
      if (n1.linkCount > n2.linkCount) {
        return 1;
      }
      if (n1.linkCount < n2.linkCount) {
        return -1;
      }

      return 0;
    });
    let newLinks = [...this.linkMap.values()];

  console.log(nodes);
  let bytes = encoder.encode(JSON.stringify({nodes: newNodes, links:newLinks}));

  done(bytes);
}

