import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080/products';

  getAllProducts() {
    return this.http.get(this.url);
  }
}
