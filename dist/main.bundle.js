webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "mat-sidenav {\n  width: 25%;\n}\n\n.mat-drawer-container {\n  /*\n  height: 65vh;\n  */\n}\n\n.sidenavToggle{\n  position: absolute !important;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<smrtgraph-menu></smrtgraph-menu>\n<mat-sidenav-container class = \"upperSection\">\n  <button type=\"button\" class=\"sidenavToggle\" mat-raised-button [color]=\"'accent'\" (click)=\"sidenav.toggle()\">\n    <mat-icon>menu</mat-icon>\n  </button>\n  <mat-sidenav #sidenav [mode]=\"'side'\" [opened]=\"true\" class = \"upperSection\" >\n    <!-- sidenav content -->\n    <smrtgraph-search ></smrtgraph-search>\n  </mat-sidenav>\n  <!-- primary content -->\n  <graph class = \"upperSection\"></graph>\n\n  <mat-sidenav #settingsToggle [mode]=\"'over'\" position=\"end\">\n    <app-smrtgraph-settings></app-smrtgraph-settings>\n  </mat-sidenav>\n\n</mat-sidenav-container>\n\n<div fxLayout=\"row\" fxLayoutGap=\"10px\" class = \"link-list-row\">\n  <div fxFlex=\"100\">\n<app-graph-details></app-graph-details>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__("../../../../../src/app/services/loading.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_settings_service__ = __webpack_require__("../../../../../src/app/services/settings.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(loadingService, settingsService) {
        this.loadingService = loadingService;
        this.settingsService = settingsService;
        this.title = 'smrtgraph';
        this.loading = true;
        this.loadingService.toggleVisible(true);
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        this.settingsService.sidenav = this.settingsToggle;
    };
    AppComponent.prototype.ngOnDestroy = function () {
        //  prevent memory leak when component is destroyed
        //  this.subscription.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('settingsToggle'),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "settingsToggle", void 0);
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewEncapsulation */].None,
            preserveWhitespaces: false,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_2__services_settings_service__["a" /* SettingsService */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var CONFIG = {
    N: 50,
    SPECTRUM: [
        //  "rgb(222,237,250)"
        'rgb(176,212,243)',
        'rgb(128,186,236)',
        'rgb(77,158,228)',
        'rgb(38,137,223)',
        'rgb(0,116,217)',
        'rgb(0,106,197)'
        //  "rgb(0,94,176)"
        //  "rgb(0,82,154)"
        //  "rgb(0,60,113)"
    ]
};
/* harmony default export */ __webpack_exports__["a"] = (CONFIG);


/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__ = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_material_material_module__ = __webpack_require__("../../../../../src/assets/material/material.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__d3_d3_service__ = __webpack_require__("../../../../../src/app/d3/d3.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__d3_models_node_service__ = __webpack_require__("../../../../../src/app/d3/models/node.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__visuals_graph_graph_component__ = __webpack_require__("../../../../../src/app/visuals/graph/graph.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__visuals_shared_node_visual_node_visual_component__ = __webpack_require__("../../../../../src/app/visuals/shared/node-visual/node-visual.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__visuals_shared_link_visual_link_visual_component__ = __webpack_require__("../../../../../src/app/visuals/shared/link-visual/link-visual.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_websocket_service__ = __webpack_require__("../../../../../src/app/services/websocket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_data_connection_service__ = __webpack_require__("../../../../../src/app/services/data-connection.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__visuals_details_node_details_visual_node_details_visual_component__ = __webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-details-visual.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__visuals_shared_node_menu_node_menu_component__ = __webpack_require__("../../../../../src/app/visuals/shared/node-menu/node-menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_node_menu_controller_service__ = __webpack_require__("../../../../../src/app/services/node-menu-controller.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_graph_data_service__ = __webpack_require__("../../../../../src/app/services/graph-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__smrtgraph_search_smrtgraph_search_component__ = __webpack_require__("../../../../../src/app/smrtgraph-search/smrtgraph-search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__smrtgraph_menu_smrtgraph_menu_component__ = __webpack_require__("../../../../../src/app/smrtgraph-menu/smrtgraph-menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__download_button_download_button_component__ = __webpack_require__("../../../../../src/app/download-button/download-button.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__d3_models_link_service__ = __webpack_require__("../../../../../src/app/d3/models/link.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__d3_directives_zoomable_directive__ = __webpack_require__("../../../../../src/app/d3/directives/zoomable.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__d3_directives_hoverable_link_directive__ = __webpack_require__("../../../../../src/app/d3/directives/hoverable-link.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__d3_directives_hoverable_node_directive__ = __webpack_require__("../../../../../src/app/d3/directives/hoverable-node.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__d3_directives_draggable_directive__ = __webpack_require__("../../../../../src/app/d3/directives/draggable.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__d3_directives_clickable_node_directive__ = __webpack_require__("../../../../../src/app/d3/directives/clickable-node.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__visuals_details_graph_details_graph_details_component__ = __webpack_require__("../../../../../src/app/visuals/details/graph-details/graph-details.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__services_loading_service__ = __webpack_require__("../../../../../src/app/services/loading.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__visuals_details_node_details_visual_node_types_compound_detail_view_compound_detail_view_component__ = __webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-types/compound-detail-view/compound-detail-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__visuals_details_node_details_visual_node_types_pattern_detail_view_pattern_detail_view_component__ = __webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-types/pattern-detail-view/pattern-detail-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__visuals_details_link_list_visual_link_list_visual_component__ = __webpack_require__("../../../../../src/app/visuals/details/link-list-visual/link-list-visual.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__visuals_details_link_list_visual_reaction_visual_reaction_visual_component__ = __webpack_require__("../../../../../src/app/visuals/details/link-list-visual/reaction-visual/reaction-visual.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__services_settings_service__ = __webpack_require__("../../../../../src/app/services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__smrtgraph_settings_smrtgraph_settings_component__ = __webpack_require__("../../../../../src/app/smrtgraph-settings/smrtgraph-settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__visuals_details_node_details_visual_node_types_target_detail_view_target_detail_view_component__ = __webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-types/target-detail-view/target-detail-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__d3_directives_clickable_link_directive__ = __webpack_require__("../../../../../src/app/d3/directives/clickable-link.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__services_node_expand_service__ = __webpack_require__("../../../../../src/app/services/node-expand.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







































var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_9__visuals_graph_graph_component__["a" /* GraphComponent */],
                __WEBPACK_IMPORTED_MODULE_15__visuals_details_node_details_visual_node_details_visual_component__["a" /* NodeDetailsVisualComponent */],
                __WEBPACK_IMPORTED_MODULE_16__visuals_shared_node_menu_node_menu_component__["a" /* NodeMenuComponent */],
                __WEBPACK_IMPORTED_MODULE_10__visuals_shared_node_visual_node_visual_component__["b" /* StructureViewer */],
                __WEBPACK_IMPORTED_MODULE_20__smrtgraph_menu_smrtgraph_menu_component__["a" /* SmrtgraphMenuComponent */],
                __WEBPACK_IMPORTED_MODULE_19__smrtgraph_search_smrtgraph_search_component__["a" /* SmrtgraphSearchComponent */],
                __WEBPACK_IMPORTED_MODULE_21__download_button_download_button_component__["a" /* DownloadButtonComponent */],
                __WEBPACK_IMPORTED_MODULE_10__visuals_shared_node_visual_node_visual_component__["a" /* NodeVisualComponent */],
                __WEBPACK_IMPORTED_MODULE_11__visuals_shared_link_visual_link_visual_component__["a" /* LinkVisualComponent */],
                __WEBPACK_IMPORTED_MODULE_23__d3_directives_zoomable_directive__["a" /* ZoomableDirective */],
                __WEBPACK_IMPORTED_MODULE_24__d3_directives_hoverable_link_directive__["a" /* HoverableLinkDirective */],
                __WEBPACK_IMPORTED_MODULE_25__d3_directives_hoverable_node_directive__["a" /* HoverableNodeDirective */],
                __WEBPACK_IMPORTED_MODULE_26__d3_directives_draggable_directive__["a" /* DraggableDirective */],
                __WEBPACK_IMPORTED_MODULE_27__d3_directives_clickable_node_directive__["a" /* ClickableNodeDirective */],
                __WEBPACK_IMPORTED_MODULE_37__d3_directives_clickable_link_directive__["a" /* ClickableLinkDirective */],
                __WEBPACK_IMPORTED_MODULE_28__visuals_details_graph_details_graph_details_component__["a" /* GraphDetailsComponent */],
                __WEBPACK_IMPORTED_MODULE_36__visuals_details_node_details_visual_node_types_target_detail_view_target_detail_view_component__["a" /* TargetDetailViewComponent */],
                __WEBPACK_IMPORTED_MODULE_30__visuals_details_node_details_visual_node_types_compound_detail_view_compound_detail_view_component__["a" /* CompoundDetailViewComponent */],
                __WEBPACK_IMPORTED_MODULE_31__visuals_details_node_details_visual_node_types_pattern_detail_view_pattern_detail_view_component__["a" /* PatternDetailViewComponent */],
                __WEBPACK_IMPORTED_MODULE_32__visuals_details_link_list_visual_link_list_visual_component__["a" /* LinkListVisualComponent */],
                __WEBPACK_IMPORTED_MODULE_33__visuals_details_link_list_visual_reaction_visual_reaction_visual_component__["a" /* ReactionVisualComponent */],
                __WEBPACK_IMPORTED_MODULE_35__smrtgraph_settings_smrtgraph_settings_component__["a" /* SmrtgraphSettingsComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["i" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_5__assets_material_material_module__["a" /* MaterialModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__["a" /* FlexLayoutModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_12__services_websocket_service__["a" /* WebSocketService */],
                __WEBPACK_IMPORTED_MODULE_13__services_data_connection_service__["a" /* DataConnectionService */],
                __WEBPACK_IMPORTED_MODULE_6__d3_d3_service__["a" /* D3Service */],
                __WEBPACK_IMPORTED_MODULE_7__d3_models_node_service__["a" /* NodeService */],
                __WEBPACK_IMPORTED_MODULE_22__d3_models_link_service__["a" /* LinkService */],
                __WEBPACK_IMPORTED_MODULE_14__services_message_service__["a" /* MessageService */],
                __WEBPACK_IMPORTED_MODULE_18__services_graph_data_service__["a" /* GraphDataService */],
                __WEBPACK_IMPORTED_MODULE_17__services_node_menu_controller_service__["a" /* NodeMenuControllerService */],
                __WEBPACK_IMPORTED_MODULE_29__services_loading_service__["a" /* LoadingService */],
                __WEBPACK_IMPORTED_MODULE_34__services_settings_service__["a" /* SettingsService */],
                __WEBPACK_IMPORTED_MODULE_38__services_node_expand_service__["b" /* NodeExpandService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/d3/d3.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return D3Service; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_force_directed_graph__ = __webpack_require__("../../../../../src/app/d3/models/force-directed-graph.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3__ = __webpack_require__("../../../../d3/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_node_service__ = __webpack_require__("../../../../../src/app/d3/models/node.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_link_service__ = __webpack_require__("../../../../../src/app/d3/models/link.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_node_menu_controller_service__ = __webpack_require__("../../../../../src/app/services/node-menu-controller.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var D3Service = (function () {
    /** This service will provide methods to enable user interaction with elements
     * while maintaining the d3 simulations physics
     */
    function D3Service(nodeService, linkService, nodeMenuController) {
        var _this = this;
        this.nodeService = nodeService;
        this.linkService = linkService;
        this.nodeMenuController = nodeMenuController;
        /** A method to bind click events to an svg element */
        // emits the node for other components to listen for
        this.applyClickableNodeBehaviour = function (element, node, graph) {
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
        };
        /** A method to bind click events to an svg element */
        // emits the link for other components to listen for
        this.applyClickableLinkBehaviour = function (element, link, graph) {
            var d3element = __WEBPACK_IMPORTED_MODULE_2_d3__["j" /* select */](element);
            var svg = __WEBPACK_IMPORTED_MODULE_2_d3__["j" /* select */]('svg');
            var arrowType = 'connected';
            var clickFunction = function () {
                if (link.edgeType == 'up') {
                    arrowType = 'connectedflat';
                }
                var d3link = d3element.select('.link');
                d3link.classed('clicked', !d3link.classed('clicked')).classed(arrowType, !d3link.classed(arrowType));
                if (d3link.classed('clicked')) {
                    _this.linkService.clickedLinks(link);
                }
                else {
                    _this.linkService.removeClickedLink(link);
                }
            };
            d3element.on('click', clickFunction);
        };
    }
    /** A method to bind a pan and zoom behaviour to an svg element */
    D3Service.prototype.applyZoomableBehaviour = function (svgElement, containerElement) {
        var svg, container, zoomed, zoom;
        svg = __WEBPACK_IMPORTED_MODULE_2_d3__["j" /* select */](svgElement);
        container = __WEBPACK_IMPORTED_MODULE_2_d3__["j" /* select */](containerElement);
        zoomed = function () {
            container.attr('transform', __WEBPACK_IMPORTED_MODULE_2_d3__["b" /* event */].transform);
        };
        zoom = __WEBPACK_IMPORTED_MODULE_2_d3__["l" /* zoom */]()
            .on('zoom', zoomed);
        svg.call(zoom);
    };
    /** A method to bind a draggable behaviour to an svg element */
    D3Service.prototype.applyDraggableBehaviour = function (element, node, graph) {
        var d3element = __WEBPACK_IMPORTED_MODULE_2_d3__["j" /* select */](element);
        var started = function () {
            __WEBPACK_IMPORTED_MODULE_2_d3__["b" /* event */].sourceEvent.stopPropagation();
            if (!__WEBPACK_IMPORTED_MODULE_2_d3__["b" /* event */].active) {
                graph.simulation.alphaTarget(0.3).restart();
            }
        };
        function dragged() {
            node.fx = __WEBPACK_IMPORTED_MODULE_2_d3__["b" /* event */].x;
            node.fy = __WEBPACK_IMPORTED_MODULE_2_d3__["b" /* event */].y;
        }
        var ended = function () {
            __WEBPACK_IMPORTED_MODULE_2_d3__["b" /* event */].sourceEvent.stopPropagation();
            if (!__WEBPACK_IMPORTED_MODULE_2_d3__["b" /* event */].active) {
                graph.simulation.alphaTarget(0);
            }
            // by not resetting these, the node stays where it is dragged
            /*  node.fx = null;
             node.fy = null;*/
        };
        d3element.call(__WEBPACK_IMPORTED_MODULE_2_d3__["a" /* drag */]()
            .on('start', started)
            .on('drag', dragged)
            .on('end', ended));
    };
    /** A method to bind hoverable behaviour to an svg element */
    D3Service.prototype.applyHoverableNodeBehaviour = function (element, node, graph) {
        var _this = this;
        var d3element = __WEBPACK_IMPORTED_MODULE_2_d3__["j" /* select */](element);
        var connectedLinks;
        var connectedNodes;
        var maximalLinks = [];
        var neighbors = [];
        //  let downstreamNeighbors: Link[] = [];
        var decorateNodes = function () {
            d3element.select('circle').classed('hovering', true);
            connectedLinks = __WEBPACK_IMPORTED_MODULE_2_d3__["k" /* selectAll */]('.link')
                .data(graph.links)
                .filter(getNeighborLinks)
                .classed('hovering', true)
                .classed('connected', function (link) { return link.edgeType != "up"; })
                .classed('connectedflat', function (link) { return link.edgeType === "up"; });
            connectedNodes = __WEBPACK_IMPORTED_MODULE_2_d3__["k" /* selectAll */]('circle')
                .data(graph.nodes)
                .filter(getNeighborNodes)
                .classed('connected', true);
            connectedLinks.filter(findMaximalLinks)
                .classed('maximal', true);
            connectedNodes.filter(findMaximalNodes)
                .classed('maximal', true);
        };
        var clearNodes = function () {
            __WEBPACK_IMPORTED_MODULE_2_d3__["k" /* selectAll */]('.link')
                .classed('connected', false)
                .classed('connectedflat', false)
                .classed('hovering', false)
                .classed('maximal', false);
            __WEBPACK_IMPORTED_MODULE_2_d3__["k" /* selectAll */]('circle')
                .classed('connected', false)
                .classed('hovering', false)
                .classed('maximal', false);
            //    node.params.hovered = false;
        };
        // todo: this is kind of piggybacking on the filter function
        var getNeighborLinks = function (e) {
            var neighbor = (node.uuid === (typeof (e.source) == 'object' ? e.source.uuid : e.source) || node.uuid === (typeof (e.target) == 'object' ? e.target.uuid : e.target));
            if (neighbor == true) {
                neighbors.push(e);
            }
            return node.uuid === (typeof (e.source) == 'object' ? e.source.uuid : e.source);
        };
        var getNeighborNodes = function (e) {
            //  console.log("finding neighbors nodes");
            return connectedLinks.data().map(function (link) { return link.target.uuid; }).indexOf(e.uuid) > -1;
        };
        var findMaximalLinks = function (e) {
            if (e.properties && e.properties.islargest) {
                maximalLinks = maximalLinks.concat([e.source.uuid, e.target.uuid]).reduce(function (x, y) { return x.includes(y) ? x : x.concat([y]); }, []);
                return true;
            }
            else {
                return false;
            }
        };
        var findMaximalNodes = function (e) {
            return maximalLinks.indexOf(e.uuid) > -1;
        };
        // todo: this is called on drag and iterates over the entire graph
        var mouseOverFunction = function () {
            if (__WEBPACK_IMPORTED_MODULE_2_d3__["b" /* event */].defaultPrevented)
                return;
            decorateNodes();
            _this.nodeService.hoveredNode([node]);
            if (neighbors.length > 0) {
                _this.linkService.hoveredLink(neighbors);
            }
        };
        var mouseOutFunction = function () {
            clearNodes();
            neighbors = [];
        };
        // todo: this fires constantly as the node is dragged
        d3element.on('mouseover', mouseOverFunction).on('mouseout', mouseOutFunction);
    };
    /** A method to bind hoverable behaviour to an svg element */
    D3Service.prototype.applyHoverableLinkBehaviour = function (element, link) {
        var _this = this;
        var d3element = __WEBPACK_IMPORTED_MODULE_2_d3__["j" /* select */](element);
        var arrowType = 'connected';
        var mouseOverFunction = function () {
            if (link.edgeType == 'up') {
                arrowType = 'connectedflat';
            }
            d3element.select('.link').classed('hovering', true).classed(arrowType, true);
            _this.linkService.hoveredLink([link]);
        };
        var mouseOutFunction = function () {
            d3element.select('.link').classed('hovering', false).classed(arrowType, false);
        };
        d3element.on('mouseover', mouseOverFunction).on('mouseout', mouseOutFunction);
    };
    /** The interactable graph we will return
     * This method does not interact with the document, purely physical calculations with d3
     */
    D3Service.prototype.getForceDirectedGraph = function (nodes, links, options) {
        return new __WEBPACK_IMPORTED_MODULE_1__models_force_directed_graph__["a" /* ForceDirectedGraph */](nodes, links, options);
    };
    D3Service = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__models_node_service__["a" /* NodeService */],
            __WEBPACK_IMPORTED_MODULE_4__models_link_service__["a" /* LinkService */],
            __WEBPACK_IMPORTED_MODULE_5__services_node_menu_controller_service__["a" /* NodeMenuControllerService */]])
    ], D3Service);
    return D3Service;
}());



/***/ }),

/***/ "../../../../../src/app/d3/directives/clickable-link.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClickableLinkDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_service__ = __webpack_require__("../../../../../src/app/d3/d3.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_force_directed_graph__ = __webpack_require__("../../../../../src/app/d3/models/force-directed-graph.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_link__ = __webpack_require__("../../../../../src/app/d3/models/link.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ClickableLinkDirective = (function () {
    function ClickableLinkDirective(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    ClickableLinkDirective.prototype.ngOnInit = function () {
        this.d3Service.applyClickableLinkBehaviour(this._element.nativeElement, this.link, this.graph);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('clickableLink'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__models_link__["a" /* Link */])
    ], ClickableLinkDirective.prototype, "link", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('draggableInGraph'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__models_force_directed_graph__["a" /* ForceDirectedGraph */])
    ], ClickableLinkDirective.prototype, "graph", void 0);
    ClickableLinkDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[clickableLink]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__d3_service__["a" /* D3Service */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], ClickableLinkDirective);
    return ClickableLinkDirective;
}());



/***/ }),

/***/ "../../../../../src/app/d3/directives/clickable-node.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClickableNodeDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_service__ = __webpack_require__("../../../../../src/app/d3/d3.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_node__ = __webpack_require__("../../../../../src/app/d3/models/node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_force_directed_graph__ = __webpack_require__("../../../../../src/app/d3/models/force-directed-graph.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ClickableNodeDirective = (function () {
    function ClickableNodeDirective(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    ClickableNodeDirective.prototype.ngOnInit = function () {
        this.d3Service.applyClickableNodeBehaviour(this._element.nativeElement, this.node, this.graph);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('clickableNode'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__models_node__["b" /* Node */])
    ], ClickableNodeDirective.prototype, "node", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('draggableInGraph'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__models_force_directed_graph__["a" /* ForceDirectedGraph */])
    ], ClickableNodeDirective.prototype, "graph", void 0);
    ClickableNodeDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[clickableNode]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__d3_service__["a" /* D3Service */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], ClickableNodeDirective);
    return ClickableNodeDirective;
}());



/***/ }),

/***/ "../../../../../src/app/d3/directives/draggable.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DraggableDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_service__ = __webpack_require__("../../../../../src/app/d3/d3.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_node__ = __webpack_require__("../../../../../src/app/d3/models/node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_force_directed_graph__ = __webpack_require__("../../../../../src/app/d3/models/force-directed-graph.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DraggableDirective = (function () {
    function DraggableDirective(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    DraggableDirective.prototype.ngOnInit = function () {
        this.d3Service.applyDraggableBehaviour(this._element.nativeElement, this.node, this.graph);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('draggableNode'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__models_node__["b" /* Node */])
    ], DraggableDirective.prototype, "node", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('draggableInGraph'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__models_force_directed_graph__["a" /* ForceDirectedGraph */])
    ], DraggableDirective.prototype, "graph", void 0);
    DraggableDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[draggableNode]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__d3_service__["a" /* D3Service */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], DraggableDirective);
    return DraggableDirective;
}());



/***/ }),

