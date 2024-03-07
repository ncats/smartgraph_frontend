import {Injectable} from '@angular/core';
import {Node} from './models/node';
import {Link} from './models/link';
import {ForceDirectedGraph} from './models/force-directed-graph';
import * as d3 from 'd3';
import {NodeService} from './models/node.service';
import {LinkService} from './models/link.service';
import {NodeMenuControllerService} from '../services/node-menu-controller.service';

@Injectable()
export class D3Service {
  /** This service will provide methods to enable user interaction with elements
   * while maintaining the d3 simulations physics
   */
  zoom: any = {};

  constructor(
    private nodeService: NodeService,
    private linkService: LinkService,
    private nodeMenuController: NodeMenuControllerService
  ) {  }

  /** A method to bind a pan and zoom behaviour to an svg element */
  applyZoomableBehaviour(svgElement, containerElement) {
    let svg, container, zoomed, zoom;

    svg = d3.select(svgElement);
    container = d3.select(containerElement);

    zoomed = (event: { transform: any; }) => {
      container.attr('transform', event.transform);
    };

    this.zoom = d3.zoom()
      .scaleExtent([.1, 100])
      .on('zoom', zoomed);
    svg.call(this.zoom);
  }

  /** A method to register clicks on the graph that aren't node or link clicks (resets those behaviors) */
  applyClickOffBehaviour(svgElement) {
    const d3element = d3.select(svgElement);
    d3element.on('click',  () => { this._clearNodes(); });

  }

