webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
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
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".main-row{\n  max-height: 80%;\n}\n\n.link-list-row{\n  max-height: 20%;\n  background-color: #1E71A2;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "\n\n\n<smrtgraph-menu></smrtgraph-menu>\n\n<div class=\"container\">\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\" class = \"main-row\">\n    <div fxFlex=\"25\">\n      <smrtgraph-search></smrtgraph-search>\n      <app-graph-details></app-graph-details>\n    </div>\n    <div fxFlex=\"75\" class = \"graph-row\">\n      <!--\n            <graph [nodes]=nodes [links]=links ></graph>\n      -->\n      <div *ngIf=\"loading else content\">\n        <h1>Lodaing</h1>\n        <mat-spinner></mat-spinner>\n      </div>\n\n      <ng-template #content>\n        <graph></graph>\n      </ng-template>\n    </div>\n  </div>\n  <!--<div fxLayout=\"row\" fxLayoutGap=\"10px\" class=\"link-list-row\">\n  Linkslist\n    <br>\n    <br>\n    <br>\n    <br>\n    <br>\n    <br>\n    <br>\n    <br>\n    <br>\n    <br>\n    <br>\n    <br>\n    <br>\n  links\n\n  </div>-->\n  </div>\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__d3_models_node_service__ = __webpack_require__("../../../../../src/app/d3/models/node.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_data_connection_service__ = __webpack_require__("../../../../../src/app/services/data-connection.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_search_service__ = __webpack_require__("../../../../../src/app/services/search.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_startWith__ = __webpack_require__("../../../../rxjs/add/operator/startWith.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_startWith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_graph_data_service__ = __webpack_require__("../../../../../src/app/services/graph-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_loading_service__ = __webpack_require__("../../../../../src/app/services/loading.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











let AppComponent = class AppComponent {
    constructor(dataConnectionService, nodeService, searchService, messageService, graphDataService, loadingService) {
        this.dataConnectionService = dataConnectionService;
        this.nodeService = nodeService;
        this.searchService = searchService;
        this.messageService = messageService;
        this.graphDataService = graphDataService;
        this.loadingService = loadingService;
        this.title = 'smrtgraph';
        this.nodes = [];
        this.links = [];
        this.loading = true;
        this.searchTerm$ = new __WEBPACK_IMPORTED_MODULE_8_rxjs__["Subject"]();
        this.autocompleteOptions = [];
        this.compoundAutocompleteOptions = [];
        this.targetSelected = false;
        this.patternSelected = false;
        this.targetCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.patternCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        /*
        *  this is the main subscription pipeline that reads the websocket data
        *  all data comes through here, and must be passed on based on the response type
         */
        //todo: fix above description
        //todo: set all subscriptions to be variable to close on destroy
        this.dataConnectionService.messages.subscribe(msg => {
            //console.log(msg);
            let response = JSON.parse(msg);
            // console.log(response);
            switch (response.type) {
                case "targetSearch": {
                    this.autocompleteOptions.push(response.data);
                    break;
                }
                case "compoundSearch": {
                    this.compoundAutocompleteOptions.push(response.data);
                    break;
                }
                case "counts": {
                    break;
                }
            }
        });
        this.subscription = this.loadingService.loading$.subscribe(res => this.loading = res);
        /*
        * This provides an interface to handle the mapping of search input
        * it retrieves a query object from the service, returning the most recent input
        * this query is then passed on to the main data service
        * */
        this.searchService.search(this.searchTerm$)
            .subscribe(results => {
            //empty autocomplete options array, otherwise it will never change
            this.autocompleteOptions = [];
            this.compoundAutocompleteOptions = [];
            console.log(results);
            this.dataConnectionService.messages.next(results);
        });
    }
    ngOnInit() {
        this.targetCtrl.valueChanges.subscribe(value => {
            //forces selected option
            //todo: this doesn't seem very efficient
            if (value.value) {
                console.log("element clicked");
                this.onEnter("target");
            }
            else {
                if (value != '') {
                    //empty autocomplete options array, otherwise it will never change
                    this.autocompleteOptions = [];
                    this.searchTerm$.next({ term: value, type: "targetSearch" });
                }
            }
        });
        this.patternCtrl.valueChanges.subscribe(value => {
            console.log(value);
            //forces selected option
            //todo: this doesn't seem very efficient
            if (value.value) {
                this.onEnter("compound");
            }
            else {
                if (value != '') {
                    //empty autocomplete options array, otherwise it will never change
                    //this.compoundAutocompleteOptions = [];
                    // this.searchTerm$.next({term: value.replace(/\(/gi, "\\(").replace(/\)/gi, "\\)").replace(/\[/gi, "\\[").replace(/\]/gi, "\\]"), type: "patternSearch"});
                    this.searchTerm$.next({ term: value, type: "compoundSearch" });
                }
            }
        });
    }
    onEnter(type) {
        let value;
        switch (type) {
            case "target": {
                this.targetSelected = true;
                value = this.targetCtrl.value.value;
                break;
            }
            case "compound": {
                this.patternSelected = true;
                console.log(this.patternCtrl.value);
                value = this.patternCtrl.value.display;
                break;
            }
        }
        this.graphDataService.clearGraph();
        let query = this.messageService.getMessage(value, type);
        console.log(query);
        this.dataConnectionService.messages.next(query);
    }
    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        // this.subscription.unsubscribe();
    }
};
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_data_connection_service__["a" /* DataConnectionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_data_connection_service__["a" /* DataConnectionService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__d3_models_node_service__["a" /* NodeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__d3_models_node_service__["a" /* NodeService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_search_service__["a" /* SearchService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_search_service__["a" /* SearchService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__services_message_service__["a" /* MessageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_message_service__["a" /* MessageService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_9__services_graph_data_service__["a" /* GraphDataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__services_graph_data_service__["a" /* GraphDataService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_10__services_loading_service__["a" /* LoadingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__services_loading_service__["a" /* LoadingService */]) === "function" && _f || Object])
], AppComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const CONFIG = {
    N: 50,
    SPECTRUM: [
        // "rgb(222,237,250)"
        "rgb(176,212,243)",
        "rgb(128,186,236)",
        "rgb(77,158,228)",
        "rgb(38,137,223)",
        "rgb(0,116,217)",
        "rgb(0,106,197)"
        // "rgb(0,94,176)"
        // "rgb(0,82,154)"
        // "rgb(0,60,113)"
    ]
};
/* harmony default export */ __webpack_exports__["a"] = (CONFIG);
//# sourceMappingURL=app.config.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_flex_layout__ = __webpack_require__("../../../flex-layout/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__material_material_module__ = __webpack_require__("../../../../../src/app/material/material.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__d3_d3_service__ = __webpack_require__("../../../../../src/app/d3/d3.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__d3_models_node_service__ = __webpack_require__("../../../../../src/app/d3/models/node.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__visuals_graph_graph_component__ = __webpack_require__("../../../../../src/app/visuals/graph/graph.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__visuals_shared_node_visual_node_visual_component__ = __webpack_require__("../../../../../src/app/visuals/shared/node-visual/node-visual.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__visuals_shared_link_visual_link_visual_component__ = __webpack_require__("../../../../../src/app/visuals/shared/link-visual/link-visual.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_websocket_service__ = __webpack_require__("../../../../../src/app/services/websocket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_data_connection_service__ = __webpack_require__("../../../../../src/app/services/data-connection.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_search_service__ = __webpack_require__("../../../../../src/app/services/search.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__visuals_details_node_details_visual_node_details_visual_component__ = __webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-details-visual.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__visuals_shared_node_menu_node_menu_component__ = __webpack_require__("../../../../../src/app/visuals/shared/node-menu/node-menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_node_menu_controller_service__ = __webpack_require__("../../../../../src/app/services/node-menu-controller.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__services_graph_data_service__ = __webpack_require__("../../../../../src/app/services/graph-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__smrtgraph_search_smrtgraph_search_component__ = __webpack_require__("../../../../../src/app/smrtgraph-search/smrtgraph-search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__smrtgraph_menu_smrtgraph_menu_component__ = __webpack_require__("../../../../../src/app/smrtgraph-menu/smrtgraph-menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__download_button_download_button_component__ = __webpack_require__("../../../../../src/app/download-button/download-button.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__visuals_details_link_details_visual_link_details_visual_component__ = __webpack_require__("../../../../../src/app/visuals/details/link-details-visual/link-details-visual.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__d3_models_link_service__ = __webpack_require__("../../../../../src/app/d3/models/link.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__d3_directives_zoomable_directive__ = __webpack_require__("../../../../../src/app/d3/directives/zoomable.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__d3_directives_hoverable_link_directive__ = __webpack_require__("../../../../../src/app/d3/directives/hoverable-link.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__d3_directives_hoverable_node_directive__ = __webpack_require__("../../../../../src/app/d3/directives/hoverable-node.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__d3_directives_draggable_directive__ = __webpack_require__("../../../../../src/app/d3/directives/draggable.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__d3_directives_clickable_directive__ = __webpack_require__("../../../../../src/app/d3/directives/clickable.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__visuals_details_graph_details_graph_details_component__ = __webpack_require__("../../../../../src/app/visuals/details/graph-details/graph-details.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__services_loading_service__ = __webpack_require__("../../../../../src/app/services/loading.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__visuals_shared_loading_modal_loading_modal_component__ = __webpack_require__("../../../../../src/app/visuals/shared/loading-modal/loading-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__visuals_details_node_details_visual_node_types_target_detail_view_target_detail_view_component__ = __webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-types/target-detail-view/target-detail-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__visuals_details_node_details_visual_node_types_compound_detail_view_compound_detail_view_component__ = __webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-types/compound-detail-view/compound-detail-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__visuals_details_node_details_visual_node_types_pattern_detail_view_pattern_detail_view_component__ = __webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-types/pattern-detail-view/pattern-detail-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__visuals_shared_tooltip_visual_tooltip_visual_component__ = __webpack_require__("../../../../../src/app/visuals/shared/tooltip-visual/tooltip-visual.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






































