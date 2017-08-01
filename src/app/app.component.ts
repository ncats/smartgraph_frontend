import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import APP_CONFIG from './app.config';
import {Node, Target, Pattern, Lychi, Link, NodeService} from './d3';
import {DataService} from "./services/data.service";
import {Subscription} from 'rxjs/Subscription';
import {SearchService} from "./services/search.service";
import {WebWorkerService} from "./services/web-worker.service";
import {Message, MessageService} from "./services/message.service";

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import {Subject} from "rxjs";
import * as TextEncoder from 'text-encoding';
import {HistoryService} from "./services/history.service";


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
    private dataService:DataService,
    private nodeService:NodeService,
    private searchService:SearchService,
    private messageService: MessageService,
    private historyService: HistoryService
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
    this.dataService.messages.subscribe(msg => {
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
        default: {
          //  let bytes = encoder.encode(msg);
          // this.webWorkerService.reportParser.postMessage(bytes.buffer, [bytes.buffer]);
          let records = response.data._fields;
          if (records.length == 0) {
            console.error(response);
          } else {
            this.historyService.changeGraph(records, response.type);
          }
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
        this.dataService.messages.next(results);
      });
  }

  //searches to see if a link exists. if it does, it returns the link with the sent data merged, if it doesn't exist, it makes a new link with the data
  updateLink(id:string, type:any, properties:any) {
    //  return this.linkMap.get(id) ? Object.assign(this.linkMap.get(id), data) : new Link(id, data, data.labels);
  }

  ngOnInit() {
 /*   this.subscription = this.nodeService.clickednode$
      .subscribe(node => {
        this.clickedNode = node;
       // this.getSmiles(node);

      });*/

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
    this.historyService.clearGraph();
    let query: Message = this.messageService.getMessage(value, type);
    console.log(query);
    this.dataService.messages.next(query);
  }

  shortestPath(){
    if(this.targetCtrl && this.patternCtrl){
      let value = {
        target:this.targetCtrl.value,
        lychi: this.patternCtrl.value
      };
      console.log(value);
      this.historyService.clearGraph();
      let query: Message = this.messageService.getMessage(value, "path");
      console.log(query);
      this.dataService.messages.next(query);
    }
  }

  displayFn(opt: any): string {
    return opt ? opt.display : opt;
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
   // this.subscription.unsubscribe();
  }

  findId(id:string):Node {
    return this.nodes.find(x => x.id == id);
  }

  findIndex(id:string):Number {
    return this.nodes.findIndex(x => x.id == id);
  }
}
