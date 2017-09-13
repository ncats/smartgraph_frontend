"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var app_config_1 = require("../../app.config");
var Node = (function () {
    function Node(id, properties, labels, linkCount) {
        var _this = this;
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.linkCount = 0;
        this.hovered = false;
        this.normal = function () {
            return Math.sqrt(_this.linkCount / app_config_1.default.N);
        };
        // this.id = uuid.v4();
        this.id = id;
        this.properties = properties;
        this.labels = labels;
        this.linkCount = linkCount || 0;
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
            var index = Math.floor(app_config_1.default.SPECTRUM.length * this.normal());
            return app_config_1.default.SPECTRUM[index];
        },
        enumerable: true,
        configurable: true
    });
    return Node;
}());
exports.Node = Node;
var Target = (function (_super) {
    __extends(Target, _super);
    function Target(obj) {
        var _this = _super.call(this, obj.id, obj.properties, obj.labels, obj.linkCount) || this;
        _this.pref_name = obj.pref_name;
        _this.species_group_flag = obj.species_group_flag;
        return _this;
    }
    return Target;
}(Node));
exports.Target = Target;
var Pattern = (function (_super) {
    __extends(Pattern, _super);
    function Pattern(obj) {
        var _this = _super.call(this, obj.id, obj.properties, obj.labels, obj.linkCount) || this;
        _this.ring_nr = obj.ring_nr;
        _this.smiles = obj.smiles;
        return _this;
    }
    return Pattern;
}(Node));
exports.Pattern = Pattern;
var Lychi = (function (_super) {
    __extends(Lychi, _super);
    function Lychi(obj) {
        var _this = _super.call(this, obj.id, obj.properties, obj.labels, obj.linkCount) || this;
        _this.canonical_smiles = obj.canonical_smiles;
        _this.lychi = obj.lychi;
        return _this;
    }
    return Lychi;
}(Node));
exports.Lychi = Lychi;