let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_10__visuals_graph_graph_component__["a" /* GraphComponent */],
            __WEBPACK_IMPORTED_MODULE_17__visuals_details_node_details_visual_node_details_visual_component__["a" /* NodeDetailsVisualComponent */],
            __WEBPACK_IMPORTED_MODULE_18__visuals_shared_node_menu_node_menu_component__["a" /* NodeMenuComponent */],
            __WEBPACK_IMPORTED_MODULE_18__visuals_shared_node_menu_node_menu_component__["b" /* NodeMenuHolderComponent */],
            __WEBPACK_IMPORTED_MODULE_22__smrtgraph_menu_smrtgraph_menu_component__["a" /* SmrtgraphMenuComponent */],
            __WEBPACK_IMPORTED_MODULE_21__smrtgraph_search_smrtgraph_search_component__["a" /* SmrtgraphSearchComponent */],
            __WEBPACK_IMPORTED_MODULE_23__download_button_download_button_component__["a" /* DownloadButtonComponent */],
            __WEBPACK_IMPORTED_MODULE_24__visuals_details_link_details_visual_link_details_visual_component__["a" /* LinkDetailsVisualComponent */],
            __WEBPACK_IMPORTED_MODULE_11__visuals_shared_node_visual_node_visual_component__["a" /* NodeVisualComponent */],
            __WEBPACK_IMPORTED_MODULE_12__visuals_shared_link_visual_link_visual_component__["a" /* LinkVisualComponent */],
            __WEBPACK_IMPORTED_MODULE_26__d3_directives_zoomable_directive__["a" /* ZoomableDirective */],
            __WEBPACK_IMPORTED_MODULE_27__d3_directives_hoverable_link_directive__["a" /* HoverableLinkDirective */],
            __WEBPACK_IMPORTED_MODULE_28__d3_directives_hoverable_node_directive__["a" /* HoverableNodeDirective */],
            __WEBPACK_IMPORTED_MODULE_29__d3_directives_draggable_directive__["a" /* DraggableDirective */],
            __WEBPACK_IMPORTED_MODULE_30__d3_directives_clickable_directive__["a" /* ClickableDirective */],
            __WEBPACK_IMPORTED_MODULE_31__visuals_details_graph_details_graph_details_component__["a" /* GraphDetailsComponent */],
            __WEBPACK_IMPORTED_MODULE_33__visuals_shared_loading_modal_loading_modal_component__["b" /* LoadingModalComponent */],
            __WEBPACK_IMPORTED_MODULE_34__visuals_details_node_details_visual_node_types_target_detail_view_target_detail_view_component__["a" /* TargetDetailViewComponent */],
            __WEBPACK_IMPORTED_MODULE_35__visuals_details_node_details_visual_node_types_compound_detail_view_compound_detail_view_component__["a" /* CompoundDetailViewComponent */],
            __WEBPACK_IMPORTED_MODULE_36__visuals_details_node_details_visual_node_types_pattern_detail_view_pattern_detail_view_component__["a" /* PatternDetailViewComponent */],
            __WEBPACK_IMPORTED_MODULE_37__visuals_shared_tooltip_visual_tooltip_visual_component__["a" /* TooltipVisualComponent */],
            __WEBPACK_IMPORTED_MODULE_33__visuals_shared_loading_modal_loading_modal_component__["a" /* LoadingDialog */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["i" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_6__material_material_module__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_flex_layout__["a" /* FlexLayoutModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_13__services_websocket_service__["a" /* WebSocketService */],
            __WEBPACK_IMPORTED_MODULE_14__services_data_connection_service__["a" /* DataConnectionService */],
            __WEBPACK_IMPORTED_MODULE_7__d3_d3_service__["a" /* D3Service */],
            __WEBPACK_IMPORTED_MODULE_8__d3_models_node_service__["a" /* NodeService */],
            __WEBPACK_IMPORTED_MODULE_25__d3_models_link_service__["a" /* LinkService */],
            __WEBPACK_IMPORTED_MODULE_15__services_search_service__["a" /* SearchService */],
            __WEBPACK_IMPORTED_MODULE_16__services_message_service__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_20__services_graph_data_service__["a" /* GraphDataService */],
            __WEBPACK_IMPORTED_MODULE_19__services_node_menu_controller_service__["a" /* NodeMenuControllerService */],
            __WEBPACK_IMPORTED_MODULE_32__services_loading_service__["a" /* LoadingService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/d3/d3.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return D3Service; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_force_directed_graph__ = __webpack_require__("../../../../../src/app/d3/models/force-directed-graph.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3__ = __webpack_require__("../../../../d3/build/d3.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3__);
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






let D3Service = class D3Service {
    /** This service will provide methods to enable user interaction with elements
     * while maintaining the d3 simulations physics
     */
    constructor(nodeService, linkService, nodeMenuController) {
        this.nodeService = nodeService;
        this.linkService = linkService;
        this.nodeMenuController = nodeMenuController;
        /** A method to bind click events to an svg element */
        //just emits the node for other components to listen for
        this.applyClickableBehaviour = (element, node, graph) => {
            let d3element = __WEBPACK_IMPORTED_MODULE_2_d3__["select"](element);
            let svg = __WEBPACK_IMPORTED_MODULE_2_d3__["select"]('svg');
            let toggleMenu = () => {
                //if menu is open, close it
                if (node.params.menu) {
                    this.nodeMenuController.toggleVisible(false);
                }
                else {
                    this.nodeService.changeNode(node);
                    this.nodeMenuController.toggleVisible(true);
                    node.params.menu = true;
                }
            };
            let decorateNodes = () => {
                /*   d3.selectAll('circle')
                 .data(graph.nodes)
                 .filter(getNeighborNodes) //this will pass each node in the graph to the function
                 .classed('connected', true);
          
                 //sets click coloring on current node
                 d3element.select("circle").classed("clicked", false);*/
            };
            let clickFunction = () => {
                graph.nodes.map(node => node.params.menu = false);
                //todo: this is calling the node change every time the node is clicked to toggle the menu, which ends up trying to expand the node each time, resulting in a diff of 0
                toggleMenu();
                //todo: this may be less necessary with the menu opening
                //decorateNodes();
                __WEBPACK_IMPORTED_MODULE_2_d3__["event"].stopPropagation();
            };
            let clearMenu = () => {
                //this just closes out the menu and sets the menu tracking variable to be false for each node
                this.nodeMenuController.toggleVisible(false);
                graph.nodes.map(node => node.params.menu = false);
                __WEBPACK_IMPORTED_MODULE_2_d3__["event"].stopPropagation();
            };
            svg.on("click", clearMenu);
            d3element.on("click", clickFunction);
        };
    }
    /** A method to bind a pan and zoom behaviour to an svg element */
    applyZoomableBehaviour(svgElement, containerElement) {
        let svg, container, zoomed, zoom;
        svg = __WEBPACK_IMPORTED_MODULE_2_d3__["select"](svgElement);
        container = __WEBPACK_IMPORTED_MODULE_2_d3__["select"](containerElement);
        zoomed = () => {
            // let transform = d3.event.transform;
            container.attr("transform", __WEBPACK_IMPORTED_MODULE_2_d3__["event"].transform);
            //  container.attr("transform", "translate(" + transform.x + "," + transform.y + ") scale(" + transform.k + ")");
        };
        zoom = __WEBPACK_IMPORTED_MODULE_2_d3__["zoom"]().on("zoom", zoomed);
        svg.call(zoom);
    }
    /** A method to bind a draggable behaviour to an svg element */
    applyDraggableBehaviour(element, node, graph) {
        let d3element = __WEBPACK_IMPORTED_MODULE_2_d3__["select"](element);
        let started = () => {
            if (!__WEBPACK_IMPORTED_MODULE_2_d3__["event"].active) {
                graph.simulation.alphaTarget(0.3).restart();
            }
            //hides tooltip if active
            // d3element.select('.tooltip').style("opacity", 0);
            function dragged() {
                node.fx = __WEBPACK_IMPORTED_MODULE_2_d3__["event"].x;
                node.fy = __WEBPACK_IMPORTED_MODULE_2_d3__["event"].y;
                // d3.event.stopPropagation();
            }
            let ended = () => {
                if (!__WEBPACK_IMPORTED_MODULE_2_d3__["event"].active) {
                    graph.simulation.alphaTarget(0);
                }
                this.nodeMenuController.toggleVisible(false);
                //by not resetting these, the node stays where it is dragged
                /*  node.fx = null;
                 node.fy = null;*/
            };
            __WEBPACK_IMPORTED_MODULE_2_d3__["event"].on("drag", dragged).on("end", ended, this.nodeMenuController.toggleVisible(false));
            // this.nodeMenuController.toggleVisible(false);
        };
        d3element.call(__WEBPACK_IMPORTED_MODULE_2_d3__["drag"]()
            .on("start", started));
    }
    /** A method to bind hoverable behaviour to an svg element */
    applyHoverableNodeBehaviour(element, node, graph) {
        let d3element = __WEBPACK_IMPORTED_MODULE_2_d3__["select"](element);
        let connectedLinks;
        let maximalLinks = [];
        let upstreamNeighbors = [];
        let downstreamNeighbors = [];
        let decorateNodes = () => {
            d3element.select('circle').classed('hovering', true);
            /* d3element.selectAll('.tooltip').transition().duration(200)
             .style("opacity", .9).attr('z-index', 666);*/
            __WEBPACK_IMPORTED_MODULE_2_d3__["selectAll"]('circle')
                .data(graph.nodes)
                .filter(getNeighborNodes) //this will pass each node in the graph to the function
                .classed('connected', true);
        };
        let decorateLinks = () => {
            connectedLinks = __WEBPACK_IMPORTED_MODULE_2_d3__["selectAll"]('line')
                .data(graph.links)
                .filter(getNeighborLinks)
                .classed('connected', true);
            let connectedNodes = __WEBPACK_IMPORTED_MODULE_2_d3__["selectAll"]('circle')
                .data(graph.nodes)
                .filter(getNeighborNodes)
                .classed('connected', true);
            connectedLinks.filter(findMaximalLinks)
                .classed('maximal', true);
            connectedNodes.filter(findMaximalNodes)
                .classed('maximal', true);
        };
        let clearNodes = () => {
            d3element.select('circle').classed('hovering', false);
            node.params.hovered = false;
            /* d3element.select('.tooltip').transition().duration(500)
             .style("opacity", 0);*/
        };
        let clearLinks = () => {
            __WEBPACK_IMPORTED_MODULE_2_d3__["selectAll"]('line')
                .classed('connected', false)
                .classed('maximal', false);
            __WEBPACK_IMPORTED_MODULE_2_d3__["selectAll"]('circle')
                .classed('connected', false)
                .classed('maximal', false);
        };
        //todo: this is kind of piggybacking on the filter function
        let getNeighborLinks = (e) => {
            let downstream = node.id === (typeof (e.source) == "object" ? e.source.id : e.source);
            let upstream = node.id === (typeof (e.target) == "object" ? e.target.id : e.target);
            if (downstream == true) {
                downstreamNeighbors.push(e);
            }
            if (upstream == true) {
                upstreamNeighbors.push(e);
            }
            //   return node.id === (typeof (e.source) == "object" ? e.source.id : e.source) || node.id === (typeof (e.target) == "object" ? e.target.id : e.target);
            return downstream;
        };
        let getNeighborNodes = (e) => {
            // const sources = connectedLinks.data().map(link => link.source.id);
            const targets = connectedLinks.data().map(link => link.target.id);
            // let nodesList = sources.concat(targets).reduce((x, y) => x.includes(y) ? x : [...x, y], []);
            return targets.indexOf(e.id) > -1;
        };
        let findMaximalLinks = (e) => {
            if (e.properties && e.properties.maximal && e.properties.maximal == "t") {
                maximalLinks = maximalLinks.concat([e.source.id, e.target.id]).reduce((x, y) => x.includes(y) ? x : [...x, y], []);
                return true;
            }
            else {
                return false;
            }
        };
        let findMaximalNodes = (e) => {
            return maximalLinks.indexOf(e.id) > -1;
        };
        let mouseOverFunction = () => {
            this.nodeService.hoveredNode({ node: node, up: upstreamNeighbors, down: downstreamNeighbors });
            decorateLinks();
            decorateNodes();
        };
        let mouseOutFunction = () => {
            clearNodes();
            clearLinks();
            upstreamNeighbors = [];
            downstreamNeighbors = [];
        };
        //todo: this fires constantly as the node is dragged
        d3element.on("mouseover", mouseOverFunction).on("mouseout", mouseOutFunction);
    }
    /** A method to bind hoverable behaviour to an svg element */
    applyHoverableLinkBehaviour(element, link, graph) {
        let d3element = __WEBPACK_IMPORTED_MODULE_2_d3__["select"](element);
        let connectedLinks;
        let decorateLinks = () => {
            d3element.select('line').classed('hovering', true).classed('connected', true);
            this.linkService.hoveredLink(link);
        };
        let clearLinks = () => {
            d3element.select('line').classed('hovering', false).classed('connected', false);
        };
        let mouseOverFunction = () => {
            this.linkService.hoveredLink(link);
            decorateLinks();
            //  decorateNodes();
        };
        let mouseOutFunction = () => {
            //   clearNodes();
            clearLinks();
            //  upstreamNeighbors = [];
            //  downstreamNeighbors = [];
        };
        d3element.on("mouseover", mouseOverFunction).on("mouseout", mouseOutFunction);
    }
    /** The interactable graph we will return
     * This method does not interact with the document, purely physical calculations with d3
     */
    getForceDirectedGraph(nodes, links, options) {
        return new __WEBPACK_IMPORTED_MODULE_1__models_force_directed_graph__["a" /* ForceDirectedGraph */](nodes, links, options);
    }
};
D3Service = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__models_node_service__["a" /* NodeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__models_node_service__["a" /* NodeService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__models_link_service__["a" /* LinkService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__models_link_service__["a" /* LinkService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__services_node_menu_controller_service__["a" /* NodeMenuControllerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_node_menu_controller_service__["a" /* NodeMenuControllerService */]) === "function" && _c || Object])
], D3Service);

var _a, _b, _c;
//# sourceMappingURL=d3.service.js.map

/***/ }),

/***/ "../../../../../src/app/d3/directives/clickable.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClickableDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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




let ClickableDirective = class ClickableDirective {
    constructor(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    ngOnInit() {
        this.d3Service.applyClickableBehaviour(this._element.nativeElement, this.node, this.graph);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('clickableNode'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__models_node__["b" /* Node */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_node__["b" /* Node */]) === "function" && _a || Object)
], ClickableDirective.prototype, "node", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('draggableInGraph'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__models_force_directed_graph__["a" /* ForceDirectedGraph */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__models_force_directed_graph__["a" /* ForceDirectedGraph */]) === "function" && _b || Object)
], ClickableDirective.prototype, "graph", void 0);
ClickableDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */])({
        selector: '[clickableNode]'
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__d3_service__["a" /* D3Service */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__d3_service__["a" /* D3Service */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _d || Object])
], ClickableDirective);

var _a, _b, _c, _d;
//# sourceMappingURL=clickable.directive.js.map

/***/ }),

/***/ "../../../../../src/app/d3/directives/draggable.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DraggableDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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




let DraggableDirective = class DraggableDirective {
    constructor(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    ngOnInit() {
        this.d3Service.applyDraggableBehaviour(this._element.nativeElement, this.node, this.graph);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('draggableNode'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__models_node__["b" /* Node */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_node__["b" /* Node */]) === "function" && _a || Object)
], DraggableDirective.prototype, "node", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('draggableInGraph'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__models_force_directed_graph__["a" /* ForceDirectedGraph */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__models_force_directed_graph__["a" /* ForceDirectedGraph */]) === "function" && _b || Object)
], DraggableDirective.prototype, "graph", void 0);
DraggableDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */])({
        selector: '[draggableNode]'
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__d3_service__["a" /* D3Service */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__d3_service__["a" /* D3Service */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _d || Object])
], DraggableDirective);

var _a, _b, _c, _d;
//# sourceMappingURL=draggable.directive.js.map

