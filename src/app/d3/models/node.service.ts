/**
 * Created by sheilstk on 6/16/17.
 */
import {Injectable}      from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Node} from './';
import {Subject} from "rxjs";

@Injectable()
export class NodeService {
  // Observable navItem source
  private _clickedNodeSource = new Subject<Node>();
  private _hoveredNodeSource = new Subject<Node>();
  private  masterNodeMap:Map<string, Node> = new Map();

  // Observable navItem stream
  lastNode = {};
  clickednode$ = this._clickedNodeSource.asObservable();
  hoverednode$ = this._hoveredNodeSource.asObservable();

  // service command
  changeNode(node:Node) {
    this._clickedNodeSource.next(node);
  }

  hoveredNode(node:Node){
    this._hoveredNodeSource.next(node);

  }

  getNodes():Map<string, Node>{
    return this.masterNodeMap;
  }

  setNode(node:Node):void{
   this.masterNodeMap.set(node.id,node);
  }

  //searches to see if a node exists. if it does, it returns the node with the sent data merged, if it doesn't exist, it makes a new node with the data
  makeNode(id:string, data:any):Node {
    return this.masterNodeMap.get(id) ? Object.assign(this.masterNodeMap.get(id), data) : new Node(id, data);
  }






}
