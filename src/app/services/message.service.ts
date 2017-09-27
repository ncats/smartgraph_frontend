import {Injectable} from '@angular/core';

@Injectable()
export class MessageService {

  constructor() {
  }

  getMessage(term: any, type: string, properties?: any): Message {
    let msg: string;
    let params: {};
    switch (type) {
      case"targetSearch": {
        msg = 'MATCH (n:Target) WHERE n.name=~{qParam2} OR n.uniprot_id =~{qParam2} RETURN n.name, n.uniprot_id ORDER BY n.name LIMIT 100 UNION MATCH (n:Target) WHERE n.name=~{qParam} OR n.uniprot_id =~{qParam} RETURN n.name, n.uniprot_id ORDER BY n.name LIMIT 100';
        // msg = 'MATCH (n:Target) WHERE n.name=~{qParam2} RETURN n.name, n.uniprot_id ORDER BY n.name LIMIT 100';
        params = {qParam2: '(?i)' + term + '.*', qParam: '(?i).*' + term + '.*'};
        break;
      }
      case"patternSearch": {
        //msg = 'MATCH (n:Pattern) WHERE n.smiles=~{qParam} RETURN n.smiles, n.pid ORDER BY n.smiles LIMIT 50';
        msg = 'MATCH (n:Lychi) WHERE n.hash=~{qParam} RETURN n.hash, n.pid ORDER BY n.hash LIMIT 50';
        params = {qParam: term + '.*'};
        break;
      }
      case"lychiSearch": {
        //msg = 'MATCH (n:Pattern) WHERE n.smiles=~{qParam} RETURN n.smiles, n.pid ORDER BY n.smiles LIMIT 50';
        msg = 'MATCH (n:Lychi) WHERE n.hash=~{qParam} RETURN n.lychi, n.lid ORDER BY n.lychi LIMIT 50';
        params = {qParam: term + '.*'};
        break;
      }
      case "expand":
        switch (properties) {
          //todo: switch to parameterized  constraints for 'n'
          case "Target": {
            msg = 'MATCH (n) WHERE uuid (n) = {qParam} MATCH (n)-[r]-(b:Target) RETURN n, r, b LIMIT 100';
            break;
          }
          case "Lychi": {
            msg = 'MATCH (n) WHERE uuid (n) = {qParam} MATCH (n)-[r]-(b:Lychi) RETURN n, r, b LIMIT 100';
            break;
          }
          case "Pattern": {
            msg = 'MATCH (n) WHERE uuid (n) = {qParam} MATCH (n)-[r]-(b:Pattern) RETURN n, r, b LIMIT 100';
            break;
          }
          case "All": {
            msg = 'MATCH (n) WHERE uuid (n) = {qParam} MATCH (n)-[r]-(b) RETURN n, r, b LIMIT 100';
            break;
          }
        }
      {
        params = {qParam: term};
        break;
      }

      case "chembl":
      case "target": {
        msg = 'MATCH (n:Target) WHERE n.uniprot_id= {qParam} MATCH (n)-[r:REGULATES]-(b) RETURN n, r, b';
        params = {qParam: term};
        break;
      }
      case "targets": {
        msg = 'MATCH (n:Target) WHERE n.uniprot_id IN {qParam} RETURN n';
        params = {qParam: term};
        break;
      }

      case "smiles": {
        msg = 'MATCH (n:Pattern) WHERE n.pid= {qParam} MATCH (n)-[r]-(b) RETURN n, r, b LIMIT 5';
        params = {qParam: term};
        break;
      }

      case "lychi": {
        msg = 'MATCH (n:Lychi) WHERE n.lychi= {qParam} MATCH (n)-[r]-(b) RETURN n, r, b LIMIT 5';
        params = {qParam: term};
        break;
      }

      case "uuid": {
        msg = 'MATCH (n) WHERE n.uuid= {qParam} MATCH (n)-[r]-(b) RETURN n, r, b';
        params = {qParam: term};
        break;
      }

      case "path": {
        let levels = properties.distance;
        //msg = 'MATCH (sn:Target{ uniprot_id: $target }),(en:Lychi { lychi: $lychi }), p = shortestPath((sn)-[*]-(en)) WITH p WHERE length(p)> 1 RETURN p';

        msg = 'MATCH p=shortestPath((t)-[r:REGULATES*..' + levels + ']->(q:Target)) WHERE t.uniprot_id IN {start} AND q.uniprot_id IN {end} AND q.uniprot_id <> t.uniprot_id return p';
        //msg = 'MATCH (n:Target) WHERE n.uniprot_id IN {start} (n)-[r:TESTED_ON]->(t:Target)) MATCH s=shortestPath((t)-[:REGULATES*..'+levels +']->(q:Target)) WHERE q.uniprot_id IN {end} q.uniprot_id<>t.uniprot_id AND return p, s';

        //working 1 to 1 shortest path
        //msg = 'MATCH p=((l:Lychi {lychi: $lychi} )-[r:TESTED_ON]->(t:Target)) MATCH s=shortestPath((t)-[:REGULATES*..'+levels +']->(q:Target {uniprot_id: $target})) where q.uniprot_id<>t.uniprot_id return p, s';

        //  msg = 'MATCH (sn:Target{ uniprot_id: $target }),(en:Lychi { lychi: $lychi }), p = shortestPath((sn)-[*]-(en)) WITH p WHERE length(p)> 1 RETURN p';
        params = {start: term.start, end: term.end};
        break;
      }

      case "node": {
        msg = 'MATCH (n:Target) WHERE n.uniprot_id= {qParam} RETURN n';
        params = {qParam: term};
        break;
      }
      //todo: this isn't paramaterized cypher doesn't support labels as parameters
      //todo: may need to just write separate calls based on origin node label
      case "counts": {
        console.log(term);
        msg = ' MATCH (n{uuid:{qParam}}) USING INDEX MATCH (n)-[r]-(b) RETURN DISTINCT labels(b),COUNT(labels(b))';
        params = {qParam: term};
        break;
      }

    }
    let message: Message = {
      type: type,
      message: msg,
      params: params
    };
    return message;

  }

}

export interface Message {
  type: string;
  message: string;
  params: Object;
}