/***/ }),

/***/ "../../../../../src/app/d3/directives/hoverable-link.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HoverableLinkDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_service__ = __webpack_require__("../../../../../src/app/d3/d3.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_link__ = __webpack_require__("../../../../../src/app/d3/models/link.ts");
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




let HoverableLinkDirective = class HoverableLinkDirective {
    constructor(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    ngOnInit() {
        this.d3Service.applyHoverableLinkBehaviour(this._element.nativeElement, this.link, this.graph);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('hoverableLink'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__models_link__["a" /* Link */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_link__["a" /* Link */]) === "function" && _a || Object)
], HoverableLinkDirective.prototype, "link", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('draggableInGraph'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__models_force_directed_graph__["a" /* ForceDirectedGraph */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__models_force_directed_graph__["a" /* ForceDirectedGraph */]) === "function" && _b || Object)
], HoverableLinkDirective.prototype, "graph", void 0);
HoverableLinkDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */])({
        selector: '[hoverableLink]'
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__d3_service__["a" /* D3Service */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__d3_service__["a" /* D3Service */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _d || Object])
], HoverableLinkDirective);

var _a, _b, _c, _d;
//# sourceMappingURL=hoverable-link.directive.js.map

/***/ }),

/***/ "../../../../../src/app/d3/directives/hoverable-node.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HoverableNodeDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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




let HoverableNodeDirective = class HoverableNodeDirective {
    constructor(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    ngOnInit() {
        this.d3Service.applyHoverableNodeBehaviour(this._element.nativeElement, this.node, this.graph);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('hoverableNode'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__models_node__["b" /* Node */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_node__["b" /* Node */]) === "function" && _a || Object)
], HoverableNodeDirective.prototype, "node", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('draggableInGraph'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__models_force_directed_graph__["a" /* ForceDirectedGraph */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__models_force_directed_graph__["a" /* ForceDirectedGraph */]) === "function" && _b || Object)
], HoverableNodeDirective.prototype, "graph", void 0);
HoverableNodeDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */])({
        selector: '[hoverableNode]'
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__d3_service__["a" /* D3Service */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__d3_service__["a" /* D3Service */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _d || Object])
], HoverableNodeDirective);

var _a, _b, _c, _d;
//# sourceMappingURL=hoverable-node.directive.js.map

/***/ }),

/***/ "../../../../../src/app/d3/directives/zoomable.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ZoomableDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_service__ = __webpack_require__("../../../../../src/app/d3/d3.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let ZoomableDirective = class ZoomableDirective {
    constructor(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    ngOnInit() {
        this.d3Service.applyZoomableBehaviour(this.containerElement, this._element.nativeElement);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('zoomableOf'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _a || Object)
], ZoomableDirective.prototype, "containerElement", void 0);
ZoomableDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */])({
        selector: '[zoomableOf]'
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__d3_service__["a" /* D3Service */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__d3_service__["a" /* D3Service */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _c || Object])
], ZoomableDirective);

var _a, _b, _c;
//# sourceMappingURL=zoomable.directive.js.map

/***/ }),

/***/ "../../../../../src/app/d3/models/force-directed-graph.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3__ = __webpack_require__("../../../../d3/build/d3.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_loading_service__ = __webpack_require__("../../../../../src/app/services/loading.service.ts");



const FORCES = {
    LINKS: 1 / 50,
    //gets rid of overlap [0,1]
    COLLISION: 1,
    // A positive value causes nodes to attract each other, similar to gravity, while a negative value causes nodes to repel each other, similar to electrostatic charge.
    CHARGE: -1
};
class ForceDirectedGraph {
    constructor(nodes, links, options) {
        this.ticker = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.nodes = [];
        this.links = [];
        this.loadingService = new __WEBPACK_IMPORTED_MODULE_2__services_loading_service__["a" /* LoadingService */];
        this.nodes = nodes;
        this.links = links;
        this.initSimulation(options);
    }
    update(graph, options) {
        console.log(graph);
        //frequently the data is separate from the graph image, so these need to be set for downstream filtering
        this.nodes = graph.nodes;
        this.links = graph.links;
        this.simulation.nodes(this.nodes);
        this.simulation
            .force('link', __WEBPACK_IMPORTED_MODULE_1_d3__["forceLink"](this.links).id(d => d['id'])
            .strength(FORCES.LINKS));
        this.initSimulation(options);
        if (!this.simulation) {
            throw new Error('simulation was not initialized yet');
        }
        // this.simulation.restart();
        this.simulation.alphaTarget(0.5).restart();
        this.loadingService.toggleVisible(false);
    }
    initSimulation(options) {
        if (!options || !options.width || !options.height) {
            throw new Error('missing options when initializing simulation');
        }
        /** Creating the simulation */
        if (!this.simulation) {
            this.simulation = __WEBPACK_IMPORTED_MODULE_1_d3__["forceSimulation"]()
                .force('charge', __WEBPACK_IMPORTED_MODULE_1_d3__["forceManyBody"]()
                .strength(d => FORCES.CHARGE * d['r']))
                .force('center', __WEBPACK_IMPORTED_MODULE_1_d3__["forceCenter"](options.width / 2, options.height / 2))
                .force("collide", __WEBPACK_IMPORTED_MODULE_1_d3__["forceCollide"]()
                .radius(d => d['r'] + 5).iterations(2)
                .strength(FORCES.COLLISION))
                .force("y", __WEBPACK_IMPORTED_MODULE_1_d3__["forceY"]().y(function () {
                return Math.random() * ((3 * options.height / 4) - (options.height / 4) + 1) + (options.height / 4);
            }))
                .force("x", __WEBPACK_IMPORTED_MODULE_1_d3__["forceX"]().x(function (d) {
                if (d.params.startNode == true) {
                    return options.width / 10;
                }
                else if (d.params.endNode == true) {
                    return 19 * options.width / 20;
                }
                else {
                    //todo: this has a tendency to cluster things more vertically does this need to be adjusted?
                    return Math.random() * ((2 * options.width / 3) - (options.width / 3) + 1) + (options.width / 3);
                }
            }));
            const ticker = this.ticker;
            // Connecting the d3 ticker to an angular event emitter
            this.simulation.on('tick', function () {
                ticker.emit(this);
            });
        }
        /** Restarting the simulation internal timer */
        this.simulation.restart();
        console.log(this);
        this.loadingService.toggleVisible(false);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ForceDirectedGraph;

//# sourceMappingURL=force-directed-graph.js.map

/***/ }),

/***/ "../../../../../src/app/d3/models/link.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
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



let LinkService = class LinkService {
    constructor() {
        // Observable navItem source
        this._clickedLinkSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"]();
        this._hoveredLinkSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"]();
        this.masterLinkMap = new Map();
        // Observable navItem stream
        this.lastLink = {};
        this.clickedlink$ = this._clickedLinkSource.asObservable();
        this.hoveredlink$ = this._hoveredLinkSource.asObservable();
    }
    // service command
    changeLink(link) {
        this._clickedLinkSource.next(link);
    }
    hoveredLink(link) {
        this._hoveredLinkSource.next(link);
    }
    getLinks() {
        console.log(this.masterLinkMap.size);
        return this.masterLinkMap;
    }
    getById(id) {
        return this.masterLinkMap.get(id);
    }
    setLink(link) {
        this.masterLinkMap.set(link.uuid, link);
    }
    //searches to see if a link exists. if it does, it returns the link with the sent data merged, if it doesn't exist, it makes a new link with the data
    makeLink(id, source, target, data) {
        let l = this.masterLinkMap.get(id);
        if (!l) {
            l = new __WEBPACK_IMPORTED_MODULE_2__link__["a" /* Link */](source, target, data);
        }
        return l;
    }
};
LinkService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
], LinkService);

//# sourceMappingURL=link.service.js.map

/***/ }),

/***/ "../../../../../src/app/d3/models/link.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Link {
    constructor(source, target, properties) {
        this.source = source;
        this.target = target;
        this.type = properties.type || "";
        this.properties = properties.properties;
        this.uuid = properties.properties.uuid;
        this.linkType = source.constructor.name + '_' + target.constructor.name;
        if (properties.properties.causal_statements) {
            this.causalStatements = Array.from(new Set(properties.properties.causal_statements.map((elem) => {
                let r;
                if (elem != "CS_NA") {
                    return elem.split('(')[1].split(')')[0];
                }
            }))).join();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Link;

//# sourceMappingURL=link.js.map

/***/ }),

/***/ "../../../../../src/app/d3/models/node.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node__ = __webpack_require__("../../../../../src/app/d3/models/node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by sheilstk on 6/16/17.
 */






let NodeService = class NodeService {
    constructor() {
        // Observable navItem source
        this._clickedNodeSource = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["Subject"]();
        this._hoveredNodeSource = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["Subject"]();
        this.masterNodeMap = new Map();
        // Observable navItem stream
        this.lastNode = {};
        this.clickednode$ = this._clickedNodeSource.asObservable();
        this.hoverednode$ = this._hoveredNodeSource.asObservable();
    }
    // service command
    changeNode(node) {
        this._clickedNodeSource.next(node);
    }
    hoveredNode(node) {
        this._hoveredNodeSource.next(node);
    }
    getNodes() {
        console.log(this.masterNodeMap.size);
        return this.masterNodeMap;
    }
    getById(id) {
        return this.masterNodeMap.get(id);
    }
    setNode(node) {
        this.masterNodeMap.set(node.uuid, node);
    }
    //searches to see if a node exists. if it does, it returns the node, if it doesn't exist, it makes a new node with the data
    makeNode(id, data) {
        let n = this.masterNodeMap.get(id);
        if (!n) {
            if (data.labels) {
                switch (data.labels[0]) {
                    case "Compound": {
                        n = new __WEBPACK_IMPORTED_MODULE_1__node__["a" /* Compound */](id, data);
                        break;
                    }
                    case "Target": {
                        n = new __WEBPACK_IMPORTED_MODULE_1__node__["d" /* Target */](id, data);
                        break;
                    }
                    case "Pattern": {
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
        //return this.masterNodeMap.get(id) ? this.masterNodeMap.get(id) : new Node(id, data);
    }
};
NodeService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
], NodeService);

//# sourceMappingURL=node.service.js.map

/***/ }),

/***/ "../../../../../src/app/d3/models/node.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_config__ = __webpack_require__("../../../../../src/app/app.config.ts");

class Params {
    constructor() {
        this.hovered = false;
        this.startNode = false;
        this.endNode = false;
        this.menu = false;
    }
}
/* unused harmony export Params */

