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
  startUUIDList:any[] = [];
  endUUIDList:any[] = [];
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
      let response = JSON.parse(msg);
      switch (response.type) {

        case "targetSearch": {
          this.autocompleteOptions.push(response.data);
          break;
        }
        case "compoundSearch": {
          this.compoundAutocompleteOptions.push(response.data);
          break;
        }
        case "startNodeSearch": {
          this.startUUIDList.push(response.data._fields[0].properties.uuid);
          break;
        }
        case "endNodeSearch": {
          this.endUUIDList.push(response.data._fields[0].properties.uuid);
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
      let query: Message = this.messageService.getMessage(valArr, 'startNodeSearch');
      setTimeout(() => this.dataConnectionService.messages.next(query), 0);
//      this.dataConnectionService.messages.next(query);
      this.startNodes = true;
      this.graphDataService.graphhistory$.subscribe(res =>{
        //todo: add validation rules: must have uniprot_id (for now)
        //todo: this is going to happen on any change, so i need to filter by response type
        res.nodes.filter(node => {
            let id = node.properties.uniprot_id;
            if (this.startUUIDList.includes(node.uuid)) {
              //todo: this doesn't clear the parameters, just passes them.
              node.params.endNode = false;
              node.params.startNode = true;
              this.nodeService.setNode(node);
            } else {
              node.params.startNode = false;
              this.nodeService.setNode(node);
            }
        });
      });
    });

    this.endNodesCtrl.valueChanges.subscribe(value => {
      let valArr =value.trim().split(/[\s,;]+/);
      let query: Message = this.messageService.getMessage(valArr, 'endNodeSearch');
      setTimeout(() => this.dataConnectionService.messages.next(query), 0);

//      this.dataConnectionService.messages.next(query);
      this.endNodes = true;
      this.graphDataService.graphhistory$.subscribe(res =>{
          //todo: add validation rules: cannot be both start and end node
        res.nodes.filter(node => {
          let id = node.properties.uniprot_id;
          if (this.endUUIDList.includes(node.uuid)) {
              node.params.startNode = false;
              node.params.endNode = true;
              this.nodeService.setNode(node);
            } else {
              node.params.endNode = false;
              this.nodeService.setNode(node);
            }
        });
      });
    });


    this.distanceCtrl.valueChanges.subscribe(value => {
      this.shortestPath();
    });
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
        this.dataConnectionService.messages.next(results);
      });

    this.startNodesCtrl.setValue('P35968, P12931, P00533, AHLNGYPZYMUEFB-UHFFFAOYSA-N, HVTCKKMWZDDWOY-UHFFFAOYSA-O');
    this.endNodesCtrl.setValue('P03372, P04035, P04150, P00519');
  }

  shortestPath(){
    console.log(this);
    if(this.startNodesCtrl.value && this.endNodesCtrl.value){
      let value:{} = {
        start:this.startUUIDList,
        end: this.endUUIDList
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
