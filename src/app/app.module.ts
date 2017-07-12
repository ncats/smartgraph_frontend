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
import {DataService} from "./services/data.service";
import {SearchService} from "./services/search.service";
import {MessageService} from "./services/message.service";
import {WebWorkerService} from "./services/web-worker.service";
import { NodeDetailsVisualComponent } from './visuals/shared/node-details-visual/node-details-visual.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES,
    NodeDetailsVisualComponent
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
    DataService,
    D3Service,
    NodeService,
    SearchService,
    WebWorkerService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
