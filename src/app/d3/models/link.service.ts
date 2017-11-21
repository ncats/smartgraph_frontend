/**
 * Created by sheilstk on 6/16/17.
 */
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Link} from './link';

@Injectable()
export class LinkService {
  //  Observable navItem source
  private _clickedLinkSource = new Subject<Link>();
  private _hoveredLinkSource = new Subject<any>();
  private  masterLinkMap: Map<string, Link> = new Map();

  //  Observable navItem stream
  lastLink = {};
  clickedlink$ = this._clickedLinkSource.asObservable();
  hoveredlink$ = this._hoveredLinkSource.asObservable();

  //  service command
  changeLink(link: Link) {
    this._clickedLinkSource.next(link);
  }

  hoveredLink(link: any) {
    this._hoveredLinkSource.next(link);

  }

  getLinks(): Map<string, Link> {
    return this.masterLinkMap;
  }

  getById(id): Link {
    return this.masterLinkMap.get(id);
  }

  setLink(link: Link): void {
    this.masterLinkMap.set(link.uuid, link);
  }

  // searches to see if a link exists. if it does, it returns the link with the sent data merged,
  // if it doesn't exist, it makes a new link with the data
  makeLink(id: string, source?: any, target?: any, data?: any): Link {
    let l: Link = this.masterLinkMap.get(id);
    if (!l) {
      l = new Link(source, target, data);
    }
    return l;
  }






}
