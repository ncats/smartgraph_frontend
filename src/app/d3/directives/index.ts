import { ZoomableDirective } from './zoomable.directive';
import { DraggableDirective } from './draggable.directive';
import { HoverableDirective } from './hoverable.directive';
import {ClickableDirective} from "./clickable.directive";

export * from './zoomable.directive';
export * from './draggable.directive';
export * from './hoverable.directive';
export * from './clickable.directive';

export const D3_DIRECTIVES = [
    ZoomableDirective,
    DraggableDirective,
    HoverableDirective,
    ClickableDirective
];
