import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/apiresponse';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  // Common Function for posting to database
  Post<ReqT, ResT>(model: ReqT, url: string): Observable<ApiResponse<ResT>> {
    return this.httpClient.post<ApiResponse<ResT>>(
      environment.apiBaseUrl + url,
      model
    );
  }

  // Common Function for retrieving data from database
  Fetch<ResT>(url: string): Observable<ApiResponse<ResT>> {
    return this.httpClient.get<ApiResponse<ResT>>(environment.apiBaseUrl + url);
  }
  // Common Function for delete data from database
  Delete<ResT>(url: string): Observable<ApiResponse<ResT>> {
    return this.httpClient.delete<ApiResponse<ResT>>(
      environment.apiBaseUrl + url
    );
  }

  // Common Function for updating data into database
  Update<ReqT, ResT>(model: ReqT, url: string): Observable<ApiResponse<ResT>> {
    return this.httpClient.put<ApiResponse<ResT>>(
      environment.apiBaseUrl + url,
      model
    );
  }

  // Common Function for retrieving specific item from database
  Find<ResT>(url: string): Observable<ApiResponse<ResT>> {
    return this.httpClient.get<ApiResponse<ResT>>(environment.apiBaseUrl + url);
  }

  logOut() {
    environment
      .fireConfirmSwal('Are you sure you want to Logout?')
      .then((res) => {
        if (res.isConfirmed) {
          sessionStorage.removeItem('panda-shop');
          this.router.navigate(['/login']);
        }
      });
  }
}
