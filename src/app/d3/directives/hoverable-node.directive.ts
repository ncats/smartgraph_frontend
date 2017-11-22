import { Directive, Input, ElementRef } from '@angular/core';
import { D3Service } from '../d3.service';
import {Node} from '../models/node';
import {ForceDirectedGraph} from '../models/force-directed-graph';

@Directive({
    selector: '[hoverableNode]'
})
export class HoverableNodeDirective {
    @Input('hoverableNode') node: Node;
    @Input('draggableInGraph') graph: ForceDirectedGraph;

    constructor(private d3Service: D3Service, private _element: ElementRef) { }

    ngOnInit() {
        this.d3Service.applyHoverableNodeBehaviour(this._element.nativeElement, this.node, this.graph);
    }
}
