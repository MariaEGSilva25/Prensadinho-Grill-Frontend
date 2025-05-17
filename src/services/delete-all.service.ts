import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteAllService {
  private url = 'http://localhost:8080/products/delete-all';

  constructor(private http: HttpClient) { }

  deleteAllProducts(){
    return this.http.delete(this.url)
  }
}
