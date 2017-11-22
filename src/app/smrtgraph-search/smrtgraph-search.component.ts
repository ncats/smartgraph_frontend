import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DataConnectionService} from '../services/data-connection.service';
import {SearchService} from '../services/search.service';
import {Message, MessageService} from '../services/message.service';
import { GraphDataService} from '../services/graph-data.service';
import {NodeService} from '../d3/models/node.service';
import {LoadingService} from '../services/loading.service';

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
  activityCtrl: FormControl;
  similarityCtrl: FormControl;

  startUUIDList: any[] = [];
  endUUIDList: any[] = [];
  startNodes = false;
  endNodes = false;

  constructor(
    private messageService: MessageService,
    private nodeService: NodeService,
    private dataConnectionService: DataConnectionService,
    private graphDataService: GraphDataService,
    private loadingService: LoadingService
  ) {
    this.startNodesCtrl = new FormControl();
    this.endNodesCtrl = new FormControl();
    this.distanceCtrl = new FormControl();
    this.confidenceCtrl = new FormControl();
    this.activityCtrl = new FormControl();
    this.similarityCtrl = new FormControl();
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
    // todo: fix above description
    // todo: set all subscriptions to be variables to close on destroy
    this.dataConnectionService.messages.subscribe(msg => {
      const response = JSON.parse(msg);
      switch (response.type) {

        case 'targetSearch': {
          this.autocompleteOptions.push(response.data);
          break;
        }
        case 'compoundSearch': {
          this.compoundAutocompleteOptions.push(response.data);
          break;
        }
        case 'startNodeSearch': {
          this.startUUIDList.push(response.data._fields[0].properties.uuid);
          break;
        }
        case 'endNodeSearch': {
          this.endUUIDList.push(response.data._fields[0].properties.uuid);
          break;
        }
        case 'counts': {
          break;
        }

      }
    });

    this.graphDataService.graphhistory$.subscribe(res => {
      // todo: add validation rules: must have uniprot_id (for now)
      // todo: this is going to happen on any change, so i need to filter by response type
      res.nodes.filter(node => {
        const id = node.properties.uniprot_id;
        if (this.startUUIDList.includes(node.uuid)) {
          // todo: this doesn't clear the parameters, just passes them.
          node.params.endNode = false;
          node.params.startNode = true;
        } else if (this.endUUIDList.includes(node.uuid)) {
          node.params.startNode = false;
          node.params.endNode = true;
        } else {
          node.params.startNode = false;
        }
        this.nodeService.setNode(node);
      });
    });

    this.startNodesCtrl.valueChanges.subscribe(value => {
      this.getStartNodes(value.trim().split(/[\s,;]+/));
      if (this.endNodesCtrl.value) {
        this.getEndNodes(this.endNodesCtrl.value.trim().split(/[\s,;]+/));
      }
      this.startNodes = true;
      this.graphDataService.setFilter(true);
      this.startUUIDList = [];
    });

    this.endNodesCtrl.valueChanges.subscribe(value => {
      this.getEndNodes(value.trim().split(/[\s,;]+/));
      if (this.startNodesCtrl.value) {
        this.getStartNodes(this.startNodesCtrl.value.trim().split(/[\s,;]+/));
      }
      this.endNodes = true;
      this.graphDataService.setFilter(true);
      this.endUUIDList = [];
    });


    this.distanceCtrl.valueChanges.subscribe(value => {
      this.shortestPath();
    });
    this.confidenceCtrl.valueChanges.subscribe(value => {
      this.shortestPath();
    });
    this.activityCtrl.valueChanges.subscribe(value => {
      this.shortestPath();
    });
    this.similarityCtrl.valueChanges.subscribe(value => {
      this.shortestPath();
    });

   //  this.startNodesCtrl.setValue('P35968, P12931, P00533, AHLNGYPZYMUEFB-UHFFFAOYSA-N, HVTCKKMWZDDWOY-UHFFFAOYSA-O');
    this.startNodesCtrl.setValue('P35968, P12931, P00533, AHLNGYPZYMUEFB, HVTCKKMWZDDWOY');
    this.endNodesCtrl.setValue('P03372, P04035, P04150, P00519');
  }


  getStartNodes(values: string[]): void{
    const query: Message = this.messageService.getMessage(values, 'startNodeSearch');
    setTimeout(() => this.dataConnectionService.messages.next(query), 0);
  }

  getEndNodes(values: string[]): void{
    const query: Message = this.messageService.getMessage(values, 'endNodeSearch');
    setTimeout(() => this.dataConnectionService.messages.next(query), 0);
  }

  shortestPath(){
     this.loadingService.toggleVisible(true);
    if (this.startNodesCtrl.value && this.endNodesCtrl.value){
      const value: {} = {
        start: this.startUUIDList,
        end: this.endUUIDList
      };
      const params: {} = {
        distance: this.distanceCtrl.value || 5,
        confidence: this.confidenceCtrl.value,
        activity: this.activityCtrl.value,
        similarity: this.similarityCtrl.value,
      };
      const query: Message = this.messageService.getMessage(value, 'path', params);
     this.dataConnectionService.messages.next(query);
    }
  }
}