/***/ "../../../../../src/app/d3/directives/hoverable-link.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HoverableLinkDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_service__ = __webpack_require__("../../../../../src/app/d3/d3.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_link__ = __webpack_require__("../../../../../src/app/d3/models/link.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HoverableLinkDirective = (function () {
    function HoverableLinkDirective(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    HoverableLinkDirective.prototype.ngOnInit = function () {
        this.d3Service.applyHoverableLinkBehaviour(this._element.nativeElement, this.link);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('hoverableLink'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__models_link__["a" /* Link */])
    ], HoverableLinkDirective.prototype, "link", void 0);
    HoverableLinkDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[hoverableLink]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__d3_service__["a" /* D3Service */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], HoverableLinkDirective);
    return HoverableLinkDirective;
}());



/***/ }),

/***/ "../../../../../src/app/d3/directives/hoverable-node.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HoverableNodeDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_service__ = __webpack_require__("../../../../../src/app/d3/d3.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_node__ = __webpack_require__("../../../../../src/app/d3/models/node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_force_directed_graph__ = __webpack_require__("../../../../../src/app/d3/models/force-directed-graph.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HoverableNodeDirective = (function () {
    function HoverableNodeDirective(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    HoverableNodeDirective.prototype.ngOnInit = function () {
        this.d3Service.applyHoverableNodeBehaviour(this._element.nativeElement, this.node, this.graph);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('hoverableNode'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__models_node__["b" /* Node */])
    ], HoverableNodeDirective.prototype, "node", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('draggableInGraph'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__models_force_directed_graph__["a" /* ForceDirectedGraph */])
    ], HoverableNodeDirective.prototype, "graph", void 0);
    HoverableNodeDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[hoverableNode]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__d3_service__["a" /* D3Service */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], HoverableNodeDirective);
    return HoverableNodeDirective;
}());



/***/ }),

/***/ "../../../../../src/app/d3/directives/zoomable.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ZoomableDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_service__ = __webpack_require__("../../../../../src/app/d3/d3.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_force_directed_graph__ = __webpack_require__("../../../../../src/app/d3/models/force-directed-graph.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ZoomableDirective = (function () {
    function ZoomableDirective(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    ZoomableDirective.prototype.ngOnInit = function () {
        this.d3Service.applyZoomableBehaviour(this.containerElement, this._element.nativeElement);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('zoomableOf'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], ZoomableDirective.prototype, "containerElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('draggableInGraph'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__models_force_directed_graph__["a" /* ForceDirectedGraph */])
    ], ZoomableDirective.prototype, "graph", void 0);
    ZoomableDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[zoomableOf]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__d3_service__["a" /* D3Service */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], ZoomableDirective);
    return ZoomableDirective;
}());



/***/ }),

/***/ "../../../../../src/app/d3/models/force-directed-graph.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForceDirectedGraph; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3__ = __webpack_require__("../../../../d3/index.js");


var FORCES = {
    LINKS: 1 / 50,
    //  gets rid of overlap [0,1]
    COLLISION: 1,
    //  A positive value causes nodes to attract each other, similar to gravity, while a negative
    //  value causes nodes to repel each other, similar to electrostatic charge.
    CHARGE: -80
};
var ForceDirectedGraph = (function () {
    function ForceDirectedGraph(nodes, links, options) {
        this.ticker = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.nodes = [];
        this.links = [];
        this.nodes = nodes;
        this.links = links;
        this.initSimulation(options);
    }
    ForceDirectedGraph.prototype.update = function (graph, options) {
        //  frequently the data is separate from the graph image, so these need to be set for downstream filtering
        this.nodes = graph.nodes;
        this.links = graph.links;
        this.simulation.nodes(this.nodes);
        this.simulation.force("link", __WEBPACK_IMPORTED_MODULE_1_d3__["e" /* forceLink */](this.links));
        //    .strength(FORCES.LINKS));
        this.initSimulation(options);
        if (!this.simulation) {
            throw new Error('simulation was not initialized yet');
        }
        //  this.simulation.restart();
        this.simulation.alpha(1).restart();
    };
    ForceDirectedGraph.prototype.initSimulation = function (options) {
        if (!options || !options.width || !options.height) {
            throw new Error('missing options when initializing simulation');
        }
        /** Creating the simulation */
        if (!this.simulation) {
            this.simulation = __WEBPACK_IMPORTED_MODULE_1_d3__["g" /* forceSimulation */]()
                .force('link', __WEBPACK_IMPORTED_MODULE_1_d3__["e" /* forceLink */](this.links).id(function (d) { return d['id']; }))
                .force('charge', __WEBPACK_IMPORTED_MODULE_1_d3__["f" /* forceManyBody */]()
                .strength(function (d) { return FORCES.CHARGE * d['r']; }))
                .force('center', __WEBPACK_IMPORTED_MODULE_1_d3__["c" /* forceCenter */](options.width / 2, options.height / 2))
                .force('collide', __WEBPACK_IMPORTED_MODULE_1_d3__["d" /* forceCollide */]()
                .radius(function (d) { return d['r'] + 5; }).iterations(1)
                .strength(FORCES.COLLISION))
                .force('y', __WEBPACK_IMPORTED_MODULE_1_d3__["i" /* forceY */]().y(function () {
                return Math.random() * ((3 * options.height / 4) -
                    (options.height / 4) + 1) + (options.height / 4);
            }))
                .force('x', __WEBPACK_IMPORTED_MODULE_1_d3__["h" /* forceX */]().x(function (d) {
                if (d.params.startNode === true) {
                    return options.width / 10;
                }
                else if (d.params.endNode === true) {
                    return 19 * options.width / 20;
                }
                else {
                    // todo: this has a tendency to cluster things more vertically does this need to be adjusted?
                    return Math.random() * ((2 * options.width / 3) - (options.width / 3) + 1) + (options.width / 3);
                }
            }));
            var ticker_1 = this.ticker;
            //  Connecting the d3 ticker to an angular event emitter
            this.simulation.on('tick', function () {
                ticker_1.emit(this);
            });
        }
        /** Restarting the simulation internal timer */
        this.simulation.restart();
    };
    return ForceDirectedGraph;
}());



/***/ }),

/***/ "../../../../../src/app/d3/models/link.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__link__ = __webpack_require__("../../../../../src/app/d3/models/link.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by sheilstk on 6/16/17.
 */



var LinkService = (function () {
    function LinkService() {
        //  Observable navItem source
        this._linkSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.masterLinkMap = new Map();
        this.clickedLinkList = [];
        this.hoveredLinkList = [];
        //  Observable navItem stream
        this.linkslist$ = this._linkSource.asObservable();
    }
    //  service command
    LinkService.prototype.clickedLinks = function (link) {
        this.clickedLinkList.push(link);
        this._linkSource.next({
            clicked: this.clickedLinkList,
            hovered: this.hoveredLinkList
        });
    };
    LinkService.prototype.hoveredLink = function (link) {
        if (this.hoveredLinkList.length > 0) {
            this.hoveredLinkList = [];
        }
        (_a = this.hoveredLinkList).push.apply(_a, link);
        this._linkSource.next({
            clicked: this.clickedLinkList,
            hovered: this.hoveredLinkList
        });
        var _a;
    };
    LinkService.prototype.removeClickedLink = function (link) {
        this.clickedLinkList.splice(this.clickedLinkList.indexOf(link), 1);
        this._linkSource.next({
            clicked: this.clickedLinkList,
            hovered: this.hoveredLinkList
        });
    };
    LinkService.prototype.getLinks = function () {
        return this.masterLinkMap;
    };
    LinkService.prototype.getById = function (id) {
        return this.masterLinkMap.get(id);
    };
    LinkService.prototype.setLink = function (link) {
        this.masterLinkMap.set(link.uuid, link);
    };
    // searches to see if a link exists. if it does, it returns the link with the sent data merged,
    // if it doesn't exist, it makes a new link with the data
    LinkService.prototype.makeLink = function (id, source, target, data) {
        var l = this.masterLinkMap.get(id);
        if (!l) {
            l = new __WEBPACK_IMPORTED_MODULE_2__link__["a" /* Link */](source, target, data);
        }
        return l;
    };
    LinkService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], LinkService);
    return LinkService;
}());



/***/ }),

/***/ "../../../../../src/app/d3/models/link.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Reaction */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Link; });
var Reaction = (function () {
    function Reaction(data) {
        var r = data.split('|');
        this.causal = r[0];
        this.mechanism = r[1];
        this.reference = r[2];
        this.confidence = r[3];
    }
    return Reaction;
}());

var Link = (function () {
    function Link(source, target, data) {
        this.reactions = [];
        this.source = source;
        this.target = target;
        this.type = data.type || '';
        this.properties = data.properties;
        this.uuid = data.properties.uuid;
        this.edgeType = data.properties.edgeType;
        this.max_confidence_value = data.properties.max_confidence_value;
        if (data.properties.edgeInfo && data.properties.edgeInfo.length > 0) {
            for (var _i = 0, _a = data.properties.edgeInfo; _i < _a.length; _i++) {
                var reaction = _a[_i];
                this.reactions.push(new Reaction(reaction));
            }
        }
    }
    return Link;
}());



/***/ }),

/***/ "../../../../../src/app/d3/models/node.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node__ = __webpack_require__("../../../../../src/app/d3/models/node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by sheilstk on 6/16/17.
 */






var NodeService = (function () {
    function NodeService() {
        //  Observable navItem source
        this._clickedNodeSource = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["a" /* Subject */]();
        this._hoveredNodeSource = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["a" /* Subject */]();
        this._nodeSource = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["a" /* Subject */]();
        this.masterNodeMap = new Map();
        //  Observable navItem stream
        this.lastNode = {};
        this.clickednode$ = this._clickedNodeSource.asObservable();
        this.hoverednode$ = this._hoveredNodeSource.asObservable();
        this.nodeList$ = this._nodeSource.asObservable();
        this.clickedNodeList = [];
        this.hoveredNodeList = [];
    }
    //  service command
    NodeService.prototype.clickedNodes = function (node) {
        this.clickedNodeList.push(node);
        this._nodeSource.next({
            clicked: this.clickedNodeList,
            hovered: this.hoveredNodeList
        });
        // this will return the single most recent click. That way subscriptions don't updated if hovered nodes change.
        this.changeNode(node);
    };
    NodeService.prototype.hoveredNode = function (node) {
        if (this.hoveredNodeList.length > 0) {
            this.hoveredNodeList = [];
        }
        (_a = this.hoveredNodeList).push.apply(_a, node);
        this._nodeSource.next({
            clicked: this.clickedNodeList,
            hovered: this.hoveredNodeList
        });
        var _a;
    };
    NodeService.prototype.removeClickedNode = function (node) {
        this.clickedNodeList.splice(this.clickedNodeList.indexOf(node), 1);
        this._nodeSource.next({
            clicked: this.clickedNodeList,
            hovered: this.hoveredNodeList
        });
    };
    //  service command
    NodeService.prototype.changeNode = function (node) {
        this._clickedNodeSource.next(node);
    };
    /*  hoveredNode(node: any) {
        this._hoveredNodeSource.next(node);
    
      }*/
    NodeService.prototype.clearNode = function () {
        this._hoveredNodeSource.next();
    };
    NodeService.prototype.getNodes = function () {
        return this.masterNodeMap;
    };
    NodeService.prototype.getById = function (id) {
        return this.masterNodeMap.get(id);
    };
    NodeService.prototype.setNode = function (node) {
        this.masterNodeMap.set(node.uuid, node);
    };
    // searches to see if a node exists. if it does, it returns the node, if it doesn't exist, it makes a new node with the data
    NodeService.prototype.makeNode = function (id, data) {
        var n = this.masterNodeMap.get(id);
        if (!n) {
            if (data.labels) {
                switch (data.labels[0]) {
                    case 'Compound': {
                        n = new __WEBPACK_IMPORTED_MODULE_1__node__["a" /* Compound */](id, data);
                        break;
                    }
                    case 'Target': {
                        n = new __WEBPACK_IMPORTED_MODULE_1__node__["d" /* Target */](id, data);
                        break;
                    }
                    case 'Pattern': {
                        n = new __WEBPACK_IMPORTED_MODULE_1__node__["c" /* Pattern */](id, data);
                        break;
                    }
                    default:
                        n = new __WEBPACK_IMPORTED_MODULE_1__node__["b" /* Node */](id, data);
                }
            }
            else {
                n = new __WEBPACK_IMPORTED_MODULE_1__node__["b" /* Node */](id, data);
            }
        }
        return n;
        // return this.masterNodeMap.get(id) ? this.masterNodeMap.get(id) : new Node(id, data);
    };
    NodeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], NodeService);
    return NodeService;
}());



