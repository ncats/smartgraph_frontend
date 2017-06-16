import APP_CONFIG from '../../app.config';

export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number = 0;
  y?: number = 0;
  vx?: number = 0;
  vy?: number = 0;
  fx?: number | null;
  fy?: number | null;

  id: string;
  data: {};
  labels?: string[];
  linkCount: number = 0;

  constructor(id, data, labels) {
    this.id = id;
    this.data = data;
    this.labels = labels;
  }

  normal = () => {
    return Math.sqrt(this.linkCount / APP_CONFIG.N);
  }

  get r() {
    return 50 * this.normal() + 10;
  }

  get fontSize() {
    return (30 * this.normal() + 10) + 'px';
  }

  get color() {
    let index = Math.floor(APP_CONFIG.SPECTRUM.length * this.normal());
    return APP_CONFIG.SPECTRUM[index];
  }
}