class Node {
    /*
    * Neo4j has their own uuid that will need to be used to track nodes, since some relationships are sepnt with the start
    * and end nodes notated solely by the Neo4j ids, rather than the full node object
    * */
    constructor(id, properties) {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.linkCount = 0;
        this.expanded = {
            target: false,
            compound: false,
            pattern: false
        };
        this.normal = () => {
            return Math.sqrt(this.linkCount / __WEBPACK_IMPORTED_MODULE_0__app_config__["a" /* default */].N);
        };
        this.uuid = properties.properties.uuid;
        this.id = id;
        //uuid is still saved here
        this.properties = properties.properties;
        this.labels = properties.labels;
        this.linkCount = 1;
        this.params = new Params();
    }
    get r() {
        return 50 * this.normal() + 15;
    }
    get fontSize() {
        return (30 * this.normal() + 10) + 'px';
    }
    get color() {
        let index = Math.floor(__WEBPACK_IMPORTED_MODULE_0__app_config__["a" /* default */].SPECTRUM.length * this.normal());
        return __WEBPACK_IMPORTED_MODULE_0__app_config__["a" /* default */].SPECTRUM[index];
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Node;

class Compound extends Node {
    constructor(id, properties) {
        super(id, properties);
        this.hash = properties.properties.hash;
        this.nostereo_hash = properties.properties.nostereo_hash;
        this.smiles = properties.properties.smiles;
        this.compoundId = properties.properties.compound_id.low;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Compound;

class Target extends Node {
    constructor(id, properties) {
        super(id, properties);
        this.uniprot_id = properties.properties.uniprot_id;
        this.name = properties.properties.name;
        this.fullname = properties.properties.fullname.split("(")[0];
    }
}
/* harmony export (immutable) */ __webpack_exports__["d"] = Target;

class Pattern extends Node {
    constructor(id, properties) {
        super(id, properties);
        this.hash = properties.properties.hash;
        this.pattern_id = properties.properties.pattern_id;
        this.pattern_type = properties.properties.pattern_type;
        this.smiles = properties.properties.smiles;
    }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = Pattern;

//# sourceMappingURL=node.js.map

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let DownloadButtonComponent = class DownloadButtonComponent {
    constructor(rd) {
        this.rd = rd;
    }
    ngOnInit() {
        console.log(this.rd.data);
        console.log(this.el);
    }
    ngAfterViewInit() {
        // var div = this.elRef.nativeElement.querySelector('#');
        // console.log(div);
        console.log(this.rd);
        console.log(this.el);
    }
    //
    downloadFile(data, options) {
        console.log("downloading");
        let svgString = this.getSVGString(data.node());
        this.svgString2Image(svgString, 2 * options.width, 2 * options.height, save); // passes Blob and filesize String to the callback
        function save(dataBlob) {
            console.log(dataBlob);
            // saveAs( dataBlob, 'D3 vis exported to PNG.png' ); // FileSaver.js function
        }
        /* let image = new Image();
         image.src = 'data:image/svg+xml;base64,' + window.btoa(encodeURIComponent(svgString));
         console.log(image);
         let blob = new Blob([image], {type: 'image/png;charset=utf-8'});
         console.log(blob);
         let url = window.URL.createObjectURL(blob);
         console.log(url);
         window.open(url);*/
    }
    // Below are the functions that handle actual exporting:
    getSVGString(svgNode) {
        svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
        let cssStyleText = getCSSStyles(svgNode);
        appendCSS(cssStyleText, svgNode);
        var serializer = new XMLSerializer();
        var svgString = serializer.serializeToString(svgNode);
        svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
        svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix
        return svgString;
        function getCSSStyles(parentElement) {
            let selectorTextArr = [];
            // Add Parent element Id and Classes to the list
            selectorTextArr.push('#' + parentElement.id);
            for (let classType of parentElement.classList) {
                if (!contains('.' + classType, selectorTextArr)) {
                    selectorTextArr.push('.' + classType);
                }
            }
            // Add Children element Ids and Classes to the list
            let nodes = parentElement.getElementsByTagName("*");
            for (let node of nodes) {
                let id = node.id;
                if (!contains('#' + id, selectorTextArr)) {
                    selectorTextArr.push('#' + id);
                }
                let classes = node.classList;
                for (let nodeClass of classes) {
                    if (!contains('.' + nodeClass, selectorTextArr)) {
                        selectorTextArr.push('.' + nodeClass);
                    }
                }
            }
            // Extract CSS Rules
            let extractedCSSText = "";
            for (let r = 0; r < document.styleSheets.length; r++) {
                let css = document.styleSheets[r];
                try {
                    if (!(css instanceof CSSStyleSheet))
                        continue;
                }
                catch (e) {
                    if (e.name !== 'SecurityError')
                        throw e; // for Firefox
                    continue;
                }
                // Now TypeScript knows that your sheet is CSS sheet
                if (css) {
                    let rules = css.cssRules ? css.cssRules : css.rules;
                    if (rules) {
                        for (let i = 0; i < rules.length; i++) {
                            const rule = rules[i];
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
            let styleElement = document.createElement("style");
            styleElement.setAttribute("type", "text/css");
            styleElement.innerHTML = cssText;
            let refNode = element.hasChildNodes() ? element.children[0] : null;
            element.insertBefore(styleElement, refNode);
        }
    }
    svgString2Image(svgString, width, height, callback) {
        var imgsrc = 'data:image/svg+xml;base64,' + btoa(svgString); // Convert SVG string to data URL
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        var image = new Image();
        image.src = imgsrc;
        image.onload = function () {
            context.clearRect(0, 0, width, height);
            context.drawImage(image, 0, 0, width, height);
            console.log(context);
            //    console.log(blob);
            //  });
        };
        let blob = new Blob([image], { type: 'image/png;charset=utf-8' });
        console.log(canvas);
        console.log(blob);
        console.log(image);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('#svg'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _a || Object)
], DownloadButtonComponent.prototype, "el", void 0);
DownloadButtonComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'download-button',
        template: `
      <button mat-button>Download current graph <i class="material-icons">file_download</i></button>

`,
        styles: [__webpack_require__("../../../../../src/app/download-button/download-button.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Renderer2 */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Renderer2 */]) === "function" && _b || Object])
], DownloadButtonComponent);

var _a, _b;
//# sourceMappingURL=download-button.component.js.map

/***/ }),

/***/ "../../../../../src/app/material/material.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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


let MaterialModule = class MaterialModule {
};
MaterialModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MatButtonModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MatAutocompleteModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MatMenuModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["n" /* MatToolbarModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MatInputModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatIconModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MatListModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["m" /* MatSliderModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MatGridListModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatCardModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["l" /* MatProgressSpinnerModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MatDialogModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MatButtonModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MatAutocompleteModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MatMenuModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["n" /* MatToolbarModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MatInputModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatIconModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MatListModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["m" /* MatSliderModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MatGridListModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatCardModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["l" /* MatProgressSpinnerModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MatDialogModule */]],
    })
], MaterialModule);

//# sourceMappingURL=material.module.js.map

/***/ }),

/***/ "../../../../../src/app/services/data-connection.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataConnectionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__websocket_service__ = __webpack_require__("../../../../../src/app/services/websocket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






const DATA_URL = 'ws://localhost:1337';
let DataConnectionService = class DataConnectionService {
    constructor(wsService) {
        this.wsService = wsService;
        this.messages = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        // subscribe to websocket
        this.messages = this.wsService
            .connect(DATA_URL)
            .map((response) => {
            return response.data;
        })
            .catch(error => {
            console.error(error);
            return __WEBPACK_IMPORTED_MODULE_5_rxjs__["Observable"].empty();
        })
            .share();
    }
}; // end class DataService
DataConnectionService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__websocket_service__["a" /* WebSocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__websocket_service__["a" /* WebSocketService */]) === "function" && _a || Object])
], DataConnectionService);

var _a;
//# sourceMappingURL=data-connection.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/graph-data.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphDataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
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







let GraphDataService = class GraphDataService {
    constructor(dataConnectionService, messageService, nodeService, linkService, loadingService) {
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
        // Observable navItem source
        this._graphHistorySource = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"]();
        this.masterLinkMap = new Map();
        this.historyMap = new Map();
        this.graphhistory$ = this._graphHistorySource.asObservable();
        this.filter = false;
        this.nodeList = [];
        this.linkList = [];
        this.nodes = [];
        this.dataConnectionService.messages.subscribe(msg => {
            let response = JSON.parse(msg);
            switch (response.type) {
                case 'path': {
                    this.filter = true;
                    //intention absence of break to allow fall through
                }
                case 'startNodeSearch':
                case 'endNodeSearch':
                case 'expand':
                case 'load': {
                    this.originalEvent = response.type;
                    //  let bytes = encoder.encode(msg);
                    // this.webWorkerService.reportParser.postMessage(bytes.buffer, [bytes.buffer]);
                    let records = response.data._fields;
                    if (records.length == 0) {
                        console.error(response);
                    }
                    else {
                        this.parseRecords(records, response.type);
                    }
                    break;
                }
                case 'done': {
                    this.makeGraph();
                    this.loadingService.toggleVisible(false);
                    break;
                }
            }
        });
    }
    setFilter(filter) {
        this.filter = filter;
    }
    ;
    parseRecords(path, event) {
        //neo4j websocket returns one record at a time, so looping isn't necessary, but still probably a good idea
        for (let r of path) {
            if (r.segments) {
                for (let l of r.segments) {
                    //this ignores the initial start and end nodes, but they are added in the segments of the path
                    let start = this.nodeService.makeNode(l.start.properties.uuid, l.start);
                    let end = this.nodeService.makeNode(l.end.properties.uuid, l.end);
                    // let id = start.id.toString().concat(end.id.toString());
                    // let nodes:Node[] = ;
                    this.nodeList.push(...[start, end]);
                    let link = this.linkService.makeLink(l.relationship.properties.uuid, start, end, l.relationship);
                    this.linkList.push(link);
                    this.nodeService.setNode(start);
                    this.nodeService.setNode(end);
                    this.linkService.setLink(link);
                }
            }
            else {
                //  console.error(r);
                if (!r.start && !r.end) {
                    //    console.error(r);
                    //this is for node groups that aren't a path
                    let n = this.nodeService.makeNode(r.properties.uuid, r);
                    this.nodeList.push(n);
                    this.nodeService.setNode(n);
                }
                else {
                    //this is the separate path for expanding nodes -- this does not have a uuid associated with the start or end nodes, so neo4j's id needs to be used to create the nodes
                    //   console.log(r);
                    let start = this.nodeService.makeNode(r.properties.uuid, {});
                    let end = this.nodeService.makeNode(r.properties.uuid, {});
                    let nodes = [start, end];
                    //   let id = start.id.toString().concat(end.id.toString());
                    this.nodeList.push(...nodes);
                    let link = this.linkService.makeLink(r.properties.uuid, start, end, r);
                    //   let link = new Link(start, end, r.type, r.properties, r.properties.uuid);
                    //   this.linkList.push(link);
                    this.nodeService.setNode(start);
                    this.nodeService.setNode(end);
                    this.linkService.setLink(link);
                    //    this.masterLinkMap.set(r.properties.uuid, link);
                }
            }
        }
    }
    makeGraph() {
        let newNodes = this.nodeList.filter((elem, pos, arr) => {
            return arr.indexOf(elem) == pos;
        });
        let newLinks = this.linkList.filter((elem, pos, arr) => {
            return arr.indexOf(elem) == pos;
        });
        let diff = {
            removedNodes: this.graph.nodes.filter(node => newNodes.indexOf(node) === -1),
            addedNodes: newNodes.filter(node => this.graph.nodes.indexOf(node) === -1),
            removedLinks: this.graph.links.filter(link => newLinks.indexOf(link) === -1),
            addedLinks: newLinks.filter(link => this.graph.links.indexOf(link) === -1)
        };
        if (this.eventData) {
            this.eventData.event.diff = diff;
            let eventList = this.historyMap.get("expand") ? this.historyMap.get("expand") : new Map();
            if (eventList) {
                //  eventList.push(eventMap);
                eventList.set(this.eventData.id, this.eventData.event);
                this.historyMap.set("expand", eventList);
                /*    }else{
                      eventMap.set(this.eventData.id, this.eventData.event);
                      this.historyMap.set("expand", eventMap);
                    */ }
        }
        //todo setting the history for load events probably isn't necessary
        if (this.originalEvent != 'load') {
            this.historyMap.get(this.originalEvent);
        }
        //apply diff to current graph
        this.applyDiff(diff);
        this.countLinks();
        //update graph
        this._graphHistorySource.next(this.graph);
        this.nodeList = [];
        this.linkList = [];
        this.filter = false;
    }
    applyDiff(diff) {
        //todo: it is possible to expand a node connected to an expanded node. If the original node is closed, the second expanded nodes are still visible
        //todo: need to iterate over remaining nodes and links and remove them
        if (this.filter == true) {
            diff.removedNodes.forEach(node => {
                this.graph.nodes.splice(this.graph.nodes.indexOf(node), 1);
            });
            diff.removedLinks.forEach(link => {
                this.graph.links.splice(this.graph.links.indexOf(link), 1);
            });
        }
        diff.addedNodes.forEach(node => this.graph.nodes.push(node));
        diff.addedLinks.forEach(link => {
            this.graph.links.push(link);
        });
    }
    countLinks() {
        this.graph.nodes.forEach(node => node.linkCount = 1);
        for (let l of this.graph.links) {
            let source = this.nodeService.getById(l.source.id ? l.source.id : l.source);
            source.linkCount++;
            //todo: not sure why this was put here...
            if (source.labels[0] == "Compound") {
                //console.log(source);
            }
            this.nodeService.setNode(source);
            let target = this.nodeService.getById(l.target.id ? l.target.id : l.target);
            //todo: not sure why this was put here...
            target.linkCount++;
            if (target.labels[0] == "Compound") {
                console.log(target);
            }
            this.nodeService.setNode(target);
        }
    }
    clearGraph() {
        this.graph.links = [];
        this.graph.nodes = [];
    }
    nodeExpand(id, properties) {
        let message = this.messageService.getMessage(id, "expand", properties);
        //right now this is only creating a skeleton map object without the diff
        //this happens here because node id and label is needed for tracking.
        let event = {
            //  type: "expand",
            label: properties,
            diff: {
                addedNodes: [],
                removedNodes: [],
                addedLinks: [],
                removedLinks: []
            }
        };
        this.eventData = { id: id, event: event };
        this.dataConnectionService.messages.next(message);
    }
    nodeCollapse(node, label) {
        this.filter = true;
        //get the expand object to delete the nodes added
        let diff = this.historyMap.get('expand').get(node.id).diff;
        let undoDiff = {
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
    }
};
GraphDataService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__data_connection_service__["a" /* DataConnectionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__data_connection_service__["a" /* DataConnectionService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__message_service__["a" /* MessageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__message_service__["a" /* MessageService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__d3_models_node_service__["a" /* NodeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__d3_models_node_service__["a" /* NodeService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__d3_models_link_service__["a" /* LinkService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__d3_models_link_service__["a" /* LinkService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__loading_service__["a" /* LoadingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__loading_service__["a" /* LoadingService */]) === "function" && _e || Object])
], GraphDataService);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=graph-data.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/loading.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let LoadingService = class LoadingService {
    constructor() {
        this._loadingSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"]();
        // Observable navItem stream
        this.loading$ = this._loadingSource.asObservable();
    }
    toggleVisible(force) {
        this._loadingSource.next(force);
    }
};
LoadingService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], LoadingService);

