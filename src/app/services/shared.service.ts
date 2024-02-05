import { EventEmitter, Injectable } from '@angular/core';
import { LoggedInCredentials } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  productEventEmitter: EventEmitter<string> = new EventEmitter();
  subcategoryEventEmitter: EventEmitter<string> = new EventEmitter();
  cartEventEmitter: EventEmitter<string> = new EventEmitter();

  getLocalObject(): LoggedInCredentials | null {
    return sessionStorage.getItem('panda-shop')
      ? JSON.parse(sessionStorage['panda-shop'])
      : null;
  }

  getToken(): string {
    return sessionStorage.getItem('panda-shop')
      ? JSON.parse(sessionStorage['panda-shop']).token
      : '';
  }
}
