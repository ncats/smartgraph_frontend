import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Node} from '../d3/models/node';


@Injectable()
export class NodeMenuControllerService {
  private _clickedMenuSource = new Subject<any>();
  //  Observable navItem stream
  clickedmenu$ = this._clickedMenuSource.asObservable();
  private _activeMenu: string;

  //  service command
  toggleVisible(node: string) {
    if(this._activeMenu && this._activeMenu === node){
      this.hideMenus();
    }else{
      this._activeMenu = node;
      this.showMenu();
    }
  }

  showMenu():void{
    this._clickedMenuSource.next(true);
  }

  hideMenus():void{
    this._clickedMenuSource.next(false);
  }

  getNode():string{
    return this._activeMenu;
  }
}

