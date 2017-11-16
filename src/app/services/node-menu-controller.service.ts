import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class NodeMenuControllerService {
  private _clickedMenuSource = new Subject<any>();
  // Observable navItem stream
  clickedmenu$ = this._clickedMenuSource.asObservable();

  // service command
  toggleVisible(force) {
    console.log(force);
      this._clickedMenuSource.next(force);
  }
}

