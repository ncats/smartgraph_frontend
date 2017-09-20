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

  update(graph, options){
    console.log(graph);
    this.simulation.nodes(graph.nodes);
    this.simulation
      .force('link',d3.forceLink(graph.links).id(d => d['id'])
        .strength(FORCES.LINKS));
    this.initSimulation(options);
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }
   //   this.simulation.restart();
    this.simulation.alpha(0.8).restart();

  }
  initSimulation(options) {
    console.log("init simulation");
    if (!options || !options.width || !options.height) {
      throw new Error('missing options when initializing simulation');
    }

    /** Creating the simulation */
    if (!this.simulation) {
      console.log("simulation exists")
      this.simulation = d3.forceSimulation()
        .force('charge', d3.forceManyBody()
          .strength(d => FORCES.CHARGE * d['r']))
        /** Updating the central force of the simulation */
        .force('center', d3.forceCenter(options.width / 2, options.height / 2))
        .force("collide",d3.forceCollide()
          .radius(d => d['r'] + 5).iterations(2)
          .strength(FORCES.COLLISION))
        .force("y", d3.forceY(options.height/2))
        .force("x", d3.forceX().x(function(d:Node){
          if (d.params.startNode == true){
            return options.width/10;
          } else if(d.params.endNode == true){
            return 9 * options.width/10;
          }else{
            return options.width/2
          }
        }));


      const ticker = this.ticker;

      // Connecting the d3 ticker to an angular event emitter
      this.simulation.on('tick', function () {
        ticker.emit(this);
      });
   //   this.initLinks(options);
   //   this.initNodes(options);
  //    this.simulation.stop();
    }

    /** Updating the central force of the simulation */
 //   this.simulation.force("center", d3.forceCenter(options.width / 2, options.height / 2));

    /** Restarting the simulation internal timer */
    this.simulation.restart();
  }
}
