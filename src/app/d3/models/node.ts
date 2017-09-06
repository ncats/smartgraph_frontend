import APP_CONFIG from '../../app.config';
import * as uuid from 'uuid'


export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number = 0;
  y?: number = 0;
  vx?: number = 0;
  vy?: number = 0;
  fx?: number | null;
  fy?: number | null;

  uuid: string;
  id: string;
  properties: {};
  labels?: string[];
  linkCount: number = 0;
  expanded: Object ={
    target:false,
    lychi: false,
    pattern: false
  }

  //Todo: may not want so many extraneous properties to set styles
  hovered?: boolean = false;
  startNode?: boolean = false;
  endNode?: boolean = false;

  constructor(id, properties, labels, linkCount?) {
    this.uuid = uuid.v4();
    this.id = id;
    this.properties = properties;
    this.labels = labels;
    this.linkCount = linkCount || 0;
  }

  normal = () => {
    return Math.sqrt(this.linkCount / APP_CONFIG.N);
  }

  get r() {
    return 50 * this.normal() + 15;
  }

  get fontSize() {
    return (30 * this.normal() + 10) + 'px';
  }

  get color() {
    let index = Math.floor(APP_CONFIG.SPECTRUM.length * this.normal());
    return APP_CONFIG.SPECTRUM[index];
  }
}

export class Target extends Node {
  pref_name: string;
  species_group_flag: string;

  constructor(obj) {
    super(obj.id, obj.properties, obj.labels, obj.linkCount);
    this.pref_name = obj.pref_name;
    this.species_group_flag = obj.species_group_flag;
  }

}

export class Pattern extends Node {
 ring_nr: {};
 smiles: string;
  constructor(obj) {
    super(obj.id, obj.properties, obj.labels, obj.linkCount);
    this.ring_nr = obj.ring_nr;
    this.smiles = obj.smiles;
  }


}

export class Lychi extends Node {
  canonical_smiles: string;
  lychi: string;
  constructor(obj) {
    super(obj.id, obj.properties, obj.labels, obj.linkCount);
    this.canonical_smiles = obj.canonical_smiles;
    this.lychi = obj.lychi;
  }


}
