export * from './node-visual/node-visual.component';
export * from './link-visual/link-visual.component';
export * from './tooltip-visual/tooltip-visual.component';

import { NodeVisualComponent } from './node-visual/node-visual.component';
import { LinkVisualComponent } from './link-visual/link-visual.component';
import {TooltipVisualComponent} from "./tooltip-visual/tooltip-visual.component";

export const SHARED_VISUALS = [
    NodeVisualComponent,
    LinkVisualComponent,
    TooltipVisualComponent
];