//# sourceMappingURL=loading.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/message.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let MessageService = class MessageService {
    constructor() {
    }
    getMessage(term, type, properties) {
        let msg;
        let params;
        switch (type) {
            case "targetSearch": {
                msg = 'MATCH (n:Target) WHERE n.name=~{qParam2} OR n.uniprot_id =~{qParam2} RETURN n.name, n.uniprot_id ORDER BY n.name LIMIT 100 UNION MATCH (n:Target) WHERE n.name=~{qParam} OR n.uniprot_id =~{qParam} RETURN n.name, n.uniprot_id ORDER BY n.name LIMIT 100';
                // msg = 'MATCH (n:Target) WHERE n.name=~{qParam2} RETURN n.name, n.uniprot_id ORDER BY n.name LIMIT 100';
                params = { qParam2: '(?i)' + term + '.*', qParam: '(?i).*' + term + '.*' };
                break;
            }
            case "patternSearch": {
                //msg = 'MATCH (n:Pattern) WHERE n.smiles=~{qParam} RETURN n.smiles, n.pid ORDER BY n.smiles LIMIT 50';
                msg = 'MATCH (n:Compound) WHERE n.hash=~{qParam} RETURN n.hash, n.pid ORDER BY n.hash LIMIT 50';
                params = { qParam: term + '.*' };
                break;
            }
            case "compoundSearch": {
                //msg = 'MATCH (n:Pattern) WHERE n.smiles=~{qParam} RETURN n.smiles, n.pid ORDER BY n.smiles LIMIT 50';
                msg = 'MATCH (n:Compound) WHERE n.hash=~{qParam} RETURN n.compound, n.lid ORDER BY n.compound LIMIT 50';
                params = { qParam: term + '.*' };
                break;
            }
            case "expand": {
                let start = 'MATCH (n:' + properties.origin;
                switch (properties.target) {
                    //todo: switch to parameterized  constraints for 'n'
                    case "Target": {
                        // msg = 'MATCH p=shortestPath((t)-[r*..1]->(q:Target)) WHERE t.uuid = {qParam} return p LIMIT 100';
                        msg = start + '{uuid:{qParam}}) MATCH (n)-[r]-(b:Target) with {segments:[{start: startNode(r), relationship:r, end: endNode(r)}]} AS ret RETURN ret LIMIT 100';
                        break;
                    }
                    case "Compound": {
                        msg = start + '{uuid:{qParam}}) MATCH (n)-[r]-(b:Compound) with {segments:[{start: startNode(r), relationship:r, end: endNode(r)}]} AS ret RETURN ret LIMIT 100';
                        break;
                    }
                    case "Pattern": {
                        msg = start + '{uuid:{qParam}}) MATCH (n)-[r]-(b:Pattern) with {segments:[{start: startNode(r), relationship:r, end: endNode(r)}]} AS ret RETURN ret LIMIT 100';
                        break;
                    }
                    case "All": {
                        msg = 'MATCH (n) WHERE n.uuid = {qParam} MATCH (n)-[r]-(b) with {segments:[{start: startNode(r), relationship:r, end: endNode(r)}]} AS ret RETURN ret LIMIT 100';
                        break;
                    }
                }
                params = { qParam: term };
                break;
            }
            case "chembl":
            case "target": {
                msg = 'MATCH (n:Target) WHERE n.uniprot_id= {qParam} MATCH (n)-[r:REGULATES]-(b) RETURN n, r, b';
                params = { qParam: term };
                break;
            }
            case "endNodeSearch":
            case "startNodeSearch": {
                //todo: convern nostereo_hash to a contains in hash search
                msg = 'MATCH (n:Target) WHERE n.uniprot_id IN {qParam} RETURN n AS data UNION MATCH (c:Compound) WHERE c.nostereo_hash IN {qParam} RETURN c AS data';
                //  msg = 'MATCH (n:Target) WHERE n.uniprot_id IN {qParam} RETURN n UNION MATCH (n:Compound) WHERE n.hash IN {qParam} RETURN n';
                params = { qParam: term };
                break;
            }
            case "smiles": {
                msg = 'MATCH (n:Pattern) WHERE n.pid= {qParam} MATCH (n)-[r]-(b) RETURN n, r, b LIMIT 5';
                params = { qParam: term };
                break;
            }
            case "compound": {
                msg = 'MATCH (n:Compound) WHERE n.compound= {qParam} MATCH (n)-[r]-(b) RETURN n, r, b LIMIT 5';
                params = { qParam: term };
                break;
            }
            case "uuid": {
                msg = 'MATCH (n) WHERE n.uuid= {qParam} MATCH (n)-[r]-(b) RETURN n, r, b';
                params = { qParam: term };
                break;
            }
            case "path": {
                console.log(term);
                let levels = properties.distance;
                msg = 'MATCH p=shortestPath((t)-[r*..' + levels + ']->(q:Target)) WHERE t.uuid IN {start} AND q.uuid IN {end} AND q.uuid <> t.uuid return p';
                params = { start: term.start, end: term.end };
                break;
            }
            case "node": {
                msg = 'MATCH (n:Target) WHERE n.uniprot_id= {qParam} RETURN n';
                params = { qParam: term };
                break;
            }
            case "counts": {
                switch (properties) {
                    case "Target": {
                        msg = 'MATCH (n:Target) WHERE n.uuid = {qParam}  MATCH (n)-[r]-(b) RETURN DISTINCT labels(b),COUNT(labels(b))';
                        break;
                    }
                    case "Compound": {
                        msg = 'MATCH (n:Compound) WHERE n.uuid = {qParam}  MATCH (n)-[r]-(b) RETURN DISTINCT labels(b),COUNT(labels(b))';
                        break;
                    }
                    case "Pattern": {
                        msg = 'MATCH (n:Pattern) WHERE n.uuid = {qParam}  MATCH (n)-[r]-(b) RETURN DISTINCT labels(b),COUNT(labels(b))';
                        break;
                    }
                }
                params = { qParam: term };
                break;
            }
        }
        let message = {
            type: type,
            message: msg,
            params: params
        };
        return message;
    }
};
MessageService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], MessageService);

//# sourceMappingURL=message.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/node-menu-controller.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeMenuControllerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let NodeMenuControllerService = class NodeMenuControllerService {
    constructor() {
        this._clickedMenuSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"]();
        // Observable navItem stream
        this.clickedmenu$ = this._clickedMenuSource.asObservable();
    }
    // service command
    toggleVisible(force) {
        this._clickedMenuSource.next(force);
    }
};
NodeMenuControllerService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
], NodeMenuControllerService);

//# sourceMappingURL=node-menu-controller.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/search.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__ = __webpack_require__("../../../../rxjs/add/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("../../../../rxjs/add/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by sheilstk on 6/23/17.
 */







let SearchService = class SearchService {
    constructor(messageService) {
        this.messageService = messageService;
    }
    search(terms) {
        return terms.debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term => this.searchEntries(term));
    }
    searchEntries(term) {
        let query = this.messageService.getMessage(term.term, term.type);
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(query);
    }
};
SearchService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6__message_service__["a" /* MessageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__message_service__["a" /* MessageService */]) === "function" && _a || Object])
], SearchService);

var _a;
//# sourceMappingURL=search.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/websocket.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebSocketService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let WebSocketService = class WebSocketService {
    constructor() { }
    connect(url) {
        if (!this.subject) {
            this.subject = this.create(url);
            console.log("connected");
        }
        return this.subject;
    }
    create(url) {
        let ws = new WebSocket(url);
        let observable = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create((obs) => {
            ws.onmessage = obs.next.bind(obs);
            ws.onerror = obs.error.bind(obs);
            ws.onclose = obs.complete.bind(obs);
            return ws.close.bind(ws);
        });
        let observer = {
            next: (data) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        };
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"].create(observer, observable);
    }
}; // end class WebSocketService
WebSocketService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], WebSocketService);

//# sourceMappingURL=websocket.service.js.map

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

module.exports = "<div class=\"container\">\n  <div fxLayout=\"row\">\n    <mat-toolbar color=\"primary\">\n      <button mat-button routerLink=\"/\">\n        <mat-icon>home</mat-icon>\n        {{title}}</button>\n\n      <!-- This fills the remaining space of the current row -->\n      <span class=\"fill-remaining-space\"></span>\n      <div fxLayout=\"row\" fxShow=\"false\" fxShow.gt-sm>\n        <button mat-button routerLink=\"/products\">Products</button>\n        <button mat-button routerLink=\"/dashboard\">Dashboard</button>\n      </div>\n      <button mat-button [mat-menu-trigger-for]=\"menu\" fxHide=\"false\" fxHide.gt-sm>\n        <mat-icon>menu</mat-icon>\n      </button>\n\n    </mat-toolbar>\n    <mat-menu x-position=\"before\" #menu=\"matMenu\">\n      <button mat-menu-item routerLink=\"/products\">Products</button>\n      <button mat-menu-item routerLink=\"/dashboard\">Dashboard</button>\n    </mat-menu>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/smrtgraph-menu/smrtgraph-menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmrtgraphMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let SmrtgraphMenuComponent = class SmrtgraphMenuComponent {
    constructor() {
        this.title = "smrtgraph";
    }
    ngOnInit() {
    }
};
SmrtgraphMenuComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'smrtgraph-menu',
        template: __webpack_require__("../../../../../src/app/smrtgraph-menu/smrtgraph-menu.component.html"),
        styles: [__webpack_require__("../../../../../src/app/smrtgraph-menu/smrtgraph-menu.component.css")]
    }),
    __metadata("design:paramtypes", [])
], SmrtgraphMenuComponent);

//# sourceMappingURL=smrtgraph-menu.component.js.map

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

module.exports = "<div class=\"container\">\n  <br>\n\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\">\n      <mat-form-field fxFlex=\"95\">\n        <textarea matInput matTextareaAutosize placeholder=\"Start Nodes\" matAutosizeMaxRows = 15 [formControl]=\"startNodesCtrl\"></textarea>\n      </mat-form-field>\n  </div>\n\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\">\n  <mat-form-field fxFlex=\"95\">\n        <textarea matInput matTextareaAutosize placeholder=\"End Nodes\" matAutosizeMaxRows = 15 [formControl]=\"endNodesCtrl\"></textarea>\n      </mat-form-field>\n  </div>\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\">\n    <div fxFlex=\"95\">\n      <label>Max Distance</label>\n      <mat-slider matInput fxLayoutAlign=\"center center\"\n                 class=\"example-margin\"\n                 aria-label = \"max distance\"\n                 [max]=\"10\"\n                 [min]=\"1\"\n                 [step]=\"1\"\n                 [thumb-label]=\"true\"\n                 [formControl]=\"distanceCtrl\"\n                 [value]=\"5\">\n      </mat-slider>\n      <br>\n<!--\n      <label>Confidence Level</label>\n      <mat-slider matInput fxLayoutAlign=\"center center\"\n                 aria-label=\"confidence level\"\n                 class=\"example-margin\"\n                 [max]=\"100\"\n                 [min]=\"1\"\n                 [step]=\"1\"\n                 [thumb-label]=\"true\"\n                 disabled=\"true\"\n                 [formControl]=\"confidenceCtrl\"\n                 [value]=\"50\">\n      </mat-slider>\n      <br>-->\n\n    </div>\n  </div>\n  <div fxLayout=\"row\" fxLayoutAlign=\"center center\" >\n    <button mat-button color=\"primary\" [disabled]=\"!startNodes || !endNodes\" (click)=\"shortestPath()\">find shortest path<mat-icon>search</mat-icon><mat-icon>share</mat-icon></button>\n  </div>\n  </div>\n\n"

/***/ }),

