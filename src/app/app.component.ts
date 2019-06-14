import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoadingService} from './services/loading.service';
import {SettingsService} from './services/settings.service';
import {DataConnectionService} from "./services/data-connection.service";
import {Message, MessageService} from "./services/message.service";


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

  @ViewChild('settingsToggle', { static: true }) public settingsToggle;

  constructor(
    private loadingService: LoadingService,
    public settingsService: SettingsService,
    private dataConnectionService: DataConnectionService,
    private messageService: MessageService
  ) {
    this.loadingService.toggleVisible(true);
  }
  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.settingsService.sidenav = this.settingsToggle;
    const value: {} = {
      end: ["bf76473e-a1dd-4198-8174-6fb5c92a4fee",
        "69b04e9f-1b42-4cd2-8e06-392ad61e024f",
        "f363da85-23f0-4f49-8cb5-527c578f9a4d",
        "9eeda47e-dcfa-4c23-95ff-996f1e54fc82"],

      start:["489c2bf7-0333-454d-bec1-ff2ec2f7a450", "d432258a-231a-4e64-89b3-71fbc3952942",
        "604dbdc3-a1bd-46ad-b19f-d82afdee387f",
        "953c70cf-d0f6-418c-8949-e105b0004fca",
        "54c43ef8-3627-487b-b693-8ae17c135273"]
    };

    const params: {} = {
      distance: 5,
      confidence: 0,
      activity: 10,
      hasCompound: true
    };
    const query: Message = this.messageService.getMessage(value, 'path', params);
    this.dataConnectionService.messages.next(query);
  }


  ngOnDestroy() {
    //  prevent memory leak when component is destroyed
   //  this.subscription.unsubscribe();
  }
}
