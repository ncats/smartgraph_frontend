import {Injectable} from '@angular/core';
import {Node} from './models/node';
import {Link} from './models/link';
import {ForceDirectedGraph} from './models/force-directed-graph';
import * as d3 from 'd3';
import {NodeService} from './models/node.service';
import {LinkService} from './models/link.service';
import {NodeMenuControllerService} from '../services/node-menu-controller.service';
import {LinkDatabase} from '../visuals/details/link-list-visual/link-database.service';

@Injectable()
export class D3Service {
  /** This service will provide methods to enable user interaction with elements
   * while maintaining the d3 simulations physics
   */

  constructor(
    private nodeService: NodeService,
    private linkService: LinkService,
    private nodeMenuController: NodeMenuControllerService,
    private linkDatabase: LinkDatabase
  ) {  }

  /** A method to bind a pan and zoom behaviour to an svg element */
  applyZoomableBehaviour(svgElement, containerElement) {
    let svg, container, zoomed, zoom, clearMenu;

    svg = d3.select(svgElement);
    container = d3.select(containerElement);

    zoomed = () => {
      this.nodeMenuController.toggleVisible(false);
      container.attr('transform', d3.event.transform);
    };

    clearMenu = () => {
      this.nodeMenuController.toggleVisible(false);
    };

    zoom = d3.zoom()
      .on('zoom', zoomed);
    svg.call(zoom);
  }

  /** A method to bind a draggable behaviour to an svg element */
  applyDraggableBehaviour(element, node: Node, graph: ForceDirectedGraph) {
    const d3element = d3.select(element);

    const started = (): void => {
      d3.event.sourceEvent.stopPropagation();
      if (!d3.event.active) {
        graph.simulation.alphaTarget(0.7).restart();
      }
    };

      function dragged() {
        node.fx = d3.event.x;
        node.fy = d3.event.y;
      }

      const ended = (): void => {
        d3.event.sourceEvent.stopPropagation();
        if (!d3.event.active) {
          graph.simulation.alphaTarget(0);
        }

        // by not resetting these, the node stays where it is dragged
        /*  node.fx = null;
         node.fy = null;*/
      };

    d3element.call(d3.drag()
      .on('start', started)
      .on('drag', dragged)
      .on('end', ended)
    );
  }

  /** A method to bind hoverable behaviour to an svg element */
  applyHoverableNodeBehaviour(element, node: Node, graph: ForceDirectedGraph) {
    const d3element = d3.select(element);
    let connectedLinks;
    let maximalLinks: any[] = [];
    let upstreamNeighbors: Link[] = [];
    let downstreamNeighbors: Link[] = [];

    const decorateNodes = (): void => {
      d3element.select('circle').classed('hovering', true);
      d3.selectAll('circle')
        .data(graph.nodes)
        .filter(getNeighborNodes) // this will pass each node in the graph to the function
        .classed('connected', true);
    };



    const decorateLinks = (): void => {
      connectedLinks = d3.selectAll('line')
        .data(graph.links)
        .filter(getNeighborLinks)
        .classed('connected', true);

      const connectedNodes = d3.selectAll('circle')
        .data(graph.nodes)
        .filter(getNeighborNodes)
        .classed('connected', true);

      connectedLinks.filter(findMaximalLinks)
        .classed('maximal', true);

      connectedNodes.filter(findMaximalNodes)
        .classed('maximal', true);
    };

    const clearNodes = (): void => {
      d3element.select('circle').classed('hovering', false);
      node.params.hovered = false;
    };

    const clearLinks = (): void => {
      d3.selectAll('line')
        .classed('connected', false)
        .classed('maximal', false);
      d3.selectAll('circle')
        .classed('connected', false)
        .classed('maximal', false);

    };

    // todo: this is kind of piggybacking on the filter function
    const getNeighborLinks = (e: Link): boolean => {
      console.log("finding neighbors");
      console.log(node);
      console.log(e);
      const downstream = node.uuid === (typeof (e.source) == 'object' ? e.source.uuid : e.source);
      const upstream = node.uuid === (typeof (e.target) == 'object' ? e.target.uuid : e.target);
      if (downstream == true) {
        downstreamNeighbors.push(e);
      }
      if (upstream == true){
        upstreamNeighbors.push(e);
      }
      return downstream;
    };

    const getNeighborNodes = (e: any): boolean => {
      console.log("finding neighbors nodes");
      return connectedLinks.data().map(link => link.target.uuid).indexOf(e.uuid) > -1;
    };

    const findMaximalLinks = (e: any): boolean => {
      if (e.properties && e.properties.islargest){
        maximalLinks = maximalLinks.concat([e.source.uuid, e.target.uuid]).reduce((x, y) => x.includes(y) ? x : [...x, y], []);
        return true;
      }else{
        return false;
      }
    };

    const findMaximalNodes = (e: any): boolean => {
      return maximalLinks.indexOf(e.id) > -1;
    };

    // todo: this is called on drag and iterates over the entire graph
    const mouseOverFunction = (): void => {
      decorateLinks();
      decorateNodes();
      this.nodeService.hoveredNode({node: node , up: upstreamNeighbors, down: downstreamNeighbors});
    };

    const mouseOutFunction = (): void => {
      clearNodes();
      clearLinks();
      upstreamNeighbors = [];
      downstreamNeighbors = [];
    };
// todo: this fires constantly as the node is dragged
    d3element.on('mouseover', mouseOverFunction).on('mouseout', mouseOutFunction);

  }