/***/ }),

/***/ "../../../../../src/app/d3/models/node.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Params */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Compound; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Target; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Pattern; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_config__ = __webpack_require__("../../../../../src/app/app.config.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Params = (function () {
    function Params() {
        this.startNode = false;
        this.endNode = false;
    }
    return Params;
}());

var Node = (function () {
    /*
    * Neo4j has their own uuid that will need to be used to track nodes, since some relationships are sepnt with the start
    * and end nodes notated solely by the Neo4j ids, rather than the full node object
    * */
    function Node(uuid, data) {
        var _this = this;
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.linkCount = 0;
        this.normal = function () {
            return Math.sqrt(_this.linkCount / __WEBPACK_IMPORTED_MODULE_0__app_config__["a" /* default */].N);
        };
        this.uuid = uuid;
        //  uuid is still saved here
        //  this.properties = data.properties;
        this.labels = data.labels;
        this.linkCount = 1;
        this.params = new Params();
    }
    Object.defineProperty(Node.prototype, "r", {
        get: function () {
            return 50 * this.normal() + 15;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "fontSize", {
        get: function () {
            return (30 * this.normal() + 10) + 'px';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "color", {
        get: function () {
            var index = Math.floor(__WEBPACK_IMPORTED_MODULE_0__app_config__["a" /* default */].SPECTRUM.length * this.normal());
            return __WEBPACK_IMPORTED_MODULE_0__app_config__["a" /* default */].SPECTRUM[index];
        },
        enumerable: true,
        configurable: true
    });
    return Node;
}());

var Compound = (function (_super) {
    __extends(Compound, _super);
    function Compound(uuid, data) {
        var _this = _super.call(this, uuid, data) || this;
        _this.hash = data.properties.hash;
        _this.nostereo_hash = data.properties.nostereo_hash;
        _this.smiles = data.properties.smiles;
        _this.compoundId = data.properties.compound_id.low;
        _this.imageUrl = 'https://tripod.nih.gov/servlet/renderServletv12/?size=200&structure=' +
            _this.parseSmiles(data.properties.smiles) + '&standardize=true&format=svg';
        return _this;
    }
    Compound.prototype.parseSmiles = function (smiles) {
        var parsed = smiles
            .replace(/[;]/g, '%3B')
            .replace(/[#]/g, '%23')
            .replace(/[+]/g, '%2B')
            .replace(/[\\]/g, '%5C')
            .replace(/[|]/g, '%7C');
        return parsed;
    };
    return Compound;
}(Node));

var Target = (function (_super) {
    __extends(Target, _super);
    function Target(uuid, data) {
        var _this = _super.call(this, uuid, data) || this;
        _this.uniprot_id = data.properties.uniprot_id;
        _this.fullname = data.properties.fullname;
        _this.synonyms = data.properties.synonyms;
        _this.genes = data.properties.gene_symbols.join(', ');
        return _this;
    }
    return Target;
}(Node));

var Pattern = (function (_super) {
    __extends(Pattern, _super);
    function Pattern(uuid, data) {
        var _this = _super.call(this, uuid, data) || this;
        _this.hash = data.properties.hash;
        _this.pattern_id = data.properties.pattern_id;
        _this.pattern_type = data.properties.pattern_type;
        _this.smiles = data.properties.smiles;
        _this.imageUrl = 'https://tripod.nih.gov/servlet/renderServletv12/?size=200&structure=' +
            _this.parseSmiles(data.properties.smiles) + '&standardize=true&format=svg&preset=HIGHLIGHT&amap=' +
            data.properties.smiles.split('').map(function (a, i) { return i; }).join(',');
        return _this;
    }
    Pattern.prototype.parseSmiles = function (smiles) {
        var parsed = smiles
            .replace(/[;]/g, '%3B')
            .replace(/[#]/g, '%23')
            .replace(/[+]/g, '%2B')
            .replace(/[\\]/g, '%5C')
            .replace(/[|]/g, '%7C');
        return parsed;
    };
    return Pattern;
}(Node));



/***/ }),

/***/ "../../../../../src/app/download-button/download-button.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/download-button/download-button.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DownloadButtonComponent; });
/* unused harmony export CytoJSON */
/* unused harmony export CytoNode */
/* unused harmony export CytoEdge */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_graph_data_service__ = __webpack_require__("../../../../../src/app/services/graph-data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DownloadButtonComponent = (function () {
    function DownloadButtonComponent(rd, graphDataService) {
        this.rd = rd;
        this.graphDataService = graphDataService;
        this.blobToFile = function (theBlob, fileName) {
            var b = theBlob;
            //A Blob() is almost a File() - it's just missing the two properties below which we will add
            b.lastModifiedDate = new Date();
            b.name = fileName;
            //Cast to a File() type
            return theBlob;
        };
    }
    DownloadButtonComponent.prototype.ngOnInit = function () {
        /*    console.log(this.rd.data);
            console.log(this.el);*/
    };
    DownloadButtonComponent.prototype.ngAfterViewInit = function () {
        //  var div = this.elRef.nativeElement.querySelector('#');
        //  console.log(div);
        /*    console.log(this.rd);
            console.log(this.el);*/
    };
    //
    DownloadButtonComponent.prototype.downloadJSON = function () {
        var cyto = new CytoJSON();
        var graph = this.graphDataService.returnGraph();
        for (var _i = 0, _a = graph.nodes; _i < _a.length; _i++) {
            var node = _a[_i];
            cyto.elements.nodes.push(new CytoNode(node));
        }
        for (var _b = 0, _c = graph.links; _b < _c.length; _b++) {
            var link = _c[_b];
            cyto.elements.edges.push(new CytoEdge(link));
        }
        this.file = new Blob([JSON.stringify(cyto)], { type: "type: 'text/json'" });
        this.downloadFile();
    };
    DownloadButtonComponent.prototype.downloadCSV = function () { };
    DownloadButtonComponent.prototype.downloadEdges = function () {
        var graph = this.graphDataService.returnGraph();
        var edgeList = 'edge,source,target \n';
        for (var _i = 0, _a = graph.links; _i < _a.length; _i++) {
            var link = _a[_i];
            var src = link.source.uuid;
            var tgt = link.target.uuid;
            var edge = link.uuid;
            edgeList = edgeList + edge + "," + src + "," + tgt + '\n';
        }
        this.file = new Blob([edgeList], { type: "type: 'text/csv'" });
        this.downloadFile();
    };
    DownloadButtonComponent.prototype.downloadPNG = function (data, options) {
        console.log('downloading');
        var svgString = this.getSVGString(data.node());
        this.svgString2Image(svgString, 2 * options.width, 2 * options.height, save); //  passes Blob and filesize String to the callback
        function save(dataBlob) {
            console.log(dataBlob);
            //  saveAs( dataBlob, 'D3 vis exported to PNG.png' ); //  FileSaver.js function
        }
        /* let image = new Image();
         image.src = 'data:image/svg+xml;base64,' + window.btoa(encodeURIComponent(svgString));
         console.log(image);
         let blob = new Blob([image], {type: 'image/png;charset=utf-8'});
         console.log(blob);
         let url = window.URL.createObjectURL(blob);
         console.log(url);
         window.open(url);*/
    };
    //  Below are the functions that handle actual exporting:
    DownloadButtonComponent.prototype.getSVGString = function (svgNode) {
        svgNode.setAttribute('xlink', 'http:// www.w3.org/1999/xlink');
        var cssStyleText = getCSSStyles(svgNode);
        appendCSS(cssStyleText, svgNode);
        var serializer = new XMLSerializer();
        var svgString = serializer.serializeToString(svgNode);
        svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); //  Fix root xlink without namespace
        svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); //  Safari NS namespace fix
        return svgString;
        function getCSSStyles(parentElement) {
            var selectorTextArr = [];
            //  Add Parent element Id and Classes to the list
            selectorTextArr.push('#' + parentElement.id);
            for (var _i = 0, _a = parentElement.classList; _i < _a.length; _i++) {
                var classType = _a[_i];
                if (!contains('.' + classType, selectorTextArr)) {
                    selectorTextArr.push('.' + classType);
                }
            }
            //  Add Children element Ids and Classes to the list
            var nodes = parentElement.getElementsByTagName('*');
            for (var _b = 0, nodes_1 = nodes; _b < nodes_1.length; _b++) {
                var node = nodes_1[_b];
                var id = node.uuid;
                if (!contains('#' + id, selectorTextArr)) {
                    selectorTextArr.push('#' + id);
                }
                var classes = node.classList;
                for (var _c = 0, classes_1 = classes; _c < classes_1.length; _c++) {
                    var nodeClass = classes_1[_c];
                    if (!contains('.' + nodeClass, selectorTextArr)) {
                        selectorTextArr.push('.' + nodeClass);
                    }
                }
            }
            //  Extract CSS Rules
            var extractedCSSText = '';
            for (var r = 0; r < document.styleSheets.length; r++) {
                var css = document.styleSheets[r];
                try {
                    if (!(css instanceof CSSStyleSheet))
                        continue;
                }
                catch (e) {
                    if (e.name !== 'SecurityError')
                        throw e; //  for Firefox
                    continue;
                }
                //  Now TypeScript knows that your sheet is CSS sheet
                if (css) {
                    var rules = css.cssRules ? css.cssRules : css.rules;
                    if (rules) {
                        for (var i = 0; i < rules.length; i++) {
                            var rule = rules[i];
                            if (!(rule instanceof CSSStyleRule))
                                continue;
                            if (contains(rule.selectorText.split('[')[0], selectorTextArr))
                                extractedCSSText += rule.cssText;
                        }
                    }
                }
            }
            return extractedCSSText;
            function contains(str, arr) {
                return arr.indexOf(str) !== -1;
            }
        }
        function appendCSS(cssText, element) {
            var styleElement = document.createElement('style');
            styleElement.setAttribute('type', 'text/css');
            styleElement.innerHTML = cssText;
            var refNode = element.hasChildNodes() ? element.children[0] : null;
            element.insertBefore(styleElement, refNode);
        }
    };
    DownloadButtonComponent.prototype.svgString2Image = function (svgString, width, height, callback) {
        var imgsrc = 'data:image/svg+xml;base64,' + btoa(svgString); //  Convert SVG string to data URL
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        var image = new Image();
        image.src = imgsrc;
        image.onload = function () {
            context.clearRect(0, 0, width, height);
            context.drawImage(image, 0, 0, width, height);
            console.log(context);
            //     console.log(blob);
            //   });
        };
        var blob = new Blob([image], { type: 'image/png;charset=utf-8' });
        console.log(canvas);
        console.log(blob);
        console.log(image);
    };
    DownloadButtonComponent.prototype.downloadFile = function () {
        console.log(this.file);
        var url = window.URL.createObjectURL(this.file);
        window.open(url);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('#svg'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], DownloadButtonComponent.prototype, "el", void 0);
    DownloadButtonComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'download-button',
            template: "\n<button mat-button [matMenuTriggerFor]=\"menu\">\n  Download graph <mat-icon>file_download</mat-icon>\n</button>\n<mat-menu #menu=\"matMenu\">\n  <button mat-menu-item (click)=\" downloadJSON()\">\n    <mat-icon>code</mat-icon>\n    <span>Cytoscape JSON</span>\n  </button>\n    <button mat-menu-item (click)=\" downloadEdges()\">\n    <mat-icon>list</mat-icon>\n    <span>Edge List</span>\n  </button>\n  <button mat-menu-item (click)=\" downloadCSV()\" disabled>\n    <mat-icon>border_all</mat-icon>\n    <span>CSV</span>\n  </button>\n  <button mat-menu-item (click)=\" downloadGraph()\" disabled>\n    <mat-icon>photo</mat-icon>\n    <span>PNG</span>\n  </button>\n</mat-menu>\n",
            styles: [__webpack_require__("../../../../../src/app/download-button/download-button.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer2 */],
            __WEBPACK_IMPORTED_MODULE_1__services_graph_data_service__["a" /* GraphDataService */]])
    ], DownloadButtonComponent);
    return DownloadButtonComponent;
}());

var CytoJSON = (function () {
    function CytoJSON() {
        this.format_version = "1.0";
        this["generated_by"] = "cytoscape-3.6.0";
        this.target_cytoscapejs_version = "~2.1";
        this.data = {
            shared_name: "smrtgraph.csv",
            name: "smrtgraph.csv",
            SUID: 64,
            __Annotations: [],
            selected: false
        };
        this.elements = {
            edges: [],
            nodes: []
        };
    }
    return CytoJSON;
}());

var CytoNode = (function () {
    function CytoNode(node) {
        this.data = { id: "", node: {} };
        this.position = {
            x: 0,
            y: 0
        };
        this.data.id = node.uuid;
        this.data.node = node;
        this.position.x = node['x'] || 0;
        this.position.y = node['y'] || 0;
        this.selected = false;
    }
    return CytoNode;
}());

var CytoEdge = (function () {
    function CytoEdge(link) {
        this.data = {
            id: '',
            source: '',
            target: '',
            properties: {}
        };
        this.data.id = link.uuid;
        this.data.properties = link;
        this.data.source = link.source['uuid'] || link.source;
        this.data.target = link.target['uuid'] || link.target;
        this.selected = false;
    }
    return CytoEdge;
}());



/***/ }),

/***/ "../../../../../src/app/services/data-connection.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataConnectionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__websocket_service__ = __webpack_require__("../../../../../src/app/services/websocket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators__ = __webpack_require__("../../../../rxjs/_esm5/operators.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//const DATA_URL = 'ws://localhost:1337';
var DATA_URL = 'ws://smrtgraphdb-dev.ncats.nih.gov:1337';
var DataConnectionService = (function () {
    function DataConnectionService(wsService) {
        this.wsService = wsService;
        this.messages = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        //  subscribe to websocket
        this.messagesEmitter = this.wsService
            .connect(DATA_URL).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["b" /* map */])(function (response) { return response.data; })
        //   error(error => Observable.empty())
        );
        this.messages = this.messagesEmitter.pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["c" /* share */])());
    }
    DataConnectionService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__websocket_service__["a" /* WebSocketService */]])
    ], DataConnectionService);
    return DataConnectionService;
}()); //  end class DataService



/***/ }),

