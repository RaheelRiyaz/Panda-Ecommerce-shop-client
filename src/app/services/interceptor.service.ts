import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  service:SharedService;
  constructor(sharedService:SharedService) { 
    this.service=sharedService
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req.clone({
      setHeaders: {
        Authorization: 'Bearer '+ this.service.getToken(),
      },  
    }));
  }
}
