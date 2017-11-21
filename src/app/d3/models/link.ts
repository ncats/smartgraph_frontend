import {Node} from './node';

export class Reaction {
  causal: string;
  mechanism: string;
  reference: string;
  confidence: string;
  constructor(data: string) {
    const r = data.split('|');
    this.causal = r[0];
    this.mechanism = r[1];
    this.reference = r[2];
    this.confidence = r[3];
  }
}

export class Link implements d3.SimulationLinkDatum<Node> {
  //  optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;

  //  must - defining enforced implementation properties
  source: Node | string | number;
  target: Node | string | number;
  type?: string;
  properties?: any;
  uuid: string;
  id: string;
  edgeType: string;
  reactions: Reaction[] = [];
  max_confidence_value: string;

  constructor(source, target, data) {
    this.source = source;
    this.target = target;
    this.type = data.type || '';
    this.properties = data.properties;
    this.uuid = data.properties.uuid;
    this.edgeType = data.properties.edgeType;
    this.max_confidence_value = data.properties.max_confidence_value || 0;
    if (data.properties.edgeInfo && data.properties.edgeInfo.length > 0) {
      for (const reaction of data.properties.edgeInfo){
        this.reactions.push(new Reaction(reaction));
      }
    }
  }
}
