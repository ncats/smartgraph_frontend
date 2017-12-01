import APP_CONFIG from '../../app.config';

export class Params {
  hovered = false;
  startNode = false;
  endNode= false;
  menu = false;

  constructor() {}
}

export class Node implements d3.SimulationNodeDatum {
  //  optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  fx?: number | null;
  fy?: number | null;

  uuid: string;
  id: string;
 // properties: any;
  labels?: string[];
  linkCount = 0;
  expanded: Object = {
    target: false,
    compound: false,
    pattern: false,
    all:false
  };

  params: Params;
  /*
  * Neo4j has their own uuid that will need to be used to track nodes, since some relationships are sepnt with the start
  * and end nodes notated solely by the Neo4j ids, rather than the full node object
  * */
  constructor(uuid, data) {
    this.uuid = uuid;
    //  uuid is still saved here
  //  this.properties = data.properties;
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
    const index = Math.floor(APP_CONFIG.SPECTRUM.length * this.normal());
    return APP_CONFIG.SPECTRUM[index];
  }
}

export class Compound extends Node {
  hash: string;
  nostereo_hash: string;
  smiles: string;
  compoundId: string;
  imageUrl: string;

  constructor (uuid, data) {
    super(uuid, data);
    this.hash = data.properties.hash;
    this.nostereo_hash = data.properties.nostereo_hash;
    this.smiles = data.properties.smiles;
    this.compoundId = data.properties.compound_id.low;
    this.imageUrl = 'https://tripod.nih.gov/servlet/renderServletv12/?size=200&structure=' +
      this.parseSmiles(data.properties.smiles) + '&standardize=true&format=svg';
  }

  private parseSmiles(smiles: string): string {
    const parsed = smiles
      .replace(/[;]/g, '%3B')
      .replace(/[#]/g, '%23')
      .replace(/[+]/g, '%2B')
      .replace(/[\\]/g, '%5C')
      .replace(/[|]/g, '%7C');
    return parsed;
  }
}

export class Target extends Node {
  uniprot_id: string;
  fullname: string;
  synonyms: string[];
  genes: string;


  constructor (uuid, data) {
    super(uuid, data);
    this.uniprot_id = data.properties.uniprot_id;
    this.fullname = data.properties.fullname;
    this.synonyms = data.properties.synonyms;
    this.genes = data.properties.gene_symbols.join(', ');

  }
}

export class Pattern extends Node {
  hash: string;
  pattern_id: string;
  pattern_type: string;
  smiles: string;
  imageUrl: string;

  constructor (uuid, data) {
    super(uuid, data);
    this.hash = data.properties.hash;
    this.pattern_id = data.properties.pattern_id;
    this.pattern_type = data.properties.pattern_type;
    this.smiles = data.properties.smiles;
    this.imageUrl = 'https://tripod.nih.gov/servlet/renderServletv12/?size=200&structure=' +
      this.parseSmiles(data.properties.smiles) + '&standardize=true&format=svg&preset=HIGHLIGHT&amap=' +
      data.properties.smiles.split('').map((a, i) => i).join(',');
  }
  private parseSmiles(smiles: string): string {
    const parsed = smiles
      .replace(/[;]/g, '%3B')
      .replace(/[#]/g, '%23')
      .replace(/[+]/g, '%2B')
      .replace(/[\\]/g, '%5C')
      .replace(/[|]/g, '%7C');
    return parsed;
  }
}
