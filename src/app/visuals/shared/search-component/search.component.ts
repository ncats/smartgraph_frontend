import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {finalize, tap} from "rxjs/operators";
import {Compound, Node, Pattern, Target} from "../../../d3/models/node";
import {GraphDataService} from "../../../services/graph-data.service";

@Component({
  selector: 'search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
@Output()
  public selected: EventEmitter<Node> = new EventEmitter();
  searchForm: FormGroup;
  options: any;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private graphDataService: GraphDataService
  ) {  }


  /**
   *add placeholder string if required
   * set up subscription for input value changes
   * // todo: should unsubscribe
   */
  ngOnInit() {
    this.searchForm = this.fb.group({
      typeaheadInput: null
    });

    this.searchForm
      .get('typeaheadInput')
      .valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.isLoading = true),
        switchMap(term => {
          console.log(term);
          return this.graphDataService.searchNodes(term.genes ? term.genes : term)
              .pipe(
                finalize(() => this.isLoading = false),
              )
          }
        ))
      .subscribe(res => {
        this.options = res;
      });
  }

  displayFn(node?: Target): string | undefined {
    return node ? node.genes : undefined;
  }


  search() {
    this.selected.emit(this.searchForm.get('typeaheadInput').value);
  }
}
