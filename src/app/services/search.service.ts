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
import {Subject} from "rxjs";
import {DataService} from "./data.service";
import {Message, MessageService} from "./message.service";


@Injectable()
export class SearchService {


  constructor(
    private dataService : DataService,
    private messageService: MessageService
  ) {
  }
  search(terms: Observable<any>) {
    return terms.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term) {
    console.log("service search");
    console.log(term);
    let query: Message = this.messageService.getMessage(term.term, term.type);
    console.log(query);
    return Observable.of(query);
  }

}



