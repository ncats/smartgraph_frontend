import {Component, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";
import {Subject} from "rxjs";
import {DataConnectionService} from "../services/data-connection.service";
import {SearchService} from "../services/search.service";
import {Message, MessageService} from "../services/message.service";
import { GraphDataService} from "../services/graph-data.service";
import {MdSliderChange} from "@angular/material";
import {NodeService} from "../d3/models/node.service";



@Component({
  selector: 'smrtgraph-search',
  templateUrl: './smrtgraph-search.component.html',
  styleUrls: ['./smrtgraph-search.component.css']
})
export class SmrtgraphSearchComponent implements OnInit {
  startNodesCtrl: FormControl;
  endNodesCtrl: FormControl;
  distanceCtrl: FormControl;
  confidenceCtrl: FormControl;

  searchTerm$ = new Subject<any>();
  autocompleteOptions:any[] = [];
  lychiAutocompleteOptions:any[] = [];
  startNodes: boolean = false;
  endNodes: boolean = false;

  constructor(
    private searchService:SearchService,
    private messageService: MessageService,
    private nodeService: NodeService,
    private dataConnectionService: DataConnectionService,
    private graphDataService: GraphDataService
  ) {
    this.startNodesCtrl = new FormControl();
    this.endNodesCtrl = new FormControl();
    this.distanceCtrl = new FormControl();
    this.confidenceCtrl = new FormControl();
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
      let valArr =value.trim().split(/[\s,;]+/);
      if(!this.endNodes) {
        this.graphDataService.clearGraph();
      }
      let query: Message = this.messageService.getMessage(valArr, 'targets');
        this.dataConnectionService.messages.next(query);
      this.startNodes = true;
      this.graphDataService.graphhistory$.subscribe(res =>{
        res.nodes.filter(node => {
          let id = node.properties.chembl_id || node.properties.properties.chembl_id;
          if(valArr.includes(id)){
            console.log(node.id);
            //todo: this doesn't clear the parameters, just passes them.
            node.params.startNode = true;
            this.nodeService.setNode(node);
          }
        });
      });
    });

    this.endNodesCtrl.valueChanges.subscribe(value => {
      let valArr =value.trim().split(/[\s,;]+/);
      if(!this.startNodes) {
        this.graphDataService.clearGraph();
      }
      let query: Message = this.messageService.getMessage(valArr, 'targets');
        this.dataConnectionService.messages.next(query);
      this.endNodes = true;
      this.graphDataService.graphhistory$.subscribe(res =>{
       res.nodes.filter(node => {
          let id = node.properties.chembl_id || node.properties.properties.chembl_id;
          if(valArr.includes(id)){
          console.log(node.id);
            node.params.endNode = true;
            this.nodeService.setNode(node);
          }
        });
      });
    });

    this.distanceCtrl.valueChanges.subscribe(value => {
      //this.graphDataService.clearGraph();
//console.log(value);
  this.shortestPath();
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
    console.log(this);
    if(this.startNodesCtrl.value && this.endNodesCtrl.value){
      let value:{} = {
        start:this.startNodesCtrl.value.trim().split(/[\s,;]+/),
        end: this.endNodesCtrl.value.trim().split(/[\s,;]+/)
      };
      let params:{} ={
        distance:this.distanceCtrl.value || 5,
        confidence:this.confidenceCtrl.value || 50
      };
/*      console.log(value);
      console.log(params);*/
     // this.graphDataService.clearGraph();
      let query: Message = this.messageService.getMessage(value, "path", params);
   //   console.log(query);
      this.dataConnectionService.messages.next(query);
    }
  }
}
