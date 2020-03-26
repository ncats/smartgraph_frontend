import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Renderer2} from '@angular/core';
import {unescape} from 'querystring';
import {GraphDataService} from '../services/graph-data.service';
import {Link} from '../d3/models/link';
import {Node} from '../d3/models/node';

@Component({
  selector: 'download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.scss']
})
export class DownloadButtonComponent implements OnInit {
  @ViewChild('#svg', { static: false }) el: ElementRef;

  file: any;
  constructor(private rd: Renderer2,
  private graphDataService: GraphDataService) {
  }

  ngOnInit() {
/*    console.log(this.rd.data);
    console.log(this.el);*/
  }

  ngAfterViewInit() {
    //  var div = this.elRef.nativeElement.querySelector('#');
    //  console.log(div);
/*    console.log(this.rd);
    console.log(this.el);*/
  }

  //

downloadJSON() {
    const cyto = new CytoJSON();
    const graph = this.graphDataService.returnGraph();
  for (const node of graph.nodes) {
    cyto.elements.nodes.push(new CytoNode(node));
  }
  for (const link of graph.links) {
    cyto.elements.edges.push(new CytoEdge(link));
  }
this.file = new Blob([JSON.stringify(cyto)], { type: 'type: \'text/json\''});
  this.downloadFile();
}

downloadCSV() {}


downloadEdges() {
  const graph = this.graphDataService.returnGraph();
  let edgeList = 'edge,source,target \n';
  for (const link of graph.links) {
    const src = link.source.uuid;
    const tgt = link.target.uuid;
    const edge = link.uuid;
    edgeList = edgeList + edge + ',' + src + ',' + tgt + '\n';
  }
  this.file = new Blob([edgeList], { type: 'type: \'text/csv\''});
  this.downloadFile();
}

  downloadPNG(data: any, options: any) {
  }

  downloadFile(): void {
    window.location.href = window.URL.createObjectURL(this.file);
  //  window.open(url);
  }

}

export class CytoJSON {
  format_version = '1.0';
  'generated_by' = 'cytoscape-3.6.0';
  target_cytoscapejs_version = '~2.1';
  data: Object = {
    shared_name: 'smrtgraph.csv',
    name : 'smrtgraph.csv',
    SUID : 64,
    __Annotations: [],
    selected: false
  };
elements = {
  edges:  [],
  nodes: []
};

constructor() {}
}

export class CytoNode {
  data = {id: '', node: {}};
  position = {
    x : 0,
    y : 0
  };
  selected: boolean;

  constructor(node: Node) {
    this.data.id = node.uuid;
    this.data.node = node;
    this.position.x = node['x'] || 0;
    this.position.y = node['y'] || 0;
    this.selected = false;
  }

}
export class CytoEdge {
  data = {
    id : '',
    source : '',
    target : '',
    properties: {}
  };
  selected: boolean;

  constructor(link: Link) {
    this.data.id = link.uuid;
    this.data.properties = link;
    this.data.source = link.source['uuid'] || link.source;
    this.data.target = link.target['uuid'] || link.target;
    this.selected = false;
  }
}
