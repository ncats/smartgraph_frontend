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
exports.push([module.i, "mat-sidenav {\n  width: 25%;\n}\n\n.sidenavToggle{\n  position: absolute !important;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<smrtgraph-menu></smrtgraph-menu>\n<mat-sidenav-container>\n  <button type=\"button\" class=\"sidenavToggle\" mat-raised-button [color]=\"'accent'\" (click)=\"sidenav.toggle()\">\n    <mat-icon>menu</mat-icon>\n  </button>\n  <mat-sidenav #sidenav [mode]=\"'side'\" [opened]=\"true\">\n    <!-- sidenav content -->\n    <smrtgraph-search></smrtgraph-search>\n    <node-details-visual></node-details-visual>\n  </mat-sidenav>\n  <!-- primary content -->\n\n\n  <graph></graph>\n  <!--<div *ngIf=\"loading else graphcontent\" class = \"smrtSearchSidenav\" >\n    <mat-spinner></mat-spinner>\n  </div>\n\n  <ng-template #graphcontent class = \"smrtSearchSidenav\">\n    <graph></graph>\n\n  </ng-template>-->\n\n\n  <mat-sidenav #settingsToggle [mode]=\"'over'\" position=\"end\">\n    <smrtgraph-settings></smrtgraph-settings>\n  </mat-sidenav>\n\n</mat-sidenav-container>\n\n<div fxLayout=\"row\" fxLayoutGap=\"10px\" class = \"link-list-row\">\n  <div fxFlex=\"100\">\n\n    <link-list-visual></link-list-visual>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__d3_models_node_service__ = __webpack_require__("../../../../../src/app/d3/models/node.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_data_connection_service__ = __webpack_require__("../../../../../src/app/services/data-connection.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_search_service__ = __webpack_require__("../../../../../src/app/services/search.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_graph_data_service__ = __webpack_require__("../../../../../src/app/services/graph-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_loading_service__ = __webpack_require__("../../../../../src/app/services/loading.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_settings_service__ = __webpack_require__("../../../../../src/app/services/settings.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AppComponent = /** @class */ (function () {
    function AppComponent(dataConnectionService, nodeService, searchService, messageService, graphDataService, loadingService, settingsService) {
        var _this = this;
        this.dataConnectionService = dataConnectionService;
        this.nodeService = nodeService;
        this.searchService = searchService;
        this.messageService = messageService;
        this.graphDataService = graphDataService;
        this.loadingService = loadingService;
        this.settingsService = settingsService;
        this.title = 'smrtgraph';
        this.nodes = [];
        this.links = [];
        this.loading = true;
        this.searchTerm$ = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__["a" /* Subject */]();
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
        this.dataConnectionService.messages.subscribe(function (msg) {
            //console.log(msg);
            var response = JSON.parse(msg);
            // console.log(response);
            switch (response.type) {
                case "targetSearch": {
                    _this.autocompleteOptions.push(response.data);
                    break;
                }
                case "compoundSearch": {
                    _this.compoundAutocompleteOptions.push(response.data);
                    break;
                }
                case "counts": {
                    break;
                }
            }
        });
        this.subscription = this.loadingService.loading$.subscribe(function (res) { return _this.loading = res; });
        /*
        * This provides an interface to handle the mapping of search input
        * it retrieves a query object from the service, returning the most recent input
        * this query is then passed on to the main data service
        * */
        /* this.searchService.search(this.searchTerm$)
           .subscribe(results => {
             //empty autocomplete options array, otherwise it will never change
             this.autocompleteOptions=[];
             this.compoundAutocompleteOptions=[];
             this.dataConnectionService.messages.next(results);
           });*/
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.targetCtrl.valueChanges.subscribe(function (value) {
            //forces selected option
            //todo: this doesn't seem very efficient
            if (value.value) {
                _this.onEnter("target");
            }
            else {
                if (value != '') {
                    //empty autocomplete options array, otherwise it will never change
                    _this.autocompleteOptions = [];
                    _this.searchTerm$.next({ term: value, type: "targetSearch" });
                }
            }
        });
        this.patternCtrl.valueChanges.subscribe(function (value) {
            //forces selected option
            //todo: this doesn't seem very efficient
            if (value.value) {
                _this.onEnter("compound");
            }
            else {
                if (value != '') {
                    //empty autocomplete options array, otherwise it will never change
                    //this.compoundAutocompleteOptions = [];
                    // this.searchTerm$.next({term: value.replace(/\(/gi, "\\(").replace(/\)/gi, "\\)").replace(/\[/gi, "\\[").replace(/\]/gi, "\\]"), type: "patternSearch"});
                    _this.searchTerm$.next({ term: value, type: "compoundSearch" });
                }
            }
        });
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        this.settingsService.sidenav = this.settingsToggle;
    };
    AppComponent.prototype.onEnter = function (type) {
        var value;
        switch (type) {
            case "target": {
                this.targetSelected = true;
                value = this.targetCtrl.value.value;
                break;
            }
            case "compound": {
                this.patternSelected = true;
                value = this.patternCtrl.value.display;
                break;
            }
        }
        this.graphDataService.clearGraph();
        var query = this.messageService.getMessage(value, type);
        this.dataConnectionService.messages.next(query);
    };
    AppComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component is destroyed
        // this.subscription.unsubscribe();
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_data_connection_service__["a" /* DataConnectionService */],
            __WEBPACK_IMPORTED_MODULE_2__d3_models_node_service__["a" /* NodeService */],
            __WEBPACK_IMPORTED_MODULE_4__services_search_service__["a" /* SearchService */],
            __WEBPACK_IMPORTED_MODULE_5__services_message_service__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_7__services_graph_data_service__["a" /* GraphDataService */],
            __WEBPACK_IMPORTED_MODULE_8__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_9__services_settings_service__["a" /* SettingsService */]])
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_search_service__ = __webpack_require__("../../../../../src/app/services/search.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__visuals_details_node_details_visual_node_details_visual_component__ = __webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-details-visual.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__visuals_shared_node_menu_node_menu_component__ = __webpack_require__("../../../../../src/app/visuals/shared/node-menu/node-menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_node_menu_controller_service__ = __webpack_require__("../../../../../src/app/services/node-menu-controller.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_graph_data_service__ = __webpack_require__("../../../../../src/app/services/graph-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__smrtgraph_search_smrtgraph_search_component__ = __webpack_require__("../../../../../src/app/smrtgraph-search/smrtgraph-search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__smrtgraph_menu_smrtgraph_menu_component__ = __webpack_require__("../../../../../src/app/smrtgraph-menu/smrtgraph-menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__download_button_download_button_component__ = __webpack_require__("../../../../../src/app/download-button/download-button.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__visuals_details_link_details_visual_link_details_visual_component__ = __webpack_require__("../../../../../src/app/visuals/details/link-details-visual/link-details-visual.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__d3_models_link_service__ = __webpack_require__("../../../../../src/app/d3/models/link.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__d3_directives_zoomable_directive__ = __webpack_require__("../../../../../src/app/d3/directives/zoomable.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__d3_directives_hoverable_link_directive__ = __webpack_require__("../../../../../src/app/d3/directives/hoverable-link.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__d3_directives_hoverable_node_directive__ = __webpack_require__("../../../../../src/app/d3/directives/hoverable-node.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__d3_directives_draggable_directive__ = __webpack_require__("../../../../../src/app/d3/directives/draggable.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__d3_directives_clickable_directive__ = __webpack_require__("../../../../../src/app/d3/directives/clickable.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__visuals_details_graph_details_graph_details_component__ = __webpack_require__("../../../../../src/app/visuals/details/graph-details/graph-details.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__services_loading_service__ = __webpack_require__("../../../../../src/app/services/loading.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__visuals_details_node_details_visual_node_types_target_detail_view_target_detail_view_component__ = __webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-types/target-detail-view/target-detail-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__visuals_details_node_details_visual_node_types_compound_detail_view_compound_detail_view_component__ = __webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-types/compound-detail-view/compound-detail-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__visuals_details_node_details_visual_node_types_pattern_detail_view_pattern_detail_view_component__ = __webpack_require__("../../../../../src/app/visuals/details/node-details-visual/node-types/pattern-detail-view/pattern-detail-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__visuals_details_link_list_visual_link_list_visual_component__ = __webpack_require__("../../../../../src/app/visuals/details/link-list-visual/link-list-visual.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__visuals_details_link_list_visual_link_database_service__ = __webpack_require__("../../../../../src/app/visuals/details/link-list-visual/link-database.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__visuals_details_link_list_visual_reaction_visual_reaction_visual_component__ = __webpack_require__("../../../../../src/app/visuals/details/link-list-visual/reaction-visual/reaction-visual.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__services_settings_service__ = __webpack_require__("../../../../../src/app/services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__smrtgraph_settings_smrtgraph_settings_component__ = __webpack_require__("../../../../../src/app/smrtgraph-settings/smrtgraph-settings.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_9__visuals_graph_graph_component__["a" /* GraphComponent */],
                __WEBPACK_IMPORTED_MODULE_16__visuals_details_node_details_visual_node_details_visual_component__["a" /* NodeDetailsVisualComponent */],
                __WEBPACK_IMPORTED_MODULE_17__visuals_shared_node_menu_node_menu_component__["a" /* NodeMenuComponent */],
                __WEBPACK_IMPORTED_MODULE_10__visuals_shared_node_visual_node_visual_component__["b" /* StructureViewer */],
                __WEBPACK_IMPORTED_MODULE_21__smrtgraph_menu_smrtgraph_menu_component__["a" /* SmrtgraphMenuComponent */],
                __WEBPACK_IMPORTED_MODULE_20__smrtgraph_search_smrtgraph_search_component__["a" /* SmrtgraphSearchComponent */],
                __WEBPACK_IMPORTED_MODULE_22__download_button_download_button_component__["a" /* DownloadButtonComponent */],
                __WEBPACK_IMPORTED_MODULE_23__visuals_details_link_details_visual_link_details_visual_component__["a" /* LinkDetailsVisualComponent */],
                __WEBPACK_IMPORTED_MODULE_10__visuals_shared_node_visual_node_visual_component__["a" /* NodeVisualComponent */],
                __WEBPACK_IMPORTED_MODULE_11__visuals_shared_link_visual_link_visual_component__["a" /* LinkVisualComponent */],
                __WEBPACK_IMPORTED_MODULE_25__d3_directives_zoomable_directive__["a" /* ZoomableDirective */],
                __WEBPACK_IMPORTED_MODULE_26__d3_directives_hoverable_link_directive__["a" /* HoverableLinkDirective */],
                __WEBPACK_IMPORTED_MODULE_27__d3_directives_hoverable_node_directive__["a" /* HoverableNodeDirective */],
                __WEBPACK_IMPORTED_MODULE_28__d3_directives_draggable_directive__["a" /* DraggableDirective */],
                __WEBPACK_IMPORTED_MODULE_29__d3_directives_clickable_directive__["a" /* ClickableDirective */],
                __WEBPACK_IMPORTED_MODULE_30__visuals_details_graph_details_graph_details_component__["a" /* GraphDetailsComponent */],
                __WEBPACK_IMPORTED_MODULE_32__visuals_details_node_details_visual_node_types_target_detail_view_target_detail_view_component__["a" /* TargetDetailViewComponent */],
                __WEBPACK_IMPORTED_MODULE_33__visuals_details_node_details_visual_node_types_compound_detail_view_compound_detail_view_component__["a" /* CompoundDetailViewComponent */],
                __WEBPACK_IMPORTED_MODULE_34__visuals_details_node_details_visual_node_types_pattern_detail_view_pattern_detail_view_component__["a" /* PatternDetailViewComponent */],
                __WEBPACK_IMPORTED_MODULE_35__visuals_details_link_list_visual_link_list_visual_component__["a" /* LinkListVisualComponent */],
                __WEBPACK_IMPORTED_MODULE_37__visuals_details_link_list_visual_reaction_visual_reaction_visual_component__["a" /* ReactionVisualComponent */],
                __WEBPACK_IMPORTED_MODULE_39__smrtgraph_settings_smrtgraph_settings_component__["a" /* SmrtgraphSettingsComponent */]
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
                __WEBPACK_IMPORTED_MODULE_24__d3_models_link_service__["a" /* LinkService */],
                __WEBPACK_IMPORTED_MODULE_14__services_search_service__["a" /* SearchService */],
                __WEBPACK_IMPORTED_MODULE_15__services_message_service__["a" /* MessageService */],
                __WEBPACK_IMPORTED_MODULE_19__services_graph_data_service__["a" /* GraphDataService */],
                __WEBPACK_IMPORTED_MODULE_18__services_node_menu_controller_service__["a" /* NodeMenuControllerService */],
                __WEBPACK_IMPORTED_MODULE_31__services_loading_service__["a" /* LoadingService */],
                __WEBPACK_IMPORTED_MODULE_36__visuals_details_link_list_visual_link_database_service__["b" /* LinkDatabase */],
                __WEBPACK_IMPORTED_MODULE_38__services_settings_service__["a" /* SettingsService */]
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__visuals_details_link_list_visual_link_database_service__ = __webpack_require__("../../../../../src/app/visuals/details/link-list-visual/link-database.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var D3Service = /** @class */ (function () {
    /** This service will provide methods to enable user interaction with elements
     * while maintaining the d3 simulations physics
     */
    function D3Service(nodeService, linkService, nodeMenuController, linkDatabase) {
        var _this = this;
        this.nodeService = nodeService;
        this.linkService = linkService;
        this.nodeMenuController = nodeMenuController;
        this.linkDatabase = linkDatabase;
        /** A method to bind click events to an svg element */
        //just emits the node for other components to listen for
        this.applyClickableBehaviour = function (element, node, graph) {
            var d3element = __WEBPACK_IMPORTED_MODULE_2_d3__["j" /* select */](element);
            var svg = __WEBPACK_IMPORTED_MODULE_2_d3__["j" /* select */]('svg');
            var toggleMenu = function () {
                if (node.params.menu) {
                    _this.nodeMenuController.toggleVisible(false);
                    node.params.menu = false;
                }
                else {
                    _this.nodeService.changeNode(node);
                    _this.nodeMenuController.toggleVisible(true);
                    node.params.menu = true;
                    //if menu is open, close it
                }
            };
            var clickFunction = function () {
                if (__WEBPACK_IMPORTED_MODULE_2_d3__["b" /* event */].defaultPrevented)
                    return;
                //graph.nodes.map(node => node.params.menu = false);
                //todo: this is calling the node change every time the node is clicked to toggle the menu, which ends up trying to expand the node each time, resulting in a diff of 0
                toggleMenu();
                __WEBPACK_IMPORTED_MODULE_2_d3__["b" /* event */].stopPropagation();
            };
            var clearMenu = function () {
                //this just closes out the menu and sets the menu tracking variable to be false for each node
                _this.nodeMenuController.toggleVisible(false);
                graph.nodes.map(function (node) { return node.params.menu = false; });
            };
            d3element.on("click", clickFunction);
            svg.on("mousedown", clearMenu);
        };
    }
    /** A method to bind a pan and zoom behaviour to an svg element */
    D3Service.prototype.applyZoomableBehaviour = function (svgElement, containerElement) {
        var _this = this;
        var svg, container, zoomed, zoom, clearMenu;
        svg = __WEBPACK_IMPORTED_MODULE_2_d3__["j" /* select */](svgElement);
        container = __WEBPACK_IMPORTED_MODULE_2_d3__["j" /* select */](containerElement);
        zoomed = function () {
            _this.nodeMenuController.toggleVisible(false);
            container.attr("transform", __WEBPACK_IMPORTED_MODULE_2_d3__["b" /* event */].transform);
        };
        clearMenu = function () {
            _this.nodeMenuController.toggleVisible(false);
        };
        zoom = __WEBPACK_IMPORTED_MODULE_2_d3__["l" /* zoom */]()
            .on("zoom", zoomed);
        svg.call(zoom);
    };
    /** A method to bind a draggable behaviour to an svg element */
    D3Service.prototype.applyDraggableBehaviour = function (element, node, graph) {
        var d3element = __WEBPACK_IMPORTED_MODULE_2_d3__["j" /* select */](element);
        var started = function () {
            __WEBPACK_IMPORTED_MODULE_2_d3__["b" /* event */].sourceEvent.stopPropagation();
            if (!__WEBPACK_IMPORTED_MODULE_2_d3__["b" /* event */].active) {
                graph.simulation.alphaTarget(0.7).restart();
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
            //by not resetting these, the node stays where it is dragged
            /*  node.fx = null;
             node.fy = null;*/
        };
        d3element.call(__WEBPACK_IMPORTED_MODULE_2_d3__["a" /* drag */]()
            .on("start", started)
            .on("drag", dragged)
            .on("end", ended));
    };
    /** A method to bind hoverable behaviour to an svg element */
    D3Service.prototype.applyHoverableNodeBehaviour = function (element, node, graph) {
        var _this = this;
        var d3element = __WEBPACK_IMPORTED_MODULE_2_d3__["j" /* select */](element);
        var connectedLinks;
        var maximalLinks = [];
        var upstreamNeighbors = [];
        var downstreamNeighbors = [];
        var decorateNodes = function () {
            d3element.select('circle').classed('hovering', true);
            __WEBPACK_IMPORTED_MODULE_2_d3__["k" /* selectAll */]('circle')
                .data(graph.nodes)
                .filter(getNeighborNodes) //this will pass each node in the graph to the function
                .classed('connected', true);
        };
        var decorateLinks = function () {
            connectedLinks = __WEBPACK_IMPORTED_MODULE_2_d3__["k" /* selectAll */]('line')
                .data(graph.links)
                .filter(getNeighborLinks)
                .classed('connected', true);
            var connectedNodes = __WEBPACK_IMPORTED_MODULE_2_d3__["k" /* selectAll */]('circle')
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
            node.params.hovered = false;
        };
        var clearLinks = function () {
            __WEBPACK_IMPORTED_MODULE_2_d3__["k" /* selectAll */]('line')
                .classed('connected', false)
                .classed('maximal', false);
            __WEBPACK_IMPORTED_MODULE_2_d3__["k" /* selectAll */]('circle')
                .classed('connected', false)
                .classed('maximal', false);
        };
        //todo: this is kind of piggybacking on the filter function
        var getNeighborLinks = function (e) {
            var downstream = node.id === (typeof (e.source) == "object" ? e.source.id : e.source);
            var upstream = node.id === (typeof (e.target) == "object" ? e.target.id : e.target);
            if (downstream == true) {
                downstreamNeighbors.push(e);
            }
            if (upstream == true) {
                upstreamNeighbors.push(e);
            }
            return downstream;
        };
        var getNeighborNodes = function (e) {
            return connectedLinks.data().map(function (link) { return link.target.id; }).indexOf(e.id) > -1;
        };
        var findMaximalLinks = function (e) {
            if (e.properties && e.properties.islargest) {
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
            decorateLinks();
            decorateNodes();
            _this.nodeService.hoveredNode({ node: node, up: upstreamNeighbors, down: downstreamNeighbors });
        };
        var mouseOutFunction = function () {
            clearNodes();
            clearLinks();
            upstreamNeighbors = [];
            downstreamNeighbors = [];
        };
        //todo: this fires constantly as the node is dragged
        d3element.on("mouseover", mouseOverFunction).on("mouseout", mouseOutFunction);
    };
    /** A method to bind hoverable behaviour to an svg element */
    D3Service.prototype.applyHoverableLinkBehaviour = function (element, link, graph) {
        var _this = this;
        var d3element = __WEBPACK_IMPORTED_MODULE_2_d3__["j" /* select */](element);
        var arrowType = 'connected';
        var decorateLinks = function () {
            if (link.edgeType == 'up') {
                arrowType = "connectedflat";
            }
            d3element.select('line').classed('hovering', true).classed(arrowType, true);
            _this.linkService.hoveredLink(link);
        };
        var clearLinks = function () {
            d3element.select('line').classed('hovering', false).classed(arrowType, false);
        };
        var mouseOverFunction = function () {
            _this.linkService.hoveredLink(link);
            _this.linkDatabase.addSite(link);
            decorateLinks();
        };
        var mouseOutFunction = function () {
            clearLinks();
        };
        d3element.on("mouseover", mouseOverFunction).on("mouseout", mouseOutFunction);
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
            __WEBPACK_IMPORTED_MODULE_5__services_node_menu_controller_service__["a" /* NodeMenuControllerService */],
            __WEBPACK_IMPORTED_MODULE_6__visuals_details_link_list_visual_link_database_service__["b" /* LinkDatabase */]])
    ], D3Service);
    return D3Service;
}());



/***/ }),

/***/ "../../../../../src/app/d3/directives/clickable.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClickableDirective; });
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




var ClickableDirective = /** @class */ (function () {
    function ClickableDirective(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    ClickableDirective.prototype.ngOnInit = function () {
        this.d3Service.applyClickableBehaviour(this._element.nativeElement, this.node, this.graph);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('clickableNode'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__models_node__["b" /* Node */])
    ], ClickableDirective.prototype, "node", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('draggableInGraph'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__models_force_directed_graph__["a" /* ForceDirectedGraph */])
    ], ClickableDirective.prototype, "graph", void 0);
    ClickableDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[clickableNode]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__d3_service__["a" /* D3Service */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], ClickableDirective);
    return ClickableDirective;
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




var DraggableDirective = /** @class */ (function () {
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




var HoverableLinkDirective = /** @class */ (function () {
    function HoverableLinkDirective(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    HoverableLinkDirective.prototype.ngOnInit = function () {
        this.d3Service.applyHoverableLinkBehaviour(this._element.nativeElement, this.link, this.graph);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('hoverableLink'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__models_link__["a" /* Link */])
    ], HoverableLinkDirective.prototype, "link", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('draggableInGraph'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__models_force_directed_graph__["a" /* ForceDirectedGraph */])
    ], HoverableLinkDirective.prototype, "graph", void 0);
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




var HoverableNodeDirective = /** @class */ (function () {
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



var ZoomableDirective = /** @class */ (function () {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_loading_service__ = __webpack_require__("../../../../../src/app/services/loading.service.ts");



var FORCES = {
    LINKS: 1 / 50,
    //gets rid of overlap [0,1]
    COLLISION: 1,
    // A positive value causes nodes to attract each other, similar to gravity, while a negative value causes nodes to repel each other, similar to electrostatic charge.
    CHARGE: -1
};
var ForceDirectedGraph = /** @class */ (function () {
    function ForceDirectedGraph(nodes, links, options) {
        this.ticker = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.nodes = [];
        this.links = [];
        this.loadingService = new __WEBPACK_IMPORTED_MODULE_2__services_loading_service__["a" /* LoadingService */];
        this.nodes = nodes;
        this.links = links;
        this.initSimulation(options);
    }
    ForceDirectedGraph.prototype.update = function (graph, options) {
        //frequently the data is separate from the graph image, so these need to be set for downstream filtering
        this.nodes = graph.nodes;
        this.links = graph.links;
        this.simulation.nodes(this.nodes);
        this.simulation
            .force('link', __WEBPACK_IMPORTED_MODULE_1_d3__["e" /* forceLink */](this.links).id(function (d) { return d['id']; })
            .strength(FORCES.LINKS));
        this.initSimulation(options);
        if (!this.simulation) {
            throw new Error('simulation was not initialized yet');
        }
        // this.simulation.restart();
        this.simulation.alphaTarget(0.5).restart();
        this.loadingService.toggleVisible(false);
    };
    ForceDirectedGraph.prototype.initSimulation = function (options) {
        if (!options || !options.width || !options.height) {
            throw new Error('missing options when initializing simulation');
        }
        /** Creating the simulation */
        if (!this.simulation) {
            this.simulation = __WEBPACK_IMPORTED_MODULE_1_d3__["g" /* forceSimulation */]()
                .force('charge', __WEBPACK_IMPORTED_MODULE_1_d3__["f" /* forceManyBody */]()
                .strength(function (d) { return FORCES.CHARGE * d['r']; }))
                .force('center', __WEBPACK_IMPORTED_MODULE_1_d3__["c" /* forceCenter */](options.width / 2, options.height / 2))
                .force("collide", __WEBPACK_IMPORTED_MODULE_1_d3__["d" /* forceCollide */]()
                .radius(function (d) { return d['r'] + 5; }).iterations(2)
                .strength(FORCES.COLLISION))
                .force("y", __WEBPACK_IMPORTED_MODULE_1_d3__["i" /* forceY */]().y(function () {
                return Math.random() * ((3 * options.height / 4) - (options.height / 4) + 1) + (options.height / 4);
            }))
                .force("x", __WEBPACK_IMPORTED_MODULE_1_d3__["h" /* forceX */]().x(function (d) {
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
            var ticker_1 = this.ticker;
            // Connecting the d3 ticker to an angular event emitter
            this.simulation.on('tick', function () {
                ticker_1.emit(this);
            });
        }
        /** Restarting the simulation internal timer */
        this.simulation.restart();
        this.loadingService.toggleVisible(false);
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



var LinkService = /** @class */ (function () {
    function LinkService() {
        // Observable navItem source
        this._clickedLinkSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this._hoveredLinkSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.masterLinkMap = new Map();
        // Observable navItem stream
        this.lastLink = {};
        this.clickedlink$ = this._clickedLinkSource.asObservable();
        this.hoveredlink$ = this._hoveredLinkSource.asObservable();
    }
    // service command
    LinkService.prototype.changeLink = function (link) {
        this._clickedLinkSource.next(link);
    };
    LinkService.prototype.hoveredLink = function (link) {
        this._hoveredLinkSource.next(link);
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
    //searches to see if a link exists. if it does, it returns the link with the sent data merged, if it doesn't exist, it makes a new link with the data
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
var Reaction = /** @class */ (function () {
    function Reaction(data) {
        var r = data.split('|');
        this.causal = r[0];
        this.mechanism = r[1];
        this.reference = r[2];
        this.confidence = r[3];
    }
    return Reaction;
}());

var Link = /** @class */ (function () {
    function Link(source, target, data) {
        this.reactions = [];
        this.source = source;
        this.target = target;
        this.type = data.type || "";
        this.properties = data.properties;
        this.uuid = data.properties.uuid;
        this.edgeType = data.properties.edgeType;
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






var NodeService = /** @class */ (function () {
    function NodeService() {
        // Observable navItem source
        this._clickedNodeSource = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["a" /* Subject */]();
        this._hoveredNodeSource = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["a" /* Subject */]();
        this.masterNodeMap = new Map();
        // Observable navItem stream
        this.lastNode = {};
        this.clickednode$ = this._clickedNodeSource.asObservable();
        this.hoverednode$ = this._hoveredNodeSource.asObservable();
    }
    // service command
    NodeService.prototype.changeNode = function (node) {
        this._clickedNodeSource.next(node);
    };
    NodeService.prototype.hoveredNode = function (node) {
        this._hoveredNodeSource.next(node);
    };
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
    //searches to see if a node exists. if it does, it returns the node, if it doesn't exist, it makes a new node with the data
    NodeService.prototype.makeNode = function (id, data) {
        var n = this.masterNodeMap.get(id);
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

var Params = /** @class */ (function () {
    function Params() {
        this.hovered = false;
        this.startNode = false;
        this.endNode = false;
        this.menu = false;
    }
    return Params;
}());

var Node = /** @class */ (function () {
    /*
    * Neo4j has their own uuid that will need to be used to track nodes, since some relationships are sepnt with the start
    * and end nodes notated solely by the Neo4j ids, rather than the full node object
    * */
    function Node(id, data) {
        var _this = this;
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
        this.normal = function () {
            return Math.sqrt(_this.linkCount / __WEBPACK_IMPORTED_MODULE_0__app_config__["a" /* default */].N);
        };
        this.uuid = data.properties.uuid;
        this.id = id;
        //uuid is still saved here
        this.properties = data.properties;
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

var Compound = /** @class */ (function (_super) {
    __extends(Compound, _super);
    function Compound(id, data) {
        var _this = _super.call(this, id, data) || this;
        _this.hash = data.properties.hash;
        _this.nostereo_hash = data.properties.nostereo_hash;
        _this.smiles = data.properties.smiles;
        _this.compoundId = data.properties.compound_id.low;
        _this.imageUrl = 'https://tripod.nih.gov/servlet/renderServletv12/?structure=' + _this.parseSmiles(data.properties.smiles) + '&standardize=true&format=svg';
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

var Target = /** @class */ (function (_super) {
    __extends(Target, _super);
    function Target(id, data) {
        var _this = _super.call(this, id, data) || this;
        _this.uniprot_id = data.properties.uniprot_id;
        _this.name = data.properties.name;
        _this.fullname = data.properties.fullname;
        _this.synonyms = data.properties.synonyms;
        _this.genes = data.properties.gene_symbols.join(", ");
        return _this;
    }
    return Target;
}(Node));

var Pattern = /** @class */ (function (_super) {
    __extends(Pattern, _super);
    function Pattern(id, data) {
        var _this = _super.call(this, id, data) || this;
        _this.hash = data.properties.hash;
        _this.pattern_id = data.properties.pattern_id;
        _this.pattern_type = data.properties.pattern_type;
        _this.smiles = data.properties.smiles;
        _this.imageUrl = 'https://tripod.nih.gov/servlet/renderServletv12/?structure=' + _this.parseSmiles(data.properties.smiles) + '&standardize=true&format=svg&preset=HIGHLIGHT&amap=' + data.properties.smiles.split("").map(function (a, i) { return i; }).join(",");
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


var DownloadButtonComponent = /** @class */ (function () {
    function DownloadButtonComponent(rd) {
        this.rd = rd;
    }
    DownloadButtonComponent.prototype.ngOnInit = function () {
        console.log(this.rd.data);
        console.log(this.el);
    };
    DownloadButtonComponent.prototype.ngAfterViewInit = function () {
        // var div = this.elRef.nativeElement.querySelector('#');
        // console.log(div);
        console.log(this.rd);
        console.log(this.el);
    };
    //
    DownloadButtonComponent.prototype.downloadFile = function (data, options) {
        console.log("downloading");
        var svgString = this.getSVGString(data.node());
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
    };
    // Below are the functions that handle actual exporting:
    DownloadButtonComponent.prototype.getSVGString = function (svgNode) {
        svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
        var cssStyleText = getCSSStyles(svgNode);
        appendCSS(cssStyleText, svgNode);
        var serializer = new XMLSerializer();
        var svgString = serializer.serializeToString(svgNode);
        svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
        svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix
        return svgString;
        function getCSSStyles(parentElement) {
            var selectorTextArr = [];
            // Add Parent element Id and Classes to the list
            selectorTextArr.push('#' + parentElement.id);
            for (var _i = 0, _a = parentElement.classList; _i < _a.length; _i++) {
                var classType = _a[_i];
                if (!contains('.' + classType, selectorTextArr)) {
                    selectorTextArr.push('.' + classType);
                }
            }
            // Add Children element Ids and Classes to the list
            var nodes = parentElement.getElementsByTagName("*");
            for (var _b = 0, nodes_1 = nodes; _b < nodes_1.length; _b++) {
                var node = nodes_1[_b];
                var id = node.id;
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
            // Extract CSS Rules
            var extractedCSSText = "";
            for (var r = 0; r < document.styleSheets.length; r++) {
                var css = document.styleSheets[r];
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
            var styleElement = document.createElement("style");
            styleElement.setAttribute("type", "text/css");
            styleElement.innerHTML = cssText;
            var refNode = element.hasChildNodes() ? element.children[0] : null;
            element.insertBefore(styleElement, refNode);
        }
    };
    DownloadButtonComponent.prototype.svgString2Image = function (svgString, width, height, callback) {
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
        var blob = new Blob([image], { type: 'image/png;charset=utf-8' });
        console.log(canvas);
        console.log(blob);
        console.log(image);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('#svg'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], DownloadButtonComponent.prototype, "el", void 0);
    DownloadButtonComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'download-button',
            template: "\n      <button mat-button>Download current graph <i class=\"material-icons\">file_download</i></button>\n\n",
            styles: [__webpack_require__("../../../../../src/app/download-button/download-button.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer2 */]])
    ], DownloadButtonComponent);
    return DownloadButtonComponent;
}());



/***/ }),

/***/ "../../../../../src/app/services/data-connection.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataConnectionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__websocket_service__ = __webpack_require__("../../../../../src/app/services/websocket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators__ = __webpack_require__("../../../../rxjs/_esm5/operators/index.js");
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
var DataConnectionService = /** @class */ (function () {
    function DataConnectionService(wsService) {
        this.wsService = wsService;
        this.messages = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        // subscribe to websocket
        this.messagesEmitter = this.wsService
            .connect(DATA_URL).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["d" /* map */])(function (response) { return response.data; })
        //  error(error => Observable.empty())
        );
        this.messages = this.messagesEmitter.pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["e" /* share */])());
    }
    DataConnectionService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__websocket_service__["a" /* WebSocketService */]])
    ], DataConnectionService);
    return DataConnectionService;
}()); // end class DataService



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







var GraphDataService = /** @class */ (function () {
    function GraphDataService(dataConnectionService, messageService, nodeService, linkService, loadingService) {
        //todo: with the added search variables, it is extremely likely no results will come back. this needs to be shown
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
        // Observable navItem source
        this._graphHistorySource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.masterLinkMap = new Map();
        this.historyMap = new Map();
        this.graphhistory$ = this._graphHistorySource.asObservable();
        this.filter = false;
        this.nodeList = [];
        this.linkList = [];
        this.nodes = [];
        this.dataConnectionService.messages.subscribe(function (msg) {
            var response = JSON.parse(msg);
            switch (response.type) {
                case 'path': {
                    _this.filter = true;
                    //intentional absence of break to allow fall through
                }
                case 'startNodeSearch':
                case 'endNodeSearch':
                case 'expand':
                case 'load': {
                    _this.originalEvent = response.type;
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
                case 'done': {
                    _this.makeGraph();
                    _this.loadingService.toggleVisible(false);
                    break;
                }
            }
        });
    }
    GraphDataService.prototype.setFilter = function (filter) {
        this.filter = filter;
    };
    ;
    GraphDataService.prototype.parseRecords = function (path, event) {
        //neo4j websocket returns one record at a time, so looping isn't necessary, but still probably a good idea
        for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
            var r = path_1[_i];
            if (r.segments) {
                for (var _a = 0, _b = r.segments; _a < _b.length; _a++) {
                    var l = _b[_a];
                    //this ignores the initial start and end nodes, but they are added in the segments of the path
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
                    //this is for node groups that aren't a path
                    var n = this.nodeService.makeNode(r.properties.uuid, r);
                    this.nodeList.push(n);
                    this.nodeService.setNode(n);
                }
                else {
                    //this is the separate path for expanding nodes -- this does not have a uuid associated with the start or end nodes, so neo4j's id needs to be used to create the nodes
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
            this.eventData.event.diff = diff;
            var eventList = this.historyMap.get("expand") ? this.historyMap.get("expand") : new Map();
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
    };
    GraphDataService.prototype.applyDiff = function (diff) {
        var _this = this;
        //todo: it is possible to expand a node connected to an expanded node. If the original node is closed, the second expanded nodes are still visible
        //todo: need to iterate over remaining nodes and links and remove them
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
            var source = this.nodeService.getById(l.source.id ? l.source.id : l.source);
            source.linkCount++;
            this.nodeService.setNode(source);
            var target = this.nodeService.getById(l.target.id ? l.target.id : l.target);
            target.linkCount++;
            this.nodeService.setNode(target);
        }
    };
    GraphDataService.prototype.clearGraph = function () {
        this.graph.links = [];
        this.graph.nodes = [];
    };
    GraphDataService.prototype.nodeExpand = function (id, properties) {
        var message = this.messageService.getMessage(id, "expand", properties);
        //right now this is only creating a skeleton map object without the diff
        //this happens here because node id and label is needed for tracking.
        var event = {
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
    };
    GraphDataService.prototype.nodeCollapse = function (node, label) {
        this.filter = true;
        //get the expand object to delete the nodes added
        var diff = this.historyMap.get('expand').get(node.id).diff;
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


var LoadingService = /** @class */ (function () {
    function LoadingService() {
        this._loadingSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        // Observable navItem stream
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

var MessageService = /** @class */ (function () {
    function MessageService() {
    }
    MessageService.prototype.getMessage = function (term, type, properties) {
        var msg;
        var params;
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
                var start = 'MATCH (n:' + properties.origin;
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
                var levels = properties.distance;
                //WHERE all(rel in r where rel.max_confidence_value > .3)
                var start = 'MATCH p=shortestPath((t)-[r*..' + levels + ']->(q:Target)) WHERE ';
                var confidence = "";
                var activity = "";
                var similarity = "";
                var where = "";
                if (properties.confidence) {
                    confidence = ' all(rel in r where rel.max_confidence_value >' + properties.confidence + ') AND';
                }
                if (properties.activity) {
                    activity = ' all(rel in r where rel.activity >' + properties.activity + ') AND';
                }
                if (properties.similarity) {
                    similarity = ' all(rel in r where rel.ratio >' + properties.similarity + ') AND';
                }
                msg = start + confidence + activity + similarity + ' t.uuid IN {start} AND q.uuid IN {end} AND q.uuid <> t.uuid return p';
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


var NodeMenuControllerService = /** @class */ (function () {
    function NodeMenuControllerService() {
        this._clickedMenuSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        // Observable navItem stream
        this.clickedmenu$ = this._clickedMenuSource.asObservable();
    }
    // service command
    NodeMenuControllerService.prototype.toggleVisible = function (force) {
        this._clickedMenuSource.next(force);
    };
    NodeMenuControllerService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], NodeMenuControllerService);
    return NodeMenuControllerService;
}());



/***/ }),

/***/ "../../../../../src/app/services/search.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operators__ = __webpack_require__("../../../../rxjs/_esm5/operators/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
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



var SearchService = /** @class */ (function () {
    function SearchService(messageService) {
        this.messageService = messageService;
    }
    SearchService.prototype.search = function (terms) {
        return terms.pipe(Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["a" /* debounceTime */])(300), Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["b" /* distinctUntilChanged */])());
    };
    SearchService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__message_service__["a" /* MessageService */]])
    ], SearchService);
    return SearchService;
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


var SettingsService = /** @class */ (function () {
    function SettingsService() {
        this.settings = new Settings();
        this.dataChange = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](this.settings);
        this.settings.targetLabel = "genes";
        this.settings.compoundLabel = "hash";
        this.dataChange.next(this.settings);
    }
    SettingsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], SettingsService);
    return SettingsService;
}());

var Settings = /** @class */ (function () {
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



var WebSocketService = /** @class */ (function () {
    function WebSocketService() {
    }
    WebSocketService.prototype.connect = function (url) {
        if (!this.subject) {
            this.subject = this.create(url);
            console.log("connected");
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
}()); // end class WebSocketService



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


var SmrtgraphMenuComponent = /** @class */ (function () {
    function SmrtgraphMenuComponent(settingsService) {
        this.settingsService = settingsService;
        this.title = "smrtgraph";
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

module.exports = "<div class=\"container\">\n  <br>\n\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\">\n      <mat-form-field fxFlex=\"95\">\n        <textarea matInput matTextareaAutosize placeholder=\"Start Nodes\" matAutosizeMaxRows = 15 [formControl]=\"startNodesCtrl\"></textarea>\n      </mat-form-field>\n  </div>\n\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\">\n  <mat-form-field fxFlex=\"95\">\n        <textarea matInput matTextareaAutosize placeholder=\"End Nodes\" matAutosizeMaxRows = 15 [formControl]=\"endNodesCtrl\"></textarea>\n      </mat-form-field>\n  </div>\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\">\n    <div fxFlex=\"95\">\n      <label>Max Distance</label>\n      <mat-slider matInput fxLayoutAlign=\"center center\"\n                 class=\"example-margin\"\n                 aria-label = \"max distance\"\n                 [max]=\"10\"\n                 [min]=\"1\"\n                 [step]=\"1\"\n                 [thumb-label]=\"true\"\n                 [formControl]=\"distanceCtrl\"\n                 [value]=\"5\">\n      </mat-slider>\n      <br>\n      <label>Confidence Level</label>\n      <mat-slider matInput fxLayoutAlign=\"center center\"\n                 aria-label=\"confidence level\"\n                 class=\"example-margin\"\n                 [max]=\"1\"\n                 [min]=\".01\"\n                 [step]=\".01\"\n                 [thumb-label]=\"true\"\n                 [formControl]=\"confidenceCtrl\"\n                 [value]=\".5\">\n      </mat-slider>\n      <br>\n      <label>Activity</label>\n      <mat-radio-group>\n        <mat-radio-button value=\"1\">nM</mat-radio-button>\n        <mat-radio-button value=\"2\" [checked] = true >uM</mat-radio-button>\n        <mat-radio-button value=\"3\">mM</mat-radio-button>\n      </mat-radio-group>\n      <mat-slider matInput fxLayoutAlign=\"center center\"\n                 aria-label=\"activity level\"\n                 class=\"example-margin\"\n                 [max]=\"100\"\n                 [min]=\"0\"\n                 [step]=\"1\"\n                 [thumb-label]=\"true\"\n                 [formControl]=\"activityCtrl\"\n                 [value]=\"500\">\n      </mat-slider>\n\n      <!--\n      [mat-steps]='[1,2,3,4,5,6,7,8,9,10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]'\n-->\n\n      <br>\n      <label>Pattern Overlap</label>\n      <mat-slider matInput fxLayoutAlign=\"center center\"\n                 aria-label=\"pattern overlap\"\n                 class=\"example-margin\"\n                 [max]=\"1\"\n                 [min]=\"0\"\n                 [step]=\".01\"\n                 [thumb-label]=\"true\"\n                 [formControl]=\"similarityCtrl\"\n                 [value]=\"50\">\n      </mat-slider>\n      <br>\n\n    </div>\n  </div>\n  <div fxLayout=\"row\" fxLayoutAlign=\"center center\" >\n    <button mat-button color=\"primary\" [disabled]=\"!startNodes || !endNodes\" (click)=\"shortestPath()\">find shortest path<mat-icon>search</mat-icon><mat-icon>share</mat-icon></button>\n  </div>\n  </div>\n\n"

/***/ }),

/***/ "../../../../../src/app/smrtgraph-search/smrtgraph-search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmrtgraphSearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
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









var SmrtgraphSearchComponent = /** @class */ (function () {
    function SmrtgraphSearchComponent(searchService, messageService, nodeService, dataConnectionService, graphDataService, loadingService) {
        this.searchService = searchService;
        this.messageService = messageService;
        this.nodeService = nodeService;
        this.dataConnectionService = dataConnectionService;
        this.graphDataService = graphDataService;
        this.loadingService = loadingService;
        this.searchTerm$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["a" /* Subject */]();
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
        //todo: fix above description
        //todo: set all subscriptions to be variables to close on destroy
        this.dataConnectionService.messages.subscribe(function (msg) {
            var response = JSON.parse(msg);
            switch (response.type) {
                case "targetSearch": {
                    _this.autocompleteOptions.push(response.data);
                    break;
                }
                case "compoundSearch": {
                    _this.compoundAutocompleteOptions.push(response.data);
                    break;
                }
                case "startNodeSearch": {
                    _this.startUUIDList.push(response.data._fields[0].properties.uuid);
                    break;
                }
                case "endNodeSearch": {
                    _this.endUUIDList.push(response.data._fields[0].properties.uuid);
                    break;
                }
                case "counts": {
                    break;
                }
            }
        });
        this.graphDataService.graphhistory$.subscribe(function (res) {
            //todo: add validation rules: must have uniprot_id (for now)
            //todo: this is going to happen on any change, so i need to filter by response type
            res.nodes.filter(function (node) {
                var id = node.properties.uniprot_id;
                if (_this.startUUIDList.includes(node.uuid)) {
                    //todo: this doesn't clear the parameters, just passes them.
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
            _this.graphDataService.setFilter(true);
            _this.startUUIDList = [];
        });
        this.endNodesCtrl.valueChanges.subscribe(function (value) {
            _this.getEndNodes(value.trim().split(/[\s,;]+/));
            if (_this.startNodesCtrl.value) {
                _this.getStartNodes(_this.startNodesCtrl.value.trim().split(/[\s,;]+/));
            }
            _this.endNodes = true;
            _this.graphDataService.setFilter(true);
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
        /*
         * This provides an interface to handle the mapping of search input
         * it retrieves a query object from the service, returning the most recent input
         * this query is then passed on to the main data service
         * */
        this.searchService.search(this.searchTerm$)
            .subscribe(function (results) {
            //empty autocomplete options array, otherwise it will never change
            _this.autocompleteOptions = [];
            _this.compoundAutocompleteOptions = [];
            _this.dataConnectionService.messages.next(results);
        });
        // this.startNodesCtrl.setValue('P35968, P12931, P00533, AHLNGYPZYMUEFB-UHFFFAOYSA-N, HVTCKKMWZDDWOY-UHFFFAOYSA-O');
        this.startNodesCtrl.setValue('P35968, P12931, P00533, AHLNGYPZYMUEFB, HVTCKKMWZDDWOY');
        this.endNodesCtrl.setValue('P03372, P04035, P04150, P00519');
    };
    SmrtgraphSearchComponent.prototype.getStartNodes = function (values) {
        var _this = this;
        var query = this.messageService.getMessage(values, 'startNodeSearch');
        setTimeout(function () { return _this.dataConnectionService.messages.next(query); }, 0);
    };
    ;
    SmrtgraphSearchComponent.prototype.getEndNodes = function (values) {
        var _this = this;
        var query = this.messageService.getMessage(values, 'endNodeSearch');
        setTimeout(function () { return _this.dataConnectionService.messages.next(query); }, 0);
    };
    ;
    SmrtgraphSearchComponent.prototype.shortestPath = function () {
        // this.loadingService.toggleVisible(true);
        if (this.startNodesCtrl.value && this.endNodesCtrl.value) {
            var value = {
                start: this.startUUIDList,
                end: this.endUUIDList
            };
            var params = {
                distance: this.distanceCtrl.value || 5,
                confidence: this.confidenceCtrl.value,
                activity: this.activityCtrl.value,
                similarity: this.similarityCtrl.value,
            };
            var query = this.messageService.getMessage(value, "path", params);
            this.dataConnectionService.messages.next(query);
        }
    };
    SmrtgraphSearchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'smrtgraph-search',
            template: __webpack_require__("../../../../../src/app/smrtgraph-search/smrtgraph-search.component.html"),
            styles: [__webpack_require__("../../../../../src/app/smrtgraph-search/smrtgraph-search.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services_search_service__["a" /* SearchService */],
            __WEBPACK_IMPORTED_MODULE_5__services_message_service__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_7__d3_models_node_service__["a" /* NodeService */],
            __WEBPACK_IMPORTED_MODULE_3__services_data_connection_service__["a" /* DataConnectionService */],
            __WEBPACK_IMPORTED_MODULE_6__services_graph_data_service__["a" /* GraphDataService */],
            __WEBPACK_IMPORTED_MODULE_8__services_loading_service__["a" /* LoadingService */]])
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

module.exports = "<!-- sidenav content -->\n<div class=\"container\">\n  <h1>Settings</h1>\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\">\n<div fxFlex=\"95\">\n  <h3>Target Labels</h3>\n  <mat-radio-group class=\"vertical-group\" [formControl]=\"targetLabelCtrl\">\n  <mat-radio-button value=\"genes\" checked = 'true'>Gene name</mat-radio-button>\n  <mat-radio-button value=\"uniprot_id\">Uniprot ID</mat-radio-button>\n  <mat-radio-button value=\"fullname\">Full name</mat-radio-button>\n</mat-radio-group>\n</div>\n  </div>\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\">\n    <div fxFlex=\"95\">\n      <h3>Compound Labels</h3>\n      <mat-radio-group class=\"vertical-group\" [formControl]=\"compoundLabelCtrl\" >\n      <mat-radio-button value=\"hash\" checked = 'true'>InChI</mat-radio-button>\n  <mat-radio-button value=\"structure\">Structure</mat-radio-button>\n</mat-radio-group>\n  </div>\n  </div>\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\" >\n    <h3>Pattern Labels</h3><br/>\n    <div fxFlex=\"95\">\n  <mat-checkbox [value]=\"'structure'\" [formControl]=\"patternLabelCtrl\">Show Structures</mat-checkbox>\n    </div>\n  </div>\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\" >\n    <h3>Link Labels</h3><br/>\n    <div fxFlex=\"95\">\n  <mat-checkbox [formControl]=\"showLinkLabelCtrl\">Show Relationship Types</mat-checkbox>\n    </div>\n<!--<h2>Database Sources</h2>\n  <mat-checkbox>Check me!</mat-checkbox><br>\n  <mat-checkbox>Check me!</mat-checkbox><br>\n  <mat-checkbox>Check me!</mat-checkbox><br>\n  <mat-checkbox>Check me!</mat-checkbox><br>\n  <mat-checkbox>Check me!</mat-checkbox><br>\n\n<br>\n<mat-slide-toggle>Slide me!</mat-slide-toggle><br>\n<mat-slide-toggle>Slide me!</mat-slide-toggle><br>\n<mat-slide-toggle>Slide me!</mat-slide-toggle><br>\n<mat-slide-toggle>Slide me!</mat-slide-toggle><br>\n<mat-slide-toggle>Slide me!</mat-slide-toggle><br>\n<br>\n<br>\n<button mat-button routerLink=\"/products\">Products</button><br>\n<button mat-button routerLink=\"/dashboard\">Dashboard</button><br>-->\n  </div>\n</div>\n"

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



var SmrtgraphSettingsComponent = /** @class */ (function () {
    function SmrtgraphSettingsComponent(settingsService) {
        this.settingsService = settingsService;
        this.targetLabelCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.compoundLabelCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.patternLabelCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.showLinkLabelCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
    }
    SmrtgraphSettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.targetLabelCtrl.valueChanges.subscribe(function (value) { _this.settingsService.settings.targetLabel = value; _this.settingsService.dataChange.next(_this.settingsService.settings); });
        this.compoundLabelCtrl.valueChanges.subscribe(function (value) { _this.settingsService.settings.compoundLabel = value; _this.settingsService.dataChange.next(_this.settingsService.settings); });
        this.patternLabelCtrl.valueChanges.subscribe(function (value) {
            if (value == true) {
                _this.settingsService.settings.patternLabel = 'structure';
            }
            else {
                _this.settingsService.settings.patternLabel = value;
            }
            _this.settingsService.dataChange.next(_this.settingsService.settings);
        });
        this.showLinkLabelCtrl.valueChanges.subscribe(function (value) { _this.settingsService.settings.showLinkLabel = value; _this.settingsService.dataChange.next(_this.settingsService.settings); });
    };
    SmrtgraphSettingsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'smrtgraph-settings',
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

/***/ "../../../../../src/app/visuals/details/graph-details/graph-details.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<ng-container [ngSwitch]= hoveredObjType>\n  <div *ngSwitchCase=\"'node'\">\n    <node-details-visual></node-details-visual>\n  </div>\n  <div *ngSwitchCase=\"'link'\"><link-details-visual></link-details-visual></div>\n</ng-container>-->\n\n<ng-container>\n<!--\n    <link-details-visual></link-details-visual>\n-->\n</ng-container>\n"

/***/ }),

/***/ "../../../../../src/app/visuals/details/graph-details/graph-details.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphDetailsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
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



var GraphDetailsComponent = /** @class */ (function () {
    function GraphDetailsComponent(nodeService, linkService) {
        this.nodeService = nodeService;
        this.linkService = linkService;
    }
    GraphDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.nodeSubscription = this.nodeService.hoverednode$
            .subscribe(function (node) {
            _this.hoveredObjType = "node";
        });
        this.linkSubscription = this.linkService.hoveredlink$
            .subscribe(function (link) {
            _this.hoveredObjType = "link";
        });
    };
    GraphDetailsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-graph-details',
            template: __webpack_require__("../../../../../src/app/visuals/details/graph-details/graph-details.component.html"),
            styles: [__webpack_require__("../../../../../src/app/visuals/details/graph-details/graph-details.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__d3_models_node_service__["a" /* NodeService */],
            __WEBPACK_IMPORTED_MODULE_2__d3_models_link_service__["a" /* LinkService */]])
    ], GraphDetailsComponent);
    return GraphDetailsComponent;
}());



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

module.exports = "\n<div [ngSwitch]=\"link?.type\" *ngIf = \"node?.params\" (mouseenter)=\"node.params.hovered = true;\" (mouseleave)=\"node.params.hovered = false;\">\n  <div *ngSwitchCase=\"'TESTED_ON'\">\n    <target-detail-view [node]=\"link.target\"></target-detail-view>\n  </div>\n\n  <div    *ngSwitchCase=\"'REGULATES'\">\n    <target-detail-view [node]=\"link.target\"></target-detail-view>\n\n<!--\n    {{node.properties?.uniprot_id}} ({{node.properties?.name}})\n-->\n  </div>\n  <div    *ngSwitchCase=\"'PATTERN_OF'\"> <span *ngIf=\"link.properties.islargest\">maximal</span> pattern of: {{node.properties?.uniprot_id}}\n    ({{node.properties?.name}}) {{link.properties | json}}\n    <pattern-detail-view [node] = \"link.target\"></pattern-detail-view>\n  </div>\n  <div    *ngSwitchCase=\"'POTENT_PATTERN_OF'\">potent pattern of :\n  <target-detail-view [node]=\"link.target\"></target-detail-view>\n  </div>\n  <!--    <div    *ngSwitchCase=\"'REGULATES'\"></div>\n      <div    *ngSwitchCase=\"'REGULATES'\"></div>-->\n  <div *ngSwitchDefault> {{link.type}} {{link.properties}}</div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/visuals/details/link-details-visual/link-details-visual.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkDetailsVisualComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
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




var LinkDetailsVisualComponent = /** @class */ (function () {
    function LinkDetailsVisualComponent(linkService) {
        this.linkService = linkService;
    }
    LinkDetailsVisualComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.linkSubscription = this.linkService.hoveredlink$
            .subscribe(function (link) {
            _this.link = link;
            _this.node = link.target;
        });
        if (this.data) {
            this.link = this.data;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__d3_models_link__["a" /* Link */])
    ], LinkDetailsVisualComponent.prototype, "data", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__d3_models_node__["b" /* Node */])
    ], LinkDetailsVisualComponent.prototype, "node", void 0);
    LinkDetailsVisualComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'link-details-visual',
            template: __webpack_require__("../../../../../src/app/visuals/details/link-details-visual/link-details-visual.component.html"),
            styles: [__webpack_require__("../../../../../src/app/visuals/details/link-details-visual/link-details-visual.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__d3_models_link_service__["a" /* LinkService */]])
    ], LinkDetailsVisualComponent);
    return LinkDetailsVisualComponent;
}());



/***/ }),

/***/ "../../../../../src/app/visuals/details/link-list-visual/link-database.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LinkDatabase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkDataSource; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_cdk_collections__ = __webpack_require__("../../../cdk/esm5/collections.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators__ = __webpack_require__("../../../../rxjs/_esm5/operators/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_merge__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/merge.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__d3_models_node_service__ = __webpack_require__("../../../../../src/app/d3/models/node.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__d3_models_link_service__ = __webpack_require__("../../../../../src/app/d3/models/link.service.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/** An example database that the data source uses to retrieve data for the table. */
var LinkDatabase = /** @class */ (function () {
    function LinkDatabase(nodeService, linkService) {
        var _this = this;
        this.nodeService = nodeService;
        this.linkService = linkService;
        /** Stream that emits whenever the data has been modified. */
        this.dataChange = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["a" /* BehaviorSubject */]([]);
        this.nodeSubscription = this.nodeService.hoverednode$
            .subscribe(function (node) {
            _this.dataChange.next([]);
            _this.addSite(node.up);
            _this.addSite(node.down);
        });
        this.linkSubscription = this.linkService.hoveredlink$
            .subscribe(function (link) {
            _this.dataChange.next([]);
            _this.addSite([link]);
        });
    }
    Object.defineProperty(LinkDatabase.prototype, "data", {
        get: function () { return this.dataChange.value; },
        enumerable: true,
        configurable: true
    });
    /** Adds a new link to the database. */
    LinkDatabase.prototype.addSite = function (links) {
        var copiedData = this.data.slice();
        if (links.length > 0) {
            for (var _i = 0, links_1 = links; _i < links_1.length; _i++) {
                var link = links_1[_i];
                copiedData.push(link);
            }
        }
        this.dataChange.next(copiedData);
    };
    LinkDatabase = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__d3_models_node_service__["a" /* NodeService */],
            __WEBPACK_IMPORTED_MODULE_8__d3_models_link_service__["a" /* LinkService */]])
    ], LinkDatabase);
    return LinkDatabase;
}());

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, LinkDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
var LinkDataSource = /** @class */ (function (_super) {
    __extends(LinkDataSource, _super);
    function LinkDataSource(_linkDatabase, _sort) {
        var _this = _super.call(this) || this;
        _this._linkDatabase = _linkDatabase;
        _this._sort = _sort;
        return _this;
    }
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    LinkDataSource.prototype.connect = function () {
        var _this = this;
        var displayDataChanges = [
            this._linkDatabase.dataChange,
            this._sort.sortChange,
        ];
        /*    return Observable.merge(...displayDataChanges).map(() => {
              return this.getSortedData();
            }); */
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["a" /* Observable */].merge.apply(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["a" /* Observable */], displayDataChanges).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["d" /* map */])(function () {
            return _this.getSortedData();
        }));
    };
    LinkDataSource.prototype.disconnect = function () { };
    /** Returns a sorted copy of the database data. */
    LinkDataSource.prototype.getSortedData = function () {
        var _this = this;
        var data = this._linkDatabase.data.slice();
        if (!this._sort.active || this._sort.direction == '') {
            return data;
        }
        return data.sort(function (a, b) {
            var propertyA = '';
            var propertyB = '';
            switch (_this._sort.active) {
                /* case 'status': [propertyA, propertyB] = [a.status, b.status]; break;
                 case 'friendly_name': [propertyA, propertyB] = [a.friendly_name, b.friendly_name]; break;
                 case 'average_response_time': [propertyA, propertyB] = [a.average_response_time, b.average_response_time]; break;
                 case 'hour': [propertyA, propertyB] = [a.hour, b.hour]; break;*/
                case 'edgeType':
                    _a = [a.edgeType, b.edgeType], propertyA = _a[0], propertyB = _a[1];
                    break;
                case 'linkType':
                    _b = [a.type, b.type], propertyA = _b[0], propertyB = _b[1];
                    break;
            }
            var valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            var valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (valueA < valueB ? -1 : 1) * (_this._sort.direction == 'asc' ? 1 : -1);
            var _a, _b;
        });
    };
    LinkDataSource = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [LinkDatabase, __WEBPACK_IMPORTED_MODULE_2__angular_material__["m" /* MatSort */]])
    ], LinkDataSource);
    return LinkDataSource;
}(__WEBPACK_IMPORTED_MODULE_1__angular_cdk_collections__["a" /* DataSource */]));



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

module.exports = "\n<mat-table #table [dataSource]=\"dataSource\" matSort>\n\n  <!--- Note that these columns can be defined in any order.\n        The actual rendered columns are set as a property on the row definition\" -->\n  <ng-container matColumnDef=\"source\">\n    <mat-header-cell *matHeaderCellDef >Source</mat-header-cell>\n    <mat-cell *matCellDef=\"let row\"> <node-details-visual [data] = row.source></node-details-visual></mat-cell>\n  </ng-container>\n\n  <ng-container matColumnDef=\"linkType\">\n    <mat-header-cell *matHeaderCellDef mat-sort-header>Link Type </mat-header-cell>\n    <mat-cell *matCellDef=\"let row\"> {{row.type}}  </mat-cell>\n  </ng-container>\n\n  <ng-container matColumnDef=\"target\">\n    <mat-header-cell *matHeaderCellDef >Target</mat-header-cell>\n    <mat-cell *matCellDef=\"let row\"> <node-details-visual [data] = row.target></node-details-visual></mat-cell>\n  </ng-container>\n\n  <ng-container matColumnDef=\"details\">\n    <mat-header-cell *matHeaderCellDef mat-sort-header>Details</mat-header-cell>\n    <mat-cell *matCellDef=\"let row\">\n      <div *ngIf = 'row.reactions.length>0'>\n        <div *ngFor=\"let reaction of row.reactions trackById\">\n          <span *ngIf =\"reaction.mechanism\">{{reaction.mechanism}}</span>\n          <span *ngIf =\"reaction.mechanism && reaction.causal\">: </span><br>\n          <span *ngIf =\"reaction.causal\">{{reaction.causal}}</span><br>\n          <br />\n        </div>\n      </div>\n    </mat-cell>\n  </ng-container>\n\n  <ng-container matColumnDef=\"reference\">\n    <mat-header-cell *matHeaderCellDef>Reference</mat-header-cell>\n    <mat-cell *matCellDef=\"let row\">\n      <div *ngIf = 'row.reactions.length>0'><mat-list>\n      <mat-list-item *ngFor=\"let reaction of row.reactions trackById\">\n        <a href = \"https://www.ncbi.nlm.nih.gov/pubmed/{{reaction.reference.split(':')[1]}}\" target=\"_blank\">{{reaction.reference}}</a>\n      </mat-list-item>\n    </mat-list>\n    </div>\n    </mat-cell>\n  </ng-container>\n\n  <ng-container matColumnDef=\"score\">\n    <mat-header-cell *matHeaderCellDef>Score</mat-header-cell>\n    <mat-cell *matCellDef=\"let row\">\n      <div *ngIf = 'row.reactions.length>0'>\n        <mat-list>\n        <mat-list-item *ngFor=\"let reaction of row.reactions trackById\">\n          Confidence: {{reaction.confidence}}\n        </mat-list-item>\n      </mat-list>\n      </div>\n      <div *ngIf = ''></div>\n    </mat-cell>\n  </ng-container>\n\n  <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n  <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n</mat-table>\n\n"

/***/ }),

/***/ "../../../../../src/app/visuals/details/link-list-visual/link-list-visual.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkListVisualComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__link_database_service__ = __webpack_require__("../../../../../src/app/visuals/details/link-list-visual/link-database.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LinkListVisualComponent = /** @class */ (function () {
    function LinkListVisualComponent(linkDatabase) {
        this.linkDatabase = linkDatabase;
        this.displayedColumns = ['source', 'linkType', 'target', 'details', 'reference', 'score'];
    }
    LinkListVisualComponent.prototype.ngOnInit = function () {
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_2__link_database_service__["a" /* LinkDataSource */](this.linkDatabase, this.sort);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__link_database_service__["b" /* LinkDatabase */]])
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

var ReactionVisualComponent = /** @class */ (function () {
    function ReactionVisualComponent() {
    }
    ReactionVisualComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('data'),
        __metadata("design:type", Array)
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

module.exports = "<div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\">\n  <div fxFlex=\"92\">\n    <div [ngSwitch]=nodeType>\n        <target-detail-view *ngSwitchCase=\"'Target'\"  [node]=\"hoveredNode.node\" [upstreamLinks]=\"hoveredNode.up\" [downstreamLinks]=\"hoveredNode.down\"></target-detail-view>\n        <compound-detail-view *ngSwitchCase=\"'Compound'\" [node]=\"hoveredNode.node\" [upstreamLinks]=\"hoveredNode.up\" [downstreamLinks]=\"hoveredNode.down\"></compound-detail-view>\n        <pattern-detail-view *ngSwitchCase=\"'Pattern'\"  [node]=\"hoveredNode.node\" [upstreamLinks]=\"hoveredNode.up\" [downstreamLinks]=\"hoveredNode.down\"></pattern-detail-view>\n      <div *ngSwitchDefault></div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/visuals/details/node-details-visual/node-details-visual.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeDetailsVisualComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__d3_models_node__ = __webpack_require__("../../../../../src/app/d3/models/node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__d3_models_node_service__ = __webpack_require__("../../../../../src/app/d3/models/node.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NodeDetailsVisualComponent = /** @class */ (function () {
    function NodeDetailsVisualComponent(nodeService) {
        this.nodeService = nodeService;
    }
    NodeDetailsVisualComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.nodeService.hoverednode$
            .subscribe(function (node) {
            _this.hoveredNode = node;
            _this.getNodeType();
        });
        if (this.data) {
            this.hoveredNode = { node: this.data };
            this.getNodeType();
        }
    };
    NodeDetailsVisualComponent.prototype.getNodeType = function () {
        if (this.hoveredNode) {
            this.nodeType = this.hoveredNode.node.constructor.name;
        }
    };
    NodeDetailsVisualComponent.prototype.ngOnChanges = function (changes) {
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

module.exports = "<div class=\"container smrt-card\">\n  <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxLayoutGap=\"10px\" class = \"main-row\">\n    <div fxFlex=\"15\">\n      <img class=\"compound-avatar\">\n    </div>\n    <div fxFlex=\"85\">\n      <h2>Compound</h2>\n    </div>\n  </div>\n\n    <h3 class=\"smiles\">Smiles: {{node?.smiles}}</h3>\n    <img [src] = node?.imageUrl>\n    <mat-list>\n      <mat-list-item>InChI Key: {{node?.hash}}</mat-list-item>\n      <mat-list-item>Non stereo hash: {{node?.nostereo_hash}}</mat-list-item>\n      <mat-list-item>Compound Id: {{node?.compoundId}}</mat-list-item>\n    </mat-list>\n</div>\n"

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


var CompoundDetailViewComponent = /** @class */ (function () {
    function CompoundDetailViewComponent() {
    }
    CompoundDetailViewComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__d3_models_node__["a" /* Compound */])
    ], CompoundDetailViewComponent.prototype, "node", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], CompoundDetailViewComponent.prototype, "downstreamLinks", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], CompoundDetailViewComponent.prototype, "upstreamLinks", void 0);
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

module.exports = "\n<div class=\"container smrt-card\">\n  <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxLayoutGap=\"10px\" class = \"main-row\">\n    <div fxFlex=\"15\">\n      <img class=\"pattern-avatar\">\n    </div>\n    <div fxFlex=\"85\">\n      <h2>Pattern</h2>\n    </div>\n  </div>\n  <div fxLayoutWrap=\"row\">\n    <h3 class=\"smiles\">Smiles: {{node.smiles}}</h3>\n    <img [src] = node?.imageUrl>\n    <mat-list>\n      <mat-list-item>InChI Key: {{node.hash}}</mat-list-item>\n      <mat-list-item>Pattern Type: {{node.pattern_type}}</mat-list-item>\n      <mat-list-item>Pattern Id: {{node.pattern_id}}</mat-list-item>\n    </mat-list>\n  </div>\n</div>\n\n"

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


var PatternDetailViewComponent = /** @class */ (function () {
    function PatternDetailViewComponent() {
    }
    PatternDetailViewComponent.prototype.ngOnInit = function () {
        this.getSmiles();
    };
    PatternDetailViewComponent.prototype.getSmiles = function () {
        if (this.node.smiles) {
            this.nodeSmiles = 'https://tripod.nih.gov/servlet/renderServletv12/?structure=' + this.parseSmiles(this.node.smiles) + '&standardize=true&format=svg';
        }
    };
    PatternDetailViewComponent.prototype.parseSmiles = function (smiles) {
        var parsed = smiles
            .replace(/[;]/g, '%3B')
            .replace(/[#]/g, '%23')
            .replace(/[+]/g, '%2B')
            .replace(/[\\]/g, '%5C')
            .replace(/[|]/g, '%7C');
        return parsed;
    };
    PatternDetailViewComponent.prototype.ngOnChanges = function (changes) {
        this.getSmiles();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__d3_models_node__["c" /* Pattern */])
    ], PatternDetailViewComponent.prototype, "node", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], PatternDetailViewComponent.prototype, "downstreamLinks", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], PatternDetailViewComponent.prototype, "upstreamLinks", void 0);
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


var TargetDetailViewComponent = /** @class */ (function () {
    function TargetDetailViewComponent() {
    }
    TargetDetailViewComponent.prototype.ngOnInit = function () {
        // this.uniprotUrl = "https://www.ebi.ac.uk/chembl/target/inspect/" + data.node.uniprot_id;
    };
    TargetDetailViewComponent.prototype.ngOnChanges = function (changes) {
        // this.uniprotUrl = "https://www.ebi.ac.uk/chembl/target/inspect/" + data.node.uniprot_id;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__d3_models_node__["d" /* Target */])
    ], TargetDetailViewComponent.prototype, "node", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], TargetDetailViewComponent.prototype, "downstreamLinks", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], TargetDetailViewComponent.prototype, "upstreamLinks", void 0);
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
exports.push([module.i, "", ""]);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3__ = __webpack_require__("../../../../d3/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_graph_data_service__ = __webpack_require__("../../../../../src/app/services/graph-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__download_button_download_button_component__ = __webpack_require__("../../../../../src/app/download-button/download-button.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GraphComponent = /** @class */ (function () {
    function GraphComponent(d3Service, ref, el, graphDataService) {
        this.d3Service = d3Service;
        this.ref = ref;
        this.el = el;
        this.graphDataService = graphDataService;
        this.nodes = [];
        this.links = [];
        this._options = { width: 800, height: 600 };
    }
    GraphComponent.prototype.onResize = function (event) {
        this.graph.initSimulation(this.options);
    };
    GraphComponent.prototype.ngOnInit = function () {
        var _this = this;
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
    GraphComponent.prototype.downloadGraph = function () {
        this.downloader.downloadFile(__WEBPACK_IMPORTED_MODULE_2_d3__["j" /* select */]('svg'), this.options);
    };
    Object.defineProperty(GraphComponent.prototype, "options", {
        get: function () {
            return this._options = {
                width: this.el.nativeElement.parentElement.offsetWidth,
                height: window.innerHeight * .8
                // height: window.innerHeight-(window.outerHeight-window.innerHeight)
            };
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4__download_button_download_button_component__["a" /* DownloadButtonComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__download_button_download_button_component__["a" /* DownloadButtonComponent */])
    ], GraphComponent.prototype, "downloader", void 0);
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
            template: "\n    <svg #svg [attr.width]=\"_options.width\" [attr.height]=\"_options.height\">\n      <g [zoomableOf]=\"svg\" [draggableInGraph]=\"graph\">\n        <g [linkVisual]=\"link\" [hoverableLink]=\"link\" *ngFor=\"let link of links\"></g>\n        <g [nodeVisual]=\"node\" *ngFor=\"let node of nodes\" [hoverableNode]=\"node\" \n        [clickableNode]=\"node\" [draggableNode]=\"node\" [draggableInGraph]=\"graph\">\n        </g>\n        <svg:g menu-list #menu></svg:g>\n      </g>\n        <defs>\n          <marker id=\"arrow\" viewBox=\"0 -5 10 10\" refX= '8.75' refY = '0' markerWidth=\"8\" markerHeight =\"8\" orient=\"auto\">\n            <path fill = \"#A5A5A5\" stroke =\"#A5A5A5\" d = \"M0,-5L10,0L0,5\"></path>\n          </marker>\n          <marker id=\"hoverarrow\" viewBox=\"0 -5 10 10\" refX= '8.75' refY = '0' markerWidth=\"8\" markerHeight =\"8\" orient=\"auto\">\n            <path fill = \"#595959\" stroke =\"#595959\" d = \"M0,-5L10,0L0,5\"></path>\n          </marker>\n          <marker id=\"flatarrow\" viewBox=\"0 -5 10 10\" refX= '8.75' refY = '0' markerWidth=\"8\" markerHeight =\"8\" orient=\"auto\">\n            <path fill = \"#A5A5A5\" stroke =\"#A5A5A5\" stroke-width=\"3\" d = \"M 8,-8 L 8, 8\"></path>\n          </marker> \n          <marker id=\"hoverflatarrow\" viewBox=\"0 -5 10 10\" refX= '8.75' refY = '0' markerWidth=\"8\" markerHeight =\"8\" orient=\"auto\">\n            <path fill = \"#595959\" stroke =\"#595959\" stroke-width=\"3\" d = \"M 8,-8 L 8, 8\"></path>\n          </marker>\n        </defs>\n    </svg>\n<!--\n          <download-button (click)=\" downloadGraph()\"></download-button>\n-->\n  ",
            styles: [__webpack_require__("../../../../../src/app/visuals/graph/graph.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__d3_d3_service__["a" /* D3Service */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */],
            __WEBPACK_IMPORTED_MODULE_3__services_graph_data_service__["a" /* GraphDataService */]])
    ], GraphComponent);
    return GraphComponent;
}());



/***/ }),

/***/ "../../../../../src/app/visuals/shared/link-visual/link-visual.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".link {\n    stroke-width: .75;\n  stroke: #A5A5A5;\n}\n\n.arrow {\n  stroke-width: 2;\n  stroke: #A5A5A5;\n  fill: #A5A5A5;\n  marker-end: url(#arrow);\n}\n\n.flatarrow {\n  stroke-width: 2;\n  stroke: #A5A5A5;\n  fill: #A5A5A5;\n  marker-end: url(#flatarrow);\n}\n\n.link-name {\n  font-family: 'Lato';\n  font-weight: 300;\n  color: #000000;\n}\n\n.link-node{\n  stroke: red;\n}\n\n.connected{\n  stroke-width: 2;\n  stroke: #595959;\n  marker-end: url(#hoverarrow);\n}\n\n.connectedflat{\n  stroke-width: 2;\n  stroke: #595959;\n  marker-end: url(#hoverflatarrow);\n}\n\n .maximal{\n  stroke-width: 2;\n  stroke: red;\n}\n\n\n.hovering {\n  stroke: #000;\n  stroke-width: 2px;\n}\n\n/*#arrow{\n  stroke-width: 2;\n  stroke: #A5A5A5;\n}*/\n", ""]);

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



var LinkVisualComponent = /** @class */ (function () {
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
        // this.source = link.source;
        //  this.target = link.target;
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
            template: "\n <svg:g>  \n        <svg:line class=\"link\"\n        [ngClass]=\"{arrow: link.edgeType != 'up', flatarrow: link.edgeType == 'up'}\"\n    [attr.x1]=\"endpointLessRadius(link, 'x1') || 0\"\n    [attr.y1]=\"endpointLessRadius(link, 'y1') || 0\"\n    [attr.x2]=\"endpointLessRadius(link, 'x2') || 0\"\n    [attr.y2]=\"endpointLessRadius(link, 'y2') || 0\" \n></svg:line>\n    <svg:text class=\"link-name\" *ngIf=\"showLinkLabel\"\n        [attr.font-size]= 10\n        [attr.x]=\"(link.source?.x +link.target?.x)/2 \"\n        [attr.y]=\"(link.source?.y +link.target?.y)/2 \"\n        >\n        {{link?.type }}\n      </svg:text>\n      </svg:g>\n  ",
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
exports.push([module.i, ".node-menu{\n  background-color: rgb(250, 250, 250);\n  /*\n  position: fixed;\n  */\n}\n\n.expand-list{\n  position: inherit;\n  z-index: 66666666;\n}\n", ""]);

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var NodeMenuComponent = /** @class */ (function () {
    function NodeMenuComponent(nodeService, dataConnectionService, messageService, nodeMenuController, graphDataService, settingsService) {
        this.nodeService = nodeService;
        this.dataConnectionService = dataConnectionService;
        this.messageService = messageService;
        this.nodeMenuController = nodeMenuController;
        this.graphDataService = graphDataService;
        this.settingsService = settingsService;
        this.clickedNode = { x: 0, y: 0, params: { menu: false } };
        this.counts = { total: 0 };
        /*   this.settings = this.settingsService.dataChange.getValue();
           console.log(this.settings);*/
    }
    NodeMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this only gets the count of the nodes
        this.nodeService.clickednode$.subscribe(function (node) {
            _this.clickedNode = node;
            if (_this.clickedNode.id) {
                _this.counts = { total: 0 };
                var message = _this.messageService.getMessage(_this.clickedNode.id, "counts", _this.clickedNode.labels[0]);
                _this.dataConnectionService.messages.next(message);
            }
            _this.setLabel();
        });
        this.dataConnectionService.messages.subscribe(function (msg) {
            var response = JSON.parse(msg);
            if (_this.clickedNode.id && response.type == "counts") {
                _this.counts[response.data._fields[0][0].toLowerCase()] = response.data._fields[1].low;
                _this.counts.total = _this.counts.total + response.data._fields[1].low;
            }
        });
        this.nodeMenuController.clickedmenu$.subscribe(function (res) {
            _this.clickedNode.params.menu = res;
        });
        this.settingsService.dataChange.subscribe(function (settings) {
            _this.settings = settings;
            _this.setLabel();
        });
    };
    NodeMenuComponent.prototype.expand = function (label) {
        var params = {
            "origin": this.clickedNode.labels[0],
            "target": label
        };
        this.graphDataService.nodeExpand(this.clickedNode.id, params);
        //todo: this option is not node specific -- change to map
        this.clickedNode.expanded[label.toLowerCase()] = true;
        this.nodeMenuController.toggleVisible(false);
        this.clickedNode.params.menu = false;
    };
    NodeMenuComponent.prototype.collapse = function (label) {
        this.graphDataService.nodeCollapse(this.clickedNode, { event: label, node: this.clickedNode.id });
        //todo: this option is not node specific -- change to map
        this.clickedNode.expanded[label.toLowerCase()] = false;
        this.nodeMenuController.toggleVisible(false);
        this.clickedNode.params.menu = false;
    };
    NodeMenuComponent.prototype.setLabel = function () {
        switch (this.clickedNode.constructor.name) {
            case 'Target': {
                this.label = this.clickedNode[this.settings.targetLabel];
                break;
            }
            case 'Compound': {
                if (this.settings.compoundLabel == 'structure') {
                    this.label = this.settings.compoundLabel;
                }
                else {
                    this.label = this.clickedNode.properties.hash;
                }
                break;
            }
            case 'Pattern': {
                this.label = this.settings.patternLabel;
                break;
            }
        }
    };
    NodeMenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: '[menu-list]',
            template: "\n<svg:foreignObject class=\"node-menu\" [attr.x]=\"clickedNode.x\" [attr.y]=\"clickedNode.y\" width=\"20vh\" height=\"30vh\" *ngIf=\"clickedNode.params.menu\" >\n <xhtml:div xmlns=\"http://www.w3.org/1999/xhtml\">\n  <mat-list>\n    <button mat-menu-item class = \"expand-list\" fxLayoutAlign=\"end center\"><span (click)=\"nodeMenuController.toggleVisible(false)\"><mat-icon>clear</mat-icon></span></button>\n    <button mat-menu-item class = \"expand-list\" [disabled]=\"true\"><b>{{label}}</b></button>\n    <button mat-menu-item class = \"expand-list\" *ngIf=\"!clickedNode.expanded.target\" (click)=\"expand('Target')\" [disabled]=\"!counts.target\">Expand Targets {{counts?.target}}</button>\n    <button mat-menu-item class = \"expand-list\" *ngIf=\"clickedNode.expanded.target\" (click)=\"collapse('Target')\" [disabled]=\"!counts.target\">Collapse Targets {{counts?.target}}</button>\n    <button mat-menu-item class = \"expand-list\"  *ngIf=\"!clickedNode.expanded.compound\" (click)=\"expand('Compound')\" [disabled]=\"!counts.compound\">Expand Compounds {{counts?.compound}}</button>\n    <button mat-menu-item class = \"expand-list\" *ngIf=\"clickedNode.expanded.compound\" (click)=\"collapse('Compound')\" [disabled]=\"!counts.compound\">Collapse Compounds {{counts?.compound}}</button>\n    <button mat-menu-item class = \"expand-list\" *ngIf=\"!clickedNode.expanded.pattern\" (click)=\"expand('Pattern')\" [disabled]=\"!counts.pattern\">Expand Patterns {{counts?.pattern}}</button>\n    <button mat-menu-item class = \"expand-list\" *ngIf=\"clickedNode.expanded.pattern\" (click)=\"collapse('Pattern')\" [disabled]=\"!counts.pattern\">Collapse Patterns {{counts?.pattern}}</button>\n    <button mat-menu-item class = \"expand-list\" (click)=\"expand('All')\">Expand All {{counts?.total}}</button>\n<!--\n//todo: collapse all show/hide logic\n <button mat-menu-item (click)=\"collapse('All')\">Collapse All</button>\n-->\n  </mat-list>\n</xhtml:div>\n</svg:foreignObject>\n",
            styles: [__webpack_require__("../../../../../src/app/visuals/shared/node-menu/node-menu.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__d3_models_node_service__["a" /* NodeService */],
            __WEBPACK_IMPORTED_MODULE_3__services_data_connection_service__["a" /* DataConnectionService */],
            __WEBPACK_IMPORTED_MODULE_2__services_message_service__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_4__services_node_menu_controller_service__["a" /* NodeMenuControllerService */],
            __WEBPACK_IMPORTED_MODULE_5__services_graph_data_service__["a" /* GraphDataService */],
            __WEBPACK_IMPORTED_MODULE_6__services_settings_service__["a" /* SettingsService */]])
    ], NodeMenuComponent);
    return NodeMenuComponent;
}());



/***/ }),

/***/ "../../../../../src/app/visuals/shared/node-visual/node-visual.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".node {\n    cursor: pointer;\n    transition: stroke-width 0.1s ease-out,\n        fill 0.1s ease-out,\n        stroke 0.1s ease-out;\n  pointer-events: all;\n}\n\n.node-name {\n  font-family: 'Lato';\n  text-anchor: middle;\n  alignment-baseline: central;\n  font-weight: 300;\n  /*color: #000000;*/\n  pointer-events: all;\n}\n\n.hovering {\n  stroke: #000;\n  stroke-width: 2px;\n}\n\n\n.clicked {\n  stroke: #e64a19;\n  stroke-width: 2px;\n}\n\n.node {\n  diameter: 50px;\n  color: #A5ABB6;\n  border-color: #9AA1AC;\n  border-width: 2px;\n  text-color-internal: #FFFFFF;\n  font-size: 8px;\n  z-index: 666;\n}\n\n.relationship {\n  color: #A5ABB6;\n  shaft-width: 1px;\n  font-size: 8px;\n  padding: 3px;\n  /*text-color-external: #000000;*/\n  /*text-color-internal: #FFFFFF;*/\n  caption: '<type>';\n}\n\ncircle.node.Target.startNode {\n  fill: #ff8a50;\n}\n\ncircle.node.Target.endNode {\n  fill: #c41c00;\n}\n\n/*\nhttp://paletton.com/#uid=40R0u0krKw0hhHhmv-HvKrezxln\n*/\n\n.Target {\n  fill: #ff5722;\n}\n\ncircle.node.Compound {\n  fill: #1E71A2;\n}\n\ncircle.node.Pattern {\n  fill: #FF9C22;\n}\n\n.connected{\n  stroke-width: 1;\n  stroke: #595959;\n}\n\n.maximal{\n  stroke-width: 2;\n  stroke: #e64a19;\n}\n\n.label--top {\n  text-anchor: middle;\n}\n\n.label--right {\n  text-anchor: start;\n}\n\n.label--bottom {\n  text-anchor: middle;\n}\n\n.label--left {\n  text-anchor: end;\n}\n\n.structureImage.Compound{\n  max-width: 7vh;\n  border: #1E71A2 1px solid;\n  border-radius: 50%;\n}\n\n.structureImage.Pattern{\n  max-width: 7vh;\n  border: #FF9C22 1px solid;\n  border-radius: 50%;\n}\n", ""]);

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StructureViewer = /** @class */ (function () {
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

var NodeVisualComponent = /** @class */ (function () {
    function NodeVisualComponent(settingsService) {
        this.settingsService = settingsService;
    }
    NodeVisualComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settingsService.dataChange
            .subscribe(function (settings) {
            switch (_this.node.constructor.name) {
                case 'Target': {
                    _this.label = _this.node[settings.targetLabel];
                    break;
                }
                case 'Compound': {
                    /*
                     this.label = this.settingsService.settings.compoundLabel;
                     */ if (settings.compoundLabel == 'structure') {
                        _this.label = settings.compoundLabel;
                    }
                    else {
                        _this.label = _this.node.properties.hash;
                    }
                    break;
                }
                case 'Pattern': {
                    _this.label = settings.patternLabel ? settings.patternLabel : "";
                    break;
                }
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('nodeVisual'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__d3_models_node__["b" /* Node */])
    ], NodeVisualComponent.prototype, "node", void 0);
    NodeVisualComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: '[nodeVisual]',
            template: "\n    <svg:g [attr.transform]=\"'translate(' + node.x + ',' + node.y + ')'\"  *ngIf=\"label !='structure'\">\n      <svg:circle\n          class=\"node {{node.labels[0]}}\"\n          [ngClass]=\"{startNode: node.params.startNode, endNode: node.params.endNode, hovering:node.params.hovered}\"\n          cx=\"0\"\n          cy=\"0\"\n          [attr.r]=\"node.r\">\n      </svg:circle>\n       <svg:text>{{label}}</svg:text>\n       </svg:g>\n        <svg:foreignObject width='7vh' height='7vh' *ngIf=\"label ==='structure'\" [attr.x]=\"node.x - (node.r+.5*node.r)\" [attr.y]=\"node.y -(node.r+.5*node.r)\">\n <xhtml:div xmlns=\"http://www.w3.org/1999/xhtml\">\n    <structure-view [data]=\"node\"></structure-view>\n</xhtml:div>\n      </svg:foreignObject>\n\n  ",
            styles: [__webpack_require__("../../../../../src/app/visuals/shared/node-visual/node-visual.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_settings_service__["a" /* SettingsService */]])
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


var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MatButtonModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MatAutocompleteModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MatMenuModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["p" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MatInputModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatIconModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatListModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["l" /* MatSliderModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatProgressSpinnerModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["o" /* MatTableModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["n" /* MatSortModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MatSidenavModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MatSlideToggleModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MatRadioModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatCheckboxModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MatButtonModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MatAutocompleteModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MatMenuModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["p" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MatInputModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatIconModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatListModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["l" /* MatSliderModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatProgressSpinnerModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["o" /* MatTableModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["n" /* MatSortModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MatSidenavModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MatSlideToggleModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MatRadioModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatCheckboxModule */]],
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