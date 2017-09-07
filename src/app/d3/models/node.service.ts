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
}
