import {Node} from "./node";

export class Link implements d3.SimulationLinkDatum<Node> {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;

  // must - defining enforced implementation properties
  source: Node | string | number;
  target: Node | string | number;
  type?: string;
  properties?: any;
  uuid: string;
  id: string;

  constructor(source, target, properties) {
    this.source = source;
    this.target = target;
    this.type = properties.type || "";
    this.properties = properties.properties;
    this.uuid = properties.uuid;
  }
}

