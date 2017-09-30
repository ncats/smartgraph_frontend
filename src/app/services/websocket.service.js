"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var WebSocketService = (function () {
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
        var observable = Observable_1.Observable.create(function (obs) {
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
        return Subject_1.Subject.create(observer, observable);
    };
    return WebSocketService;
}()); // end class WebSocketService
WebSocketService = __decorate([
    core_1.Injectable()
], WebSocketService);
exports.WebSocketService = WebSocketService;