  /** A method to bind hoverable behaviour to an svg element */
  applyHoverableLinkBehaviour(element, link: Link, graph: ForceDirectedGraph) {
    const d3element = d3.select(element);
    let arrowType = 'connected';

      const decorateLinks = (): void => {
        console.log(link.edgeType);
        if (link.edgeType == 'up'){
          arrowType = 'connectedflat';
        }
      d3element.select('line').classed('hovering', true).classed(arrowType, true);
        this.linkService.hoveredLink(link);
    };

    const clearLinks = (): void => {
      d3element.select('line').classed('hovering', false).classed(arrowType, false);
    };

      const mouseOverFunction = (): void => {
      this.linkService.hoveredLink(link);
        this.linkDatabase.addSite(link);
        decorateLinks();
    };

    const mouseOutFunction = (): void => {
      clearLinks();
    };

    d3element.on('mouseover', mouseOverFunction).on('mouseout', mouseOutFunction);

  }


  /** A method to bind click events to an svg element */
  // just emits the node for other components to listen for
  applyClickableBehaviour = (element, node: Node, graph: ForceDirectedGraph) =>  {
    const d3element = d3.select(element);
    const svg = d3.select('svg');

    const toggleMenu = (): void => {
      if (node.params.menu) {
        this.nodeMenuController.toggleVisible(false);
        node.params.menu = false;

      }
// if menu is closed, open it
      else {
        this.nodeService.changeNode(node);
        this.nodeMenuController.toggleVisible(true);
        node.params.menu = true;
        // if menu is open, close it
      }
    };

    const clickFunction = (): void => {
      if (d3.event.defaultPrevented) return;
      // graph.nodes.map(node => node.params.menu = false);
      // todo: this is calling the node change every time the node is clicked to toggle the menu, which ends up trying to expand the node each time, resulting in a diff of 0
      toggleMenu();
      d3.event.stopPropagation();
    };

    const clearMenu = (): void => {
      // this just closes out the menu and sets the menu tracking variable to be false for each node
      this.nodeMenuController.toggleVisible(false);
      graph.nodes.map(node => node.params.menu = false);
    };

    d3element.on('click', clickFunction);
    svg.on('mousedown', clearMenu);
  }


  /** The interactable graph we will return
   * This method does not interact with the document, purely physical calculations with d3
   */
  getForceDirectedGraph(nodes: Node[], links: Link[], options: {width, height}) {
    return new ForceDirectedGraph(nodes, links, options);
  }
}
