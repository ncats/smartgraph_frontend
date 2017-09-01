import {Component, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";
import {Subject} from "rxjs";
import {DataConnectionService} from "../services/data-connection.service";
import {SearchService} from "../services/search.service";
import {Message, MessageService} from "../services/message.service";
import { GraphDataService} from "../services/graph-data.service";



@Component({
  selector: 'smrtgraph-search',
  templateUrl: './smrtgraph-search.component.html',
  styleUrls: ['./smrtgraph-search.component.css']
})
export class SmrtgraphSearchComponent implements OnInit {
  startNodesCtrl: FormControl;
  endNodesCtrl: FormControl;

  searchTerm$ = new Subject<any>();
  autocompleteOptions:any[] = [];
  lychiAutocompleteOptions:any[] = [];
  startNodes: boolean = false;
  endNodes: boolean = false;

  constructor(
    private searchService:SearchService,
    private messageService: MessageService,
    private dataConnectionService: DataConnectionService,
    private graphDataService: GraphDataService
  ) {
    this.startNodesCtrl = new FormControl();
    this.endNodesCtrl = new FormControl();
  }

  ngOnInit() {
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

    this.startNodesCtrl.valueChanges.subscribe(value => {
      console.log(value.split(/[\s,;]+/));
      let valArr =value.split(/[\s,;]+/);
      if(!this.endNodes) {
        this.graphDataService.clearGraph();
      }
      let query: Message = this.messageService.getMessage(valArr, 'targets');
        console.log(query);
        this.dataConnectionService.messages.next(query);
      this.startNodes = true;
      //forces selected option
      //todo: this doesn't seem very efficient
/*      if(value.value){
        console.log(value.value);
        console.log("element clicked");
        this.onEnter("target");
      }else {
        if (value != '') {
          //empty autocomplete options array, otherwise it will never change
          this.autocompleteOptions = [];
          this.searchTerm$.next({term: value, type: "targetSearch"});
        }
      }*/
    //  this.onEnter("target");

    });

    this.endNodesCtrl.valueChanges.subscribe(value => {
      console.log(value.split(/[\s,;]+/));
      let valArr =value.split(/[\s,;]+/);
      if(!this.startNodes) {
        this.graphDataService.clearGraph();
      }
      let query: Message = this.messageService.getMessage(valArr, 'targets');
        console.log(query);
        this.dataConnectionService.messages.next(query);
      this.endNodes = true;
    });

   /* this.patternCtrl.valueChanges.subscribe(value => {
      console.log([value]);
      //forces selected option
      //todo: this doesn't seem very efficient
      if(value.value){
        this.onEnter("lychi");
      }else {
        if (value != '') {
          //empty autocomplete options array, otherwise it will never change
          //this.lychiAutocompleteOptions = [];

          // this.searchTerm$.next({term: value.replace(/\(/gi, "\\(").replace(/\)/gi, "\\)").replace(/\[/gi, "\\[").replace(/\]/gi, "\\]"), type: "patternSearch"});
        //  this.searchTerm$.next({term: value, type: "lychiSearch"});
        }
      }
    });*/

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



 /* onEnter(type: string) {
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
  //  this.dataConnectionService.messages.next(query);
  }*/

  shortestPath(){
    if(this.startNodesCtrl && this.endNodesCtrl){
      let value = {
        start:this.startNodesCtrl.value.split(/[\s,;]+/),
        end: this.endNodesCtrl.value.split(/[\s,;]+/)
      };
      console.log(value);
      this.graphDataService.clearGraph();
      let query: Message = this.messageService.getMessage(value, "path");
      console.log(query);
      this.dataConnectionService.messages.next(query);
    }
  }
}
