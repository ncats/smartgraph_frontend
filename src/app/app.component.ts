import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoadingService} from './services/loading.service';
import {SettingsService} from './services/settings.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})

export class AppComponent {
  title = 'smrtgraph';
  loading = true;

  subscription: Subscription;

  @ViewChild('settingsToggle') public settingsToggle;

  constructor(
    private loadingService: LoadingService,
    public settingsService: SettingsService
  ) {
    this.loadingService.toggleVisible(true);
  }
  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.settingsService.sidenav = this.settingsToggle;
  }

  ngOnDestroy() {
    //  prevent memory leak when component is destroyed
   //  this.subscription.unsubscribe();
  }
}