/***/ "../../../../../src/app/services/graph-data.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphDataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_connection_service__ = __webpack_require__("../../../../../src/app/services/data-connection.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__d3_models_node_service__ = __webpack_require__("../../../../../src/app/d3/models/node.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__d3_models_link_service__ = __webpack_require__("../../../../../src/app/d3/models/link.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__loading_service__ = __webpack_require__("../../../../../src/app/services/loading.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/*
 import {WebWorkerService} from "./services/web-worker.service";
 */
var GraphDataService = (function () {
    function GraphDataService(dataConnectionService, messageService, nodeService, linkService, loadingService) {
        // todo: with the added search variables, it is extremely likely no results will come back. this needs to be shown
        var _this = this;
        this.dataConnectionService = dataConnectionService;
        this.messageService = messageService;
        this.nodeService = nodeService;
        this.linkService = linkService;
        this.loadingService = loadingService;
        this.graph = {
            nodes: [],
            links: []
        };
        this.history = [];
        //  Observable navItem source
        this._graphHistorySource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.historyMap = new Map();
        this.graphhistory$ = this._graphHistorySource.asObservable();
        this.noResults = false;
        this.filter = false;
        this.nodeList = [];
        this.linkList = [];
        this.nodes = [];
        this.dataConnectionService.messages.subscribe(function (msg) {
            var response = JSON.parse(msg);
            if (response.data) {
                _this.originalEvent = response.type.toString();
                var records = response.data._fields;
                if (records.length == 0) {
                    console.error(response);
                }
                else {
                    switch (response.type) {
                        case 'path': {
                            _this.filter = true;
                            _this.noResults = true;
                            _this.parseRecords(records);
                            break;
                        }
                        case 'startNodeSearch':
                        case 'endNodeSearch': {
                            _this.filter = true;
                            _this.noResults = false;
                            _this.parseRecords(records);
                            break;
                        }
                        case 'prediction': {
                            // todo this should display a warning, but not clear the graph
                            _this.filter = false;
                            _this.noResults = false;
                            _this.parseRecords(records);
                            break;
                        }
                        case 'expand': {
                            _this.filter = false;
                            _this.noResults = false;
                            _this.parseRecords(records);
                            break;
                        }
                    }
                }
            }
            else {
                //no new results added
                // todo: still want an alert if no predictions are found.
                if (_this.noResults && (_this.nodeList.length === 0 && _this.linkList.length === 0)) {
                    _this.clearGraph();
                    _this._graphHistorySource.next(_this.graph);
                    alert('no path found');
                }
                else {
                    console.log('done');
                    _this.makeGraph();
                }
                _this.loadingService.toggleVisible(false);
            }
        });
    }
    GraphDataService.prototype.parseRecords = function (path) {
        // neo4j websocket returns one record at a time, so looping isn't necessary, but still probably a good idea
        for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
            var r = path_1[_i];
            if (r.segments) {
                for (var _a = 0, _b = r.segments; _a < _b.length; _a++) {
                    var l = _b[_a];
                    // this ignores the initial start and end nodes, but they are added in the segments of the path
                    var start = this.nodeService.makeNode(l.start.properties.uuid, l.start);
                    var end = this.nodeService.makeNode(l.end.properties.uuid, l.end);
                    (_c = this.nodeList).push.apply(_c, [start, end]);
                    var link = this.linkService.makeLink(l.relationship.properties.uuid, start, end, l.relationship);
                    this.linkList.push(link);
                    this.nodeService.setNode(start);
                    this.nodeService.setNode(end);
                    this.linkService.setLink(link);
                }
            }
            else {
                if (!r.start && !r.end) {
                    // this is for node groups that aren't a path
                    var n = this.nodeService.makeNode(r.properties.uuid, r);
                    this.nodeList.push(n);
                    this.nodeService.setNode(n);
                }
                else {
                    // this is the separate path for expanding nodes -- this does not have a uuid associated with the start or end nodes, so neo4j's id needs to be used to create the nodes
                    var start = this.nodeService.makeNode(r.properties.uuid, {});
                    var end = this.nodeService.makeNode(r.properties.uuid, {});
                    var nodes = [start, end];
                    (_d = this.nodeList).push.apply(_d, nodes);
                    var link = this.linkService.makeLink(r.properties.uuid, start, end, r);
                    this.nodeService.setNode(start);
                    this.nodeService.setNode(end);
                    this.linkService.setLink(link);
                }
            }
        }
        var _c, _d;
    };
    GraphDataService.prototype.makeGraph = function () {
        var _this = this;
        var newNodes = this.nodeList.filter(function (elem, pos, arr) {
            return arr.indexOf(elem) == pos;
        });
        var newLinks = this.linkList.filter(function (elem, pos, arr) {
            return arr.indexOf(elem) == pos;
        });
        var diff = {
            removedNodes: this.graph.nodes.filter(function (node) { return newNodes.indexOf(node) === -1; }),
            addedNodes: newNodes.filter(function (node) { return _this.graph.nodes.indexOf(node) === -1; }),
            removedLinks: this.graph.links.filter(function (link) { return newLinks.indexOf(link) === -1; }),
            addedLinks: newLinks.filter(function (link) { return _this.graph.links.indexOf(link) === -1; })
        };
        if (this.eventData) {
            this.historyMap.set(this.eventData.id, diff);
        }
        // apply diff to current graph
        this.applyDiff(diff);
        this.countLinks();
        // update graph
        this._graphHistorySource.next(this.graph);
        this.nodeList = [];
        this.linkList = [];
        this.filter = false;
    };
    GraphDataService.prototype.applyDiff = function (diff) {
        var _this = this;
        // todo: it is possible to expand a node connected to an expanded node. If the original node is closed, the second expanded nodes are still visible
        // todo: need to iterate over remaining nodes and links and remove them
        if (this.filter == true) {
            diff.removedNodes.forEach(function (node) {
                _this.graph.nodes.splice(_this.graph.nodes.indexOf(node), 1);
            });
            diff.removedLinks.forEach(function (link) {
                _this.graph.links.splice(_this.graph.links.indexOf(link), 1);
            });
        }
        diff.addedNodes.forEach(function (node) { return _this.graph.nodes.push(node); });
        diff.addedLinks.forEach(function (link) {
            _this.graph.links.push(link);
        });
    };
    GraphDataService.prototype.countLinks = function () {
        this.graph.nodes.forEach(function (node) { return node.linkCount = 1; });
        for (var _i = 0, _a = this.graph.links; _i < _a.length; _i++) {
            var l = _a[_i];
            l.source.linkCount++;
            l.target.linkCount++;
        }
    };
    GraphDataService.prototype.clearGraph = function () {
        this.graph.links = [];
        this.graph.nodes = [];
        this._graphHistorySource.next(this.graph);
    };
    GraphDataService.prototype.nodeExpand = function (id, type, properties) {
        var message = this.messageService.getMessage(id, type, properties);
        // right now this is only creating a skeleton map object without the diff
        // this happens here because node id and label is needed for tracking.
        this.eventData = { id: id, diff: {} };
        this.dataConnectionService.messages.next(message);
    };
    GraphDataService.prototype.nodeCollapse = function (node) {
        this.filter = true;
        // get the expand object to delete the nodes added
        var diff = this.historyMap.get(node.uuid);
        var undoDiff = {
            addedNodes: [],
            removedNodes: diff.addedNodes,
            addedLinks: [],
            removedLinks: diff.addedLinks
        };
        this.applyDiff(undoDiff);
        this.countLinks();
        this._graphHistorySource.next(this.graph);
        this.filter = false;
        this.loadingService.toggleVisible(false);
    };
    // download button uses this
    GraphDataService.prototype.returnGraph = function () {
        return this.graph;
    };
    GraphDataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__data_connection_service__["a" /* DataConnectionService */],
            __WEBPACK_IMPORTED_MODULE_2__message_service__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_4__d3_models_node_service__["a" /* NodeService */],
            __WEBPACK_IMPORTED_MODULE_5__d3_models_link_service__["a" /* LinkService */],
            __WEBPACK_IMPORTED_MODULE_6__loading_service__["a" /* LoadingService */]])
    ], GraphDataService);
    return GraphDataService;
}());

/*
  this.dataConnectionService.messages.subscribe(msg => {
    const response = JSON.parse(msg);
    if(response.data) {
      this.originalEvent = response.type.toString();
      const records = response.data._fields;
      if (records.length == 0) {
        console.error(response);
      } else {
        switch (response.type) {
          case 'path':
          {
            this.filter = true;
            this.noResults = true;
            this.parseRecords(records);
            break;
          }
          case 'startNodeSearch':
          case 'endNodeSearch':{
            this.filter = true;
            this.noResults = false;
            this.parseRecords(records);
            break;
          }
          case 'prediction':
          {
            // todo this should display a warning, but not clear the graph
            this.filter = false;
            this.noResults = false;
            this.parseRecords(records);
            break;
          }
          case 'expand':{
            this.filter = false;
            this.noResults = false;
            this.parseRecords(records);
            break;
          }
        }
      }
    }else{
      //no new results added
      // todo: still want an alert if no predictions are found.
      if (this.noResults && (this.nodeList.length === 0 && this.linkList.length === 0)) {
        this.clearGraph();
        this._graphHistorySource.next(this.graph);
        alert('no path found');
      } else {
        console.log('done');
        this.cleanGraph();
      }
      this.loadingService.toggleVisible(false);
    }
  });

}

  private parseRecords(path:any) {
    // neo4j websocket returns one record at a time, so looping isn't necessary, but still probably a good idea
    for (const r of path) {
      if (r.segments) {
        for (const l of r.segments) {
          const start: Node = this.nodeService.makeNode(l.start.properties.uuid, l.start);
          const end: Node = this.nodeService.makeNode(l.end.properties.uuid, l.end);
          this.nodeList.push(...[start, end]);
          const link: Link = this.linkService.makeLink(l.relationship.properties.uuid, start, end, l.relationship);
          this.linkList.push(link);
          this.nodeService.setNode(start);
          this.nodeService.setNode(end);
          this.linkService.setLink(link);
        }
      } else {
        if (!r.start && !r.end) {
          // this is for node groups that aren't a path
          const n: Node = this.nodeService.makeNode(r.properties.uuid, r);
          this.nodeList.push(n);
          this.nodeService.setNode(n);
        } else {
          // this is the separate path for expanding nodes -- this does not have a uuid associated with the start or end nodes, so neo4j's id needs to be used to create the nodes
         console.error(r);
/!*          const start = this.nodeService.makeNode(r.properties.uuid, {});
          const end = this.nodeService.makeNode(r.properties.uuid, {});
          this.nodeList.push(...[start, end]);
          const link = this.linkService.makeLink(r.properties.uuid, start, end, r);
          this.linkList.push(link);
          this.nodeService.setNode(start);
          this.nodeService.setNode(end);
          this.linkService.setLink(link);*!/
        }
      }
      this.nodeList = this.nodeList.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
      this.linkList = this.linkList.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
      this.graph.nodes.push(...this.nodeList.filter(node => this.graph.nodes.indexOf(node) === -1));
      this.graph.links.push(...this.linkList.filter(link => this.graph.links.indexOf(link) === -1));
      this._graphHistorySource.next(this.graph);
    }
  }

  cleanGraph(): void {
    console.log(JSON.parse(JSON.stringify(this.graph)));
    console.log(JSON.parse(JSON.stringify(this.nodeList)));
    console.log(JSON.parse(JSON.stringify(this.linkList)));

    const diff = {
      //nodes in the graph that aren't in the new list
      removedNodes: this.graph.nodes.filter(node => this.nodeList.indexOf(node) === -1),
      // nodes in the new list that aren't in the graph'
      addedNodes: this.nodeList.filter(node => this.graph.nodes.indexOf(node) === -1),
      //links in the graph that aren't in the new list
      removedLinks: this.graph.links.filter(link => this.linkList.indexOf(link) === -1),
      // links in the new list that aren't in the graph'
      addedLinks: this.linkList.filter(link => this.graph.links.indexOf(link) === -1)
    };

    // apply diff to current graph
    this.applyDiff(diff);
    this.countLinks();
    // update graph
  //  this._graphHistorySource.next(this.graph);
 //
  }
  applyDiff(diff: any): void{
    console.log(this);
    console.log(diff);

    // todo: it is possible to expand a node connected to an expanded node. If the original node is closed, the second expanded nodes are still visible
    // todo: need to iterate over remaining nodes and links and remove them
    if (this.filter == true) {
      diff.removedNodes.forEach(node => {
        console.log(node);
        this.graph.nodes.splice(this.graph.nodes.indexOf(node), 1);
      });
      diff.removedLinks.forEach(link => {
        this.graph.links.splice(this.graph.links.indexOf(link), 1);
      });
      this.nodeList = [];
      this.linkList = [];
      this.filter = false;
    }
    diff.addedNodes.forEach(node => this.graph.nodes.push(node));
    diff.addedLinks.forEach(link => {
      this.graph.links.push(link);
    });

    if (this.eventData){
     /!* const diff2 = {
        removedNodes: this.oldGraph.nodes.filter(node => this.graph.nodes.indexOf(node) === -1),
        addedNodes: this.graph.nodes.filter(node => this.oldGraph.nodes.indexOf(node) === -1),
        removedLinks: this.oldGraph.links.filter(link => this.graph.nodes.indexOf(link) === -1),
        addedLinks: this.graph.nodes.filter(link => this.oldGraph.links.indexOf(link) === -1)
      };
*!/
      console.log(this.eventData);
      console.log(diff);
   //   console.log(diff2);
      this.historyMap.set(this.eventData.id, diff);
    }
  }



  nodeCollapse(node: Node): void{
// get the expand object to delete the nodes added
    const diff = this.historyMap.get(node.uuid);
    console.log(diff);
    this.graph.nodes = diff.removedNodes;
    this.graph.nodes.push(node);
    this.graph.links = diff.removedLinks;
   /!* diff.removedNodes.forEach(node => {
      console.log(node);
     // this.graph.nodes.splice(this.graph.nodes.indexOf(node), 1);
    });*!/
  /!*  diff.addedLinks.forEach(link => {
      this.graph.links.splice(this.graph.links.indexOf(link), 1);
    });*!/
    console.log(this.graph);
    this.countLinks();
    this._graphHistorySource.next(this.graph);

    this.loadingService.toggleVisible(false);
  }




 /!*
  }

  private appendGraph(): void {

    // removes duplicates
   // this.nodeList = this.nodeList.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
  //  this.linkList = this.linkList.reduce((x, y) => x.includes(y) ? x : [...x, y], []);

// filters out what was just added that isn't already in the graph
/!*    const diff = {
      removedNodes: [],
      addedNodes: this.nodeList.filter(node => this.graph.nodes.indexOf(node) === -1),
      removedLinks: [],
      addedLinks:  this.linkList.filter(link => this.graph.links.indexOf(link) === -1)
    };*!/


    // saves the event if it is an "expand" event

    //this needs to save a version of the graph on first click, then run the diff after done
    if (this.eventData){
  /!*    console.log(this.oldGraph);
      console.log(this.eventData);
      console.log(this.nodeList);
      console.log(this.linkList);
      console.log(this.graph);
      this.eventData.event.diff = diff;
      this.historyMap.set(this.eventData.id, this.eventData.event);
      console.log(this.historyMap);*!/
    }

    // apply diff to current graph
   // this.applyDiff(diff);
    // update link counts
    this.countLinks();
    // update graph
    this.graph.nodes.push(...this.nodeList.filter(node => this.graph.nodes.indexOf(node) === -1));
    this.graph.links.push(...this.linkList.filter(link => this.graph.links.indexOf(link) === -1));
    this._graphHistorySource.next(this.graph);

     this.filter = false;
  }

  cleanGraph():void{
     this.nodeList = this.nodeList.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
     this.linkList = this.linkList.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
// filters out what was just added that isn't already in the graph
    console.log(this.nodeList);
    console.log(this.linkList);
    console.log(this.graph);

    let diff = {
        removedNodes: this.graph.nodes.filter(node => this.nodeList.indexOf(node) === -1),
        addedNodes: this.nodeList.filter(node =>
        {
          //this doesnt work because the graph is fully populated at this pint, so nothing is "added"
          console.log(node);
          console.log(this.graph.nodes);
          console.log(this.graph.nodes.indexOf(node) === -1);
          return this.graph.nodes.indexOf(node) === -1;
        }),
    removedLinks: this.graph.links.filter(link =>  this.linkList.indexOf(link) === -1),
      addedLinks:  this.linkList.filter(link => this.graph.links.indexOf(link) === -1)
  };
    console.log(JSON.parse(JSON.stringify(diff)));
        // apply diff to current graph
     this.applyDiff(diff);
    /!*
      // update link counts
     this.countLinks();
     // update graph
     this._graphHistorySource.next(this.graph);
     *!/
     if(this.filter) {
     this.nodeList = [];
     this.linkList = [];
     }
     this.filter = false;
  }

  applyDiff(diff: any): void{

    if (this.eventData){
      console.log("event");
    //  diff.removedNodes.push(this.nodeService.getById(this.eventData.id));
       this.historyMap.set(this.eventData.id, diff);
       console.log(this.historyMap);
    }
    // todo: it is possible to expand a node connected to an expanded node. If the original node is closed, the second expanded nodes are still visible
    // todo: need to iterate over remaining nodes and links and remove them
    if (this.filter == true) {
      diff.removedNodes.forEach(node => {
        this.graph.nodes.splice(this.graph.nodes.indexOf(node), 1);
      });
      diff.removedLinks.forEach(link => {
        this.graph.links.splice(this.graph.links.indexOf(link), 1);
      });
    }
    this.graph.nodes.push(...diff.addedNodes);
    this.graph.links.push(...diff.addedLinks);
  }

  nodeCollapse(node: Node, label: any ): void{
    this.filter = true;
// get the expand object to delete the nodes added
    const diff = this.historyMap.get(node.uuid);
console.log(this.historyMap);
console.log(diff);
    const undoDiff = {
      addedNodes: [],
      removedNodes: diff.addedNodes,
      addedLinks: [],
      removedLinks: diff.addedLinks
    };

      diff.addedNodes.forEach(node => {
        this.graph.nodes.splice(this.graph.nodes.indexOf(node), 1);
      });
      diff.addedLinks.forEach(link => {
        this.graph.links.splice(this.graph.links.indexOf(link), 1);
      });
   // this.clearGraph();
    this.graph.nodes.push(...diff.removedNodes, this.nodeService.getById(node.uuid));
    this.graph.links.push(...diff.removedLinks);
    this.countLinks();
    this._graphHistorySource.next(this.graph);
    this.filter = false;
    this.loadingService.toggleVisible(false);

  }
*!/


}
*/


