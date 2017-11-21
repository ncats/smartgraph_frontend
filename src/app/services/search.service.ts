/**
 * Created by sheilstk on 6/23/17.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Message, MessageService} from './message.service';


@Injectable()
export class SearchService {


  constructor(
    private messageService: MessageService
  ) {
  }
  search(terms: Observable<any>) {
    return terms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    //   switchMap(term => this.searchEntries(term))
    );
  }

 /* searchEntries(term) {
    let query: Message = this.messageService.getMessage(term.term, term.type);
    return Observable.of(query);
  }*/

}



