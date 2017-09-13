"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid = require("uuid");
var Link = (function () {
    function Link(source, target, type, properties, id) {
        this.source = source;
        this.target = target;
        this.type = type || "";
        this.properties = properties;
        this.uuid = uuid.v4();
        this.id = id;
    }
    return Link;
}());
exports.Link = Link;
