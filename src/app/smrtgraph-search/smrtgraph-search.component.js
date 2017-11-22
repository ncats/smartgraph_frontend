"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var SmrtgraphSearchComponent = (function () {
    function SmrtgraphSearchComponent(searchService, messageService, dataConnectionService, graphDataService) {
        this.searchService = searchService;
        this.messageService = messageService;
        this.dataConnectionService = dataConnectionService;
        this.graphDataService = graphDataService;
        this.searchTerm$ = new rxjs_1.Subject();
        this.autocompleteOptions = [];
        this.lychiAutocompleteOptions = [];
        this.startNodes = false;
        this.endNodes = false;
        this.startNodesCtrl = new forms_1.FormControl();
        this.endNodesCtrl = new forms_1.FormControl();
        this.distanceCtrl = new forms_1.FormControl();
        this.confidenceCtrl = new forms_1.FormControl();
    }
    SmrtgraphSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        // todo: fix above description
        // todo: set all subscriptions to be variable to close on destroy
        this.dataConnectionService.messages.subscribe(function (msg) {
            // console.log(msg);
            var response = JSON.parse(msg);
            //  console.log(response);
            switch (response.type) {
                case "targetSearch": {
                    _this.autocompleteOptions.push(response.data);
                    break;
                }
                case "lychiSearch": {
                    _this.lychiAutocompleteOptions.push(response.data);
                    break;
                }
                case "counts": {
                    break;
                }
            }
        });
        this.startNodesCtrl.valueChanges.subscribe(function (value) {
            var valArr = value.split(/[\s,;]+/);
            if (!_this.endNodes) {
                _this.graphDataService.clearGraph();
            }
            var query = _this.messageService.getMessage(valArr, 'targets');
            _this.dataConnectionService.messages.next(query);
            _this.startNodes = true;
            _this.graphDataService.graphhistory$.subscribe(function (res) {
                res.nodes.filter(function (node) {
                    var id = node.uuid;
                    if (valArr.includes(id)) {
                        node.params.startNode = true;
                    }
                });
            });
        });
        this.endNodesCtrl.valueChanges.subscribe(function (value) {
            var valArr = value.split(/[\s,;]+/);
            if (!_this.startNodes) {
                _this.graphDataService.clearGraph();
            }
            var query = _this.messageService.getMessage(valArr, 'targets');
            _this.dataConnectionService.messages.next(query);
            _this.endNodes = true;
            _this.graphDataService.graphhistory$.subscribe(function (res) {
                res.nodes.filter(function (node) {
                    var id = node.uuid;
                    if (valArr.includes(id)) {
                        node.params.endNode = true;
                    }
                });
            });
        });
        this.distanceCtrl.valueChanges.subscribe(function (value) {
            // console.log(value);
            _this.shortestPath();
        });
        /* this.patternCtrl.valueChanges.subscribe(value => {
           console.log([value]);
           // forces selected option
           // todo: this doesn't seem very efficient
           if(value.value){
             this.onEnter("lychi");
           }else {
             if (value != '') {
               // empty autocomplete options array, otherwise it will never change
               // this.lychiAutocompleteOptions = [];

               //  this.searchTerm$.next({term: value.replace(/\(/gi, "\\(").replace(/\)/gi, "\\)").replace(/\[/gi, "\\[").replace(/\]/gi, "\\]"), type: "patternSearch"});
             //   this.searchTerm$.next({term: value, type: "lychiSearch"});
             }
           }
         });*/
        /*
         * This provides an interface to handle the mapping of search input
         * it retrieves a query object from the service, returning the most recent input
         * this query is then passed on to the main data service
         * */
        this.searchService.search(this.searchTerm$)
            .subscribe(function (results) {
            // empty autocomplete options array, otherwise it will never change
            _this.autocompleteOptions = [];
            _this.lychiAutocompleteOptions = [];
            console.log(results);
            _this.dataConnectionService.messages.next(results);
        });
    };
    /* onEnter(type: string) {
       let value: string;
       switch(type){
         case"target":{
           this.targetSelected = true;
           value = this.targetCtrl.value.value;
           break;
         }
         case"lychi":{
           this.patternSelected = true;
           console.log(this.patternCtrl.value);
           value = this.patternCtrl.value.display;
           break;
         }
       }
       this.graphDataService.clearGraph();
       let query: Message = this.messageService.getMessage(value, type);
       console.log(query);
     //   this.dataConnectionService.messages.next(query);
     }*/
    SmrtgraphSearchComponent.prototype.shortestPath = function () {
        console.log(this);
        if (this.startNodesCtrl.value && this.endNodesCtrl.value) {
            var value = {
                start: this.startNodesCtrl.value.split(/[\s,;]+/),
                end: this.endNodesCtrl.value.split(/[\s,;]+/)
            };
            var params = {
                distance: this.distanceCtrl.value || 5,
                confidence: this.confidenceCtrl.value || 50
            };
            /*      console.log(value);
                  console.log(params);*/
            //  this.graphDataService.clearGraph();
            var query = this.messageService.getMessage(value, "path", params);
            //    console.log(query);
            this.dataConnectionService.messages.next(query);
        }
    };
    return SmrtgraphSearchComponent;
}());
SmrtgraphSearchComponent = __decorate([
    core_1.Component({
        selector: 'smrtgraph-search',
        templateUrl: './smrtgraph-search.component.html',
        styleUrls: ['./smrtgraph-search.component.css']
    })
], SmrtgraphSearchComponent);
exports.SmrtgraphSearchComponent = SmrtgraphSearchComponent;
