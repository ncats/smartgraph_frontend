/**
 * Created by sheilstk on 6/23/17.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {DataService} from "./data.service";


@Injectable()
export class SearchService {


  constructor(private dataService : DataService) { }
  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term) {
    console.log(term);
    return term;
/*    return this.http
      .get(this.baseUrl + this.queryUrl + term)
      .map(res => res.json());*/
  }

}
