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
  private _linkSource = new Subject<any>();
  private  masterLinkMap: Map<string, Link> = new Map();
private clickedLinkList: Link[] = [];
private hoveredLinkList: Link[] = [];
  //  Observable navItem stream
  links = {
    clicked: this.clickedLinkList,
    hovered: this.hoveredLinkList,
  };

  clickedlink$ = this._clickedLinkSource.asObservable();
  hoveredlink$ = this._hoveredLinkSource.asObservable();
  linkslist$ = this._linkSource.asObservable();

  //  service command
  clickedLinks(link: Link) {
    this.clickedLinkList.push(link);
    console.log(this.clickedLinkList);
    console.log(this.links);
    this._clickedLinkSource.next(this.links);
    this._linkSource.next(this.links);
  }

  hoveredLink(link: any) {
    this.hoveredLinkList= [link];
    console.log(this.links);
    this._hoveredLinkSource.next(link);
    this._linkSource.next(this.links);

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
