import { Node } from './';
import * as uuid from 'uuid'

export class Link implements d3.SimulationLinkDatum<Node> {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;

  // must - defining enforced implementation properties
  source: Node | string | number;
  target: Node | string | number;
  type?: string;
  properties?: {};
  //uuid: string;
  id: string;

  constructor(source, target, type?, properties?, id?) {
    this.source = source;
    this.target = target;
    this.type = type || "";
    this.properties = properties;
   // this.uuid = uuid.v4();
    this.id = id;
  }
}

