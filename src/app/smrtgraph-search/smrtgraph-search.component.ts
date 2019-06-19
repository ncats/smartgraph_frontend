import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DataConnectionService} from '../services/data-connection.service';
import {Message, MessageService} from '../services/message.service';
import { GraphDataService} from '../services/graph-data.service';
import {NodeService} from '../d3/models/node.service';
import {LoadingService} from '../services/loading.service';

@Component({
  selector: 'smrtgraph-search',
  templateUrl: './smrtgraph-search.component.html',
  styleUrls: ['./smrtgraph-search.component.scss']
})
export class SmrtgraphSearchComponent implements OnInit {
  startNodesCtrl: FormControl;
  endNodesCtrl: FormControl;
  distanceCtrl: FormControl;
  confidenceCtrl: FormControl;
  activityCtrl: FormControl;
  similarityCtrl: FormControl;

  startUUIDList: any[] = [
    "489c2bf7-0333-454d-bec1-ff2ec2f7a450",
    "d432258a-231a-4e64-89b3-71fbc3952942",
    "604dbdc3-a1bd-46ad-b19f-d82afdee387f",
    "953c70cf-d0f6-418c-8949-e105b0004fca",
    "54c43ef8-3627-487b-b693-8ae17c135273"
  ];
  endUUIDList: any[] = [
    "bf76473e-a1dd-4198-8174-6fb5c92a4fee",
    "69b04e9f-1b42-4cd2-8e06-392ad61e024f",
    "f363da85-23f0-4f49-8cb5-527c578f9a4d",
    "9eeda47e-dcfa-4c23-95ff-996f1e54fc82"
  ];
  startNodes = true;
  endNodes = true;
  hasCompound = true;

  constructor(
    private messageService: MessageService,
    private nodeService: NodeService,
    private dataConnectionService: DataConnectionService,
    private graphDataService: GraphDataService,
    private loadingService: LoadingService
  ) {
    this.startNodesCtrl = new FormControl('P35968, P12931, P00533, AHLNGYPZYMUEFB, HVTCKKMWZDDWOY');
    this.endNodesCtrl = new FormControl('P03372, P04035, P04150, P00519');
    this.distanceCtrl = new FormControl(5);
    this.confidenceCtrl = new FormControl(0);
    this.activityCtrl = new FormControl(5);
    this.similarityCtrl = new FormControl();
  }

  /*
  * Todo: this needs to be re-worked a bit-- the queries that are the result of the search inputs changing directly modify nodes
  * todo: while they do this thorugh a service, they subscribe to all graph change events, which is not optimal
  * */






  ngOnInit() {
    // todo: set all subscriptions to be variables to close on destroy
    this.dataConnectionService.responses.subscribe(response => {
      switch (response.type) {
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
        if (node._type === 'compound') {
          this.hasCompound = true;
        }
        const id = node.uniprot_id;
        if (this.startUUIDList.includes(node.uuid)) {
          // todo: this doesn't clear the parameters, just passes them.
          node.params.endNode = false;
          node.params.startNode = true;
        } else if (this.endUUIDList.includes(node.uuid)) {
          node.params.startNode = false;
          node.params.endNode = true;
        } else {
          node.params.startNode = false;
          node.params.endNode = false;
        }
        this.nodeService.setNode(node);
      });
    });

    this.startNodesCtrl.valueChanges.subscribe(value => {
      this.hasCompound = false;
      this.getStartNodes(value.trim().split(/[\s,;]+/));
      if (this.endNodesCtrl.value) {
        this.getEndNodes(this.endNodesCtrl.value.trim().split(/[\s,;]+/));
      }
      this.startNodes = true;
      this.startUUIDList = [];
    });

    this.endNodesCtrl.valueChanges.subscribe(value => {
      this.getEndNodes(value.trim().split(/[\s,;]+/));
      if (this.startNodesCtrl.value) {
        this.getStartNodes(this.startNodesCtrl.value.trim().split(/[\s,;]+/));
      }
      this.endNodes = true;
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
    this.shortestPath();
  }


  getStartNodes(values: string[]): void{
    const query: Message = this.messageService.getMessage(values, 'startNodeSearch');
    this.dataConnectionService.messages.next(query);
  }

  getEndNodes(values: string[]): void{
    const query: Message = this.messageService.getMessage(values, 'endNodeSearch');
    this.dataConnectionService.messages.next(query);
  }

  shortestPath(){
     this.loadingService.toggleVisible(true);
    if (this.startNodesCtrl.value){
      const value: {} = {
        start: this.startUUIDList,
        end: this.endUUIDList || []
      };
      const params: {} = {
        distance: this.distanceCtrl.value || 5,
        confidence: this.confidenceCtrl.value || 0,
        activity: this._convert(this.activityCtrl.value) || 10,
        similarity: this.similarityCtrl.value,
        hasCompound: this.hasCompound
      };
      const query: Message = this.messageService.getMessage(value, 'path', params);
      console.log(this._getBrowserQuery(query));

      this.dataConnectionService.messages.next(query);
    }
  }

  _convert(val: number): number {
  if(val){
  const x = Math.pow(10, -val);
    return x * 1000000;
  } else {
  return val
  }
  }

  clearGraph():void {
    this.hasCompound = false;
    this.graphDataService.clearGraph();
  }

  _getBrowserQuery(message: Message):string {
    return message.message
      .replace(/{start}/g, `[${message.params.start.map(q => `'${q}'`).join(',')}]`)
      .replace(/{end}/g, `[${message.params.end.map(q => `'${q}'`).join(',')}]`);
  }
}
