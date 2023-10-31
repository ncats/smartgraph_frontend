// src/app/config.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  loadConfig(): Promise<any> {
    return this.http.get('/assets/config.json').toPromise().then((config) => {
      this.config = config;
    });
  }

  get(key: string) {
    return this.config[key];
  }
}