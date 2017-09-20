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
   // let cloned = this.simulation.nodes.map(x => Object.assign({}, x));
   // console.log(cloned);
    let cloned2 = graph.nodes.map(x => Object.assign({}, x));
    console.log(cloned2);


    console.log(graph);
    this.nodes= graph.nodes;
    this.links = graph.links;
    this.simulation.nodes(this.nodes)
    .force('link',
      d3.forceLink(this.links).id(d => d['id']));
    // this.initSimulation(options);
  //  this.initLinks(options);
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }
   // this.simulation.tick();
      this.simulation.restart();
   // this.simulation.alpha(0.3).restart();

  }

  initNodes(options) {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }
    this.simulation.nodes(this.nodes)


  }

  initLinks(options) {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }
    this.simulation.force('link',
      d3.forceLink(this.links)
        .id(d => d['id'])
       // .strength(FORCES.LINKS)
        .distance(100)
    )
    //this is necessary to bind the link data to the graph. The node is attached by the hover directive
  //  this.simulation.force<d3.ForceLink<any, any>>('link').links(this.links);
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
        .force('link',
          d3.forceLink(this.links)
            .id(d => d['id'])
            // .strength(FORCES.LINKS)
            .distance(100))
            .force("charge",
              d3.forceManyBody()
               // .strength(d => FORCES.CHARGE * d['r']))
            )
        .force("x",
          d3.forceX(function(d:Node){
            let cloned2 =  Object.assign({}, d);
            console.log(cloned2);
            console.log(d.params.startNode);
           if (d.index < 10){
              console.log(d);
              console.log(options.width/3);
console.log("setting x to: " + options.width/3);
             return options.width/3;
            } else {
              console.log(options.width);
              return options.width/2
            }
          }))
        .force("y", d3.forceY(10))
        .force("center", d3.forceCenter(options.width / 2, options.height / 2));


      /* .force("collide",
         d3.forceCollide()
           .strength(FORCES.COLLISION)
           .radius(d => d['r'] + 5).iterations(2)
       )
       */

        // A positive value causes nodes to attract each other, similar to gravity, while a negative value causes nodes to repel each other, similar to electrostatic charge.

          // .strength(FORCES.LINKS)


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
