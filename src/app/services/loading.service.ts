import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class LoadingService {
  private _loadingSource = new Subject<any>();
  //  Observable navItem stream
  loading$ = this._loadingSource.asObservable();

  constructor() { }

  toggleVisible(force) {
    this._loadingSource.next(force);
  }
}


