import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-disclaimer-modal',
  templateUrl: './about-modal.component.html',
  styleUrls: ['./about-modal.component.scss']
})
export class AboutModalComponent implements OnInit {

  apiSwaggerUrl: string;

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.apiSwaggerUrl = this.configService.get('API_SWAGGER_URL');
  }

}
