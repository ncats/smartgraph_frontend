import {Component, ViewEncapsulation, ViewChild, AfterViewInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoadingService} from './services/loading.service';
import {SettingsService} from './services/settings.service';
import {DataConnectionService} from "./services/data-connection.service";
import {Message, MessageService} from "./services/message.service";


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
}
