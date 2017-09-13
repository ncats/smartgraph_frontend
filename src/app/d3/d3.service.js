"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _1 = require("./");
var d3 = require("d3");
var D3Service = (function () {
    /** This service will provide methods to enable user interaction with elements
     * while maintaining the d3 simulations physics
     */
    // @Output() nodeClicked: EventEmitter<Node> = new EventEmitter<Node>();
    function D3Service(nodeService, nodeMenuController) {
        var _this = this;
        this.nodeService = nodeService;
        this.nodeMenuController = nodeMenuController;
        /** A method to bind click events to an svg element */
        //just emits the node for other components to listen for
        this.applyClickableBehaviour = function (element, node, graph) {
            var d3element = d3.select(element);
            var svg = d3.select('svg');
            var toggleMenu = function () {
                console.log(node);
                if (node['menu'] == true) {
                    console.log(node['menu']);
                    _this.nodeMenuController.toggleVisible(false);
                    node['menu'] = false;
                }
                else {
                    _this.nodeMenuController.toggleVisible(true);
                    graph.nodes.map(function (node) { return node['menu'] = false; });
                    node['menu'] = true;
                }
            };
            var decorateNodes = function () {
                /*   d3.selectAll('circle')
                     .data(graph.nodes)
                     .filter(getNeighborNodes) //this will pass each node in the graph to the function
                     .classed('connected', true);
             
                   //sets click coloring on current node
                   d3element.select("circle").classed("clicked", false);*/
            };
            var clickFunction = function () {
                _this.nodeService.changeNode(node);
                toggleMenu();
                //todo: this may be less necessary with the menu opening
                //decorateNodes();
                d3.event.stopPropagation();
            };
            var clearMenu = function () {
                graph.nodes.map(function (node) { return node['menu'] = false; });
                _this.nodeMenuController.toggleVisible(false);
            };
            svg.on("click", clearMenu);
            d3element.on("click", clickFunction);
        };
    }
    /** A method to bind a pan and zoom behaviour to an svg element */
    D3Service.prototype.applyZoomableBehaviour = function (svgElement, containerElement) {
        var svg, container, zoomed, zoom;
        svg = d3.select(svgElement);
        container = d3.select(containerElement);
        zoomed = function () {
            var transform = d3.event.transform;
            container.attr("transform", "translate(" + transform.x + "," + transform.y + ") scale(" + transform.k + ")");
        };
        zoom = d3.zoom().on("zoom", zoomed);
        svg.call(zoom);
    };
    /** A method to bind a draggable behaviour to an svg element */
    D3Service.prototype.applyDraggableBehaviour = function (element, node, graph) {
        var d3element = d3.select(element);
        function started() {
            if (!d3.event.active) {
                graph.simulation.alphaTarget(0.3).restart();
            }
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
    };
    /** A method to bind hoverable behaviour to an svg element */
    D3Service.prototype.applyHoverableBehaviour = function (element, node, graph) {
        var _this = this;
        var d3element = d3.select(element);
        var connectedLinks;
        var maximalLinks = [];
        var decorateNodes = function () {
            d3element.select('circle').classed('hovering', true);
            // /node.hovered=true;
            /* d3element.selectAll('.tooltip').transition().duration(200)
               .style("opacity", .9).attr('z-index', 666);*/
            d3.selectAll('circle')
                .data(graph.nodes)
                .filter(getNeighborNodes) //this will pass each node in the graph to the function
                .classed('connected', true);
        };
        var decorateLinks = function () {
            connectedLinks = d3.selectAll('line')
                .data(graph.links)
                .filter(getNeighborLinks)
                .classed('connected', true);
            var connectedNodes = d3.selectAll('circle')
                .data(graph.nodes)
                .filter(getNeighborNodes)
                .classed('connected', true);
            connectedLinks.filter(findMaximalLinks)
                .classed('maximal', true);
            connectedNodes.filter(findMaximalNodes)
                .classed('maximal', true);
        };
        var clearNodes = function () {
            d3element.select('circle').classed('hovering', false);
            node.hovered = false;
            /* d3element.select('.tooltip').transition().duration(500)
               .style("opacity", 0);*/
        };
        var clearLinks = function () {
            d3.selectAll('line')
                .classed('connected', false)
                .classed('maximal', false);
            d3.selectAll('circle')
                .classed('connected', false)
                .classed('maximal', false);
        };
        var getNeighborLinks = function (e) {
            return node.id === (typeof (e.source) == "object" ? e.source.id : e.source) || node.id === (typeof (e.target) == "object" ? e.target.id : e.target);
        };
        var getNeighborNodes = function (e) {
            var sources = connectedLinks.data().map(function (link) { return link.source.id; });
            var targets = connectedLinks.data().map(function (link) { return link.target.id; });
            var nodesList = sources.concat(targets).reduce(function (x, y) { return x.includes(y) ? x : x.concat([y]); }, []);
            return nodesList.indexOf(e.id) > -1;
        };
        var findMaximalLinks = function (e) {
            if (e.properties && e.properties.maximal && e.properties.maximal == "t") {
                maximalLinks = maximalLinks.concat([e.source.id, e.target.id]).reduce(function (x, y) { return x.includes(y) ? x : x.concat([y]); }, []);
                return true;
            }
            else {
                return false;
            }
        };
        var findMaximalNodes = function (e) {
            return maximalLinks.indexOf(e.id) > -1;
        };
        var mouseOverFunction = function () {
            _this.nodeService.hoveredNode(node);
            decorateLinks();
            decorateNodes();
        };
        var mouseOutFunction = function () {
            clearNodes();
            clearLinks();
        };
        d3element.on("mouseover", mouseOverFunction);
        d3element.on("mouseout", mouseOutFunction);
    };
    /** The interactable graph we will simulate in this article
     * This method does not interact with the document, purely physical calculations with d3
     */
    D3Service.prototype.getForceDirectedGraph = function (nodes, links, options) {
        return new _1.ForceDirectedGraph(nodes, links, options);
    };
    return D3Service;
}());
D3Service = __decorate([
    core_1.Injectable()
], D3Service);
exports.D3Service = D3Service;
