// src/app/config.service.ts
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT, Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private location: Location
  ) {}

  loadConfig(): Promise<any> {
    const baseUrl = this.document.location.origin + this.location.prepareExternalUrl('/');
    const configUrl = `${baseUrl}assets/config.json`;
  
    return this.http.get(configUrl).toPromise().then((config) => {
      this.config = config;
    });
  }

  get(key: string) {
    return this.config[key];
  }
}