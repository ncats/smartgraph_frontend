import {EventEmitter} from '@angular/core';
import {Link, Node} from './';
import * as d3 from 'd3';

const FORCES = {
  LINKS: 1 / 50,
  //gets rid of overlap [0,1]
  COLLISION: 1,
  // A positive value causes nodes to attract each other, similar to gravity, while a negative value causes nodes to repel each other, similar to electrostatic charge.
  CHARGE: -1
};

export class ForceDirectedGraph {
  public ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
  public simulation: d3.Simulation<any, any>;

  public nodes: Node[] = [];
  public links: Link[] = [];

  constructor(nodes, links, options: {width, height}) {
    this.nodes = nodes;
    this.links = links;
    this.initSimulation(options);
  }

  initNodes(options) {
    console.log(options.width/4);
    console.log(options.width/2);
    console.log(3*options.width/4);
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }
    this.simulation.nodes(this.nodes);
    this.simulation.force("x",
      d3.forceX(function(d:Node){
        console.log(d.params);
        if(d.params.endNode==true){
          return 3*options.width/4
        } else if (d.params.startNode == true){
          console.log(d);
          console.log(options.width/3);
          return options.width/4
        } else {
          return options.width/2
        }
      }));
  }

  initLinks(options) {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }
    this.simulation.force('link',
      d3.forceLink(this.links)
        .id(d => d['id'])
        .strength(FORCES.LINKS)
    )
    .force("y",
      d3.forceY(function(d:Node){
        console.log(d.params);
        if(d.params.endNode==true){
          return 3*options.height/4
        } else if (d.params.startNode == true){
          console.log(d);
          console.log(options.height/3);
          return options.height/4
        } else {
          return options.height/2
        }
      }));
    //this is necessary to bind the link data to the graph. The node is attached by the hover directive
    this.simulation.force<d3.ForceLink<any, any>>('link').links(this.links);
  }

  initSimulation(options) {
    if (!options || !options.width || !options.height) {
      throw new Error('missing options when initializing simulation');
    }

    /** Creating the simulation */
    if (!this.simulation) {
      this.simulation = d3.forceSimulation()
        .force("collide",
          d3.forceCollide()
            .strength(FORCES.COLLISION)
            .radius(d => d['r'] + 5).iterations(2)
        )
        .force("charge",
          d3.forceManyBody()
          // A positive value causes nodes to attract each other, similar to gravity, while a negative value causes nodes to repel each other, similar to electrostatic charge.
          .strength(d => FORCES.CHARGE * d['r'])
        );
      const ticker = this.ticker;

      // Connecting the d3 ticker to an angular event emitter
      this.simulation.on('tick', function () {
        ticker.emit(this);
      });

      this.initNodes(options);
      this.initLinks(options);
  //    this.simulation.stop();
    }

    /** Updating the central force of the simulation */
    this.simulation.force("center", d3.forceCenter(options.width / 2, options.height / 2));

    /** Restarting the simulation internal timer */
    this.simulation.restart();
  }
}
