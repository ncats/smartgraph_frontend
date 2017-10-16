import {Node} from "./node";

export class Link implements d3.SimulationLinkDatum<Node> {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?:number;

  // must - defining enforced implementation properties
  source:Node | string | number;
  target:Node | string | number;
  type?:string;
  properties?:any;
  uuid:string;
  id:string;
  linkType:string;
  causalStatements?: any;
  mechanisms?:string;

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
      }))).join( );
    }
  }
}
