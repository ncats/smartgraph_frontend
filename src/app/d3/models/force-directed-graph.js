"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var d3 = require("d3");
var FORCES = {
    LINKS: 1 / 50,
    //gets rid of overlap [0,1]
    COLLISION: 1,
    // A positive value causes nodes to attract each other, similar to gravity, while a negative value causes nodes to repel each other, similar to electrostatic charge.
    CHARGE: -2
};
var ForceDirectedGraph = (function () {
    function ForceDirectedGraph(nodes, links, options) {
        this.ticker = new core_1.EventEmitter();
        this.nodes = [];
        this.links = [];
        this.nodes = nodes;
        this.links = links;
        this.initSimulation(options);
    }
    ForceDirectedGraph.prototype.initNodes = function () {
        if (!this.simulation) {
            throw new Error('simulation was not initialized yet');
        }
        this.simulation.nodes(this.nodes);
    };
    ForceDirectedGraph.prototype.initLinks = function () {
        if (!this.simulation) {
            throw new Error('simulation was not initialized yet');
        }
        this.simulation.force('link', d3.forceLink(this.links)
            .id(function (d) { return d['id']; })
            .distance(155));
        //this is necessary to bind the link data to the graph. The node is attached by the hover directive
        this.simulation.force('link').links(this.links);
    };
    ForceDirectedGraph.prototype.initSimulation = function (options) {
        if (!options || !options.width || !options.height) {
            throw new Error('missing options when initializing simulation');
        }
        /** Creating the simulation */
        if (!this.simulation) {
            var ticker_1 = this.ticker;
            this.simulation = d3.forceSimulation()
                .force("charge", d3.forceManyBody()
                .strength(function (d) { return FORCES.CHARGE * d['r']; }))
                .force("collide", d3.forceCollide()
                .strength(FORCES.COLLISION)
                .radius(function (d) { return d['r'] + 5; }));
            // Connecting the d3 ticker to an angular event emitter
            this.simulation.on('tick', function () {
                ticker_1.emit(this);
            });
            this.initNodes();
            this.initLinks();
            //  this.simulation.stop();
        }
        /** Updating the central force of the simulation */
        this.simulation.force("center", d3.forceCenter(options.width / 2, options.height / 2));
        /** Restarting the simulation internal timer */
        this.simulation.restart();
    };
    return ForceDirectedGraph;
}());
exports.ForceDirectedGraph = ForceDirectedGraph;
