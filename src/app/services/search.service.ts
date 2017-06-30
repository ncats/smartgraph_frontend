/**
 * Created by sheilstk on 6/23/17.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {Message, MessageService} from "./message.service";


@Injectable()
export class SearchService {


  constructor(
    private messageService: MessageService
  ) {
  }
  search(terms: Observable<any>) {
    return terms.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term) {
    let query: Message = this.messageService.getMessage(term.term, term.type);
    return Observable.of(query);
  }

}



