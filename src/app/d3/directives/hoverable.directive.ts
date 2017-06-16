import { Directive, Input, ElementRef } from '@angular/core';
import { D3Service, Node, ForceDirectedGraph } from '../';

@Directive({
    selector: '[hoverableNode]'
})
export class HoverableDirective {
    @Input('hoverableNode') node: Node;
    //@Input('draggableInGraph') graph: ForceDirectedGraph;

    constructor(private d3Service: D3Service, private _element: ElementRef) { }

    ngOnInit() {
        this.d3Service.applyHoverableBehaviour(this._element.nativeElement, this.node);
    }
}