/***/ }),

/***/ "../../../../../src/app/services/loading.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoadingService = (function () {
    function LoadingService() {
        this._loadingSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        //  Observable navItem stream
        this.loading$ = this._loadingSource.asObservable();
    }
    LoadingService.prototype.toggleVisible = function (force) {
        this._loadingSource.next(force);
    };
    LoadingService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], LoadingService);
    return LoadingService;
}());



/***/ }),

/***/ "../../../../../src/app/services/message.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MessageService = (function () {
    function MessageService() {
    }
    MessageService.prototype.getMessage = function (term, type, properties) {
        var msg;
        var params;
        switch (type) {
            case 'chembl':
            case 'target': {
                msg = 'MATCH (n:Target) WHERE n.uniprot_id= {qParam} MATCH (n)-[r:REGULATES]-(b) RETURN n, r, b';
                params = { qParam: term };
                break;
            }
            case 'compound': {
                msg = 'MATCH (n:Compound) WHERE n.compound= {qParam} MATCH (n)-[r]-(b) RETURN n, r, b LIMIT 5';
                params = { qParam: term };
                break;
            }
            case 'counts': {
                switch (properties) {
                    case 'Target': {
                        msg = 'MATCH (n:Target) WHERE n.uuid = {qParam}  MATCH (n)-[r]-(b) RETURN DISTINCT labels(b),COUNT(labels(b))';
                        break;
                    }
                    case 'Compound': {
                        msg = 'MATCH (n:Compound) WHERE n.uuid = {qParam}  MATCH (n)-[r]-(b) RETURN DISTINCT labels(b),COUNT(labels(b))';
                        break;
                    }
                    case 'Pattern': {
                        msg = 'MATCH (n:Pattern) WHERE n.uuid = {qParam}  MATCH (n)-[r]-(b) RETURN DISTINCT labels(b),COUNT(labels(b))';
                        break;
                    }
                }
                params = { qParam: term };
                break;
            }
            case 'endNodeSearch':
            case 'startNodeSearch': {
                // todo: convern nostereo_hash to a contains in hash search
                msg = 'MATCH (n:Target) WHERE n.uniprot_id IN {qParam} RETURN n AS data UNION MATCH (c:Compound) WHERE c.nostereo_hash IN {qParam} RETURN c AS data';
                //   msg = 'MATCH (n:Target) WHERE n.uniprot_id IN {qParam} RETURN n UNION MATCH (n:Compound) WHERE n.hash IN {qParam} RETURN n';
                params = { qParam: term };
                break;
            }
            case 'expand': {
                var start = 'MATCH (n:' + properties.origin;
                switch (properties.target) {
                    case 'Target': {
                        //  msg = 'MATCH p=shortestPath((t)-[r*..1]->(q:Target)) WHERE t.uuid = {qParam} return p LIMIT 100';
                        msg = start + '{uuid:{qParam}}) MATCH (n)-[r]-(b:Target) with {segments:[{start: startNode(r), relationship:r, end: endNode(r)}]} AS ret RETURN ret LIMIT 100';
                        break;
                    }
                    case 'Compound': {
                        msg = start + '{uuid:{qParam}}) MATCH (n)-[r]-(b:Compound) with {segments:[{start: startNode(r), relationship:r, end: endNode(r)}]} AS ret RETURN ret LIMIT 100';
                        break;
                    }
                    case 'Pattern': {
                        msg = start + '{uuid:{qParam}}) MATCH (n)-[r]-(b:Pattern) with {segments:[{start: startNode(r), relationship:r, end: endNode(r)}]} AS ret RETURN ret LIMIT 100';
                        break;
                    }
                    case 'All': {
                        msg = 'MATCH (n) WHERE n.uuid = {qParam} MATCH (n)-[r]-(b) with {segments:[{start: startNode(r), relationship:r, end: endNode(r)}]} AS ret RETURN ret LIMIT 100';
                        break;
                    }
                }
                params = { qParam: term };
                break;
            }
            case 'node': {
                msg = 'MATCH (n:Target) WHERE n.uniprot_id= {qParam} RETURN n';
                params = { qParam: term };
                break;
            }
            case 'path': {
                var levels = properties.distance;
                // WHERE all(rel in r where rel.max_confidence_value > .3)
                var start = 'MATCH p=shortestPath((t)-[r*..' + levels + ']->(q:Target)) WHERE ';
                var confidence = '';
                var activity = '';
                var similarity = '';
                var where = '';
                var inStart = '  t.uuid IN {start}';
                var inEnd = ' AND q.uuid IN {end}';
                if (properties.confidence) {
                    confidence = ' all(rel in r where rel.max_confidence_value >=' + properties.confidence + ' OR rel.activity > 0 OR rel.ratio> 0) AND';
                }
                if (properties.activity) {
                    activity = ' all(rel in r where rel.activity <=' + properties.activity + ') AND';
                }
                if (properties.similarity) {
                    similarity = ' all(rel in r where rel.ratio >=' + properties.similarity + ') AND';
                }
                if (term.end.length > 0) {
                    msg = start + confidence + activity + similarity + inStart + inEnd + ' AND q.uuid <> t.uuid return p';
                }
                else {
                    msg = start + confidence + activity + similarity + inStart + ' AND q.uuid <> t.uuid return p';
                }
                params = { start: term.start, end: term.end };
                break;
            }
            case 'prediction': {
                //msg = 'MATCH (t:Target) WHERE t.uuid= {qParam} MATCH (t)<-[r1:POTENT_PATTERN_OF]-(p:Pattern) MATCH (p)-[r2:PATTERN_OF]->(c:Compound) WHERE NOT ((c)-[:TESTED_ON]->(t)) RETURN t, r1, p, r2, c LIMIT 300';
                msg = 'MATCH (t:Target) WHERE t.uuid= {qParam} MATCH (t)<-[r1:POTENT_PATTERN_OF]-(p:Pattern) MATCH (p)-[r2:PATTERN_OF]->(c:Compound) WHERE NOT ((c)-[:TESTED_ON]->(t))' +
                    'with {segments:[{start: startNode(r1), relationship:r1, end: endNode(r1)},{start: startNode(r2), relationship:r2, end: endNode(r2)}]} AS ret RETURN ret LIMIT 300';
                params = { qParam: term };
                break;
            }
            case 'smiles': {
                msg = 'MATCH (n:Pattern) WHERE n.pid= {qParam} MATCH (n)-[r]-(b) RETURN n, r, b LIMIT 5';
                params = { qParam: term };
                break;
            }
            case 'uuid': {
                msg = 'MATCH (n) WHERE n.uuid= {qParam} RETURN n';
                params = { qParam: term };
                break;
            }
        }
        var message = {
            type: type,
            message: msg,
            params: params
        };
        return message;
    };
    MessageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], MessageService);
    return MessageService;
}());



/***/ }),

/***/ "../../../../../src/app/services/node-expand.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NodeExpandService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Expand; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NodeExpandService = (function () {
    function NodeExpandService() {
        this.expandMap = new Map();
    }
    NodeExpandService.prototype.fetchExpand = function (node) {
        return this.expandMap.get(node) || new Expand();
    };
    /*
      let ex = this.expandMap.get(node);
      if(ex){
        return ex;
    }else{
      return new Expand();
    }*/
    NodeExpandService.prototype.setExpand = function (node, expand) {
        this.expandMap.set(node, expand);
    };
    NodeExpandService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], NodeExpandService);
    return NodeExpandService;
}());

var Expand = (function () {
    function Expand() {
        this.all = false;
        this.compound = false;
        this.pattern = false;
        this.predictions = false;
        this.target = false;
    }
    return Expand;
}());



/***/ }),

/***/ "../../../../../src/app/services/node-menu-controller.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeMenuControllerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var NodeMenuControllerService = (function () {
    function NodeMenuControllerService() {
        this._clickedMenuSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        //  Observable navItem stream
        this.clickedmenu$ = this._clickedMenuSource.asObservable();
    }
    //  service command
    NodeMenuControllerService.prototype.toggleVisible = function (node) {
        // menu already open -- close it
        if (this._activeMenu && this._activeMenu === node) {
            this.hideMenus();
        }
        else {
            //menu closed -- open it
            this._activeMenu = node;
            this.showMenu();
        }
    };
    NodeMenuControllerService.prototype.showMenu = function () {
        this._clickedMenuSource.next(true);
    };
    NodeMenuControllerService.prototype.hideMenus = function () {
        this._clickedMenuSource.next(false);
    };
    NodeMenuControllerService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], NodeMenuControllerService);
    return NodeMenuControllerService;
}());



/***/ }),

/***/ "../../../../../src/app/services/settings.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsService; });
/* unused harmony export Settings */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SettingsService = (function () {
    function SettingsService() {
        this.settings = new Settings();
        this.dataChange = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](this.settings);
        this.settings.targetLabel = 'genes';
        this.settings.compoundLabel = 'hash';
        this.dataChange.next(this.settings);
    }
    SettingsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], SettingsService);
    return SettingsService;
}());

var Settings = (function () {
    function Settings() {
    }
    return Settings;
}());



/***/ }),

/***/ "../../../../../src/app/services/websocket.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebSocketService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WebSocketService = (function () {
    function WebSocketService() {
    }
    WebSocketService.prototype.connect = function (url) {
        if (!this.subject) {
            this.subject = this.create(url);
            console.log('connected');
        }
        return this.subject;
    };
    WebSocketService.prototype.create = function (url) {
        var ws = new WebSocket(url);
        var observable = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].create(function (obs) {
            ws.onmessage = obs.next.bind(obs);
            ws.onerror = obs.error.bind(obs);
            ws.onclose = obs.complete.bind(obs);
            return ws.close.bind(ws);
        });
        var observer = {
            next: function (data) {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        };
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["a" /* Subject */].create(observer, observable);
    };
    WebSocketService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], WebSocketService);
    return WebSocketService;
}()); //  end class WebSocketService



/***/ }),

/***/ "../../../../../src/app/smrtgraph-menu/smrtgraph-menu.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/smrtgraph-menu/smrtgraph-menu.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div fxLayout=\"row\">\n    <mat-toolbar color=\"primary\">\n        <mat-icon>home</mat-icon>\n        {{title}}\n\n      <!-- This fills the remaining space of the current row -->\n      <span class=\"fill-remaining-space\"></span>\n      <div fxLayout=\"row\" fxShow=\"false\" fxShow.gt-sm>\n        <button mat-button (click)=\"navOpen()\"><mat-icon>settings</mat-icon></button>\n<!--        <button mat-button routerLink=\"/products\">Products</button>\n        <button mat-button routerLink=\"/dashboard\">Dashboard</button>-->\n      </div>\n      <button mat-button [mat-menu-trigger-for]=\"menu\" fxHide=\"false\" fxHide.gt-sm>\n        <mat-icon>menu</mat-icon>\n      </button>\n\n    </mat-toolbar>\n    <mat-menu x-position=\"before\" #menu=\"matMenu\">\n      <button mat-menu-item (click)=\"navOpen()\"><mat-icon>settings</mat-icon></button>\n    </mat-menu>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/smrtgraph-menu/smrtgraph-menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmrtgraphMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_settings_service__ = __webpack_require__("../../../../../src/app/services/settings.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SmrtgraphMenuComponent = (function () {
    function SmrtgraphMenuComponent(settingsService) {
        this.settingsService = settingsService;
        this.title = 'smrtgraph';
    }
    SmrtgraphMenuComponent.prototype.ngOnInit = function () {
    };
    SmrtgraphMenuComponent.prototype.navOpen = function () {
        this.settingsService.sidenav.toggle();
    };
    SmrtgraphMenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'smrtgraph-menu',
            template: __webpack_require__("../../../../../src/app/smrtgraph-menu/smrtgraph-menu.component.html"),
            styles: [__webpack_require__("../../../../../src/app/smrtgraph-menu/smrtgraph-menu.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_settings_service__["a" /* SettingsService */]])
    ], SmrtgraphMenuComponent);
    return SmrtgraphMenuComponent;
}());



/***/ }),

/***/ "../../../../../src/app/smrtgraph-search/smrtgraph-search.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/smrtgraph-search/smrtgraph-search.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <br>\n\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\">\n      <mat-form-field fxFlex=\"95\">\n        <textarea matInput matTextareaAutosize placeholder=\"Start Nodes\" matAutosizeMaxRows = 15 [formControl]=\"startNodesCtrl\"></textarea>\n      </mat-form-field>\n  </div>\n\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\">\n  <mat-form-field fxFlex=\"95\">\n        <textarea matInput matTextareaAutosize placeholder=\"End Nodes (optional)\" matAutosizeMaxRows = 15 [formControl]=\"endNodesCtrl\"></textarea>\n      </mat-form-field>\n  </div>\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\">\n    <div fxFlex=\"95\">\n      <label>Max Distance</label>\n      <mat-slider matInput fxLayoutAlign=\"center center\"\n                 class=\"example-margin\"\n                 aria-label = \"max distance\"\n                 [max]=\"10\"\n                 [min]=\"1\"\n                 [step]=\"1\"\n                 [thumb-label]=\"true\"\n                 [formControl]=\"distanceCtrl\"\n                 [value]=\"5\">\n      </mat-slider>\n      <br>\n      <label>Confidence Level</label>\n      <mat-slider matInput fxLayoutAlign=\"center center\"\n                 aria-label=\"confidence level\"\n                 class=\"example-margin\"\n                 [max]=\"1\"\n                 [min]=\".01\"\n                 [step]=\".01\"\n                 [thumb-label]=\"true\"\n                 [formControl]=\"confidenceCtrl\"\n                 [value]=\".5\">\n      </mat-slider>\n      <br>\n      <label>Activity</label>\n      <mat-radio-group>\n        <mat-radio-button value=\"1\">nM</mat-radio-button>\n        <mat-radio-button value=\"2\" [checked] = true >uM</mat-radio-button>\n        <mat-radio-button value=\"3\">mM</mat-radio-button>\n      </mat-radio-group>\n      <mat-slider matInput fxLayoutAlign=\"center center\"\n                 aria-label=\"activity level\"\n                 class=\"example-margin\"\n                 [max]=\"100\"\n                 [min]=\"0\"\n                 [step]=\"1\"\n                 [thumb-label]=\"true\"\n                 [formControl]=\"activityCtrl\"\n                 [value]=\"500\">\n      </mat-slider>\n\n      <!--\n      [mat-steps]='[1,2,3,4,5,6,7,8,9,10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]'\n-->\n\n      <br>\n      <label>Pattern Overlap</label>\n      <mat-slider matInput fxLayoutAlign=\"center center\"\n                 aria-label=\"pattern overlap\"\n                 class=\"example-margin\"\n                 [max]=\"1\"\n                 [min]=\"0\"\n                 [step]=\".01\"\n                 [thumb-label]=\"true\"\n                 [formControl]=\"similarityCtrl\"\n                 [value]=\"50\">\n      </mat-slider>\n      <br>\n\n    </div>\n  </div>\n  <div fxLayout=\"row\" fxLayoutAlign=\"center center\" >\n    <button mat-button color=\"primary\" [disabled]=\"!startNodes || !endNodes\" (click)=\"shortestPath()\">find shortest path<mat-icon>search</mat-icon><mat-icon>share</mat-icon></button> |\n    <button mat-button color=\"primary\" (click)=\"clearGraph()\">clear graph<mat-icon>delete</mat-icon></button>\n  </div>\n  </div>\n\n"

/***/ }),

