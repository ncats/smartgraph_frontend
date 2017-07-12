import {Component, Input, ChangeDetectorRef, ElementRef, HostListener, ChangeDetectionStrategy} from '@angular/core';
import {D3Service, ForceDirectedGraph, Node, NodeService} from '../../d3';
import {Subscription} from "rxjs";

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
      </g>
    </svg>
  `,
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {
  @Input('nodes') nodes;
  @Input('links') links;

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
              private nodeService: NodeService){}

  ngOnInit() {
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
  }

  ngOnChanges(change) {
    if (this.graph) {
      this.graph.links = this.links;
      this.graph.simulation.nodes(this.nodes);
      this.graph.initLinks();
      this.graph.simulation.restart();
    }
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }

  private _options: {width, height} = {width: 800, height: 600};

  get options() {
    return this._options = {
      width: window.outerHeight*.958,
      height: window.outerHeight*.5
    };
  }
}