/***/ "../../../../../src/app/smrtgraph-search/smrtgraph-search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmrtgraphSearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_data_connection_service__ = __webpack_require__("../../../../../src/app/services/data-connection.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_search_service__ = __webpack_require__("../../../../../src/app/services/search.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_graph_data_service__ = __webpack_require__("../../../../../src/app/services/graph-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__d3_models_node_service__ = __webpack_require__("../../../../../src/app/d3/models/node.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_loading_service__ = __webpack_require__("../../../../../src/app/services/loading.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









let SmrtgraphSearchComponent = class SmrtgraphSearchComponent {
    constructor(searchService, messageService, nodeService, dataConnectionService, graphDataService, loadingService) {
        this.searchService = searchService;
        this.messageService = messageService;
        this.nodeService = nodeService;
        this.dataConnectionService = dataConnectionService;
        this.graphDataService = graphDataService;
        this.loadingService = loadingService;
        this.searchTerm$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["Subject"]();
        this.autocompleteOptions = [];
        this.compoundAutocompleteOptions = [];
        this.startUUIDList = [];
        this.endUUIDList = [];
        this.startNodes = false;
        this.endNodes = false;
        this.startNodesCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.endNodesCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.distanceCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.confidenceCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
    }
    /*
    * Todo: this needs to be re-worked a bit-- the queries that are the result of the search inputs changing directly modify nodes
    * todo: while they do this thorugh a service, they subscribe to all graph change events, which is not optimal
    * todo: there is also no function to remove the startNode and endNode parameters
    *
    *
    *
    * */
    ngOnInit() {
        //todo: fix above description
        //todo: set all subscriptions to be variables to close on destroy
        this.dataConnectionService.messages.subscribe(msg => {
            let response = JSON.parse(msg);
            switch (response.type) {
                case "targetSearch": {
                    this.autocompleteOptions.push(response.data);
                    break;
                }
                case "compoundSearch": {
                    this.compoundAutocompleteOptions.push(response.data);
                    break;
                }
                case "startNodeSearch": {
                    this.startUUIDList.push(response.data._fields[0].properties.uuid);
                    break;
                }
                case "endNodeSearch": {
                    this.endUUIDList.push(response.data._fields[0].properties.uuid);
                    break;
                }
                case "counts": {
                    break;
                }
            }
        });
        this.graphDataService.graphhistory$.subscribe(res => {
            //todo: add validation rules: must have uniprot_id (for now)
            //todo: this is going to happen on any change, so i need to filter by response type
            res.nodes.filter(node => {
                let id = node.properties.uniprot_id;
                if (this.startUUIDList.includes(node.uuid)) {
                    //todo: this doesn't clear the parameters, just passes them.
                    node.params.endNode = false;
                    node.params.startNode = true;
                }
                else if (this.endUUIDList.includes(node.uuid)) {
                    node.params.startNode = false;
                    node.params.endNode = true;
                }
                else {
                    node.params.startNode = false;
                }
                this.nodeService.setNode(node);
            });
        });
        //todo: needs to get chenbl(uniprot)id or inchii/lychi and get a list of uuids to pass to the path message
        this.startNodesCtrl.valueChanges.subscribe(value => {
            this.getStartNodes(value.trim().split(/[\s,;]+/));
            if (this.endNodesCtrl.value) {
                this.getEndNodes(this.endNodesCtrl.value.trim().split(/[\s,;]+/));
            }
            this.startNodes = true;
            this.graphDataService.setFilter(true);
            this.startUUIDList = [];
        });
        this.endNodesCtrl.valueChanges.subscribe(value => {
            this.getEndNodes(value.trim().split(/[\s,;]+/));
            if (this.startNodesCtrl.value) {
                this.getStartNodes(this.startNodesCtrl.value.trim().split(/[\s,;]+/));
            }
            this.endNodes = true;
            this.graphDataService.setFilter(true);
            this.endUUIDList = [];
        });
        this.distanceCtrl.valueChanges.subscribe(value => {
            this.shortestPath();
        });
        /*
         * This provides an interface to handle the mapping of search input
         * it retrieves a query object from the service, returning the most recent input
         * this query is then passed on to the main data service
         * */
        this.searchService.search(this.searchTerm$)
            .subscribe(results => {
            //empty autocomplete options array, otherwise it will never change
            this.autocompleteOptions = [];
            this.compoundAutocompleteOptions = [];
            this.dataConnectionService.messages.next(results);
        });
        // this.startNodesCtrl.setValue('P35968, P12931, P00533, AHLNGYPZYMUEFB-UHFFFAOYSA-N, HVTCKKMWZDDWOY-UHFFFAOYSA-O');
        this.startNodesCtrl.setValue('P35968, P12931, P00533, AHLNGYPZYMUEFB, HVTCKKMWZDDWOY');
        this.endNodesCtrl.setValue('P03372, P04035, P04150, P00519');
    }
    getStartNodes(values) {
        let query = this.messageService.getMessage(values, 'startNodeSearch');
        setTimeout(() => this.dataConnectionService.messages.next(query), 0);
    }
    ;
    getEndNodes(values) {
        let query = this.messageService.getMessage(values, 'endNodeSearch');
        setTimeout(() => this.dataConnectionService.messages.next(query), 0);
    }
    ;
    shortestPath() {
        // this.loadingService.toggleVisible(true);
        if (this.startNodesCtrl.value && this.endNodesCtrl.value) {
            let value = {
                start: this.startUUIDList,
                end: this.endUUIDList
            };
            let params = {
                distance: this.distanceCtrl.value || 5,
                confidence: this.confidenceCtrl.value || 50
            };
            let query = this.messageService.getMessage(value, "path", params);
            this.dataConnectionService.messages.next(query);
        }
    }
};
SmrtgraphSearchComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'smrtgraph-search',
        template: __webpack_require__("../../../../../src/app/smrtgraph-search/smrtgraph-search.component.html"),
        styles: [__webpack_require__("../../../../../src/app/smrtgraph-search/smrtgraph-search.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_search_service__["a" /* SearchService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_search_service__["a" /* SearchService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__services_message_service__["a" /* MessageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_message_service__["a" /* MessageService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7__d3_models_node_service__["a" /* NodeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__d3_models_node_service__["a" /* NodeService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_data_connection_service__["a" /* DataConnectionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_data_connection_service__["a" /* DataConnectionService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__services_graph_data_service__["a" /* GraphDataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_graph_data_service__["a" /* GraphDataService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_8__services_loading_service__["a" /* LoadingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__services_loading_service__["a" /* LoadingService */]) === "function" && _f || Object])
], SmrtgraphSearchComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=smrtgraph-search.component.js.map

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

/***/ "../../../../../src/app/visuals/details/graph-details/graph-details.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<ng-container [ngSwitch]= hoveredObjType>\n  <div *ngSwitchCase=\"'node'\">\n    <node-details-visual></node-details-visual>\n  </div>\n  <div *ngSwitchCase=\"'link'\"><link-details-visual></link-details-visual></div>\n</ng-container>-->\n\n<ng-container>\n    <node-details-visual></node-details-visual>\n<link-details-visual></link-details-visual>\n</ng-container>\n"

/***/ }),

/***/ "../../../../../src/app/visuals/details/graph-details/graph-details.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphDetailsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_models_node_service__ = __webpack_require__("../../../../../src/app/d3/models/node.service.ts");
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



let GraphDetailsComponent = class GraphDetailsComponent {
    constructor(nodeService, linkService) {
        this.nodeService = nodeService;
        this.linkService = linkService;
    }
    ngOnInit() {
        console.log(this);
        this.nodeSubscription = this.nodeService.hoverednode$
            .subscribe(node => {
            this.hoveredObjType = "node";
        });
        this.linkSubscription = this.linkService.hoveredlink$
            .subscribe(link => {
            this.hoveredObjType = "link";
        });
    }
};
GraphDetailsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-graph-details',
        template: __webpack_require__("../../../../../src/app/visuals/details/graph-details/graph-details.component.html"),
        styles: [__webpack_require__("../../../../../src/app/visuals/details/graph-details/graph-details.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__d3_models_node_service__["a" /* NodeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__d3_models_node_service__["a" /* NodeService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__d3_models_link_service__["a" /* LinkService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__d3_models_link_service__["a" /* LinkService */]) === "function" && _b || Object])
], GraphDetailsComponent);

var _a, _b;
//# sourceMappingURL=graph-details.component.js.map

/***/ }),

/***/ "../../../../../src/app/visuals/details/link-details-visual/link-details-visual.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/visuals/details/link-details-visual/link-details-visual.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div [ngSwitch]=\"link?.type\" *ngIf = \"node?.params\" (mouseenter)=\"node.params.hovered = true;\" (mouseleave)=\"node.params.hovered = false;\">\n  <div *ngSwitchCase=\"'TESTED_ON'\">\n    Tested On:\n    <target-detail-view [data]=\"{node: node}\"></target-detail-view>\n  </div>\n\n  <div    *ngSwitchCase=\"'REGULATES'\">\n    {{node.properties?.uniprot_id}} ({{node.properties?.name}})\n  </div>\n  <div    *ngSwitchCase=\"'PATTERN_OF'\"> <span *ngIf=\"link.properties.maximal=='t'\">maximal</span> pattern of: {{node.properties?.uniprot_id}}\n    ({{node.properties?.name}}) {{link.properties | json}}\n    <div *ngIf=\"node.properties?.canonical_smiles || node.properties?.smiles\">\n      <img [src] = getSmiles(node)>\n    </div>\n  </div>\n  <div    *ngSwitchCase=\"'POTENT_PATTERN_OF'\">potent pattern of : {{node.properties?.uniprot_id}} ({{node.properties?.name}}) </div>\n  <!--    <div    *ngSwitchCase=\"'REGULATES'\"></div>\n      <div    *ngSwitchCase=\"'REGULATES'\"></div>-->\n  <div *ngSwitchDefault> {{link.type}} {{link.properties}}</div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/visuals/details/link-details-visual/link-details-visual.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkDetailsVisualComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_models_link__ = __webpack_require__("../../../../../src/app/d3/models/link.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__d3_models_node__ = __webpack_require__("../../../../../src/app/d3/models/node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__d3_models_link_service__ = __webpack_require__("../../../../../src/app/d3/models/link.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let LinkDetailsVisualComponent = class LinkDetailsVisualComponent {
    constructor(linkService) {
        this.linkService = linkService;
    }
    ngOnInit() {
        this.linkSubscription = this.linkService.hoveredlink$
            .subscribe(link => {
            console.log(link);
            this.link = link;
            this.node = link.target;
        });
        if (this.data) {
            this.link = this.data;
        }
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__d3_models_link__["a" /* Link */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__d3_models_link__["a" /* Link */]) === "function" && _a || Object)
], LinkDetailsVisualComponent.prototype, "data", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__d3_models_node__["b" /* Node */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__d3_models_node__["b" /* Node */]) === "function" && _b || Object)
], LinkDetailsVisualComponent.prototype, "node", void 0);
LinkDetailsVisualComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'link-details-visual',
        template: __webpack_require__("../../../../../src/app/visuals/details/link-details-visual/link-details-visual.component.html"),
        styles: [__webpack_require__("../../../../../src/app/visuals/details/link-details-visual/link-details-visual.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__d3_models_link_service__["a" /* LinkService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__d3_models_link_service__["a" /* LinkService */]) === "function" && _c || Object])
], LinkDetailsVisualComponent);

var _a, _b, _c;
//# sourceMappingURL=link-details-visual.component.js.map

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

module.exports = "<div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\">\n  <div fxFlex=\"92\">\n    <ng-container [ngSwitch]=nodeType>\n      <div *ngSwitchCase=\"'Target'\">\n        <target-detail-view [data]=hoveredNode></target-detail-view>\n      </div>\n      <div *ngSwitchCase=\"'Compound'\">\n        <compound-detail-view [data]=hoveredNode></compound-detail-view>\n      </div>\n      <div *ngSwitchCase=\"'Pattern'\">\n        <pattern-detail-view [data]=hoveredNode></pattern-detail-view>\n      </div>\n    </ng-container>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-details-visual.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeDetailsVisualComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_models_node_service__ = __webpack_require__("../../../../../src/app/d3/models/node.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let NodeDetailsVisualComponent = class NodeDetailsVisualComponent {
    //node:Node;
    constructor(nodeService) {
        this.nodeService = nodeService;
    }
    ngOnInit() {
        this.subscription = this.nodeService.hoverednode$
            .subscribe(node => {
            this.hoveredNode = node;
            this.nodeType = node.node.constructor.name;
        });
    }
};
NodeDetailsVisualComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'node-details-visual',
        template: __webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-details-visual.component.html"),
        styles: [__webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-details-visual.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__d3_models_node_service__["a" /* NodeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__d3_models_node_service__["a" /* NodeService */]) === "function" && _a || Object])
], NodeDetailsVisualComponent);

var _a;
//# sourceMappingURL=node-details-visual.component.js.map

/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-types/compound-detail-view/compound-detail-view.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".smiles{\n  word-break: break-all;\n}\n\n.compound-title{\n  background-color: #1E71A2;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-types/compound-detail-view/compound-detail-view.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-header fxFlexAlign=\"center\">\n    <mat-card-title> <h2>Compound</h2></mat-card-title>\n    <img mat-card-avatar class=\"compound-title\">\n  </mat-card-header>\n  <mat-card-subtitle class=\"smiles\">Smiles: {{node.smiles}}</mat-card-subtitle>\n  <img mat-card-image [src] = getSmiles(node)>\n  <mat-card-content>\n    <mat-list>\n      <mat-list-item>InChI Key: {{node.hash}}</mat-list-item>\n      <mat-list-item>Non stereo hash: {{node.nostereo_hash}}</mat-list-item>\n      <mat-list-item>Compound Id: {{node.compoundId}}</mat-list-item>\n    </mat-list>\n  </mat-card-content>\n</mat-card>\n"

