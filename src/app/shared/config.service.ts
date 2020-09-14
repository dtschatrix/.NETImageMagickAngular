import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  get authApiURI(): string {
    return 'https://localhost:5001/api';
  }

  get resourceApiURI(): string {
    return 'http://localhost:6001/api';
  }
}
