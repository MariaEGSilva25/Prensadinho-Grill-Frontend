import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  contador = 0;
  private unitPrices: number[] = [];

  private ordersSource = new BehaviorSubject<any>(null);
  currentOrder$ = this.ordersSource.asObservable();

  addUnitPrice(price: number) {
    this.unitPrices.push(price)
  }

  getUnitPrices(){
    return this.unitPrices;
  }

  setOrders(cadastroFiado: any){
    this.ordersSource.next(cadastroFiado)
  }

}
