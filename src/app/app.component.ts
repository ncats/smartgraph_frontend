import {Component, ViewEncapsulation, ViewChild, AfterViewInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoadingService} from './services/loading.service';
import {SettingsService} from './services/settings.service';
import {DataConnectionService} from './services/data-connection.service';
import {Message, MessageService} from './services/message.service';
import {GraphComponent} from './visuals/graph/graph.component';
import * as d3 from 'd3';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})

export class AppComponent implements AfterViewInit {
  title = 'smrtgraph';
  loading = true;

  subscription: Subscription;
  @ViewChild(GraphComponent, {static: true}) graphInstance: GraphComponent;
  @ViewChild('settingsToggle', { static: true }) public settingsToggle;

  constructor(
    private loadingService: LoadingService,
    public settingsService: SettingsService,
    private dataConnectionService: DataConnectionService,
    private messageService: MessageService
  ) {
    this.loadingService.toggleVisible(true);
  }

  ngAfterViewInit(): void {
    this.settingsService.sidenav = this.settingsToggle;
  }

  reset() {
    d3.select(this.graphInstance.el.nativeElement)
      .select('svg')
      .transition()
      .duration(750)
      .call(this.graphInstance.d3Service.zoom.transform, d3.zoomIdentity);
/*    this.k = 1;
    this.voronoiGroup.transition()
      .duration(750)
      .call(this.zoom.transform, d3.zoomIdentity);*/
  }

}
