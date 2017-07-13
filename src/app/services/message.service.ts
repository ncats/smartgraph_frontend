import {Injectable} from '@angular/core';

@Injectable()
export class MessageService {

  constructor() {
  }

  getMessage(term:any, type:string):Message {
    let msg: string;
    let params: {};
    switch (type) {
      case"targetSearch":
      {
        msg = 'MATCH (n:Target) WHERE n.pref_name=~{qParam2} OR n.chembl_id =~{qParam2} RETURN n.pref_name, n.chembl_id ORDER BY n.pref_name LIMIT 100 UNION MATCH (n:Target) WHERE n.pref_name=~{qParam} OR n.chembl_id =~{qParam} RETURN n.pref_name, n.chembl_id ORDER BY n.pref_name LIMIT 100';
       // msg = 'MATCH (n:Target) WHERE n.pref_name=~{qParam2} RETURN n.pref_name, n.chembl_id ORDER BY n.pref_name LIMIT 100';
        params = {qParam2: '(?i)' + term + '.*', qParam: '(?i).*' + term + '.*'};
        break;
      }
      case"patternSearch":
      {
        //msg = 'MATCH (n:Pattern) WHERE n.smiles=~{qParam} RETURN n.smiles, n.pid ORDER BY n.smiles LIMIT 50';
        msg = 'MATCH (n:Lychi) WHERE n.lychi=~{qParam} RETURN n.lychi, n.pid ORDER BY n.lychi LIMIT 50';
        params = {qParam: term + '.*'};
        break;
      }
      case"lychiSearch":
      {
        //msg = 'MATCH (n:Pattern) WHERE n.smiles=~{qParam} RETURN n.smiles, n.pid ORDER BY n.smiles LIMIT 50';
        msg = 'MATCH (n:Lychi) WHERE n.lychi=~{qParam} RETURN n.lychi, n.lid ORDER BY n.lychi LIMIT 50';
        params = {qParam: term + '.*'};
        break;
      }
      case "nodeclick":
      {
        msg = 'MATCH (n) WHERE id (n) = {qParam} MATCH (n)-[r]-(b) RETURN n, r, b LIMIT 500';
        params =  {qParam: term};
        break;
      }

      case "chembl":
      case "target":
      {
        msg = 'MATCH (n:Target) WHERE n.chembl_id= {qParam} MATCH (n)-[r:REGULATES]-(b) RETURN n, r, b';
        params =  {qParam: term};
        break;
      }

      case "smiles":
      {
        msg = 'MATCH (n:Pattern) WHERE n.pid= {qParam} MATCH (n)-[r]-(b) RETURN n, r, b LIMIT 5';
        params =  {qParam: term};
        break;
      }

      case "lychi":
      {
        msg = 'MATCH (n:Lychi) WHERE n.lychi= {qParam} MATCH (n)-[r]-(b) RETURN n, r, b LIMIT 5';
        params =  {qParam: term};
        break;
      }

      case "uuid":
      {
        msg = 'MATCH (n) WHERE n.uuid= {qParam} MATCH (n)-[r]-(b) RETURN n, r, b';
        params =  {qParam: term};
        break;
      }

      case "path":
      {
        console.log(term);
        //msg = 'MATCH (sn:Target{ chembl_id: $target }),(en:Lychi { lychi: $lychi }), p = shortestPath((sn)-[*]-(en)) WITH p WHERE length(p)> 1 RETURN p';
        msg = 'MATCH p=((l:Lychi {lychi: $lychi} )-[r:TESTED_ON]->(t:Target)) MATCH s=shortestPath((t)-[:REGULATES*..10]->(q:Target {chembl_id: $target})) where q.chembl_id<>t.chembl_id return p, s';
      //  msg = 'MATCH (sn:Target{ chembl_id: $target }),(en:Lychi { lychi: $lychi }), p = shortestPath((sn)-[*]-(en)) WITH p WHERE length(p)> 1 RETURN p';
        params = {target: term.target.value, lychi: term.lychi.display};
        break;
      }

      case "node":{
        msg = 'MATCH (n:Target) WHERE n.chembl_id= {qParam} RETURN n';
        params =  {qParam: term};
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
  type:string;
  message:string;
  params:Object;
}
