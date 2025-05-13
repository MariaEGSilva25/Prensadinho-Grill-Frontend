import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsModalService {
  showModal: boolean = false;

  openModal(): void {
    this.showModal = true;
    console.log('Modal opened');
  }

  closeModal(): void {
    this.showModal = false;
    console.log('Modal closed');
  }
}
