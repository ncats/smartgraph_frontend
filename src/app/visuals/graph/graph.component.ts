import {Component, Input, ChangeDetectorRef, ElementRef, HostListener, ChangeDetectionStrategy} from '@angular/core';
import {D3Service, ForceDirectedGraph, Node, NodeService, Link} from '../../d3';
import {Subscription} from "rxjs";
import * as d3 from 'd3';
import {GraphDataService} from "../../services/graph-data.service";


@Component({
  selector: 'graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
      <g [zoomableOf]="svg">
              <g [linkVisual]="link" *ngFor="let link of links"></g>
        <g [nodeVisual]="node" *ngFor="let node of nodes"
            [draggableNode]="node" [hoverableNode]="node" [clickableNode]="node" [draggableInGraph]="graph">
</g>
<svg:g nodeDetails></svg:g>
      <svg:g nodeMenu></svg:g>
      </g>
    </svg>
  `,
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {
/*  @Input('nodes') nodes;
  @Input('links') links;*/
public nodesSubscription = Subscription;
public linksSubscription = Subscription;
  public nodes: Node[] = [];
  public links: Link[] = [];


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }
  subscription: Subscription;
  hoveredNode: Node;
  graph: ForceDirectedGraph;
  constructor(private d3Service: D3Service,
              private ref: ChangeDetectorRef,
              private el: ElementRef,
              private nodeService: NodeService,
              private graphDataService: GraphDataService){ }

  ngOnInit() {
    this.graphDataService.graphhistory$.subscribe(res =>{
      this.nodes = res.nodes;
      this.links = res.links;
      let cloned3 = this.nodes.map(x => Object.assign([], x));
      console.log(cloned3);
      if (this.graph) {
        this.graph.simulation.nodes(this.nodes);
        this.graph.links = this.links;
        this.graph.nodes = this.nodes;
        this.graph.initLinks();
        this.graph.simulation.restart();
        let cloned3 = this.nodes.map(x => Object.assign([], x));
        console.log(cloned3);
      }
    });

    /** Receiving an initialized simulated graph from our custom d3 service */
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);
    /** Binding change detection check on each tick
     * This along with an onPush change detection strategy should enforce checking only when relevant!
     * This improves scripting computation duration in a couple of tests I've made, consistently.
     * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
     */
    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });
    this.subscription = this.nodeService.hoverednode$
      .subscribe(node => {
        this.hoveredNode = node;
      });

    let svg = d3.select('svg');
    svg.append("defs").append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 8.75)
      .attr("refY", 0)
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .attr("orient", "auto")
      .append("svg:path")
      .attr("fill", "#A5A5A5")
      .attr("stroke", "#FFFFFF")
      .attr("d", "M0,-5L10,0L0,5");

svg.append("defs").append("marker")
      .attr("id", "hoverarrow")
      .attr("viewBox", "0 -5 10 10")
  .attr("refX", 8.75)
      .attr("refY", 0)
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .attr("orient", "auto")
      .append("svg:path")
      .attr("fill", "#595959")
      .attr("stroke", "#FFFFFF")
  .attr("d", "M0,-5L10,0L0,5");
  }

  ngAfterViewInit() {
    let cloned3 = this.nodes.map(x => Object.assign([], x));
    console.log(cloned3);
    this.graph.initSimulation(this.options);
  }

  private _options: {width, height} = {width: 800, height: 600};

  get options() {
    return this._options = {
      width: this.el.nativeElement.parentElement.offsetWidth,
      height: window.outerHeight*.5
    };
  }
}
