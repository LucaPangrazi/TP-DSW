import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Sucursal } from '../interfaces/sucursal';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  private myAppUrl: string;
  private myApiUrl: string;
  

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/sucursales/'
  }

  getListSucursales(): Observable<Sucursal[]> {
  return this.http.get<Sucursal[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteSucursal(id:number): Observable<void>{
  return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  saveSucursal(sucursal: Sucursal):Observable<void> {
    return  this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, sucursal)
  }

  getSucursal(id: number): Observable<Sucursal> {
    return this.http.get<Sucursal>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateSucursal(id: number, sucursal: Sucursal): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, sucursal)
  }
}
