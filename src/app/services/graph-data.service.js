"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var d3_1 = require("../d3");
var GraphDataService = (function () {
    /*
      // service command
      nodeClick(node:String) {
        this.nodeHistory.push(node);
          this._nodeHistorySource.next(this.nodeHistory);
      }*/
    function GraphDataService(dataConnectionService, messageService) {
        var _this = this;
        this.dataConnectionService = dataConnectionService;
        this.messageService = messageService;
        this.graph = {
            nodes: [],
            links: []
        };
        this.history = [];
        // Observable navItem source
        this._nodeHistorySource = new rxjs_1.Subject();
        this._linkHistorySource = new rxjs_1.Subject();
        this._graphHistorySource = new rxjs_1.Subject();
        this.nodeMap = new Map();
        this.linkMap = new Map();
        this.historyMap = new Map();
        this.eventMap = new Map();
        // Observable navItem stream
        this.nodehistory$ = this._nodeHistorySource.asObservable();
        this.linkhistory$ = this._linkHistorySource.asObservable();
        this.graphhistory$ = this._graphHistorySource.asObservable();
        this.dataConnectionService.messages.subscribe(function (msg) {
            var response = JSON.parse(msg);
            switch (response.type) {
                case 'expand':
                case 'load': {
                    //  let bytes = encoder.encode(msg);
                    // this.webWorkerService.reportParser.postMessage(bytes.buffer, [bytes.buffer]);
                    var records = response.data._fields;
                    if (records.length == 0) {
                        console.error(response);
                    }
                    else {
                        _this.parseRecords(records, response.type);
                    }
                    break;
                }
            }
        });
    }
    GraphDataService.prototype.parseRecords = function (records, event) {
        var _this = this;
        for (var _i = 0, records_1 = records; _i < records_1.length; _i++) {
            var r = records_1[_i];
            //r.start and r.end are the nodes if an object is a relationship -- this saves them as nodes
            if (r.start && r.start.identity) {
                this.nodeMap.set(r.start.identity.low, this.makeNode(r.start.identity.low, r.start));
            }
            if (r.end && r.end.identity) {
                this.nodeMap.set(r.end.identity.low, this.makeNode(r.end.identity.low, r.end));
            }
            //this covers the relationship itself, and creates the link object
            if (r.segments) {
                for (var _a = 0, _b = r.segments; _a < _b.length; _a++) {
                    var l = _b[_a];
                    //make link
                    var start = this.makeNode(l.start.identity.low, l.start);
                    var end = this.makeNode(l.end.identity.low, l.end);
                    start.linkCount++;
                    end.linkCount++;
                    //  this.nodes.
                    //todo make sure link doesn't already exist
                    var id = start.id.toString().concat(end.id.toString());
                    var newLink = this.linkMap.get(id);
                    if (newLink) {
                        if (newLink.id == id) {
                            console.error("they're the same!");
                            console.log(newLink.type);
                            console.log(r.type);
                        }
                    }
                    else {
                        newLink = new d3_1.Link(start.id, end.id, l.relationship.type, l.properties, id);
                        this.linkMap.set(id, newLink);
                    }
                    this.nodeMap.set(l.start.identity.low, start);
                    this.nodeMap.set(l.end.identity.low, end);
                }
            }
            else {
                //this covers nodes from a nearest neighbor search
                if (!r.start && !r.end) {
                    this.nodeMap.set(r.identity.low, this.makeNode(r.identity.low, r));
                }
                else {
                    //this makes the links from a nearest node search
                    //once the graph has uuids, this will be much easier
                    var start = this.makeNode(r.start.low, {});
                    var end = this.makeNode(r.end.low, {});
                    start.linkCount++;
                    end.linkCount++;
                    //todo make sure link doesn't already exist
                    var id = start.id.toString().concat(end.id.toString());
                    var newLink = this.linkMap.get(id);
                    if (newLink) {
                        if (newLink.id == id) {
                            //      console.error("they're the same!");
                            //      console.log(newLink.type);
                            //     console.log(r.type);
                        }
                    }
                    else {
                        newLink = new d3_1.Link(start.id, end.id, r.type, r.properties, id);
                        this.linkMap.set(id, newLink);
                    }
                    this.nodeMap.set(r.start.low, start);
                    this.nodeMap.set(r.end.low, end);
                }
            }
        }
        var newNodes = this.nodeMap.values().slice().sort(function (n1, n2) {
            if (n1.linkCount > n2.linkCount) {
                return 1;
            }
            if (n1.linkCount < n2.linkCount) {
                return -1;
            }
            return 0;
        });
        var newLinks = this.linkMap.values().slice();
        var diff = {
            removedNodes: this.graph.nodes.filter(function (node) { return newNodes.indexOf(node) === -1; }),
            addedNodes: newNodes.filter(function (node) { return _this.graph.nodes.indexOf(node) === -1; }),
            removedLinks: this.graph.links.filter(function (link) { return newLinks.indexOf(link) === -1; }),
            addedLinks: newLinks.filter(function (link) { return _this.graph.links.indexOf(link) === -1; })
        };
        if (this.histData) {
            var nodeHistory = this.historyMap.get(this.histData.node);
            if (nodeHistory) {
                var eventHistory = nodeHistory.get(this.histData.event.type + '-' + this.histData.event.label);
                //todo: this should always exist since the histData.event object is initialized with an empty diff object
                if (eventHistory) {
                    //push added or removed nodes
                    this.histData.event.diff.addedNodes = this.histData.event.diff.addedNodes.concat(diff.addedNodes);
                    this.histData.event.diff.removedNodes = this.histData.event.diff.removedNodes.concat(diff.removedNodes);
                    this.histData.event.diff.addedLinks = this.histData.event.diff.addedLinks.concat(diff.addedLinks);
                    this.histData.event.diff.removedLinks = this.histData.event.diff.removedLinks.concat(diff.removedLinks);
                }
            }
            else {
                var events = new Map();
                events.set(this.histData.event.type + '-' + this.histData.event.label, this.histData.event.diff);
                this.historyMap.set(this.histData.node, events);
            }
        }
        diff.removedNodes.forEach(function (node) { return _this.graph.nodes.splice(_this.graph.nodes.indexOf(node), 1); });
        diff.addedNodes.forEach(function (node) { return _this.graph.nodes.push(node); });
        diff.removedLinks.forEach(function (link) { return _this.graph.links.splice(_this.graph.links.indexOf(link), 1); });
        diff.addedLinks.forEach(function (link) { return _this.graph.links.push(link); });
        // this.graph.links = newLinks;
        //  this.historyService.setNodes(this.nodes);
        // this.historyService.setLinks(this.links);
        // this.graph.push({graph, event});
        this._graphHistorySource.next(this.graph);
    };
    //searches to see if a node exists. if it does, it returns the node with the sent data merged, if it doesn't exist, it makes a new node with the data
    GraphDataService.prototype.makeNode = function (id, data) {
        return this.nodeMap.get(id) ? Object.assign(this.nodeMap.get(id), data) : new d3_1.Node(id, data, data.labels);
    };
    GraphDataService.prototype.graphRevert = function () {
        this._graphHistorySource.next(this.graph);
    };
    GraphDataService.prototype.setGraph = function (nodes, links) {
        this.graph = { nodes: nodes, links: links };
        this._graphHistorySource.next(this.graph);
    };
    GraphDataService.prototype.clearGraph = function () {
        this.nodeMap.clear();
        this.linkMap.clear();
        this.graph.links = [];
        this.graph.nodes = [];
    };
    GraphDataService.prototype.setNodes = function (nodes) {
        //these are set on node click as well, but there is no way to track the origin
        this.graph.nodes = nodes;
        this._graphHistorySource.next(this.graph);
    };
    GraphDataService.prototype.setLinks = function (links) {
        this.graph.links = links;
        this._graphHistorySource.next(this.graph);
    };
    GraphDataService.prototype.nodeExpand = function (id, properties) {
        var message = this.messageService.getMessage(id, "expand", properties);
        var event = {
            type: "expand",
            label: properties,
            diff: { addedNodes: [],
                removedNodes: [],
                addedLinks: [],
                removedLinks: []
            }
        };
        this.histData = { node: id, event: event };
        this.dataConnectionService.messages.next(message);
    };
    GraphDataService.prototype.nodeCollapse = function (node, label) {
        var _this = this;
        console.log(node);
        console.log(label);
        console.log(this.historyMap);
        //get the expand object to delete the nodes added
        var diff = this.historyMap.get(node.id).get('expand-' + node.labels[0]);
        console.log(diff);
        diff.addedLinks.forEach(function (link) { return _this.graph.links.splice(_this.graph.links.indexOf(link), 1); });
        diff.addedNodes.forEach(function (node) { return _this.graph.nodes.splice(_this.graph.nodes.indexOf(node), 1); });
        //diff.added.forEach(node => this.graph.links.splice(this.graph.links.indexOf(node), 1));
        this._graphHistorySource.next(this.graph);
        /*    let removedLinks = this.graph.links.filter(link => link.source.id == node.id || link.target.id == node.id);
            removedLinks.forEach(link => {
              console.log(link);
              this.graph.links.splice(this.graph.links.indexOf(link), 1);
            });*/
        /*    const diff = {
              removedLinks: this.graph.links.filter(link => link.source.id == node.id || link.target.id == node.id),
            };*/
        /*
            diff.added.forEach(node => this.nodes.push(node));*/
        /*console.log(diff);
            diff.removedLinks.forEach(link => {
              console.log(link);
              this.graph.links.splice(this.graph.links.indexOf(link), 1);
              /!*if(link.source !== node) {
                console.log(link.source);
                this.graph.nodes.splice(this.graph.nodes.indexOf(link.source), 1);
              }
              if(link.target !== node) {
                console.log(link.target);
                this.graph.nodes.splice(this.graph.nodes.indexOf(link.target), 1);
              }*!/
              //todo need to redraw each node, because the link count will change
            });
        */
        //should be watched by graph service and pushed into from app;
    };
    return GraphDataService;
}());
GraphDataService = __decorate([
    core_1.Injectable()
], GraphDataService);
exports.GraphDataService = GraphDataService;
