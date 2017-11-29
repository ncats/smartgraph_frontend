import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../assets/material/material.module';


import {D3Service} from './d3/d3.service';
import {NodeService} from './d3/models/node.service';

import { AppComponent } from './app.component';

import { GraphComponent } from './visuals/graph/graph.component';
import {NodeVisualComponent, StructureViewer} from './visuals/shared/node-visual/node-visual.component';
import { LinkVisualComponent } from './visuals/shared/link-visual/link-visual.component';

import {WebSocketService} from './services/websocket.service';
import {DataConnectionService} from './services/data-connection.service';
import {MessageService} from './services/message.service';
import { NodeDetailsVisualComponent } from './visuals/details/node-details-visual/node-details-visual.component';
import {NodeMenuComponent} from './visuals/shared/node-menu/node-menu.component';
import {NodeMenuControllerService} from './services/node-menu-controller.service';
import {GraphDataService} from './services/graph-data.service';
import { SmrtgraphSearchComponent } from './smrtgraph-search/smrtgraph-search.component';
import { SmrtgraphMenuComponent } from './smrtgraph-menu/smrtgraph-menu.component';
import {DownloadButtonComponent} from './download-button/download-button.component';
import { LinkDetailsVisualComponent } from './visuals/details/link-details-visual/link-details-visual.component';
import {LinkService} from './d3/models/link.service';
import {ZoomableDirective} from './d3/directives/zoomable.directive';
import {HoverableLinkDirective} from './d3/directives/hoverable-link.directive';
import {HoverableNodeDirective} from './d3/directives/hoverable-node.directive';
import {DraggableDirective} from './d3/directives/draggable.directive';
import {ClickableNodeDirective} from './d3/directives/clickable-node.directive';
import { GraphDetailsComponent } from './visuals/details/graph-details/graph-details.component';
import {LoadingService} from './services/loading.service';
import { CompoundDetailViewComponent } from './visuals/details/node-details-visual/node-types/compound-detail-view/compound-detail-view.component';
import { PatternDetailViewComponent } from './visuals/details/node-details-visual/node-types/pattern-detail-view/pattern-detail-view.component';
import { LinkListVisualComponent } from './visuals/details/link-list-visual/link-list-visual.component';
import { LinkDatabase} from './visuals/details/link-list-visual/link-database.service';
import { ReactionVisualComponent } from './visuals/details/link-list-visual/reaction-visual/reaction-visual.component';
import {SettingsService} from './services/settings.service';
import { SmrtgraphSettingsComponent } from './smrtgraph-settings/smrtgraph-settings.component';
import {TargetDetailViewComponent} from "./visuals/details/node-details-visual/node-types/target-detail-view/target-detail-view.component";
import {ClickableLinkDirective} from "./d3/directives/clickable-link.directive";


@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    NodeDetailsVisualComponent,
    NodeMenuComponent,
    StructureViewer,
    SmrtgraphMenuComponent,
    SmrtgraphSearchComponent,
    DownloadButtonComponent,
    LinkDetailsVisualComponent,
    NodeVisualComponent,
    LinkVisualComponent,
    ZoomableDirective,
    HoverableLinkDirective,
    HoverableNodeDirective,
    DraggableDirective,
    ClickableNodeDirective,
    ClickableLinkDirective,
    GraphDetailsComponent,
    TargetDetailViewComponent,
    CompoundDetailViewComponent,
    PatternDetailViewComponent,
    LinkListVisualComponent,
    ReactionVisualComponent,
    SmrtgraphSettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    WebSocketService,
    DataConnectionService,
    D3Service,
    NodeService,
    LinkService,
    MessageService,
    GraphDataService,
    NodeMenuControllerService,
    LoadingService,
    LinkDatabase,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
