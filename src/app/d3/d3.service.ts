import {Injectable} from '@angular/core';
import {Node, Link, ForceDirectedGraph, NodeService} from './models';
import * as d3 from 'd3';
import {NodeMenuControllerService} from "../services/node-menu-controller.service";

@Injectable()
export class D3Service {
  /** This service will provide methods to enable user interaction with elements
   * while maintaining the d3 simulations physics
   */
 // @Output() nodeClicked: EventEmitter<Node> = new EventEmitter<Node>();

  constructor(
    private nodeService : NodeService,
    private nodeMenuController : NodeMenuControllerService
  ) {  }

  /** A method to bind a pan and zoom behaviour to an svg element */
  applyZoomableBehaviour(svgElement, containerElement) {
    let svg, container, zoomed, zoom;

    svg = d3.select(svgElement);
    container = d3.select(containerElement);

    zoomed = () => {
      let transform = d3.event.transform;
      container.attr("transform", "translate(" + transform.x + "," + transform.y + ") scale(" + transform.k + ")");
    };

    zoom = d3.zoom().on("zoom", zoomed);
    svg.call(zoom);
  }

  /** A method to bind a draggable behaviour to an svg element */
  applyDraggableBehaviour(element, node: Node, graph: ForceDirectedGraph) {
    let d3element = d3.select(element);

    function started() {
      if (!d3.event.active) {
        graph.simulation.alphaTarget(0.3).restart();
      }
      //hides tooltip if active
     // d3element.select('.tooltip').style("opacity", 0);

      d3.event.on("drag", dragged).on("end", ended);

      function dragged() {
        node.fx = d3.event.x;
        node.fy = d3.event.y;
      }

      function ended() {
        if (!d3.event.active) {
          graph.simulation.alphaTarget(0);
        }

        //by not resetting these, the node stays where it is dragged
      /*  node.fx = null;
        node.fy = null;*/
      }
    }

    d3element.call(d3.drag()
      .on("start", started));
  }


  /** A method to bind hoverable behaviour to an svg element */
  applyHoverableBehaviour(element, node: Node, graph: ForceDirectedGraph) {
    let d3element = d3.select(element);
    let connectedLinks;
    let maximalLinks: any[] = [];
    let upstreamNeighbors: Link[] = [];
    let downstreamNeighbors: Link[] = [];

     let decorateNodes = ():void =>{
      d3element.select('circle').classed('hovering', true);
     /* d3element.selectAll('.tooltip').transition().duration(200)
        .style("opacity", .9).attr('z-index', 666);*/
      d3.selectAll('circle')
         .data(graph.nodes)
         .filter(getNeighborNodes) //this will pass each node in the graph to the function
         .classed('connected', true)
    };



    let decorateLinks = ():void =>{
      connectedLinks = d3.selectAll('line')
        .data(graph.links)
        .filter(getNeighborLinks)
        .classed('connected', true);

       let connectedNodes = d3.selectAll('circle')
         .data(graph.nodes)
         .filter(getNeighborNodes)
         .classed('connected', true);

         connectedLinks.filter(findMaximalLinks)
         .classed('maximal', true);

       connectedNodes.filter(findMaximalNodes)
         .classed('maximal', true);
     };

    let clearNodes = (): void =>{
      d3element.select('circle').classed('hovering', false);
      node.params.hovered = false;
     /* d3element.select('.tooltip').transition().duration(500)
        .style("opacity", 0);*/
    };

    let clearLinks= ():void => {
      d3.selectAll('line')
        .classed('connected', false)
        .classed('maximal', false);
      d3.selectAll('circle')
        .classed('connected', false)
        .classed('maximal', false);

    };

    //todo: this is kind of piggybacking on the filter function
    let getNeighborLinks = (e:any):boolean => {
      let downstream = node.id === (typeof (e.source) == "object" ? e.source.id : e.source);
      let upstream = node.id === (typeof (e.target) == "object" ? e.target.id : e.target);
      if(downstream == true) {
        downstreamNeighbors.push(e);
      }
      if(upstream ==true){
        upstreamNeighbors.push(e);
      }
     //   return node.id === (typeof (e.source) == "object" ? e.source.id : e.source) || node.id === (typeof (e.target) == "object" ? e.target.id : e.target);
        return downstream;
    };

    let getNeighborNodes = (e:any): boolean => {
     // const sources = connectedLinks.data().map(link => link.source.id);
      const targets = connectedLinks.data().map(link=> link.target.id);
     // let nodesList = sources.concat(targets).reduce((x, y) => x.includes(y) ? x : [...x, y], []);
      return targets.indexOf(e.id) > -1;
    };

   let findMaximalLinks = (e:any):boolean => {
     if(e.properties && e.properties.maximal && e.properties.maximal == "t"){
       maximalLinks= maximalLinks.concat([e.source.id, e.target.id]).reduce((x, y) => x.includes(y) ? x : [...x, y], []);
       return true;
     }else{
       return false;
     }
     };

    let findMaximalNodes = (e:any):boolean =>{
      return maximalLinks.indexOf(e.id) > -1;
    };

    let mouseOverFunction = ():void => {
      this.nodeService.hoveredNode({node: node , up:upstreamNeighbors, down: downstreamNeighbors});
      decorateLinks();
      decorateNodes();
    };

     let mouseOutFunction = ():void =>{
      clearNodes();
      clearLinks();
       upstreamNeighbors = [];
       downstreamNeighbors = [];
    };
//todo: this fires constantly as the node is dragged
    d3element.on("mouseover", mouseOverFunction);
    d3element.on("mouseout", mouseOutFunction);

  }


 /** A method to bind click events to an svg element */
 //just emits the node for other components to listen for
  applyClickableBehaviour = (element, node: Node, graph: ForceDirectedGraph) =>  {
    let d3element = d3.select(element);
    let svg = d3.select('svg');

    let toggleMenu = ():void => {
      //if menu is open, close it
      if (node.params.menu) {
        this.nodeMenuController.toggleVisible(false);
      }
//if menu is closed, open it
      else {
        this.nodeService.changeNode(node);
        this.nodeMenuController.toggleVisible(true);
        node.params.menu = true;
      }
    };
    let decorateNodes = ():void =>{
   /*   d3.selectAll('circle')
        .data(graph.nodes)
        .filter(getNeighborNodes) //this will pass each node in the graph to the function
        .classed('connected', true);

      //sets click coloring on current node
      d3element.select("circle").classed("clicked", false);*/
    };

    let clickFunction = ():void => {
      graph.nodes.map(node => node.params.menu = false);
      //todo: this is calling the node change every time the node is clicked to toggle the menu, which ends up trying to expand the node each time, resulting in a diff of 0
      toggleMenu();
//todo: this may be less necessary with the menu opening
      //decorateNodes();
      d3.event.stopPropagation();
    };

    let clearMenu =():void =>{
      //this just closes out the menu and sets the menu tracking variable to be false for each node
      this.nodeMenuController.toggleVisible(false);
      graph.nodes.map(node => node.params.menu = false);
      d3.event.stopPropagation();
    };

    svg.on("click",clearMenu);
    d3element.on("click",clickFunction);
  };


  /** The interactable graph we will return
   * This method does not interact with the document, purely physical calculations with d3
   */
  getForceDirectedGraph(nodes: Node[], links: Link[], options: {width, height}) {
    return new ForceDirectedGraph(nodes, links, options);
  }
}
