import { Directive, Input, ElementRef } from '@angular/core';
import { D3Service } from '../d3.service';
import {ForceDirectedGraph} from '../models/force-directed-graph';
import {Link} from "../models/link";


@Directive({
    selector: '[clickableLink]'
})
export class ClickableLinkDirective {
    @Input('clickableLink') link: Link;
  @Input('draggableInGraph') graph: ForceDirectedGraph;


  constructor(private d3Service: D3Service, private _element: ElementRef) { }

    ngOnInit() {
        this.d3Service.applyClickableLinkBehaviour(this._element.nativeElement, this.link, this.graph);
    }
}