/***/ "../../../../../src/app/smrtgraph-search/smrtgraph-search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmrtgraphSearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_data_connection_service__ = __webpack_require__("../../../../../src/app/services/data-connection.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_graph_data_service__ = __webpack_require__("../../../../../src/app/services/graph-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__d3_models_node_service__ = __webpack_require__("../../../../../src/app/d3/models/node.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_loading_service__ = __webpack_require__("../../../../../src/app/services/loading.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SmrtgraphSearchComponent = (function () {
    function SmrtgraphSearchComponent(messageService, nodeService, dataConnectionService, graphDataService, loadingService) {
        this.messageService = messageService;
        this.nodeService = nodeService;
        this.dataConnectionService = dataConnectionService;
        this.graphDataService = graphDataService;
        this.loadingService = loadingService;
        this.startUUIDList = [];
        this.endUUIDList = [];
        this.startNodes = false;
        this.endNodes = false;
        this.startNodesCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.endNodesCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.distanceCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.confidenceCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.activityCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.similarityCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
    }
    /*
    * Todo: this needs to be re-worked a bit-- the queries that are the result of the search inputs changing directly modify nodes
    * todo: while they do this thorugh a service, they subscribe to all graph change events, which is not optimal
    * todo: there is also no function to remove the startNode and endNode parameters
    *
    *
    *
    * */
    SmrtgraphSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        // todo: fix above description
        // todo: set all subscriptions to be variables to close on destroy
        this.dataConnectionService.messages.subscribe(function (msg) {
            var response = JSON.parse(msg);
            switch (response.type) {
                case 'startNodeSearch': {
                    _this.startUUIDList.push(response.data._fields[0].properties.uuid);
                    break;
                }
                case 'endNodeSearch': {
                    _this.endUUIDList.push(response.data._fields[0].properties.uuid);
                    break;
                }
                case 'counts': {
                    break;
                }
            }
        });
        this.graphDataService.graphhistory$.subscribe(function (res) {
            // todo: add validation rules: must have uniprot_id (for now)
            // todo: this is going to happen on any change, so i need to filter by response type
            res.nodes.filter(function (node) {
                var id = node.uniprot_id;
                if (_this.startUUIDList.includes(node.uuid)) {
                    // todo: this doesn't clear the parameters, just passes them.
                    node.params.endNode = false;
                    node.params.startNode = true;
                }
                else if (_this.endUUIDList.includes(node.uuid)) {
                    node.params.startNode = false;
                    node.params.endNode = true;
                }
                else {
                    node.params.startNode = false;
                }
                _this.nodeService.setNode(node);
            });
        });
        this.startNodesCtrl.valueChanges.subscribe(function (value) {
            _this.getStartNodes(value.trim().split(/[\s,;]+/));
            if (_this.endNodesCtrl.value) {
                _this.getEndNodes(_this.endNodesCtrl.value.trim().split(/[\s,;]+/));
            }
            _this.startNodes = true;
            _this.startUUIDList = [];
        });
        this.endNodesCtrl.valueChanges.subscribe(function (value) {
            _this.getEndNodes(value.trim().split(/[\s,;]+/));
            if (_this.startNodesCtrl.value) {
                _this.getStartNodes(_this.startNodesCtrl.value.trim().split(/[\s,;]+/));
            }
            _this.endNodes = true;
            _this.endUUIDList = [];
        });
        this.distanceCtrl.valueChanges.subscribe(function (value) {
            _this.shortestPath();
        });
        this.confidenceCtrl.valueChanges.subscribe(function (value) {
            _this.shortestPath();
        });
        this.activityCtrl.valueChanges.subscribe(function (value) {
            _this.shortestPath();
        });
        this.similarityCtrl.valueChanges.subscribe(function (value) {
            _this.shortestPath();
        });
        //  this.startNodesCtrl.setValue('P35968, P12931, P00533, AHLNGYPZYMUEFB-UHFFFAOYSA-N, HVTCKKMWZDDWOY-UHFFFAOYSA-O');
        this.startNodesCtrl.setValue('P35968, P12931, P00533, AHLNGYPZYMUEFB, HVTCKKMWZDDWOY');
        this.endNodesCtrl.setValue('P03372, P04035, P04150, P00519');
    };
    SmrtgraphSearchComponent.prototype.getStartNodes = function (values) {
        var _this = this;
        var query = this.messageService.getMessage(values, 'startNodeSearch');
        setTimeout(function () { return _this.dataConnectionService.messages.next(query); }, 0);
    };
    SmrtgraphSearchComponent.prototype.getEndNodes = function (values) {
        var _this = this;
        var query = this.messageService.getMessage(values, 'endNodeSearch');
        setTimeout(function () { return _this.dataConnectionService.messages.next(query); }, 0);
    };
    SmrtgraphSearchComponent.prototype.shortestPath = function () {
        this.loadingService.toggleVisible(true);
        if (this.startNodesCtrl.value) {
            var value = {
                start: this.startUUIDList,
                end: this.endUUIDList || []
            };
            var params = {
                distance: this.distanceCtrl.value || 5,
                confidence: this.confidenceCtrl.value,
                activity: this.activityCtrl.value,
                similarity: this.similarityCtrl.value,
            };
            var query = this.messageService.getMessage(value, 'path', params);
            this.dataConnectionService.messages.next(query);
        }
    };
    SmrtgraphSearchComponent.prototype.clearGraph = function () {
        this.graphDataService.clearGraph();
    };
    SmrtgraphSearchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'smrtgraph-search',
            template: __webpack_require__("../../../../../src/app/smrtgraph-search/smrtgraph-search.component.html"),
            styles: [__webpack_require__("../../../../../src/app/smrtgraph-search/smrtgraph-search.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_message_service__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_5__d3_models_node_service__["a" /* NodeService */],
            __WEBPACK_IMPORTED_MODULE_2__services_data_connection_service__["a" /* DataConnectionService */],
            __WEBPACK_IMPORTED_MODULE_4__services_graph_data_service__["a" /* GraphDataService */],
            __WEBPACK_IMPORTED_MODULE_6__services_loading_service__["a" /* LoadingService */]])
    ], SmrtgraphSearchComponent);
    return SmrtgraphSearchComponent;
}());



/***/ }),

/***/ "../../../../../src/app/smrtgraph-settings/smrtgraph-settings.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".vertical-group{\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/smrtgraph-settings/smrtgraph-settings.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- sidenav content -->\n<div class=\"container\">\n  <h1>Settings</h1>\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\">\n<div fxFlex=\"95\">\n  <h3>Target Labels</h3>\n  <mat-radio-group class=\"vertical-group\" [formControl]=\"targetLabelCtrl\">\n  <mat-radio-button value=\"genes\" checked = 'true'>Gene name</mat-radio-button>\n  <mat-radio-button value=\"uniprot_id\">Uniprot ID</mat-radio-button>\n  <mat-radio-button value=\"fullname\">Full name</mat-radio-button>\n</mat-radio-group>\n</div>\n  </div>\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\">\n    <div fxFlex=\"95\">\n      <h3>Compound Labels</h3>\n      <mat-radio-group class=\"vertical-group\" [formControl]=\"compoundLabelCtrl\" >\n      <mat-radio-button value=\"hash\" checked = 'true'>InChI</mat-radio-button>\n  <mat-radio-button value=\"structure\">Structure</mat-radio-button>\n</mat-radio-group>\n  </div>\n  </div>\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\" >\n    <h3>Pattern Labels</h3><br/>\n    <div fxFlex=\"95\">\n  <mat-checkbox [value]=\"'structure'\" [formControl]=\"patternLabelCtrl\">Show Structures</mat-checkbox>\n    </div>\n  </div>\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\" >\n    <h3>Link Labels</h3><br/>\n    <div fxFlex=\"95\">\n  <mat-checkbox [formControl]=\"showLinkLabelCtrl\">Show Relationship Types</mat-checkbox>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/smrtgraph-settings/smrtgraph-settings.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmrtgraphSettingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_settings_service__ = __webpack_require__("../../../../../src/app/services/settings.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SmrtgraphSettingsComponent = (function () {
    function SmrtgraphSettingsComponent(settingsService) {
        this.settingsService = settingsService;
        this.targetLabelCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.compoundLabelCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.patternLabelCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.showLinkLabelCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
    }
    SmrtgraphSettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.targetLabelCtrl.valueChanges.subscribe(function (value) {
            _this.settingsService.settings.targetLabel = value;
            _this.settingsService.dataChange.next(_this.settingsService.settings);
        });
        this.compoundLabelCtrl.valueChanges.subscribe(function (value) {
            _this.settingsService.settings.compoundLabel = value;
            _this.settingsService.dataChange.next(_this.settingsService.settings);
        });
        this.patternLabelCtrl.valueChanges.subscribe(function (value) {
            if (value === true) {
                _this.settingsService.settings.patternLabel = 'structure';
            }
            else {
                _this.settingsService.settings.patternLabel = value;
            }
            _this.settingsService.dataChange.next(_this.settingsService.settings);
        });
        this.showLinkLabelCtrl.valueChanges.subscribe(function (value) {
            _this.settingsService.settings.showLinkLabel = value;
            _this.settingsService.dataChange.next(_this.settingsService.settings);
        });
    };
    SmrtgraphSettingsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-smrtgraph-settings',
            template: __webpack_require__("../../../../../src/app/smrtgraph-settings/smrtgraph-settings.component.html"),
            styles: [__webpack_require__("../../../../../src/app/smrtgraph-settings/smrtgraph-settings.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewEncapsulation */].None
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_settings_service__["a" /* SettingsService */]])
    ], SmrtgraphSettingsComponent);
    return SmrtgraphSettingsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/visuals/details/graph-details/graph-details.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/visuals/details/graph-details/graph-details.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphDetailsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GraphDetailsComponent = (function () {
    function GraphDetailsComponent() {
    }
    GraphDetailsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-graph-details',
            styles: [__webpack_require__("../../../../../src/app/visuals/details/graph-details/graph-details.component.css")],
            template: "\n<mat-tab-group selectedIndex=\"1\">\n  <mat-tab label=\"Link View\">\n    <link-list-visual></link-list-visual>\n  </mat-tab>\n  <mat-tab label=\"Node View\">\n    <node-details-visual></node-details-visual>\n  </mat-tab>\n</mat-tab-group>\n"
        })
    ], GraphDetailsComponent);
    return GraphDetailsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/visuals/details/link-list-visual/link-list-visual.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/visuals/details/link-list-visual/link-list-visual.component.html":
/***/ (function(module, exports) {

module.exports = "\n<mat-table #table [dataSource]=\"dataSource\" matSort >\n\n  <!--- Note that these columns can be defined in any order.\n        The actual rendered columns are set as a property on the row definition\" -->\n  <ng-container matColumnDef=\"source\">\n    <mat-header-cell *matHeaderCellDef >Source</mat-header-cell>\n    <mat-cell *matCellDef=\"let row\" >\n      <div [ngSwitch]=getNodeType(row.source)>\n      <target-detail-view *ngSwitchCase=\"'Target'\"  [node]=\"row.source\"></target-detail-view>\n      <compound-detail-view *ngSwitchCase=\"'Compound'\" [node]=\"row.source\"></compound-detail-view>\n      <pattern-detail-view *ngSwitchCase=\"'Pattern'\"  [node]=\"row.source\"></pattern-detail-view>\n      <div *ngSwitchDefault></div>\n    </div>\n    </mat-cell>\n  </ng-container>\n\n  <ng-container matColumnDef=\"linkType\">\n    <mat-header-cell *matHeaderCellDef mat-sort-header>Link Type </mat-header-cell>\n    <mat-cell *matCellDef=\"let row\">\n      <mat-list>\n        <mat-list-item>{{row.type}}</mat-list-item>\n      </mat-list>\n    </mat-cell>\n  </ng-container>\n\n  <ng-container matColumnDef=\"target\">\n    <mat-header-cell *matHeaderCellDef >Target</mat-header-cell>\n    <mat-cell *matCellDef=\"let row\">\n      <div [ngSwitch]=getNodeType(row.target)>\n        <target-detail-view *ngSwitchCase=\"'Target'\"  [node]=\"row.target\"></target-detail-view>\n        <compound-detail-view *ngSwitchCase=\"'Compound'\" [node]=\"row.target\"></compound-detail-view>\n        <pattern-detail-view *ngSwitchCase=\"'Pattern'\"  [node]=\"row.target\"></pattern-detail-view>\n        <div *ngSwitchDefault></div>\n      </div>\n    </mat-cell>\n  </ng-container>\n\n  <ng-container matColumnDef=\"details\">\n    <mat-header-cell *matHeaderCellDef mat-sort-header>Details</mat-header-cell>\n    <mat-cell *matCellDef=\"let row\">\n      <div *ngIf = 'row.reactions && row.reactions.length>0'>\n        <div *ngFor=\"let reaction of row.reactions trackById\">\n          <br/>\n          <span *ngIf =\"reaction.mechanism\">{{reaction.mechanism}}</span>\n          <span *ngIf =\"reaction.mechanism && reaction.causal\">: </span><br>\n          <span *ngIf =\"reaction.causal\">{{reaction.causal}}</span><br>\n          <br />\n        </div>\n      </div>\n    </mat-cell>\n  </ng-container>\n\n  <ng-container matColumnDef=\"reference\">\n    <mat-header-cell *matHeaderCellDef>Reference</mat-header-cell>\n    <mat-cell *matCellDef=\"let row\">\n      <div *ngIf = 'row.reactions && row.reactions.length>0'>\n        <mat-list>\n      <mat-list-item *ngFor=\"let reaction of row.reactions trackById\">\n        <a href = \"https://www.ncbi.nlm.nih.gov/pubmed/{{reaction.reference.split(':')[1]}}\" target=\"_blank\">{{reaction.reference}}</a>\n      </mat-list-item>\n    </mat-list>\n    </div>\n    </mat-cell>\n  </ng-container>\n\n  <ng-container matColumnDef=\"score\">\n    <mat-header-cell *matHeaderCellDef>Score</mat-header-cell>\n    <mat-cell *matCellDef=\"let row\">\n      <div *ngIf = 'row.reactions && row.reactions.length>0'>\n        <mat-list>\n        <mat-list-item *ngFor=\"let reaction of row.reactions trackById\">\n          Confidence: {{reaction.confidence}}\n        </mat-list-item>\n        </mat-list>\n      </div>\n      <div *ngIf = 'row.properties && row.properties.activity'><br/>Activity: {{row.properties.activity}}</div>\n      <div *ngIf = 'row.properties && row.properties.ratio'><br/>Overlap Ratio: {{row.properties.ratio}}</div>\n    </mat-cell>\n  </ng-container>\n\n  <ng-container matColumnDef=\"confidence\">\n    <mat-header-cell *matHeaderCellDef >Confidence</mat-header-cell>\n    <mat-cell *matCellDef=\"let row\">\n      <mat-list>\n        <mat-list-item> {{row.max_confidence_value}}</mat-list-item>\n      </mat-list>\n     </mat-cell>\n  </ng-container>\n\n  <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n  <mat-row *matRowDef=\"let row; columns: displayedColumns;\" fxLayoutAlign=\"center start\" ></mat-row>\n</mat-table>\n\n"

/***/ }),

/***/ "../../../../../src/app/visuals/details/link-list-visual/link-list-visual.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkListVisualComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__d3_models_link_service__ = __webpack_require__("../../../../../src/app/d3/models/link.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LinkListVisualComponent = (function () {
    function LinkListVisualComponent(linkService) {
        this.linkService = linkService;
        this.displayedColumns = ['source', 'linkType', 'target', 'details', 'reference', 'score', 'confidence'];
        this.data = [];
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_1__angular_material__["o" /* MatTableDataSource */](this.data);
    }
    LinkListVisualComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.linkSubscription = this.linkService.linkslist$
            .subscribe(function (res) {
            _this.dataSource.data = Array.from(new Set(res.hovered.concat(res.clicked)));
        });
    };
    LinkListVisualComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.sort = this.sort;
    };
    LinkListVisualComponent.prototype.getNodeType = function (node) {
        return node.constructor.name;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["m" /* MatSort */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_material__["m" /* MatSort */])
    ], LinkListVisualComponent.prototype, "sort", void 0);
    LinkListVisualComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'link-list-visual',
            template: __webpack_require__("../../../../../src/app/visuals/details/link-list-visual/link-list-visual.component.html"),
            styles: [__webpack_require__("../../../../../src/app/visuals/details/link-list-visual/link-list-visual.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__d3_models_link_service__["a" /* LinkService */]])
    ], LinkListVisualComponent);
    return LinkListVisualComponent;
}());



/***/ }),

/***/ "../../../../../src/app/visuals/details/link-list-visual/reaction-visual/reaction-visual.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/visuals/details/link-list-visual/reaction-visual/reaction-visual.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-list *ngFor=\"let reaction of reactions trackById\">\n  <mat-list-item >\n    {{reaction.mechanism}}\n  </mat-list-item>\n  <mat-list-item >\n    {{reaction.causal}}\n  </mat-list-item>\n  <mat-list-item >\n    <a href = \"https://www.ncbi.nlm.nih.gov/pubmed/{{reaction.reference.split(':')[1]}}\" target=\"_blank\">{{reaction.reference.split(':')[0]}}</a>\n  </mat-list-item>\n</mat-list>\n\n{{reactions|json}}\n"

/***/ }),

/***/ "../../../../../src/app/visuals/details/link-list-visual/reaction-visual/reaction-visual.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReactionVisualComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ReactionVisualComponent = (function () {
    function ReactionVisualComponent() {
    }
    ReactionVisualComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], ReactionVisualComponent.prototype, "reactions", void 0);
    ReactionVisualComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'reaction-visual',
            template: __webpack_require__("../../../../../src/app/visuals/details/link-list-visual/reaction-visual/reaction-visual.component.html"),
            styles: [__webpack_require__("../../../../../src/app/visuals/details/link-list-visual/reaction-visual/reaction-visual.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewEncapsulation */].None
        }),
        __metadata("design:paramtypes", [])
    ], ReactionVisualComponent);
    return ReactionVisualComponent;
}());



