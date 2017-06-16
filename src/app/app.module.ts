import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';


import {D3Service, D3_DIRECTIVES, NodeService} from './d3';

import { AppComponent } from './app.component';

import { GraphComponent } from './visuals/graph/graph.component';
import { SHARED_VISUALS } from './visuals/shared';

import { CytoscapeComponent } from './cytoscape/cytoscape.component';
import {WebSocketService} from "./websocket.service";
import {GraphService} from "./graph.service";
import {DataService} from "../data.service";

@NgModule({
  declarations: [
    AppComponent,
    CytoscapeComponent,
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [
    WebSocketService,
    GraphService,
    DataService,
    D3Service,
    NodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
