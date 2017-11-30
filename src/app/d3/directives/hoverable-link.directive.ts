import { Directive, Input, ElementRef } from '@angular/core';
import { D3Service } from '../d3.service';
import {Link} from '../models/link';
import {ForceDirectedGraph} from '../models/force-directed-graph';

@Directive({
    selector: '[hoverableLink]'
})
export class HoverableLinkDirective {
    @Input('hoverableLink') link: Link;

    constructor(private d3Service: D3Service, private _element: ElementRef) { }

    ngOnInit() {
        this.d3Service.applyHoverableLinkBehaviour(this._element.nativeElement, this.link);
    }
}
