import { EventEmitter } from '@angular/core';
import { Link, Node } from './';
import * as d3 from 'd3';

const FORCES = {
  LINKS: 1 / 50,
  COLLISION: 1,
  CHARGE: -1
}

export class ForceDirectedGraph {
  public ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
  public simulation: d3.Simulation<any, any>;

  public nodes: Node[] = [];
  public links: Link[] = [];

  constructor(nodes, links, options: { width, height }) {
    this.nodes = nodes;
    this.links = links;

    this.initSimulation(options);
  }

  connectNodes(source, target) {
    let link;

    if (!this.nodes[source] || !this.nodes[target]) {
      throw new Error('One of the nodes does not exist');
    }

    link = new Link(source, target);
    this.simulation.stop();
    this.links.push(link);
    this.simulation.alphaTarget(0.3).restart();

    this.initLinks();
  }

  initNodes() {
    console.log(this.nodes);
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }
    this.simulation.stop();
    this.simulation.nodes(this.nodes);
    this.simulation.alphaTarget(0.3).restart();
  }

  initLinks() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.simulation.force('links',
      d3.forceLink(this.links)
        .id(d => d['id'])
        .strength(FORCES.LINKS)
    );
  }

  initSimulation(options) {
    if (!options || !options.width || !options.height) {
      throw new Error('missing options when initializing simulation');
    }

    /** Creating the simulation */
    if (!this.simulation) {
      const ticker = this.ticker;
      this.simulation = d3.forceSimulation<Node, Link>()
        .force("charge",
          d3.forceManyBody()
            .strength(d => FORCES.CHARGE * d['r'])
        )
        .force("collide",
          d3.forceCollide()
            .strength(FORCES.COLLISION)
            .radius(d => d['r'] + 5).iterations(2)
        );

      // Connecting the d3 ticker to an angular event emitter
      this.simulation.on('tick', function () {
      //  this.nodes[0].x = options.width / 2;
      //  this.nodes[0].y = options.height / 2;
        ticker.emit(this);
      });

      this.initNodes();
      this.initLinks();
    }

    /** Updating the central force of the simulation */
    this.simulation.force("centers", d3.forceCenter(options.width / 2, options.height / 2));

    /** Restarting the simulation internal timer */
    this.simulation.restart();
  }
}
