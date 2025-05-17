import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiadoService {

  url = 'http://localhost:8080/spuns';

  constructor(private http: HttpClient ) { }

  getAllFiados() {
    return this.http.get(this.url);
  }
  getFiadoById(id: number) {
    return this.http.get(`http://localhost:8080/fiado/${id}`);
  }

  criarClienteFiado(dadosCLienteFiado: any): Observable<any> {
    return this.http.post(this.url, dadosCLienteFiado);
  }
}
