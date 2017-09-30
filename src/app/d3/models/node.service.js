"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by sheilstk on 6/16/17.
 */
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var NodeService = (function () {
    function NodeService() {
        // Observable navItem source
        this._clickedNodeSource = new rxjs_1.Subject();
        this._hoveredNodeSource = new rxjs_1.Subject();
        // Observable navItem stream
        this.clickednode$ = this._clickedNodeSource.asObservable();
        this.hoverednode$ = this._hoveredNodeSource.asObservable();
    }
    // service command
    NodeService.prototype.changeNode = function (node) {
        //  console.log(node);
        this._clickedNodeSource.next(node);
    };
    NodeService.prototype.hoveredNode = function (node) {
        this._hoveredNodeSource.next(node);
    };
    return NodeService;
}());
NodeService = __decorate([
    core_1.Injectable()
], NodeService);
exports.NodeService = NodeService;
