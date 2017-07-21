export * from './node-visual/node-visual.component';
export * from './node-menu/node-menu.component';
export * from './node-details-visual/node-details-visual.component';
export * from './link-visual/link-visual.component';
export * from './tooltip-visual/tooltip-visual.component';

import { NodeVisualComponent } from './node-visual/node-visual.component';
import { NodeMenuComponent } from './node-menu/node-menu.component';
import { NodeDetailsVisualComponent } from './node-details-visual/node-details-visual.component';
import { LinkVisualComponent } from './link-visual/link-visual.component';
import {TooltipVisualComponent} from "./tooltip-visual/tooltip-visual.component";

export const SHARED_VISUALS = [
    NodeVisualComponent,
    LinkVisualComponent,
    TooltipVisualComponent,
  NodeDetailsVisualComponent,
  NodeMenuComponent
];
