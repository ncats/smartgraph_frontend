import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import APP_CONFIG from './app.config';
import {Node} from './d3/models/node';
import {Link} from './d3/models/link';
import {NodeService} from './d3/models/node.service';
import {DataConnectionService} from "./services/data-connection.service";
import {Subscription} from 'rxjs/Subscription';
import {SearchService} from "./services/search.service";
import {Message, MessageService} from "./services/message.service";

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import {Subject} from "rxjs";
import { GraphDataService} from "./services/graph-data.service";
import {LoadingService} from "./services/loading.service";
import {SettingsService} from "./services/settings.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})

export class AppComponent {
  targetCtrl: FormControl;
  patternCtrl: FormControl;
  title = 'smrtgraph';
  nodes:Node[] = [];
  links:Link[] = [];
  loading: boolean = true;

  searchTerm$ = new Subject<any>();
  subscription:Subscription;
  clickedNode:Node;
  autocompleteOptions:any[] = [];
  compoundAutocompleteOptions:any[] = [];
  targetSelected: boolean = false;
  patternSelected: boolean = false;

  @ViewChild('settingsToggle') public settingsToggle;

  constructor(
    private dataConnectionService:DataConnectionService,
    private nodeService:NodeService,
    private searchService:SearchService,
    private messageService: MessageService,
    private graphDataService: GraphDataService,
    private loadingService : LoadingService,
    public settingsService: SettingsService
  ) {
    this.targetCtrl = new FormControl();
    this.patternCtrl = new FormControl();
  /*
  *  this is the main subscription pipeline that reads the websocket data
  *  all data comes through here, and must be passed on based on the response type
   */

  //todo: fix above description
    //todo: set all subscriptions to be variable to close on destroy
    this.dataConnectionService.messages.subscribe(msg => {
      //console.log(msg);
      let response = JSON.parse(msg);
     // console.log(response);
      switch (response.type) {

        case "targetSearch": {
          this.autocompleteOptions.push(response.data);
          break;
        }
        case "compoundSearch": {
          this.compoundAutocompleteOptions.push(response.data);
          break;
        }
        case "counts": {
          break;
        }

      }
    });

    this.subscription = this.loadingService.loading$.subscribe(res => this.loading = res);

    /*
    * This provides an interface to handle the mapping of search input
    * it retrieves a query object from the service, returning the most recent input
    * this query is then passed on to the main data service
    * */
    this.searchService.search(this.searchTerm$)
      .subscribe(results => {
        //empty autocomplete options array, otherwise it will never change
        this.autocompleteOptions=[];
        this.compoundAutocompleteOptions=[];
        console.log(results);
        this.dataConnectionService.messages.next(results);
      });
  }
  ngOnInit() {
    this.targetCtrl.valueChanges.subscribe(value => {
      //forces selected option
      //todo: this doesn't seem very efficient
      if(value.value){
        console.log("element clicked");
        this.onEnter("target");
      }else {
        if (value != '') {
          //empty autocomplete options array, otherwise it will never change
          this.autocompleteOptions = [];
          this.searchTerm$.next({term: value, type: "targetSearch"});
        }
      }
    });

    this.patternCtrl.valueChanges.subscribe(value => {
      console.log(value);
      //forces selected option
      //todo: this doesn't seem very efficient
      if(value.value){
        this.onEnter("compound");
      }else {
        if (value != '') {
          //empty autocomplete options array, otherwise it will never change
          //this.compoundAutocompleteOptions = [];

         // this.searchTerm$.next({term: value.replace(/\(/gi, "\\(").replace(/\)/gi, "\\)").replace(/\[/gi, "\\[").replace(/\]/gi, "\\]"), type: "patternSearch"});
          this.searchTerm$.next({term: value, type: "compoundSearch"});
        }
      }
    });
  }

  ngAfterViewInit():void {
    this.settingsService.sidenav = this.settingsToggle;
  }


  onEnter(type: string) {
    let value: string;
    switch(type){
      case"target":{
        this.targetSelected = true;
        value = this.targetCtrl.value.value;
        break;
      }
      case"compound":{
        this.patternSelected = true;
        console.log(this.patternCtrl.value);
        value = this.patternCtrl.value.display;
        break;
      }
    }
    this.graphDataService.clearGraph();
    let query: Message = this.messageService.getMessage(value, type);
    console.log(query);
    this.dataConnectionService.messages.next(query);
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
   // this.subscription.unsubscribe();
  }
}
