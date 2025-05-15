import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsModalService {
  formMode: string = 'completo';

  showModal: boolean = false;

  openModal(formModeParan: string): void {

    console.log('formMode:', formModeParan);
    this.formMode = formModeParan
    this.showModal = true;
    console.log('Modal opened');
  }

  closeModal(): void {
    this.showModal = false;
    console.log('Modal closed');
  }
}