/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-details-visual.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-details-visual.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\">\n  <div fxFlex=\"92\">\n    <div [ngSwitch]=nodeType>\n        <target-detail-view *ngSwitchCase=\"'Target'\"  [node]=\"hoveredNode\"></target-detail-view>\n        <compound-detail-view *ngSwitchCase=\"'Compound'\" [node]=\"hoveredNode\"></compound-detail-view>\n        <pattern-detail-view *ngSwitchCase=\"'Pattern'\"  [node]=\"hoveredNode\"></pattern-detail-view>\n      <div *ngSwitchDefault></div>\n    </div>\n  </div>\n</div>-->\n\n\n<mat-table #table [dataSource]=\"dataSource\" >\n\n  <!--- Note that these columns can be defined in any order.\n        The actual rendered columns are set as a property on the row definition\" -->\n  <ng-container matColumnDef=\"source\">\n    <mat-header-cell *matHeaderCellDef >Source</mat-header-cell>\n    <mat-cell *matCellDef=\"let row\" > <div [ngSwitch]=getNodeType(row)>\n      <target-detail-view *ngSwitchCase=\"'Target'\"  [node]=\"row\"></target-detail-view>\n      <compound-detail-view *ngSwitchCase=\"'Compound'\" [node]=\"row\"></compound-detail-view>\n      <pattern-detail-view *ngSwitchCase=\"'Pattern'\"  [node]=\"row\"></pattern-detail-view>\n      <div *ngSwitchDefault></div>\n    </div>\n    </mat-cell>\n  </ng-container>\n\n  <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n  <mat-row *matRowDef=\"let row; columns: displayedColumns;\" fxLayoutAlign=\"center start\" ></mat-row>\n</mat-table>\n\n"

/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-details-visual.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeDetailsVisualComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_models_node__ = __webpack_require__("../../../../../src/app/d3/models/node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__d3_models_node_service__ = __webpack_require__("../../../../../src/app/d3/models/node.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NodeDetailsVisualComponent = (function () {
    function NodeDetailsVisualComponent(nodeService) {
        this.nodeService = nodeService;
        this.displayedColumns = ['source'];
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_3__angular_material__["o" /* MatTableDataSource */]();
    }
    NodeDetailsVisualComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.nodeService.nodeList$
            .subscribe(function (res) {
            _this.dataSource.data = Array.from(new Set(res.hovered.concat(res.clicked)));
        });
        if (this.data) {
            this.dataSource.data = [this.data];
        }
    };
    NodeDetailsVisualComponent.prototype.getNodeType = function (node) {
        return node.constructor.name;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__d3_models_node__["b" /* Node */])
    ], NodeDetailsVisualComponent.prototype, "data", void 0);
    NodeDetailsVisualComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'node-details-visual',
            template: __webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-details-visual.component.html"),
            styles: [__webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-details-visual.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__d3_models_node_service__["a" /* NodeService */]])
    ], NodeDetailsVisualComponent);
    return NodeDetailsVisualComponent;
}());



/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-types/compound-detail-view/compound-detail-view.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".smiles{\n  word-break: break-all;\n}\n\n.compound-avatar{\n  width:40px;\n  height: 40px;\n  border-radius: 50%;\n  background-color: #1E71A2;\n}\n\n.smrt-card{\n\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-types/compound-detail-view/compound-detail-view.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container smrt-card\">\n  <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxLayoutGap=\"10px\" class = \"main-row\">\n    <div fxFlex=\"15\">\n      <img class=\"compound-avatar\">\n    </div>\n    <div fxFlex=\"85\">\n      <h2>Compound</h2>\n    </div>\n  </div>\n\n    <h3 class=\"smiles\">Smiles: {{node?.smiles}}</h3><br/>\n    <img [src] = node?.imageUrl>\n    <mat-list>\n      <mat-list-item>InChI Key: {{node?.hash}}</mat-list-item>\n      <mat-list-item>Non stereo hash: {{node?.nostereo_hash}}</mat-list-item>\n      <mat-list-item>Compound Id: {{node?.compoundId}}</mat-list-item>\n    </mat-list>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-types/compound-detail-view/compound-detail-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompoundDetailViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_models_node__ = __webpack_require__("../../../../../src/app/d3/models/node.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CompoundDetailViewComponent = (function () {
    function CompoundDetailViewComponent() {
    }
    CompoundDetailViewComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__d3_models_node__["a" /* Compound */])
    ], CompoundDetailViewComponent.prototype, "node", void 0);
    CompoundDetailViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'compound-detail-view',
            template: __webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-types/compound-detail-view/compound-detail-view.component.html"),
            styles: [__webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-types/compound-detail-view/compound-detail-view.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], CompoundDetailViewComponent);
    return CompoundDetailViewComponent;
}());



/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-types/pattern-detail-view/pattern-detail-view.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".smiles{\n  word-break: break-all;\n}\n\n.pattern-avatar{\n  width:40px;\n  height: 40px;\n  border-radius: 50%;\n  background-color: #FF9C22;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-types/pattern-detail-view/pattern-detail-view.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container smrt-card\">\n  <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxLayoutGap=\"10px\" class = \"main-row\">\n    <div fxFlex=\"15\">\n      <img class=\"pattern-avatar\">\n    </div>\n    <div fxFlex=\"85\">\n      <h2>Pattern</h2>\n    </div>\n  </div>\n  <div fxLayoutWrap=\"row\">\n    <h3 class=\"smiles\">Smiles: {{node.smiles}}</h3><br/>\n    <img [src] = node?.imageUrl>\n    <mat-list>\n      <mat-list-item>InChI Key: {{node.hash}}</mat-list-item>\n      <mat-list-item>Pattern Type: {{node.pattern_type}}</mat-list-item>\n      <mat-list-item>Pattern Id: {{node.pattern_id}}</mat-list-item>\n    </mat-list>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-types/pattern-detail-view/pattern-detail-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PatternDetailViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_models_node__ = __webpack_require__("../../../../../src/app/d3/models/node.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PatternDetailViewComponent = (function () {
    function PatternDetailViewComponent() {
    }
    PatternDetailViewComponent.prototype.ngOnInit = function () {
    };
    PatternDetailViewComponent.prototype.ngOnChanges = function (changes) {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__d3_models_node__["c" /* Pattern */])
    ], PatternDetailViewComponent.prototype, "node", void 0);
    PatternDetailViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'pattern-detail-view',
            template: __webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-types/pattern-detail-view/pattern-detail-view.component.html"),
            styles: [__webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-types/pattern-detail-view/pattern-detail-view.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], PatternDetailViewComponent);
    return PatternDetailViewComponent;
}());



/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-types/target-detail-view/target-detail-view.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".name{\n  word-break: break-all;\n}\n\n.target-avatar{\n  width:40px;\n  height: 40px;\n  border-radius: 50%;\n  background-color: #ff5722;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-types/target-detail-view/target-detail-view.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container smrt-card\">\n  <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxLayoutGap=\"10px\" class = \"main-row\">\n    <div fxFlex=\"15\">\n      <img class=\"target-avatar\">\n    </div>\n    <div fxFlex=\"85\">\n      <h2>{{node.genes}}</h2>\n    </div>\n  </div>\n  <div fxLayoutWrap=\"row\">\n    <h3>{{node?.fullname}}</h3>\n</div>\n  <div *ngIf = \"node?.synonyms.length > 0\" fxLayoutWrap=\"row\">\n    <h3>Synonyms:</h3>\n    <br/>\n    <mat-list>\n      <mat-list-item *ngFor=\"let syn of node?.synonyms\">{{syn}}</mat-list-item>\n    </mat-list>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-types/target-detail-view/target-detail-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TargetDetailViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_models_node__ = __webpack_require__("../../../../../src/app/d3/models/node.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TargetDetailViewComponent = (function () {
    function TargetDetailViewComponent() {
    }
    TargetDetailViewComponent.prototype.ngOnInit = function () {
        //  this.uniprotUrl = "https://www.ebi.ac.uk/chembl/target/inspect/" + data.node.uniprot_id;
    };
    TargetDetailViewComponent.prototype.ngOnChanges = function (changes) {
        //  this.uniprotUrl = "https://www.ebi.ac.uk/chembl/target/inspect/" + data.node.uniprot_id;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__d3_models_node__["d" /* Target */])
    ], TargetDetailViewComponent.prototype, "node", void 0);
    TargetDetailViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'target-detail-view',
            template: __webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-types/target-detail-view/target-detail-view.component.html"),
            styles: [__webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-types/target-detail-view/target-detail-view.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TargetDetailViewComponent);
    return TargetDetailViewComponent;
}());



/***/ }),

/***/ "../../../../../src/app/visuals/graph/graph.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".loadingIcon {\n  position: absolute; /* Sit on top of the page content */\n  display: none; /* Hidden by default */\n  width: 100%; /* Full width (cover the whole page) */\n  height: 100%; /* Full height (cover the whole page) */\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0,0,0,0.3); /* Black background with opacity */\n\n}\n\n\n/*.expand-list2{\n  position: inherit;\n}\n\n.expand-list{\n  position: relative;\n}\n\n.node-menu{\n  background-color: red;\n  overflow:hidden;\n}*/\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/visuals/graph/graph.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_d3_service__ = __webpack_require__("../../../../../src/app/d3/d3.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_graph_data_service__ = __webpack_require__("../../../../../src/app/services/graph-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_loading_service__ = __webpack_require__("../../../../../src/app/services/loading.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GraphComponent = (function () {
    function GraphComponent(d3Service, ref, el, graphDataService, loadingService) {
        this.d3Service = d3Service;
        this.ref = ref;
        this.el = el;
        this.graphDataService = graphDataService;
        this.loadingService = loadingService;
        /*  @ViewChild(DownloadButtonComponent)
          private downloader: DownloadButtonComponent;*/
        this.nodes = [];
        this.links = [];
        this.loading = true;
        /*  downloadGraph(): void {
            this.downloader.downloadFile(d3.select('svg'), this.options);
          }*/
        this._options = { width: 600, height: 600 };
    }
    GraphComponent.prototype.onResize = function (event) {
        this.graph.initSimulation(this.options);
    };
    GraphComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadingService.loading$.subscribe(function (res) { return _this.loading = res; });
        this.graphDataService.graphhistory$.subscribe(function (res) {
            _this.nodes = res.nodes;
            _this.links = res.links;
            if (_this.graph) {
                _this.graph.update(res, _this.options);
            }
        });
        /** Receiving an initialized simulated graph from our custom d3 service */
        this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this._options);
        /** Binding change detection check on each tick
         * This along with an onPush change detection strategy should enforce checking only when relevant!
         * This improves scripting computation duration in a couple of tests I've made, consistently.
         * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
         */
        this.graph.ticker.subscribe(function (d) {
            _this.ref.markForCheck();
        });
    };
    GraphComponent.prototype.ngAfterViewInit = function () {
        this.graph.initSimulation(this.options);
    };
    Object.defineProperty(GraphComponent.prototype, "options", {
        get: function () {
            return this._options = {
                width: this.el.nativeElement.parentElement.offsetWidth,
                height: window.innerHeight * .6
                //  height: window.innerHeight-(window.outerHeight-window.innerHeight)
            };
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostListener */])('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], GraphComponent.prototype, "onResize", null);
    GraphComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'graph',
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* ChangeDetectionStrategy */].OnPush,
            template: "\n  <div *ngIf=\"loading\" class = \"loadingIcon\" fxLayoutAlign=\"center center\">\n    <mat-spinner></mat-spinner>\n  </div>\n    <svg #svg [attr.width]=\"_options.width\" [attr.height]=\"_options.height\">\n      <g [zoomableOf]=\"svg\" [draggableInGraph]=\"graph\">\n        <g [linkVisual]=\"link\" [clickableLink] = \"link\" [hoverableLink]=\"link\" *ngFor=\"let link of links\"></g>\n        <g [nodeVisual]=\"node\" *ngFor=\"let node of nodes\" [hoverableNode]=\"node\"\n        [clickableNode]=\"node\" [draggableNode]=\"node\" [draggableInGraph]=\"graph\">\n        </g>\n        <svg:g menu-list #menu></svg:g>\n      </g>\n        <defs>\n          <marker id=\"arrow\" viewBox=\"0 -5 10 10\" refX= '8.75' refY = '0' markerWidth=\"8\" markerHeight =\"8\" orient=\"auto\">\n            <path fill = \"#A5A5A5\" stroke =\"#A5A5A5\" stroke-width=\"2\" d = \"M0,-5L10,0L0,5\"></path>\n          </marker>\n          <marker id=\"hoverarrow\" viewBox=\"0 -5 10 10\" refX= '8.75' refY = '0' markerWidth=\"8\" markerHeight =\"8\" orient=\"auto\">\n            <path fill = \"#595959\" stroke =\"#595959\" stroke-width=\"2\" d = \"M0,-5L10,0L0,5\"></path>\n          </marker>\n          <marker id=\"flatarrow\" viewBox=\"0 -5 10 10\" refX= '8.75' refY = '0' markerWidth=\"8\" markerHeight =\"8\" orient=\"auto\">\n            <path fill = \"#A5A5A5\" stroke =\"#A5A5A5\" stroke-width=\"2\" stroke-width=\"3\" d = \"M 8,-8 L 8, 8\"></path>\n          </marker>\n          <marker id=\"hoverflatarrow\" viewBox=\"0 -5 10 10\" refX= '8.75' refY = '0' markerWidth=\"8\" markerHeight =\"8\" orient=\"auto\">\n            <path fill = \"#595959\" stroke =\"#595959\" stroke-width=\"2\" stroke-width=\"3\" d = \"M 8,-8 L 8, 8\"></path>\n          </marker>\n        </defs>\n    </svg>\n          <download-button ></download-button>\n  ",
            styles: [__webpack_require__("../../../../../src/app/visuals/graph/graph.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__d3_d3_service__["a" /* D3Service */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */],
            __WEBPACK_IMPORTED_MODULE_2__services_graph_data_service__["a" /* GraphDataService */],
            __WEBPACK_IMPORTED_MODULE_3__services_loading_service__["a" /* LoadingService */]])
    ], GraphComponent);
    return GraphComponent;
}());



/***/ }),

/***/ "../../../../../src/app/visuals/shared/link-visual/link-visual.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".link {\n    stroke-width: .75;\n  stroke: #A5A5A5;\n  cursor: pointer;\n}\n\n.end {\n  stroke-width: 2;\n  stroke: #A5A5A5;\n  fill: #A5A5A5;\n}\n\n.arrow {\n  stroke-width: 2 !important;\n  stroke: #A5A5A5;\n  fill: #A5A5A5;\n  marker-end: url(#arrow);\n}\n\n.flatarrow {\n  stroke-width: 2 !important;\n  stroke: #A5A5A5;\n  fill: #A5A5A5;\n  marker-end: url(#flatarrow);\n}\n\n.link-name {\n  font-family: 'Lato';\n  font-weight: 300;\n  color: #000000;\n}\n\n.link-node{\n  stroke: red;\n}\n\n.connected{\n  stroke-width: 2 !important;\n  stroke: #595959;\n  marker-end: url(#hoverarrow);\n}\n\n.connectedflat{\n  stroke-width: 2 !important;\n  stroke: #595959;\n  marker-end: url(#hoverflatarrow);\n}\n\n .maximal{\n  stroke-width: 2;\n  stroke: red;\n}\n\n\n.hovering {\n  stroke: #595959;\n  stroke-width: 3px;\n}\n\n.clicked {\n  stroke: #595959;\n  stroke-width: 3px;\n}\n\n/*#arrow{\n  stroke-width: 2;\n  stroke: #A5A5A5;\n}*/\n.clickable-area{\n  stroke: transparent;\n  fill:none;\n  stroke-width: 15px;\n  cursor: pointer;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/visuals/shared/link-visual/link-visual.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkVisualComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_models_link__ = __webpack_require__("../../../../../src/app/d3/models/link.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_settings_service__ = __webpack_require__("../../../../../src/app/services/settings.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LinkVisualComponent = (function () {
    function LinkVisualComponent(settingsService) {
        this.settingsService = settingsService;
    }
    LinkVisualComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.settingsService.dataChange
            .subscribe(function (settings) {
            _this.showLinkLabel = settings.showLinkLabel;
        });
    };
    LinkVisualComponent.prototype.endpointLessRadius = function (link, attr_name) {
        //  this.source = link.source;
        //   this.target = link.target;
        var x1 = link.source.x || 0;
        var y1 = link.source.y || 0;
        var x2 = link.target.x || 0;
        var y2 = link.target.y || 0;
        var distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        var radius1 = link.source.r || 0;
        var radius2 = link.target.r || 0;
        if (attr_name === 'x1')
            return x1 + (x2 - x1) * radius1 / distance;
        if (attr_name === 'y1')
            return y1 + (y2 - y1) * radius1 / distance;
        if (attr_name === 'x2')
            return x2 + (x1 - x2) * radius2 / distance;
        if (attr_name === 'y2')
            return y2 + (y1 - y2) * radius2 / distance;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('linkVisual'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__d3_models_link__["a" /* Link */])
    ], LinkVisualComponent.prototype, "link", void 0);
    LinkVisualComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: '[linkVisual]',
            template: "\n <svg:g class =\"link-group\">\n        <svg:line class=\"link end\"\n        [ngClass]=\"{arrow: link.edgeType != 'up', flatarrow: link.edgeType == 'up'}\"\n    [attr.x1]=\"endpointLessRadius(link, 'x1') || 0\"\n    [attr.y1]=\"endpointLessRadius(link, 'y1') || 0\"\n    [attr.x2]=\"endpointLessRadius(link, 'x2') || 0\"\n    [attr.y2]=\"endpointLessRadius(link, 'y2') || 0\"\n></svg:line>\n    <svg:text class=\"link-name\" *ngIf=\"showLinkLabel\"\n        [attr.font-size]= 10\n        [attr.x]=\"(link.source?.x +link.target?.x)/2 \"\n        [attr.y]=\"(link.source?.y +link.target?.y)/2 \"\n        >\n        {{link?.type }}\n      </svg:text>\n          <svg:line class=\"clickable-area\" \n  [attr.x1]= link.source.x\n    [attr.y1]=link.source.y\n    [attr.x2]=link.target.x\n    [attr.y2]=link.target.y\n       ></svg:line>\n      </svg:g>\n  ",
            styles: [__webpack_require__("../../../../../src/app/visuals/shared/link-visual/link-visual.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_settings_service__["a" /* SettingsService */]])
    ], LinkVisualComponent);
    return LinkVisualComponent;
}());



