import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  contador = 0;
  private unitPrices: number[] = [];

  addUnitPrice(price: number) {
    this.unitPrices.push(price)
  }

  getUnitPrices(){
    return this.unitPrices;
  }



}
