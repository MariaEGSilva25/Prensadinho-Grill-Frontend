import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private url = 'http://localhost:8080/products';

  constructor(private http:  HttpClient) {}

    criarProduto(dadosProd: any): Observable<any> {
    return this.http.post(this.url, dadosProd);
  }

  atualizarProduto(dadosProdUpdate: any, id: number) : Observable<any>{
    return this.http.put(`${this.url}/${id}`, dadosProdUpdate)
  }
}