/***/ }),

/***/ "../../../../../src/app/visuals/shared/node-menu/node-menu.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".foreignObjectMenu{\n  background-color: rgb(250, 250, 250);\n}\n/*\n.expand-list2{\n  position: inherit;\n}\n*/\n\n.expand-list{\n  position: inherit;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/visuals/shared/node-menu/node-menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_models_node_service__ = __webpack_require__("../../../../../src/app/d3/models/node.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_data_connection_service__ = __webpack_require__("../../../../../src/app/services/data-connection.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_node_menu_controller_service__ = __webpack_require__("../../../../../src/app/services/node-menu-controller.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_graph_data_service__ = __webpack_require__("../../../../../src/app/services/graph-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_settings_service__ = __webpack_require__("../../../../../src/app/services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_node_expand_service__ = __webpack_require__("../../../../../src/app/services/node-expand.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var NodeMenuComponent = (function () {
    function NodeMenuComponent(nodeService, dataConnectionService, messageService, nodeMenuController, graphDataService, settingsService, nodeExpandService) {
        this.nodeService = nodeService;
        this.dataConnectionService = dataConnectionService;
        this.messageService = messageService;
        this.nodeMenuController = nodeMenuController;
        this.graphDataService = graphDataService;
        this.settingsService = settingsService;
        this.nodeExpandService = nodeExpandService;
        this.counts = { total: 0 };
        this.openMenu = false;
        this.expanded = new __WEBPACK_IMPORTED_MODULE_7__services_node_expand_service__["a" /* Expand */]();
    }
    NodeMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this only gets the count of the nodes
        this.nodeService.clickednode$.subscribe(function (node) {
            _this.clickedNode = node;
            if (_this.clickedNode.uuid) {
                _this.counts = { total: 0 };
                var message = _this.messageService.getMessage(_this.clickedNode.uuid, 'counts', _this.clickedNode.labels[0]);
                _this.dataConnectionService.messages.next(message);
                _this.expanded = _this.nodeExpandService.fetchExpand(_this.clickedNode.uuid);
            }
            _this.setLabel();
        });
        this.dataConnectionService.messages.subscribe(function (msg) {
            var response = JSON.parse(msg);
            if (response.type == 'counts') {
                _this.counts[response.data._fields[0][0].toLowerCase()] = response.data._fields[1].low;
                _this.counts.total = _this.counts.total + response.data._fields[1].low;
            }
        });
        this.nodeMenuController.clickedmenu$.subscribe(function (res) {
            if (_this.clickedNode) {
                if (res && _this.openMenu === res) {
                    _this.nodeMenuController.hideMenus();
                    _this.openMenu = res;
                }
                else if (!res && _this.openMenu === res) {
                    _this.openMenu = !res;
                }
                else {
                    _this.openMenu = res;
                }
            }
        });
        this.settingsService.dataChange.subscribe(function (settings) {
            _this.settings = settings;
            _this.setLabel();
        });
    };
    NodeMenuComponent.prototype.setLabel = function () {
        console.log(this.settings);
        if (this.clickedNode) {
            switch (this.clickedNode.constructor.name) {
                case 'Target': {
                    this.label = this.clickedNode[this.settings.targetLabel];
                    break;
                }
                case 'Compound': {
                    if (this.label && this.settings.compoundLabel === 'structure') {
                        this.label = this.settings.compoundLabel;
                    }
                    else {
                        this.label = this.clickedNode['hash'];
                    }
                    break;
                }
                case 'Pattern': {
                    this.label = this.settings.patternLabel;
                    break;
                }
            }
        }
    };
    NodeMenuComponent.prototype.expand = function (label) {
        var params = {
            'origin': this.clickedNode.labels[0],
            'target': label
        };
        if (label == "Predictions") {
            this.graphDataService.nodeExpand(this.clickedNode.uuid, 'prediction', params);
        }
        else {
            this.graphDataService.nodeExpand(this.clickedNode.uuid, 'expand', params);
        }
        this.expanded[label.toLowerCase()] = true;
        this.nodeExpandService.setExpand(this.clickedNode.uuid, this.expanded);
        this.closeMenu();
    };
    NodeMenuComponent.prototype.collapse = function (label) {
        this.graphDataService.nodeCollapse(this.clickedNode);
        this.expanded[label.toLowerCase()] = false;
        this.nodeExpandService.setExpand(this.clickedNode.uuid, this.expanded);
        this.closeMenu();
    };
    NodeMenuComponent.prototype.closeMenu = function () {
        this.nodeMenuController.hideMenus();
        this.openMenu = false;
    };
    NodeMenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: '[menu-list]',
            template: "\n<svg:foreignObject class=\"foreignObjectMenu\" [attr.x]=\"clickedNode.x\" [attr.y]=\"clickedNode.y\" width=\"20vh\" height=\"27vh\" *ngIf=\"openMenu\" >\n <xhtml:div xmlns=\"http:// www.w3.org/1999/xhtml\" >\n  <mat-list [class.mat-elevation-z1]=\"'true'\" >\n    <button mat-menu-item class = \"expand-list\" fxLayoutAlign=\"end center\"  (click)=\"closeMenu()\"><span><mat-icon>clear</mat-icon></span></button>\n    <button mat-menu-item class = \"expand-list\" [disabled]=\"true\"><b>{{label}}</b></button>\n    <button mat-menu-item class = \"expand-list\" *ngIf=\"!expanded.target\" (click)=\"expand('Target')\" [disabled]=\"!counts.target\">Expand Targets {{counts?.target}}</button>\n    <button mat-menu-item class = \"expand-list\" *ngIf=\"expanded.target===true\" (click)=\"collapse('Target')\" [disabled]=\"!counts.target\">Collapse Targets {{counts?.target}}</button>\n    <button mat-menu-item class = \"expand-list\"  *ngIf=\"!expanded.compound\" (click)=\"expand('Compound')\" [disabled]=\"!counts.compound\">Expand Compounds {{counts?.compound}}</button>\n    <button mat-menu-item class = \"expand-list\" *ngIf=\"expanded.compound===true\" (click)=\"collapse('Compound')\" [disabled]=\"!counts.compound\">Collapse Compounds {{counts?.compound}}</button>\n    <button mat-menu-item class = \"expand-list\" *ngIf=\"!expanded.pattern\" (click)=\"expand('Pattern')\" [disabled]=\"!counts.pattern\">Expand Patterns {{counts?.pattern}}</button>\n    <button mat-menu-item class = \"expand-list\" *ngIf=\"expanded.pattern===true\" (click)=\"collapse('Pattern')\" [disabled]=\"!counts.pattern\">Collapse Patterns {{counts?.pattern}}</button>\n    <button mat-menu-item class = \"expand-list\" *ngIf=\"!expanded.all\" (click)=\"expand('All')\">Expand All {{counts?.total}}</button>\n    <button mat-menu-item class = \"expand-list\" *ngIf=\"expanded.all===true\" (click)=\"collapse('All')\">Collapse All {{counts?.total}}</button>\n    <button mat-menu-item class = \"expand-list\" *ngIf=\"clickedNode.labels[0]=='Target' && !expanded.predictions\" (click)=\"expand('Predictions')\">Get Predictions</button>\n    <button mat-menu-item class = \"expand-list\" *ngIf=\"expanded.predictions===true\" (click)=\"collapse('Predictions')\">Remove Predictions</button>\n  </mat-list>\n</xhtml:div>\n</svg:foreignObject>\n",
            styles: [__webpack_require__("../../../../../src/app/visuals/shared/node-menu/node-menu.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__d3_models_node_service__["a" /* NodeService */],
            __WEBPACK_IMPORTED_MODULE_3__services_data_connection_service__["a" /* DataConnectionService */],
            __WEBPACK_IMPORTED_MODULE_2__services_message_service__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_4__services_node_menu_controller_service__["a" /* NodeMenuControllerService */],
            __WEBPACK_IMPORTED_MODULE_5__services_graph_data_service__["a" /* GraphDataService */],
            __WEBPACK_IMPORTED_MODULE_6__services_settings_service__["a" /* SettingsService */],
            __WEBPACK_IMPORTED_MODULE_7__services_node_expand_service__["b" /* NodeExpandService */]])
    ], NodeMenuComponent);
    return NodeMenuComponent;
}());



/***/ }),

/***/ "../../../../../src/app/visuals/shared/node-visual/node-visual.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".node {\n    cursor: pointer;\n    transition: stroke-width 0.1s ease-out,\n        fill 0.1s ease-out,\n        stroke 0.1s ease-out;\n  pointer-events: all;\n}\n\n.node-name {\n  font-family: 'Lato';\n  text-anchor: middle;\n  alignment-baseline: central;\n  font-weight: 300;\n  /*color: #000000;*/\n  pointer-events: all;\n}\n\n.hovering {\n  stroke: #000;\n  stroke-width: 2px;\n}\n\n\n.clicked {\n  stroke: #595959;\n  stroke-width: 3px;\n}\n\n.node {\n  diameter: 50px;\n  color: #A5ABB6;\n  border-color: #9AA1AC;\n  border-width: 2px;\n  text-color-internal: #FFFFFF;\n  font-size: 8px;\n  z-index: 666;\n}\n\n.relationship {\n  color: #A5ABB6;\n  shaft-width: 1px;\n  font-size: 8px;\n  padding: 3px;\n  /*text-color-external: #000000;*/\n  /*text-color-internal: #FFFFFF;*/\n  caption: '<type>';\n}\n\ncircle.node.Target.startNode {\n  fill: #ff8a50;\n}\n\ncircle.node.Target.endNode {\n  fill: #c41c00;\n}\n\n/*\nhttp:// paletton.com/#uid=40R0u0krKw0hhHhmv-HvKrezxln\n*/\n\n.Target {\n  fill: #ff5722;\n}\n\ncircle.node.Compound {\n  fill: #1E71A2;\n}\n\ncircle.node.Pattern {\n  fill: #FF9C22;\n}\n\n.connected{\n  stroke-width: 1.5;\n  stroke: #595959;\n}\n\n.maximal{\n  stroke-width: 2;\n  stroke: #e64a19;\n}\n\n.structureImage.Compound{\n  max-width: 7vh;\n  border: #1E71A2 1px solid;\n  border-radius: 50%;\n}\n\n.structureImage.Pattern{\n  max-width: 7vh;\n  border: #FF9C22 1px solid;\n  border-radius: 50%;\n}\n\n\n.node-menu{\n  background-color: rgb(250, 250, 250);\n  /*\n  position: fixed;\n  */\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/visuals/shared/node-visual/node-visual.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return StructureViewer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeVisualComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_models_node__ = __webpack_require__("../../../../../src/app/d3/models/node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_settings_service__ = __webpack_require__("../../../../../src/app/services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_node_menu_controller_service__ = __webpack_require__("../../../../../src/app/services/node-menu-controller.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__d3_models_node_service__ = __webpack_require__("../../../../../src/app/d3/models/node.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StructureViewer = (function () {
    function StructureViewer() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], StructureViewer.prototype, "data", void 0);
    StructureViewer = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'structure-view',
            styles: [__webpack_require__("../../../../../src/app/visuals/shared/node-visual/node-visual.component.css")],
            template: "\n    <img class=\"structureImage {{data.labels[0]}}\" [src] = data.imageUrl>\n"
        })
    ], StructureViewer);
    return StructureViewer;
}());

var NodeVisualComponent = (function () {
    function NodeVisualComponent(settingsService, nodeService, nodeMenuController) {
        this.settingsService = settingsService;
        this.nodeService = nodeService;
        this.nodeMenuController = nodeMenuController;
        this.nodeClicked = false;
    }
    NodeVisualComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settingsService.dataChange
            .subscribe(function (settings) {
            // console.log(settings);
            switch (_this.node.constructor.name) {
                case 'Target': {
                    _this.label = _this.node[settings.targetLabel];
                    break;
                }
                case 'Compound': {
                    if (settings.compoundLabel === 'structure') {
                        _this.label = settings.compoundLabel;
                    }
                    else {
                        _this.label = _this.node['hash'];
                    }
                    break;
                }
                case 'Pattern': {
                    _this.label = settings.patternLabel ? settings.patternLabel : "";
                    break;
                }
            }
            //   console.log(this.label);
        });
    };
    NodeVisualComponent.prototype.toggleMenu = function () {
        // this is the only place where the menu is opened
        this.nodeClicked = !this.nodeClicked;
        this.nodeService.clickedNodes(this.node);
        this.nodeMenuController.toggleVisible(this.node.uuid);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('nodeVisual'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__d3_models_node__["b" /* Node */])
    ], NodeVisualComponent.prototype, "node", void 0);
    NodeVisualComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: '[nodeVisual]',
            template: "\n    <svg:g [attr.transform]=\"'translate(' + node.x + ',' + node.y + ')'\"  *ngIf=\"label !='structure'\" (click)=\"toggleMenu()\">\n      <svg:circle\n          class=\"node {{node.labels[0]}}\"\n          [ngClass]=\"{startNode: node.params.startNode, endNode: node.params.endNode, clicked: nodeClicked}\"\n          cx=\"0\"\n          cy=\"0\"\n          [attr.r]=\"node.r\">\n      </svg:circle>\n       <svg:text>{{label}}</svg:text>\n       </svg:g>\n        <svg:foreignObject width='7vh' height='7vh' *ngIf=\"label ==='structure'\" [attr.x]=\"node.x - (node.r+.5*node.r)\" [attr.y]=\"node.y -(node.r+.5*node.r)\">\n <xhtml:div xmlns=\"http:// www.w3.org/1999/xhtml\">\n    <structure-view [data]=\"node\"></structure-view>\n</xhtml:div>\n      </svg:foreignObject>\n\n  ",
            styles: [__webpack_require__("../../../../../src/app/visuals/shared/node-visual/node-visual.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_settings_service__["a" /* SettingsService */],
            __WEBPACK_IMPORTED_MODULE_4__d3_models_node_service__["a" /* NodeService */],
            __WEBPACK_IMPORTED_MODULE_3__services_node_menu_controller_service__["a" /* NodeMenuControllerService */]])
    ], NodeVisualComponent);
    return NodeVisualComponent;
}());



/***/ }),

/***/ "../../../../../src/assets/material/material.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by sheilstk on 6/16/17.
 */


var MaterialModule = (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MatButtonModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MatAutocompleteModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MatMenuModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["r" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MatInputModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatIconModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatListModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["l" /* MatSliderModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatProgressSpinnerModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["p" /* MatTableModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["n" /* MatSortModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MatSidenavModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MatSlideToggleModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MatRadioModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["q" /* MatTabsModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatCheckboxModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MatButtonModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MatAutocompleteModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MatMenuModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["r" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MatInputModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatIconModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatListModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["l" /* MatSliderModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatProgressSpinnerModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["p" /* MatTableModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["n" /* MatSortModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MatSidenavModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MatSlideToggleModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MatRadioModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["q" /* MatTabsModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatCheckboxModule */]],
        })
    ], MaterialModule);
    return MaterialModule;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_hammerjs__);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map