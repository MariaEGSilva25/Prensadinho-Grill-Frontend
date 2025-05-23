import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private unitPrice: number = 0;

  setUnitPrice(price: number) {
    this.unitPrice = price;
  }

  getUnitPrice(): number {
    return this.unitPrice;
  }
}