/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-types/compound-detail-view/compound-detail-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompoundDetailViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let CompoundDetailViewComponent = class CompoundDetailViewComponent {
    constructor() { }
    ngOnInit() {
        this.node = this.data.node;
        this.downstreamLinks = this.data.down;
        this.upstreamLinks = this.data.up;
        this.getSmiles(this.node);
    }
    getSmiles(node) {
        if (node.properties && node.properties.smiles) {
            return 'https://tripod.nih.gov/servlet/renderServletv12/?structure=' + this.parseSmiles(node.properties.smiles) + '&standardize=true&format=svg';
        }
        else {
            return null;
        }
    }
    parseSmiles(smiles) {
        let parsed = smiles
            .replace(/[;]/g, '%3B')
            .replace(/[#]/g, '%23')
            .replace(/[+]/g, '%2B')
            .replace(/[\\]/g, '%5C')
            .replace(/[|]/g, '%7C');
        return parsed;
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], CompoundDetailViewComponent.prototype, "data", void 0);
CompoundDetailViewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'compound-detail-view',
        template: __webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-types/compound-detail-view/compound-detail-view.component.html"),
        styles: [__webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-types/compound-detail-view/compound-detail-view.component.css")]
    }),
    __metadata("design:paramtypes", [])
], CompoundDetailViewComponent);

//# sourceMappingURL=compound-detail-view.component.js.map

/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-types/pattern-detail-view/pattern-detail-view.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".smiles{\n  word-break: break-all;\n}\n\n.pattern-title{\n  background-color: #FF9C22;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-types/pattern-detail-view/pattern-detail-view.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-header>\n    <mat-card-title><h2>Pattern</h2></mat-card-title>\n    <img mat-card-avatar class=\"pattern-title\">\n  </mat-card-header>\n  <mat-card-subtitle class=\"smiles\">Smiles: {{node.smiles}}</mat-card-subtitle>\n  <img mat-card-image [src] = getSmiles(node)>\n  <mat-card-content>\n    <mat-list>\n      <mat-list-item>InChI Key: {{node.hash}}</mat-list-item>\n      <mat-list-item>Pattern Type: {{node.pattern_type}}</mat-list-item>\n      <mat-list-item>Pattern Id: {{node.pattern_id}}</mat-list-item>\n    </mat-list>\n  </mat-card-content>\n</mat-card>\n"

/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-types/pattern-detail-view/pattern-detail-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PatternDetailViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let PatternDetailViewComponent = class PatternDetailViewComponent {
    constructor() { }
    ngOnInit() {
        this.node = this.data.node;
        this.downstreamLinks = this.data.down;
        this.upstreamLinks = this.data.up;
        this.getSmiles(this.node);
    }
    getSmiles(node) {
        if (node.properties && node.properties.smiles) {
            return 'https://tripod.nih.gov/servlet/renderServletv12/?structure=' + this.parseSmiles(node.properties.smiles) + '&standardize=true&format=svg';
        }
        else {
            return null;
        }
    }
    parseSmiles(smiles) {
        let parsed = smiles
            .replace(/[;]/g, '%3B')
            .replace(/[#]/g, '%23')
            .replace(/[+]/g, '%2B')
            .replace(/[\\]/g, '%5C')
            .replace(/[|]/g, '%7C');
        return parsed;
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], PatternDetailViewComponent.prototype, "data", void 0);
PatternDetailViewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'pattern-detail-view',
        template: __webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-types/pattern-detail-view/pattern-detail-view.component.html"),
        styles: [__webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-types/pattern-detail-view/pattern-detail-view.component.css")]
    }),
    __metadata("design:paramtypes", [])
], PatternDetailViewComponent);

//# sourceMappingURL=pattern-detail-view.component.js.map

/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-types/target-detail-view/target-detail-view.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".name{\n  word-break: break-all;\n}\n\n.target-title{\n  background-color: #ff5722;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-types/target-detail-view/target-detail-view.component.html":
/***/ (function(module, exports) {

module.exports = "\n<mat-card>\n  <mat-card-header fxFlexAlign=\"center\">\n    <mat-card-title><h2>Target</h2></mat-card-title>\n    <mat-card-subtitle><a href= {{uniprotUrl}}>Target</a></mat-card-subtitle>\n    <img mat-card-avatar class=\"target-title\">\n  </mat-card-header>\n  <mat-card-subtitle class=\"name\">{{node?.properties?.name}}</mat-card-subtitle>\n <!-- <mat-card-content>\n    <div *ngIf=\"downstreamLinks?.length>0\">\n      <hr>\n      <mat-grid-list cols=\"2\" rowHeight=\"1:1\">\n        <mat-grid-tile-header><h2>Acts On: </h2></mat-grid-tile-header>\n        <div *ngFor=\"let link of downstreamLinks\">\n          <mat-grid-tile><link-details-visual [data] = link [node] = link.target></link-details-visual></mat-grid-tile>\n        </div>\n      </mat-grid-list>\n    </div>\n\n    <div *ngIf=\"upstreamLinks?.length>0\">\n      <hr>\n      <mat-grid-list cols=\"2\" rowHeight=\"1:1\">\n        <mat-grid-tile-header><h2>Acted On By: </h2></mat-grid-tile-header>\n        <div *ngFor=\"let link of upstreamLinks\">\n          <mat-grid-tile><link-details-visual [data] = link [node] = link.source></link-details-visual></mat-grid-tile>\n        </div>\n      </mat-grid-list>\n    </div>\n  </mat-card-content>-->\n</mat-card>\n"

/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-types/target-detail-view/target-detail-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TargetDetailViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let TargetDetailViewComponent = class TargetDetailViewComponent {
    constructor() {
    }
    ngOnInit() {
        this.node = this.data.node;
        this.downstreamLinks = this.data.down;
        this.upstreamLinks = this.data.up;
        console.log(this);
        this.uniprotUrl = "https://www.ebi.ac.uk/chembl/target/inspect/" + this.node.uniprot_id;
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], TargetDetailViewComponent.prototype, "data", void 0);
TargetDetailViewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'target-detail-view',
        template: __webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-types/target-detail-view/target-detail-view.component.html"),
        styles: [__webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-types/target-detail-view/target-detail-view.component.css")]
    }),
    __metadata("design:paramtypes", [])
], TargetDetailViewComponent);

//# sourceMappingURL=target-detail-view.component.js.map

/***/ }),

