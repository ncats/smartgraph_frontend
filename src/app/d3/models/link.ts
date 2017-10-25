import {Node} from "./node";

export class Reaction {
  causal: string;
  mechanism: string;
  reference: string;
  confidence: string;
  constructor(data:string) {
    let r = data.split('|');
    this.causal = r[0];
    this.mechanism = r[1];
    this.reference = r[2];
    this.confidence = r[3];
  }
}

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
  edgeType: string;
  reactions: Reaction[] = [];

  constructor(source, target, data) {
    this.source = source;
    this.target = target;
    this.type = data.type || "";
    this.properties = data.properties;
    this.uuid = data.properties.uuid;
    this.linkType = source.constructor.name + '_' + target.constructor.name;
    this.edgeType= data.properties.edgeType;
    if (data.properties.edgeInfo && data.properties.edgeInfo.length >0) {
        for (let reaction of data.properties.edgeInfo){
          this.reactions.push(new Reaction(reaction));
        }
    }
  }
}
