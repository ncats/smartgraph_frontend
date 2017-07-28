import { Directive, Input, ElementRef } from '@angular/core';
import { D3Service, Node, ForceDirectedGraph } from '../';

@Directive({
    selector: '[clickableNode]'
})
export class ClickableDirective {
    @Input('clickableNode') node: Node;
  @Input('draggableInGraph') graph: ForceDirectedGraph;


  constructor(private d3Service: D3Service, private _element: ElementRef) { }

    ngOnInit() {
        this.d3Service.applyClickableBehaviour(this._element.nativeElement, this.node, this.graph);
    }
}
