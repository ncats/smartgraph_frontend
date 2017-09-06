import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import APP_CONFIG from './app.config';
import {Node, Link, NodeService} from './d3';
import {DataConnectionService} from "./services/data-connection.service";
import {Subscription} from 'rxjs/Subscription';
import {SearchService} from "./services/search.service";
import {WebWorkerService} from "./services/web-worker.service";
import {Message, MessageService} from "./services/message.service";

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import {Subject} from "rxjs";
import * as TextEncoder from 'text-encoding';
import { GraphDataService} from "./services/graph-data.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  targetCtrl: FormControl;
  patternCtrl: FormControl;
  title = 'smrtgraph';
  nodes:Node[] = [];
  links:Link[] = [];

  searchTerm$ = new Subject<any>();
  subscription:Subscription;
  clickedNode:Node;
  autocompleteOptions:any[] = [];
  lychiAutocompleteOptions:any[] = [];
  targetSelected: boolean = false;
  patternSelected: boolean = false;


  constructor(
    private dataConnectionService:DataConnectionService,
    private nodeService:NodeService,
    private searchService:SearchService,
    private messageService: MessageService,
    private graphDataService: GraphDataService
  ) {
    this.targetCtrl = new FormControl();
    this.patternCtrl = new FormControl();
    // let encoder = new TextEncoder.TextEncoder();
  //  let decoder = new TextDecoder();
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
        case "lychiSearch": {
          this.lychiAutocompleteOptions.push(response.data);
          break;
        }
        case "counts": {
          break;
        }

      }
    });

    //todo move this to the websocket return- a string is alread given, it needs to be sorted and an array returned that can be converted here into classed objects
    //using web workers is an interesting idea- to offload the parsing of the message, but it does not pass full objects, esp ones with methods back
    //the array buffer idea could be used straight from the websocket however to make a first pass at organizing the data
    //the returned data can then be converted to Node or Link classes to have the built in scaling functions
    //also note that the link object seems to work better with Node classes, rather than Node ids
    /*    this.webWorkerService.reportParser.onmessage = (message) => {
     //todo: this kind of sucks --- see if it is any faster than the above version
     this.nodes = JSON.parse(decoder.decode(message.data)).nodes.map(item => new Node(item.id, item.properties, item.labels, item.linkCount));
     this.links = JSON.parse(decoder.decode(message.data)).links.map(item => new Link(item.source, item.target, item.properties));
     };*/

    /*
    * This provides an interface to handle the mapping of search input
    * it retrieves a query object from the service, returning the most recent input
    * this query is then passed on to the main data service
    * */
    this.searchService.search(this.searchTerm$)
      .subscribe(results => {
        //empty autocomplete options array, otherwise it will never change
        this.autocompleteOptions=[];
        this.lychiAutocompleteOptions=[];
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
        this.onEnter("lychi");
      }else {
        if (value != '') {
          //empty autocomplete options array, otherwise it will never change
          //this.lychiAutocompleteOptions = [];

         // this.searchTerm$.next({term: value.replace(/\(/gi, "\\(").replace(/\)/gi, "\\)").replace(/\[/gi, "\\[").replace(/\]/gi, "\\]"), type: "patternSearch"});
          this.searchTerm$.next({term: value, type: "lychiSearch"});
        }
      }
    });
  }




  onEnter(type: string) {
    let value: string;
    switch(type){
      case"target":{
        this.targetSelected = true;
        value = this.targetCtrl.value.value;
        break;
      }
      case"lychi":{
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
