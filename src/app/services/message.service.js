"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MessageService = (function () {
    function MessageService() {
    }
    MessageService.prototype.getMessage = function (term, type, properties) {
        var msg;
        var params;
        switch (type) {
            case "targetSearch":
                {
                    msg = 'MATCH (n:Target) WHERE n.pref_name=~{qParam2} OR n.chembl_id =~{qParam2} RETURN n.pref_name, n.chembl_id ORDER BY n.pref_name LIMIT 100 UNION MATCH (n:Target) WHERE n.pref_name=~{qParam} OR n.chembl_id =~{qParam} RETURN n.pref_name, n.chembl_id ORDER BY n.pref_name LIMIT 100';
                    // msg = 'MATCH (n:Target) WHERE n.pref_name=~{qParam2} RETURN n.pref_name, n.chembl_id ORDER BY n.pref_name LIMIT 100';
                    params = { qParam2: '(?i)' + term + '.*', qParam: '(?i).*' + term + '.*' };
                    break;
                }
            case "patternSearch":
                {
                    //msg = 'MATCH (n:Pattern) WHERE n.smiles=~{qParam} RETURN n.smiles, n.pid ORDER BY n.smiles LIMIT 50';
                    msg = 'MATCH (n:Lychi) WHERE n.lychi=~{qParam} RETURN n.lychi, n.pid ORDER BY n.lychi LIMIT 50';
                    params = { qParam: term + '.*' };
                    break;
                }
            case "lychiSearch":
                {
                    //msg = 'MATCH (n:Pattern) WHERE n.smiles=~{qParam} RETURN n.smiles, n.pid ORDER BY n.smiles LIMIT 50';
                    msg = 'MATCH (n:Lychi) WHERE n.lychi=~{qParam} RETURN n.lychi, n.lid ORDER BY n.lychi LIMIT 50';
                    params = { qParam: term + '.*' };
                    break;
                }
            case "expand":
                switch (properties) {
                    //todo: switch to parameterized  constraints for 'n'
                    case "Target": {
                        msg = 'MATCH (n) WHERE id (n) = {qParam} MATCH (n)-[r]-(b:Target) RETURN n, r, b LIMIT 100';
                        break;
                    }
                    case "Compound": {
                        msg = 'MATCH (n) WHERE id (n) = {qParam} MATCH (n)-[r]-(b:Lychi) RETURN n, r, b LIMIT 100';
                        break;
                    }
                    case "Pattern": {
                        msg = 'MATCH (n) WHERE id (n) = {qParam} MATCH (n)-[r]-(b:Pattern) RETURN n, r, b LIMIT 100';
                        break;
                    }
                    case "All": {
                        msg = 'MATCH (n) WHERE id (n) = {qParam} MATCH (n)-[r]-(b) RETURN n, r, b LIMIT 100';
                        break;
                    }
                }
                {
                    params = { qParam: term };
                    break;
                }
            case "chembl":
            case "target":
                {
                    msg = 'MATCH (n:Target) WHERE n.chembl_id= {qParam} MATCH (n)-[r:REGULATES]-(b) RETURN n, r, b';
                    params = { qParam: term };
                    break;
                }
            case "targets": {
                console.log(term);
                msg = 'MATCH (n:Target) WHERE n.chembl_id IN {qParam} RETURN n';
                params = { qParam: term };
                break;
            }
            case "smiles":
                {
                    msg = 'MATCH (n:Pattern) WHERE n.pid= {qParam} MATCH (n)-[r]-(b) RETURN n, r, b LIMIT 5';
                    params = { qParam: term };
                    break;
                }
            case "lychi":
                {
                    msg = 'MATCH (n:Lychi) WHERE n.lychi= {qParam} MATCH (n)-[r]-(b) RETURN n, r, b LIMIT 5';
                    params = { qParam: term };
                    break;
                }
            case "uuid":
                {
                    msg = 'MATCH (n) WHERE n.uuid= {qParam} MATCH (n)-[r]-(b) RETURN n, r, b';
                    params = { qParam: term };
                    break;
                }
            case "path":
                {
                    console.log(term);
                    var levels = properties.distance;
                    //msg = 'MATCH (sn:Target{ chembl_id: $target }),(en:Lychi { lychi: $lychi }), p = shortestPath((sn)-[*]-(en)) WITH p WHERE length(p)> 1 RETURN p';
                    msg = 'MATCH p=shortestPath((t)-[r:REGULATES*..' + levels + ']->(q:Target)) WHERE t.chembl_id IN {start} AND q.chembl_id IN {end} AND q.chembl_id <> t.chembl_id return p';
                    //msg = 'MATCH (n:Target) WHERE n.chembl_id IN {start} (n)-[r:TESTED_ON]->(t:Target)) MATCH s=shortestPath((t)-[:REGULATES*..'+levels +']->(q:Target)) WHERE q.chembl_id IN {end} q.chembl_id<>t.chembl_id AND return p, s';
                    //working 1 to 1 shortest path
                    //msg = 'MATCH p=((l:Lychi {lychi: $lychi} )-[r:TESTED_ON]->(t:Target)) MATCH s=shortestPath((t)-[:REGULATES*..'+levels +']->(q:Target {chembl_id: $target})) where q.chembl_id<>t.chembl_id return p, s';
                    //  msg = 'MATCH (sn:Target{ chembl_id: $target }),(en:Lychi { lychi: $lychi }), p = shortestPath((sn)-[*]-(en)) WITH p WHERE length(p)> 1 RETURN p';
                    params = { start: term.start, end: term.end };
                    break;
                }
            case "node": {
                msg = 'MATCH (n:Target) WHERE n.chembl_id= {qParam} RETURN n';
                params = { qParam: term };
                break;
            }
            //todo: this isn't paramaterized cypher doesn't support labels as parameters
            //todo: may need to just write separate calls based on origin node label
            case "counts": {
                msg = ' MATCH (n) WHERE id (n) = {qParam} MATCH (n)-[r]-(b) RETURN DISTINCT labels(b),COUNT(labels(b))';
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
    return MessageService;
}());
MessageService = __decorate([
    core_1.Injectable()
], MessageService);
exports.MessageService = MessageService;
