import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  url : string =  "http://localhost:8080/orders";

  constructor(private http :HttpClient) {}

  criarFiado(dataOrder: any): Observable<any>{
    return this.http.post(this.url, dataOrder);
  }

  getOrders(): Observable<any>{
    return this.http.get(this.url)
  }
}
