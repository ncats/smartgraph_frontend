/**
 * Created by sheilstk on 6/16/17.
 */
import {Injectable}      from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Node} from "./node";

import {Subject} from "rxjs";

@Injectable()
export class NodeService {
  // Observable navItem source
  private _clickedNodeSource = new Subject<Node>();
  private _hoveredNodeSource = new Subject<any>();
  private  masterNodeMap:Map<string, Node> = new Map();

  // Observable navItem stream
  lastNode = {};
  clickednode$ = this._clickedNodeSource.asObservable();
  hoverednode$ = this._hoveredNodeSource.asObservable();

  // service command
  changeNode(node:Node) {
    this._clickedNodeSource.next(node);
  }

  hoveredNode(node:any){
    this._hoveredNodeSource.next(node);

  }

  getNodes():Map<string, Node>{
    console.log(this.masterNodeMap.size);
    return this.masterNodeMap;
  }

  getById(id): Node{
    return this.masterNodeMap.get(id);
  }

  setNode(node:Node):void{
   this.masterNodeMap.set(node.uuid, node);
  }

  //searches to see if a node exists. if it does, it returns the node, if it doesn't exist, it makes a new node with the data
  makeNode(id:string, data:any):Node {
    let n:Node = this.masterNodeMap.get(id);
    if(!n){
      n = new Node(id, data);
    }
    return n;
    //return this.masterNodeMap.get(id) ? this.masterNodeMap.get(id) : new Node(id, data);
  }






}
