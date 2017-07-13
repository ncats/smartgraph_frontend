import {EventEmitter} from '@angular/core';
import {Link, Node} from './';
import * as d3 from 'd3';

const FORCES = {
  LINKS: 1 / 50,
  COLLISION: .5,
  CHARGE: -.5
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

  initNodes() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }
    this.simulation.nodes(this.nodes);
  }

  initLinks() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }
    this.simulation.force('link',
      d3.forceLink(this.links)
        .id(d => d['id'])
        .strength(FORCES.LINKS)
    );
    //this is necessary to bind the link data to the graph. The node is attached by the hover directive
    this.simulation.force<d3.ForceLink<any, any>>('link').links(this.links);
  }

  initSimulation(options) {
    if (!options || !options.width || !options.height) {
      throw new Error('missing options when initializing simulation');
    }

    /** Creating the simulation */
    if (!this.simulation) {
      const ticker = this.ticker;
      this.simulation = d3.forceSimulation()
        .force("charge",
          d3.forceManyBody()
            .strength(d => FORCES.CHARGE * d['r'])
        )
        .force("collide",
          d3.forceCollide()
            .strength(FORCES.COLLISION)
            .radius(d => d['r'] + 5)
        )
      ;

      // Connecting the d3 ticker to an angular event emitter
      this.simulation.on('tick', function () {
        ticker.emit(this);
      });

      this.initNodes();
      this.initLinks();
    }

    /** Updating the central force of the simulation */
    this.simulation.force("center", d3.forceCenter(options.width / 2, options.height / 2));

    /** Restarting the simulation internal timer */
    this.simulation.restart();
  }
}
