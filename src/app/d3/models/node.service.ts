/**
 * Created by sheilstk on 6/16/17.
 */
import {Injectable}      from '@angular/core'
import {Node} from "./node";
import {Compound} from "./node";
import {Target} from "./node";
import {Pattern} from "./node";

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

  clearNode():void{
  this._hoveredNodeSource.next();
}

  getNodes():Map<string, Node>{
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
      if(data.labels){
      switch(data.labels[0]){
        case "Compound":{
          n = new Compound(id, data);
          break;
        }
        case "Target":{
          n = new Target(id, data);
          break;
        }
        case "Pattern":{
          n = new Pattern(id, data);
          break;
        }
        default:
          n = new Node(id, data);
      }
    }else{
        n = new Node(id, data);
      }
    }
    return n;
    //return this.masterNodeMap.get(id) ? this.masterNodeMap.get(id) : new Node(id, data);
  }






}
