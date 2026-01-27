
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/home-banner';
  }

  getBanner(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
  }

  updateBanner(formData: FormData): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, formData);
  }
}
