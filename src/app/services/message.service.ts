import {Injectable} from '@angular/core';

@Injectable()
export class MessageService {

  constructor() {
  }

  getMessage(term: any, type: string, properties?: any): Message {
    let msg: string;
    let params: {};
    switch (type) {

      case 'chembl':
      case 'target': {
        msg = 'MATCH (n:Target) WHERE n.uniprot_id= $qParam MATCH (n)-[r:REGULATES]-(b) RETURN n, r, b';
        params = {qParam: term};
        break;
      }

      case 'compound': {
        msg = 'MATCH (n:Compound) WHERE n.compound= $qParam MATCH (n)-[r]-(b) RETURN n, r, b LIMIT 5';
        params = {qParam: term};
        break;
      }

      case 'counts': {
        switch (properties) {
          case 'Target': {
            msg = 'MATCH (n:Target) WHERE n.uuid = $qParam  MATCH (n)-[r]-(b) RETURN DISTINCT labels(b),COUNT(labels(b))';
            break;
          }
          case 'Compound': {
            msg = 'MATCH (n:Compound) WHERE n.uuid = $qParam  MATCH (n)-[r]-(b) RETURN DISTINCT labels(b),COUNT(labels(b))';
            break;
          }
          case 'Pattern': {
            msg = 'MATCH (n:Pattern) WHERE n.uuid = $qParam  MATCH (n)-[r]-(b) RETURN DISTINCT labels(b),COUNT(labels(b))';
            break;
          }
        }
        params = {qParam: term};
        break;
      }

      case 'endNodeSearch':
      case 'startNodeSearch': {
        // todo: convern nostereo_hash to a contains in hash search
        msg = 'MATCH (n:Target) WHERE n.uniprot_id IN $qParam RETURN n AS data UNION MATCH (c:Compound) WHERE c.nostereo_hash IN $qParam RETURN c AS data';
        //   msg = 'MATCH (n:Target) WHERE n.uniprot_id IN $qParam RETURN n UNION MATCH (n:Compound) WHERE n.hash IN $qParam RETURN n';
        params = {qParam: term};
        break;
      }

      case 'expand': {
        const start: string = 'MATCH (n:' + properties.origin;
        switch (properties.target) {
          case 'Target': {
            //  msg = 'MATCH p=shortestPath((t)-[r*..1]->(q:Target)) WHERE t.uuid = $qParam return p LIMIT 100';
            msg = start + '{uuid:$qParam}) MATCH (n)-[r]-(b:Target) with {segments:[{start: startNode(r), relationship:r, end: endNode(r)}]} AS ret RETURN ret LIMIT 100';
            break;
          }
          case 'Compound': {
            msg = start + '{uuid:$qParam}) MATCH (n)-[r]-(b:Compound) with {segments:[{start: startNode(r), relationship:r, end: endNode(r)}]} AS ret RETURN ret LIMIT 100';
            break;
          }
          case 'Pattern': {
            msg = start + '{uuid:$qParam}) MATCH (n)-[r]-(b:Pattern) with {segments:[{start: startNode(r), relationship:r, end: endNode(r)}]} AS ret RETURN ret LIMIT 100';
            break;
          }
          case 'All': {
            msg = 'MATCH (n) WHERE n.uuid = $qParam MATCH (n)-[r]-(b) with {segments:[{start: startNode(r), relationship:r, end: endNode(r)}]} AS ret RETURN ret LIMIT 100';
            break;
          }
        }
        params = {qParam: term};
        break;
      }

      case 'node': {
        msg = 'MATCH (n:Target) WHERE n.uniprot_id= $qParam RETURN n';
        params = {qParam: term};
        break;
      }

      case 'path': {
        //  const levels = properties.distance;

        if (term.end.length > 0) {
          /**
           * gets targets of compounds in the start nodes list, filtered by < activity. default activity is 10
           * get path from above targets to end targets, filtered by >= confidence. defualt confidence is 0, removing
           * circular paths
           * get paths from starting targets to ending targets filtered by >= confidence. defualt confidence is 0, removing
           * circular paths
           * if no end nodes, an open graph is returned
           */

          /*          with {
                      segments:[
                        {start: startNode(p1), relationship:p1, end: endNode(p1)},
                        {start: startNode(p2), relationship:p2, end: endNode(p2)},
                        {start: startNode(c), relationship: s, end: endNode(s)}
                      ]
                    }
                      AS ret
                    return ret`*/
          if (!properties.hasCompound) {
            msg =
              `MATCH p = shortestPath((t2)-[w*..${properties.distance}]->(q:Target))
        WHERE all(rel in w WHERE rel.max_confidence_value >= ${properties.confidence})
        AND t2.uuid IN {start}
        AND q.uuid IN {end}
        AND t2.uuid<>q.uuid
        return p`;
          } else {
            // there is a compound in start nodes and end nodes exist
          //  console.log("has compound and end nodes");
            msg = `MATCH (c:Compound)-[a:TESTED_ON]-(t1:Target) WHERE a.activity < ${properties.activity} AND c.uuid IN {start}
            with t1, COLLECT(c) as compounds, COLLECT(t1) as targets
              MATCH p1=shortestPath((t1)-[r*..${properties.distance}]->(q:Target))
            WHERE  all(rel in r WHERE rel.max_confidence_value >= ${properties.confidence}) AND
            q.uuid IN {end}
            AND t1.uuid<>q.uuid
            UNWIND compounds as x
            UNWIND targets as y
            MATCH p2=shortestPath((x)-[z:TESTED_ON]-(y))
            RETURN p1,p2`;
          }
        } else {
          if (!properties.hasCompound) {
            msg = `MATCH p = shortestPath((t2)-[w*..${properties.distance}]->(q:Target))
            WHERE all(rel in w WHERE rel.max_confidence_value >= ${properties.confidence})
            AND t2.uuid IN {start}
            AND t2.uuid<>q.uuid
            return p`;

          } else {
          //  console.log(" has compound and no end nodes")
             msg =  `MATCH (c:Compound)-[a:TESTED_ON]-(t1:Target) WHERE a.activity < ${properties.activity} AND c.uuid IN {start}
            with t1, COLLECT(c) as compounds, COLLECT(t1) as targets
              MATCH p1=shortestPath((t1)-[r*..${properties.distance}]->(q:Target))
            WHERE  all(rel in r WHERE rel.max_confidence_value >= ${properties.confidence})
            AND t1.uuid<>q.uuid
            UNWIND compounds as x
            UNWIND targets as y
            MATCH p2=shortestPath((x)-[z:TESTED_ON]-(y))
            RETURN p1,p2`;
          }
        }

        /*        // WHERE all(rel in r where rel.max_confidence_value > .3)

                // get all compunds in the start list that have been tested on a target
                const startCompounds = 'MATCH (c:Compound)-[s:TESTED_ON]->(t1:Target) where s.activity < 10 and c.uuid IN {start}';
                // get all paths from
                const compoundStartPaths = 'MATCH p1=shortestPath((t1)-[r*..5]->(q:Target))';
                const compoundStart = 'MATCH p=shortestPath((t:Compound)-[r*..' + levels + ']->(q:Target)) WHERE ';
                const targetStart = 'MATCH p=shortestPath((t:Target)-[r*..' + levels + ']->(q:Target)) WHERE ';
                const start = 'MATCH p=shortestPath((t)-[r*..' + levels + ']->(q:Target)) WHERE ';
                let confidence = '';
                let activity = '';
               // let similarity = '';
               // const where = '';
                const inStart = '  t.uuid IN {start}';
                const inEnd = ' AND q.uuid IN {end}';

                if (properties.confidence) {
                  confidence = ' all(rel in r WHERE rel.max_confidence_value >= ' + properties.confidence + ') AND';
                }
                if (properties.activity) {
                   activity = ' any(rel in r WHERE rel.activity <= ' + properties.activity + ') AND';
                }
                /!*if (properties.similarity) {
                  similarity = ' all(rel in r where rel.ratio >=' + properties.similarity + ') AND';
                }*!/
                if(term.end.length > 0){
                  const compoundFilter = compoundStart + activity + inStart + inEnd + ' AND q.uuid <> t.uuid return p';
                  const targetFilter = targetStart + confidence + inStart + inEnd + ' AND q.uuid <> t.uuid return p';
                  msg = `${compoundFilter} UNION ${targetFilter}`;
                }else {
                  const compoundFilter = compoundStart + activity + inStart + ' AND q.uuid <> t.uuid return p';
                  const targetFilter = targetStart + confidence + inStart + ' AND q.uuid <> t.uuid return p';
                  msg = `${compoundFilter} UNION ${targetFilter}`;
                 // msg = start + confidence + activity + similarity + inStart + ' AND q.uuid <> t.uuid return p';
                }*/
        params = {start: term.start, end: term.end};
        break;
      }

      case 'prediction': {
        // msg = 'MATCH (t:Target) WHERE t.uuid= $qParam MATCH (t)<-[r1:POTENT_PATTERN_OF]-(p:Pattern) MATCH (p)-[r2:PATTERN_OF]->(c:Compound) WHERE NOT ((c)-[:TESTED_ON]->(t)) RETURN t, r1, p, r2, c LIMIT 300';
        msg = 'MATCH (t:Target) WHERE t.uuid= $qParam MATCH (t)<-[r1:POTENT_PATTERN_OF]-(p:Pattern) MATCH (p)-[r2:PATTERN_OF]->(c:Compound) WHERE NOT ((c)-[:TESTED_ON]->(t))' +
          'with {segments:[{start: startNode(r1), relationship:r1, end: endNode(r1)},{start: startNode(r2), relationship:r2, end: endNode(r2)}]} AS ret RETURN ret LIMIT 300';
        params = {qParam: term};
        break;
      }

      case 'smiles': {
        msg = 'MATCH (n:Pattern) WHERE n.pid= $qParam MATCH (n)-[r]-(b) RETURN n, r, b LIMIT 5';
        params = {qParam: term};
        break;
      }

      case 'uuid': {
        msg = 'MATCH (n) WHERE n.uuid= $qParam RETURN n';
        params = {qParam: term};
        break;
      }

    }
    const message: Message = {
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
  params: any;
}

