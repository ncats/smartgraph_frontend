import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CytoscapeComponent } from './cytoscape/cytoscape.component';
import {WebSocketService} from "./websocket.service";
import {GraphService} from "./graph.service";

@NgModule({
  declarations: [
    AppComponent,
    CytoscapeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    WebSocketService,
    GraphService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