  /** A method to bind a draggable behaviour to an svg element */
  applyDraggableBehaviour(element, node: Node, graph: ForceDirectedGraph) {
    const d3element = d3.select(element);

    const started = (event): void => {
      event.sourceEvent.stopPropagation();
      if (!event.active) {
        graph.simulation.alphaTarget(0.3).restart();
      }
    };

      function dragged(event) {
        node.fx = event.x;
        node.fy = event.y;
      }

      const ended = (event): void => {
        event.sourceEvent.stopPropagation();
        if (!event.active) {
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
    let connectedNodes;
    let maximalLinks: any[] = [];
    let neighbors: Link[] = [];
  //  let downstreamNeighbors: Link[] = [];

    const decorateNodes = (): void => {
      d3element.select('circle').classed('hovering', true);
      connectedLinks = d3.selectAll('.link')
        .data(graph.links)
        .filter(getNeighborLinks)
        .classed('hovering', true)
        .classed('connected', function(link) {return link.edge_type != 'down'; })
        .classed('connectedflat', function(link) {return link.edge_type === 'down'; });

       connectedNodes = d3.selectAll('circle')
        .data(graph.nodes)
        .filter(getNeighborNodes)
        .classed('connected', true);

      connectedLinks.filter(findMaximalLinks)
        .classed('maximal', true);

      connectedNodes.filter(findMaximalNodes)
        .classed('maximal', true);
    };

    const clearNodes = (): void => {
      d3.selectAll('.link')
        .classed('connected', false)
        .classed('connectedflat', false)
        .classed('hovering', false)
        .classed('maximal', false);
      d3.selectAll('circle')
        .classed('connected', false)
        .classed('hovering', false)
        .classed('maximal', false);
  //    node.params.hovered = false;
    };

    // todo: this is kind of piggybacking on the filter function
    const getNeighborLinks = (e: Link): boolean => {
      const neighbor = (node.uuid === (typeof (e.source) == 'object' ? e.source.uuid : e.source) || node.uuid === (typeof (e.target) == 'object' ? e.target.uuid : e.target));
      if (neighbor == true) {
        neighbors.push(e);
      }
      return node.uuid === (typeof (e.source) == 'object' ? e.source.uuid : e.source);
    };

    const getNeighborNodes = (e: any): boolean => {
    //  console.log("finding neighbors nodes");
      return connectedLinks.data().map(link => link.target.uuid).indexOf(e.uuid) > -1;
    };

    const findMaximalLinks = (e: any): boolean => {
      if (e.properties && e.properties.islargest) {
        maximalLinks = maximalLinks.concat([e.source.uuid, e.target.uuid]).reduce((x, y) => x.includes(y) ? x : [...x, y], []);
        return true;
      } else {
        return false;
      }
    };

    const findMaximalNodes = (e: any): boolean => {
      return maximalLinks.indexOf(e.uuid) > -1;
    };

    // todo: this is called on drag and iterates over the entire graph
    const mouseOverFunction = (event): void => {
      if (event.defaultPrevented) { return; }
      decorateNodes();
      this.nodeService.hoveredNode([node]);
      if (neighbors.length > 0) {
        this.linkService.hoveredLink(neighbors);
      }
    };

    const mouseOutFunction = (): void => {
      clearNodes();
      neighbors = [];
    };
// todo: this fires constantly as the node is dragged
    d3element.on('mouseover', mouseOverFunction).on('mouseout', mouseOutFunction);

  }

  /** A method to bind hoverable behaviour to an svg element */
  applyHoverableLinkBehaviour(element, link: Link) {
    const d3element = d3.select(element);
    let arrowType = 'connected';

    const mouseOverFunction = (): void => {
      if (link.edge_type === 'down') {
        arrowType = 'connectedflat';
      }
      d3element.select('.link').classed('hovering', true).classed(arrowType, true);
      this.linkService.hoveredLink([link]);
    };

    const mouseOutFunction = (): void => {
      d3element.select('.link').classed('hovering', false).classed(arrowType, false);
    };

    d3element.on('mouseover', mouseOverFunction).on('mouseout', mouseOutFunction);

  }


  /** A method to bind click events to an svg element */
  // emits the node for other components to listen for
  applyClickableNodeBehaviour = (element, node: Node, graph: ForceDirectedGraph) =>  {
 /*   const d3element = d3.select(element);
    const svg = d3.select('svg');

    const clickFunction = (): void => {
      if (d3.event.defaultPrevented) return;
      this.nodeMenuController.hideMenus()
//      let d3node = d3element.select('circle');
  //    d3node.classed('clicked', !d3node.classed('clicked'));
      d3.event.stopPropagation();
    };

    svg.on('mousedown', clickFunction);*/
  }

  /** A method to bind click events to an svg element */
    // emits the link for other components to listen for
  applyClickableLinkBehaviour = (element, link: Link, graph: ForceDirectedGraph) =>  {
    const d3element = d3.select(element);
    let arrowType = 'clicked-arrow';

    const clickFunction = (): void => {
      if (link.edge_type === 'down') {
        arrowType = 'clicked-flat';
      }
      const d3link = d3element.select('.link');
      if (d3link.classed('clicked')) {
        d3element.select('.link').classed('clicked', false).classed(arrowType, false);
        this.linkService.clickedLinks(link);
      } else {
        d3element.select('.link').classed('clicked', true).classed(arrowType, true);
        this.linkService.removeClickedLink(link);
      }
    };

    d3element.on('click', clickFunction);
  }

  /** The interactable graph we will return
   * This method does not interact with the document, purely physical calculations with d3
   */
  getForceDirectedGraph(nodes: Node[], links: Link[], options: {width, height}) {
    return new ForceDirectedGraph(nodes, links, options);
  }

  _clearNodes(): void {
    d3.selectAll('.link')
      // .classed('clicked', false)
      .classed('not-related', false);
    d3.selectAll('.node-child')
      .classed('connected', false)
      .classed('clicked-parent', false)
      .classed('clicked-neighbor', false)
      .classed('not-related', false);
     // .classed('clicked', false);
  }

  _manualClick(node: Node, graph: ForceDirectedGraph) {
    this._clearNodes();
    let connectedLinks;
    let nonConnectedLinks;
    let connectedNodes;
    let nonConnectedNodes;

    const getNeighborLinks = (e: Link): boolean => {
      return (node.uuid === (typeof (e.source) === 'object' ? e.source.uuid : e.source)
        || node.uuid === (typeof (e.target) === 'object' ? e.target.uuid : e.target));
    };

    const getNonNeighborLinks = (e: Link): boolean => {
      return (node.uuid !== (typeof (e.source) === 'object' ? e.source.uuid : e.source)
        && node.uuid !== (typeof (e.target) === 'object' ? e.target.uuid : e.target));
    };

    const getNeighborNodes = (e: any): boolean => {
      return (connectedLinks.data().map(link => link.target.uuid).indexOf(e.uuid) > -1) ||
        (connectedLinks.data().map(link => link.source.uuid).indexOf(e.uuid) > -1);
    };

    const getNotNeighborNodes = (e: any): boolean => {
      return (connectedLinks.data().map(link => link.target.uuid).indexOf(e.uuid) === -1) &&
        (connectedLinks.data().map(link => link.source.uuid).indexOf(e.uuid) === -1);
    };

    // highlight links
    connectedLinks = d3.selectAll('.link')
      .data(graph.links)
      .filter(getNeighborLinks)
      .classed('clicked', true);

    nonConnectedLinks = d3.selectAll('.link')
      .data(graph.links)
      .filter(getNonNeighborLinks)
      .classed('not-related', true);

    nonConnectedNodes = d3.selectAll('.node-child')
      .data(graph.nodes)
      .filter(getNotNeighborNodes)
      .classed('not-related', true);

    // highlight neighbor nodes
    connectedNodes = d3.selectAll('.node-child')
      .data(graph.nodes)
      .filter(getNeighborNodes)
      .classed('clicked-neighbor', true);

    // highlight parent
    const parent = d3.selectAll('.node-child')
      .data(graph.nodes)
      .filter(d => d.uuid === node.uuid)
      .classed('clicked-neighbor', true)
      .classed('not-related', false);

    // this.zoomFit(parent);
    // console.log(parent);
    // console.log(node);
    // this.zoomFit2(node, parent);
  }

}
