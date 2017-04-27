import { Component, OnInit } from '@angular/core';
import {Message, GraphService} from "../graph.service";

@Component({
  selector: 'app-cytoscape',
  templateUrl: './cytoscape.component.html',
  styleUrls: ['./cytoscape.component.css']
})
export class CytoscapeComponent implements OnInit {

  data: any = [];

  constructor(
     private graphService : GraphService
  ) { }

  ngOnInit() {
    console.log(this);
     this.graphService.messages.subscribe(msg => {
     console.log(msg);
     this.data.push(msg);
     });
    //this.graphService
    console.log(this);
    //  var neo4j : any;
  }

  pushIt(){
  /*  let req: Message = {
      "statements" : [ {
        //"statement" : "MATCH (n) MATCH ()-[r]->() RETURN n, r",
        //"statement" : 'MATCH (tom:Person {name: "Tom Hanks"})-[:ACTED_IN]->(tomHanksMovies) RETURN tom,tomHanksMovies'/!*,
        "statement": 'MATCH p=shortestPath((bacon:Person {name:"Kevin Bacon"})-[*]-(meg:Person {name:"Meg Ryan"})) RETURN p',
        "resultDataContents" : [ "row", "graph" ]
      } ]
    };*/
  //  console.log('ok');
  //  console.log(req);
     this.graphService.messages.next('tim');
  }

}
