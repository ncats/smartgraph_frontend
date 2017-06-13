import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { D3Service, D3_DIRECTIVES } from './d3';

import { AppComponent } from './app.component';

import { GraphComponent } from '../../../smartgraph_frontend/src/app/visuals/graph/graph.component';
import { SHARED_VISUALS } from '../../../smartgraph_frontend/src/app/visuals/shared';

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
    HttpModule
  ],
  providers: [
    WebSocketService,
    GraphService,
    DataService,
    D3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
