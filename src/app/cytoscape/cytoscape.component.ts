import { Component, OnInit } from '@angular/core';
import {Message, GraphService} from "../graph.service";
import * as cytoscape from "cytoscape";


@Component({
  selector: 'app-cytoscape',
  templateUrl: './cytoscape.component.html',
  styleUrls: ['./cytoscape.component.css']
})
export class CytoscapeComponent implements OnInit {

  data: any = [];
  cy: any= {};
  layout: any= {};
  node: any= {};

  constructor(
     private graphService : GraphService
  ) { }

  ngOnInit() {
    var options = {
      name: 'random',

      fit: true, // whether to fit the viewport to the graph
      padding: 30, // padding used on fit
      boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
      avoidOverlapPadding: 10, // extra spacing around nodes when avoidOverlap: true
      nodeDimensionsIncludeLabels: true, // Excludes the label when calculating node bounding boxes for the layout algorithm
      spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
      condense: false, // uses all available space on false, uses minimal space on true
      rows: undefined, // force num of rows in the grid
      cols: undefined, // force num of columns in the grid
      position: function( node ){}, // returns { row, col } for element
      sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
      animate: false, // whether to transition the node positions
      animationDuration: 500, // duration of animation in ms if enabled
      animationEasing: undefined, // easing of animation if enabled
      ready: undefined, // callback on layoutready
      stop: undefined // callback on layoutstop
    };

    this.cy = new cytoscape({
      container: document.getElementById('cy'), // container to render in
      // list of graph elements to start with
      elements: this.data,
      zoom: 1,
      classes: 'foo bar',
      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'label': 'data(pref_name)'
          }
        },

        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle'
          }
        }
      ],

      layout: {
        options
      }


    });
   // this.layout = this.cy.elements().makeLayout(options);

    var _thiss = this;
    this.graphService.messages.subscribe(msg => {
      console.log(JSON.parse(msg));
  //    this.data.push({data: JSON.parse(msg)._fields[0].properties});
     this.cy.add({data: JSON.parse(msg)._fields[0].properties});
    //  this.layout.stop();
     this.layout = this.cy.elements().makeLayout(options);
      this.layout.run();
    });

    this.cy.$('#j').on('mouseover', 'node', function (evt) {
      console.log(evt.target);
      _thiss.cy.$('#j, #e').removeClass('foo');
      //// _thiss.graphService.messages.next('tim');
    });

   /* this.cy.on('mouseover', 'node', function (evt) {
      console.log(evt.target);
     //// _thiss.graphService.messages.next('tim');
    });
*/
    this.cy.on('tap', 'node', function (evt) {
      console.log(evt);
      console.log(_thiss);
      _thiss.graphService.messages.next('tim');
    });


   /* this.cy.on('click', function (evt) {
      console.log('tap ' + evt.target);
      console.log(this);
    });*/
    console.log(this);

  }

  getData(){
  return this.data;
  }


  pushIt(){
     this.graphService.messages.next('tim');
  }

}