/***/ "../../../../../src/app/visuals/graph/graph.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/visuals/graph/graph.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_d3_service__ = __webpack_require__("../../../../../src/app/d3/d3.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3__ = __webpack_require__("../../../../d3/build/d3.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_graph_data_service__ = __webpack_require__("../../../../../src/app/services/graph-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__download_button_download_button_component__ = __webpack_require__("../../../../../src/app/download-button/download-button.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let GraphComponent = class GraphComponent {
    constructor(d3Service, ref, el, graphDataService) {
        this.d3Service = d3Service;
        this.ref = ref;
        this.el = el;
        this.graphDataService = graphDataService;
        /*  @Input('nodes') nodes;
          @Input('links') links;*/
        this.nodesSubscription = __WEBPACK_IMPORTED_MODULE_2_rxjs__["Subscription"];
        this.linksSubscription = __WEBPACK_IMPORTED_MODULE_2_rxjs__["Subscription"];
        this.nodes = [];
        this.links = [];
        this._options = { width: 800, height: 600 };
    }
    onResize(event) {
        this.graph.initSimulation(this.options);
    }
    ngOnInit() {
        this.graphDataService.graphhistory$.subscribe(res => {
            this.nodes = res.nodes;
            this.links = res.links;
            if (this.graph) {
                /*        this.graph.simulation.nodes(this.nodes);
                        this.graph.links = this.links;
                        this.graph.nodes = this.nodes;
                        this.graph.initLinks(this.options);
                        this.graph.simulation.restart();*/
                this.graph.update(res, this.options);
            }
        });
        /** Receiving an initialized simulated graph from our custom d3 service */
        this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);
        /** Binding change detection check on each tick
         * This along with an onPush change detection strategy should enforce checking only when relevant!
         * This improves scripting computation duration in a couple of tests I've made, consistently.
         * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
         */
        this.graph.ticker.subscribe((d) => {
            this.ref.markForCheck();
        });
        /*    this.subscription = this.nodeService.hoverednode$
              .subscribe(node => {
                this.hoveredNode = node;
              });*/
        let svg = __WEBPACK_IMPORTED_MODULE_3_d3__["select"]('svg');
        svg.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 8.75)
            .attr("refY", 0)
            .attr("markerWidth", 8)
            .attr("markerHeight", 8)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("fill", "#A5A5A5")
            .attr("stroke", "#A5A5A5")
            .attr("d", "M0,-5L10,0L0,5");
        svg.append("defs").append("marker")
            .attr("id", "hoverarrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 8.75)
            .attr("refY", 0)
            .attr("markerWidth", 8)
            .attr("markerHeight", 8)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("fill", "#595959")
            .attr("stroke", "#595959")
            .attr("d", "M0,-5L10,0L0,5");
        svg.append("defs").append("marker")
            .attr("id", "flatarrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 8.75)
            .attr("refY", 0)
            .attr("markerWidth", 8)
            .attr("markerHeight", 8)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("fill", "#A5A5A5")
            .attr("stroke", "#A5A5A5")
            .attr("stroke-width", "2px")
            .attr("d", "M 8,-8 L 8, 8 ");
        svg.append("defs").append("marker")
            .attr("id", "hoverflatarrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 8.75)
            .attr("refY", 0)
            .attr("markerWidth", 8)
            .attr("markerHeight", 8)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("fill", "#595959")
            .attr("stroke", "#595959")
            .attr("d", "M 8,-8 L 8, 8 ");
    }
    ngAfterViewInit() {
        this.graph.initSimulation(this.options);
    }
    downloadGraph() {
        this.downloader.downloadFile(__WEBPACK_IMPORTED_MODULE_3_d3__["select"]('svg'), this.options);
    }
    get options() {
        return this._options = {
            width: this.el.nativeElement.parentElement.offsetWidth,
            height: window.innerHeight * .8
            // height: window.innerHeight-(window.outerHeight-window.innerHeight)
        };
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__download_button_download_button_component__["a" /* DownloadButtonComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__download_button_download_button_component__["a" /* DownloadButtonComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__download_button_download_button_component__["a" /* DownloadButtonComponent */]) === "function" && _a || Object)
], GraphComponent.prototype, "downloader", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* HostListener */])('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GraphComponent.prototype, "onResize", null);
GraphComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'graph',
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush,
        template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
      <g [zoomableOf]="svg">
              <g [linkVisual]="link" [hoverableLink]="link" *ngFor="let link of links"></g>
        <g [nodeVisual]="node" *ngFor="let node of nodes"
            [hoverableNode]="node" [clickableNode]="node" [draggableNode]="node" [draggableInGraph]="graph">
</g>
<svg:g nodeDetails></svg:g>
      <svg:g nodeMenu></svg:g>
      </g>
    </svg>
<!--
          <download-button (click)=" downloadGraph()"></download-button>
-->
  `,
        styles: [__webpack_require__("../../../../../src/app/visuals/graph/graph.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__d3_d3_service__["a" /* D3Service */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__d3_d3_service__["a" /* D3Service */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__services_graph_data_service__["a" /* GraphDataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_graph_data_service__["a" /* GraphDataService */]) === "function" && _e || Object])
], GraphComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=graph.component.js.map

/***/ }),

/***/ "../../../../../src/app/visuals/shared/link-visual/link-visual.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".link {\n    stroke-width: .75;\n  stroke: #A5A5A5;\n}\n\n.arrow {\n  stroke-width: 2;\n  stroke: #A5A5A5;\n  fill: #A5A5A5;\n  marker-end: url(#arrow);\n}\n\n.flatarrow {\n  stroke-width: 2;\n  stroke: #A5A5A5;\n  fill: #A5A5A5;\n  marker-end: url(#flatarrow);\n}\n\n.link-name {\n  font-family: 'Lato';\n  font-weight: 300;\n  color: #000000;\n}\n\n.link-node{\n  stroke: red;\n}\n\n.connected{\n  stroke-width: 2;\n  stroke: #595959;\n  marker-end: url(#hoverarrow);\n}\n\n.connected .flatarrow{\n  stroke-width: 2;\n  stroke: #595959;\n  marker-end: url(#hoverflatarrow);\n}\n\n .maximal{\n  stroke-width: 2;\n  stroke: red;\n}\n\n\n.hovering {\n  stroke: #000;\n  stroke-width: 2px;\n}\n\n/*#arrow{\n  stroke-width: 2;\n  stroke: #A5A5A5;\n}*/\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/visuals/shared/link-visual/link-visual.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkVisualComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_models_link__ = __webpack_require__("../../../../../src/app/d3/models/link.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let LinkVisualComponent = class LinkVisualComponent {
    // source:Node;
    // target:Node;
    constructor() {
    }
    ngOnInit() {
    }
    endpointLessRadius(link, attr_name) {
        // this.source = link.source;
        //  this.target = link.target;
        let x1 = link.source.x || 0;
        let y1 = link.source.y || 0;
        let x2 = link.target.x || 0;
        let y2 = link.target.y || 0;
        let distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        let radius1 = link.source.r || 0;
        let radius2 = link.target.r || 0;
        if (attr_name === 'x1')
            return x1 + (x2 - x1) * radius1 / distance;
        if (attr_name === 'y1')
            return y1 + (y2 - y1) * radius1 / distance;
        if (attr_name === 'x2')
            return x2 + (x1 - x2) * radius2 / distance;
        if (attr_name === 'y2')
            return y2 + (y1 - y2) * radius2 / distance;
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('linkVisual'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__d3_models_link__["a" /* Link */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__d3_models_link__["a" /* Link */]) === "function" && _a || Object)
], LinkVisualComponent.prototype, "link", void 0);
LinkVisualComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: '[linkVisual]',
        template: `
 <svg:g>  

      </svg:g>
  `,
        styles: [__webpack_require__("../../../../../src/app/visuals/shared/link-visual/link-visual.component.css")]
    }),
    __metadata("design:paramtypes", [])
], LinkVisualComponent);

var _a;
//# sourceMappingURL=link-visual.component.js.map

/***/ }),

/***/ "../../../../../src/app/visuals/shared/loading-modal/loading-modal.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/visuals/shared/loading-modal/loading-modal.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  loading-modal works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/visuals/shared/loading-modal/loading-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LoadingModalComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let LoadingModalComponent = class LoadingModalComponent {
    constructor(dialog) {
        this.dialog = dialog;
        this.loading = false;
    }
    ngOnInit() {
    }
    openDialog() {
        let dialogRef = this.dialog.open(LoadingDialog);
        dialogRef.afterClosed().subscribe(result => {
            this.loading = result;
        });
    }
};
LoadingModalComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'loading-modal',
        template: __webpack_require__("../../../../../src/app/visuals/shared/loading-modal/loading-modal.component.html"),
        styles: [__webpack_require__("../../../../../src/app/visuals/shared/loading-modal/loading-modal.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatDialog */]) === "function" && _a || Object])
], LoadingModalComponent);

let LoadingDialog = class LoadingDialog {
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
    }
};
LoadingDialog = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'loading-dialog',
        //templateUrl: './dialog-result-example-dialog.html',
        template: ``
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatDialogRef */]) === "function" && _b || Object])
], LoadingDialog);

var _a, _b;
//# sourceMappingURL=loading-modal.component.js.map

/***/ }),

/***/ "../../../../../src/app/visuals/shared/node-menu/node-menu.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".node-menu{\n  background-color: rgb(250, 250, 250);\n  position: fixed;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/visuals/shared/node-menu/node-menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NodeMenuHolderComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_models_node_service__ = __webpack_require__("../../../../../src/app/d3/models/node.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_data_connection_service__ = __webpack_require__("../../../../../src/app/services/data-connection.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_node_menu_controller_service__ = __webpack_require__("../../../../../src/app/services/node-menu-controller.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_graph_data_service__ = __webpack_require__("../../../../../src/app/services/graph-data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let NodeMenuHolderComponent = class NodeMenuHolderComponent {
};
NodeMenuHolderComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: '[nodeMenu]',
        template: `
 <svg:g menu-list></svg:g>
`,
        styles: [__webpack_require__("../../../../../src/app/visuals/shared/node-menu/node-menu.component.css")]
    })
], NodeMenuHolderComponent);

let NodeMenuComponent = class NodeMenuComponent {
    constructor(nodeService, dataConnectionService, messageService, nodeMenuController, graphDataService) {
        this.nodeService = nodeService;
        this.dataConnectionService = dataConnectionService;
        this.messageService = messageService;
        this.nodeMenuController = nodeMenuController;
        this.graphDataService = graphDataService;
        this.clickedNode = { x: 0, y: 0 };
        this.menuToggle = false;
        this.counts = { total: 0 };
        //this only gets the count of the nodes
        this.subscription = this.nodeService.clickednode$
            .subscribe(node => {
            this.clickedNode = node;
            if (this.clickedNode.id) {
                this.counts = { total: 0 };
                let message = this.messageService.getMessage(this.clickedNode.id, "counts", this.clickedNode.labels[0]);
                this.dataConnectionService.messages.next(message);
                // this.getSmiles(node);
            }
        });
        this.dataConnectionService.messages.subscribe(msg => {
            let response = JSON.parse(msg);
            if (this.clickedNode.id && response.type == "counts") {
                this.counts[response.data._fields[0][0].toLowerCase()] = response.data._fields[1].low;
                this.counts.total = this.counts.total + response.data._fields[1].low;
            }
        });
        this.menuSubscription = this.nodeMenuController.clickedmenu$.subscribe(res => {
            this.menuToggle = res;
        });
    }
    ngOnInit() {
    }
    expand(label) {
        let params = {
            "origin": this.clickedNode.labels[0],
            "target": label
        };
        this.graphDataService.nodeExpand(this.clickedNode.id, params);
        //todo: this option is not node specific -- change to map
        this.clickedNode.expanded[label.toLowerCase()] = true;
    }
    collapse(label) {
        this.graphDataService.nodeCollapse(this.clickedNode, { event: label, node: this.clickedNode.id });
        //todo: this option is not node specific -- change to map
        this.clickedNode.expanded[label.toLowerCase()] = false;
    }
};
NodeMenuComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: '[menu-list]',
        template: `
<svg:foreignObject class="node-menu" [attr.x]="clickedNode.x" [attr.y]="clickedNode.y" width="250" height="300" *ngIf="menuToggle" >
 <xhtml:div xmlns="http://www.w3.org/1999/xhtml">
 <mat-list class="node-menu">
<button  mat-menu-item *ngIf="clickedNode.properties?.uniprot_id" [disabled] = "true"><b>{{clickedNode.properties?.uniprot_id}}</b></button>
 <button mat-menu-item *ngIf="!clickedNode.expanded.target" (click)="expand('Target')" [disabled]="!counts.target">Expand Targets {{counts?.target}}</button>
 <button mat-menu-item *ngIf="clickedNode.expanded.target" (click)="collapse('Target')" [disabled]="!counts.target">Collapse Targets {{counts?.target}}</button>
 <button mat-menu-item *ngIf="!clickedNode.expanded.compound" (click)="expand('Compound')" [disabled]="!counts.compound">Expand Compounds {{counts?.compound}}</button>
  <button mat-menu-item *ngIf="clickedNode.expanded.compound" (click)="collapse('Compound')" [disabled]="!counts.compound">Collapse Compounds {{counts?.compound}}</button>
 <button mat-menu-item *ngIf="!clickedNode.expanded.pattern" (click)="expand('Pattern')" [disabled]="!counts.pattern">Expand Patterns {{counts?.pattern}}</button>
  <button mat-menu-item *ngIf="clickedNode.expanded.pattern" (click)="collapse('Pattern')" [disabled]="!counts.pattern">Collapse Patterns {{counts?.pattern}}</button>
 <button mat-menu-item (click)="expand('All')">Expand All {{counts?.total}}</button>
<!--
//todo: collapse all show/hide logic
 <button mat-menu-item (click)="collapse('All')">Collapse All</button>
-->
</mat-list>
 
</xhtml:div>
 </svg:foreignObject>
`,
        styles: [__webpack_require__("../../../../../src/app/visuals/shared/node-menu/node-menu.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__d3_models_node_service__["a" /* NodeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__d3_models_node_service__["a" /* NodeService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_data_connection_service__["a" /* DataConnectionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_data_connection_service__["a" /* DataConnectionService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_message_service__["a" /* MessageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_message_service__["a" /* MessageService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_node_menu_controller_service__["a" /* NodeMenuControllerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_node_menu_controller_service__["a" /* NodeMenuControllerService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__services_graph_data_service__["a" /* GraphDataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_graph_data_service__["a" /* GraphDataService */]) === "function" && _e || Object])
], NodeMenuComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=node-menu.component.js.map

/***/ }),

/***/ "../../../../../src/app/visuals/shared/node-visual/node-visual.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".node {\n    cursor: pointer;\n    transition: stroke-width 0.1s ease-out,\n        fill 0.1s ease-out,\n        stroke 0.1s ease-out;\n  pointer-events: all;\n}\n\n.node-name {\n  font-family: 'Lato';\n  text-anchor: middle;\n  alignment-baseline: central;\n  font-weight: 300;\n  /*color: #000000;*/\n  pointer-events: all;\n}\n\n.hovering {\n  stroke: #000;\n  stroke-width: 2px;\n}\n\n\n.clicked {\n  stroke: #e64a19;\n  stroke-width: 2px;\n}\n\n.node {\n  diameter: 50px;\n  color: #A5ABB6;\n  border-color: #9AA1AC;\n  border-width: 2px;\n  text-color-internal: #FFFFFF;\n  font-size: 8px;\n  z-index: 666;\n}\n\n.relationship {\n  color: #A5ABB6;\n  shaft-width: 1px;\n  font-size: 8px;\n  padding: 3px;\n  /*text-color-external: #000000;*/\n  /*text-color-internal: #FFFFFF;*/\n  caption: '<type>';\n}\n\ncircle.node.Target.startNode {\n  fill: #ff8a50;\n}\n\ncircle.node.Target.endNode {\n  fill: #c41c00;\n}\n\n/*\nhttp://paletton.com/#uid=40R0u0krKw0hhHhmv-HvKrezxln\n*/\n\n.Target {\n  fill: #ff5722;\n}\n\ncircle.node.Compound {\n  fill: #1E71A2;\n}\n\ncircle.node.Pattern {\n  fill: #FF9C22;\n}\n\n.connected{\n  stroke-width: 1;\n  stroke: #595959;\n}\n\n.maximal{\n  stroke-width: 2;\n  stroke: #e64a19;\n}\n\n.label--top {\n  text-anchor: middle;\n}\n\n.label--right {\n  text-anchor: start;\n}\n\n.label--bottom {\n  text-anchor: middle;\n}\n\n.label--left {\n  text-anchor: end;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/visuals/shared/node-visual/node-visual.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeVisualComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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


let NodeVisualComponent = class NodeVisualComponent {
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('nodeVisual'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__d3_models_node__["b" /* Node */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__d3_models_node__["b" /* Node */]) === "function" && _a || Object)
], NodeVisualComponent.prototype, "node", void 0);
NodeVisualComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: '[nodeVisual]',
        template: `
    <svg:g [attr.transform]="'translate(' + node.x + ',' + node.y + ')'">
      <svg:circle
          class="node {{node.labels[0]}}"
          [ngClass]="{startNode: node.params.startNode, endNode: node.params.endNode, hovering:node.params.hovered}"
          cx="0"
          cy="0"
          [attr.r]="node.r">
      </svg:circle>
     <!-- 
               *ngIf='node.labels[0] != "Pattern"'

     <svg:circle *ngIf='node.labels[0] === "Pattern"'>
      <svg:foreignObject  width='100' height='100' [attr.transform]="'translate(' + node.x + ',' + node.y + ')'">
 <xhtml:div xmlns="http://www.w3.org/1999/xhtml">
<tooltip-visual [node]="node"></tooltip-visual> 
</xhtml:div>
      </svg:foreignObject>
      </svg:circle>-->
<!--
       <svg:text>{{node.properties?.uniprot_id}}</svg:text>
-->
       
       <svg:text>{{node.properties?.uniprot_id || node.properties?.hash}}</svg:text>
    </svg:g>
  `,
        styles: [__webpack_require__("../../../../../src/app/visuals/shared/node-visual/node-visual.component.css")]
    })
], NodeVisualComponent);

var _a;
//# sourceMappingURL=node-visual.component.js.map

/***/ }),

/***/ "../../../../../src/app/visuals/shared/tooltip-visual/tooltip-visual.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".tooltip {\n  opacity: 0;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/visuals/shared/tooltip-visual/tooltip-visual.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TooltipVisualComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let TooltipVisualComponent = class TooltipVisualComponent {
    constructor() { }
    ngOnInit() {
        this.getSmiles(this.node);
    }
    //getSmiles(node : Pattern| Compound ): void{
    getSmiles(node) {
        if (node.properties && node.properties.smiles) {
            this.imageUrl = 'https://tripod.nih.gov/servlet/renderServletv12/?structure=' + this.parseSmiles(node.properties.smiles) + '&standardize=true&format=svg';
        }
        if (node.properties && node.properties.canonical_smiles) {
            this.imageUrl = 'https://tripod.nih.gov/servlet/renderServletv12/?structure=' + this.parseSmiles(node.properties.canonical_smiles) + '&standardize=true&format=svg';
        }
    }
    parseSmiles(smiles) {
        let parsed = smiles
            .replace(/[;]/g, '%3B')
            .replace(/[#]/g, '%23')
            .replace(/[+]/g, '%2B')
            .replace(/[\\]/g, '%5C')
            .replace(/[|]/g, '%7C');
        return parsed;
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], TooltipVisualComponent.prototype, "node", void 0);
TooltipVisualComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'tooltip-visual',
        //templateUrl: './tooltip-visual.component.html',
        template: `
<img [src] = imageUrl>
`,
        styles: [__webpack_require__("../../../../../src/app/visuals/shared/tooltip-visual/tooltip-visual.component.css")]
    }),
    __metadata("design:paramtypes", [])
], TooltipVisualComponent);

//# sourceMappingURL=tooltip-visual.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
const environment = {
    production: false
};
/* harmony export (immutable) */ __webpack_exports__["a"] = environment;

//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_hammerjs__);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map