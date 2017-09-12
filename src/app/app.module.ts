import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';


import {D3Service, D3_DIRECTIVES, NodeService} from './d3';

import { AppComponent } from './app.component';

import { GraphComponent } from './visuals/graph/graph.component';
import { SHARED_VISUALS } from './visuals/shared';

import {WebSocketService} from "./services/websocket.service";
import {DataConnectionService} from "./services/data-connection.service";
import {SearchService} from "./services/search.service";
import {MessageService} from "./services/message.service";
import { NodeDetailsVisualComponent } from './visuals/shared/node-details-visual/node-details-visual.component';
import {NodeMenuComponent, NodeMenuHolderComponent} from './visuals/shared/node-menu/node-menu.component';
import {NodeMenuControllerService} from "./services/node-menu-controller.service";
import {GraphDataService} from "./services/graph-data.service";
import { SmrtgraphSearchComponent } from './smrtgraph-search/smrtgraph-search.component';
import { SmrtgraphMenuComponent } from './smrtgraph-menu/smrtgraph-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES,
    NodeDetailsVisualComponent,
    NodeMenuComponent,
    NodeMenuHolderComponent,
    SmrtgraphMenuComponent,
    SmrtgraphSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    WebSocketService,
    DataConnectionService,
    D3Service,
    NodeService,
    SearchService,
    MessageService,
    GraphDataService,
    NodeMenuControllerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
