import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private URL = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  getInfo() {
    return this.http.get<any>(this.URL + '/getInfoUser');
  }
  getBalance() {
    return this.http.get<any>(this.URL + '/getBalance');
  }

  getTransacciones() {
    return this.http.get<any>(this.URL + '/getTransacciones');
  }

  getTarjetas() {
    return this.http.get<any>(this.URL + '/getTarjetas');
  }
}
