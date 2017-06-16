/**
 * Created by sheilstk on 6/16/17.
 */
import {Injectable}      from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Node} from './';

@Injectable()
export class NodeService {
  // Observable navItem source
  private _navItemSource = new BehaviorSubject<Node>(new Node(5,{},''));
  // Observable navItem stream
  node$ = this._navItemSource.asObservable();
  // service command
  changeNode(node:Node) {
    console.log(node);
    this._navItemSource.next(node);
  }
}
