import APP_CONFIG from '../../app.config';

export class Params {
  hovered: boolean = false;
  startNode: boolean = false;
  endNode: boolean= false;
  menu: boolean = false;

  constructor() {}
}

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
  properties: any;
  labels?: string[];
  linkCount: number = 0;
  expanded: Object ={
    target:false,
    compound: false,
    pattern: false
  };

  params: Params;
  /*
  * Neo4j has their own uuid that will need to be used to track nodes, since some relationships are sepnt with the start
  * and end nodes notated solely by the Neo4j ids, rather than the full node object
  * */
  constructor(id, data) {

    this.uuid = data.properties.uuid ;
    this.id = id;
    //uuid is still saved here
    this.properties = data.properties;
    this.labels = data.labels;
    this.linkCount = 1;
    this.params = new Params();
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

export class Compound extends Node {
  hash:string;
  nostereo_hash:string;
  smiles:string;
  compoundId: string;

  constructor (id, data) {
    super(id, data);
    this.hash= data.properties.hash;
    this.nostereo_hash= data.properties.nostereo_hash;
    this.smiles= data.properties.smiles;
    this.compoundId = data.properties.compound_id.low;
  }
}

export class Target extends Node {
  uniprot_id:string;
  name:string;
  fullname:string;
  synonyms: string[];
  genes: string;


  constructor (id, data) {
    super(id, data);
    this.uniprot_id= data.properties.uniprot_id;
    this.name= data.properties.name;
    this.fullname= data.properties.fullname;
    this.synonyms = data.properties.synonyms;
    this.genes = data.properties.gene_symbols.join(", ");

  }
}

export class Pattern extends Node {
  hash:string;
  pattern_id:string;
  pattern_type:string;
  smiles:string;

  constructor (id, data) {
    super(id, data);
    this.hash= data.properties.hash;
    this.pattern_id= data.properties.pattern_id;
    this.pattern_type= data.properties.pattern_type;
    this.smiles= data.properties.smiles;

  }
}
