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
  compoundAutocompleteOptions:any[] = [];
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

  /*
  * Todo: this needs to be re-worked a bit-- the queries that are the result of the search inputs changing directly modify nodes
  * todo: while they do this thorugh a service, they subscribe to all graph change events, which is not optimal
  * todo: there is also no function to remove the startNode and endNode parameters
  *
  *
  *
  * */






  ngOnInit() {
    //todo: fix above description
    //todo: set all subscriptions to be variables to close on destroy
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

    //todo: needs to get chenbl(uniprot)id or inchii/lychi and get a list of uuids to pass to the path message

    this.startNodesCtrl.valueChanges.subscribe(value => {
      let valArr =value.trim().split(/[\s,;]+/);
      let query: Message = this.messageService.getMessage(valArr, 'targets');
        this.dataConnectionService.messages.next(query);
      this.startNodes = true;
      this.graphDataService.graphhistory$.subscribe(res =>{
        //todo: add validation rules: cannot be both start and end node
        //todo: add validation rules: must have uniprot_id (for now)
        //todo: this is going to happen on any change, so i need to filter by response type
        res.nodes.filter(node => {
          if(node.properties && node.properties.uniprot_id) {
            let id = node.properties.uniprot_id;
            if (valArr.includes(id)) {
              //todo: this doesn't clear the parameters, just passes them.
              node.params.endNode = false;
              node.params.startNode = true;
              this.nodeService.setNode(node);
            } else {
              node.params.startNode = false;
              this.nodeService.setNode(node);
            }
          }
        });
      });
    });

    this.endNodesCtrl.valueChanges.subscribe(value => {
      let valArr =value.trim().split(/[\s,;]+/);
      let query: Message = this.messageService.getMessage(valArr, 'targets');
        this.dataConnectionService.messages.next(query);
      this.endNodes = true;
      this.graphDataService.graphhistory$.subscribe(res =>{
          //todo: add validation rules: cannot be both start and end node
        res.nodes.filter(node => {
          if(node.properties && node.properties.uniprot_id) {
            let id = node.properties.uniprot_id || node.properties.properties.uniprot_id;
            if (valArr.includes(id)) {
              node.params.startNode = false;
              node.params.endNode = true;
              this.nodeService.setNode(node);
            } else {
              node.params.endNode = false;
              this.nodeService.setNode(node);
            }
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
        this.onEnter("compound");
      }else {
        if (value != '') {
          //empty autocomplete options array, otherwise it will never change
          //this.compoundAutocompleteOptions = [];

          // this.searchTerm$.next({term: value.replace(/\(/gi, "\\(").replace(/\)/gi, "\\)").replace(/\[/gi, "\\[").replace(/\]/gi, "\\]"), type: "patternSearch"});
        //  this.searchTerm$.next({term: value, type: "compoundSearch"});
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
        this.compoundAutocompleteOptions=[];
        console.log(results);
        this.dataConnectionService.messages.next(results);
      });
    //this.startNodesCtrl.setValue('CHEMBL2111336, CHEMBL203');
    //this.endNodesCtrl.setValue('CHEMBL206, CHEMBL402, CHEMBL2034, CHEMBL1862');

    this.startNodesCtrl.setValue('P35968, P12931, P00533','AHLNGYPZYMUEFB-UHFFFAOYSA-N');
    this.endNodesCtrl.setValue('P03372, P04035, P04150, P00519');
  }



 /* onEnter(type: string) {
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
      let query: Message = this.messageService.getMessage(value, "path", params);
      this.dataConnectionService.messages.next(query);
    }
  }
}
