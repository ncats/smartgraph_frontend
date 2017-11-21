import {
  Component, ChangeDetectorRef, ElementRef, HostListener, ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import {D3Service} from '../../d3/d3.service';
import {ForceDirectedGraph} from '../../d3/models/force-directed-graph';
import {Node} from '../../d3/models/node';
import {Link} from '../../d3/models/link';
import * as d3 from 'd3';
import {GraphDataService} from '../../services/graph-data.service';
import {DownloadButtonComponent} from '../../download-button/download-button.component';


@Component({
  selector: 'graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
      <g [zoomableOf]="svg" [draggableInGraph]="graph">
        <g [linkVisual]="link" [hoverableLink]="link" *ngFor="let link of links"></g>
        <g [nodeVisual]="node" *ngFor="let node of nodes" [hoverableNode]="node"
        [clickableNode]="node" [draggableNode]="node" [draggableInGraph]="graph">
        </g>
        <svg:g menu-list #menu></svg:g>
      </g>
        <defs>
          <marker id="arrow" viewBox="0 -5 10 10" refX= '8.75' refY = '0' markerWidth="8" markerHeight ="8" orient="auto">
            <path fill = "#A5A5A5" stroke ="#A5A5A5" d = "M0,-5L10,0L0,5"></path>
          </marker>
          <marker id="hoverarrow" viewBox="0 -5 10 10" refX= '8.75' refY = '0' markerWidth="8" markerHeight ="8" orient="auto">
            <path fill = "#595959" stroke ="#595959" d = "M0,-5L10,0L0,5"></path>
          </marker>
          <marker id="flatarrow" viewBox="0 -5 10 10" refX= '8.75' refY = '0' markerWidth="8" markerHeight ="8" orient="auto">
            <path fill = "#A5A5A5" stroke ="#A5A5A5" stroke-width="3" d = "M 8,-8 L 8, 8"></path>
          </marker>
          <marker id="hoverflatarrow" viewBox="0 -5 10 10" refX= '8.75' refY = '0' markerWidth="8" markerHeight ="8" orient="auto">
            <path fill = "#595959" stroke ="#595959" stroke-width="3" d = "M 8,-8 L 8, 8"></path>
          </marker>
        </defs>
    </svg>
<!--
          <download-button (click)=" downloadGraph()"></download-button>
-->
  `,
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {
  @ViewChild(DownloadButtonComponent)
  private downloader: DownloadButtonComponent;
  public nodes: Node[] = [];
  public links: Link[] = [];


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }

  graph: ForceDirectedGraph;

  constructor(private d3Service: D3Service,
              private ref: ChangeDetectorRef,
              private el: ElementRef,
              private graphDataService: GraphDataService) {
  }

  ngOnInit() {
    this.graphDataService.graphhistory$.subscribe(res => {
      this.nodes = res.nodes;
      this.links = res.links;
      if (this.graph) {
        this.graph.update(res, this.options);
      }
    });

    /** Receiving an initialized simulated graph from our custom d3 service */
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this._options);
    /** Binding change detection check on each tick
     * This along with an onPush change detection strategy should enforce checking only when relevant!
     * This improves scripting computation duration in a couple of tests I've made, consistently.
     * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
     */
    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }

  downloadGraph(): void {
    this.downloader.downloadFile(d3.select('svg'), this.options);
  }

  _options: {width, height} = {width: 800, height: 600};

  get options() {
    return this._options = {
      width: this.el.nativeElement.parentElement.offsetWidth,
      height: window.innerHeight * .8
      //  height: window.innerHeight-(window.outerHeight-window.innerHeight)
    };
  }
}
