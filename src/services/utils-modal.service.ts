import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsModalService {
  formMode: string = 'completo';

  showModal: boolean = false;

  confirmationModal: boolean = false;

  cancelConfirmation: boolean = false;

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

  openModalConfirmation(modalActivit: boolean): void {
    this.confirmationModal = modalActivit;
    console.log('Modal opened');
  }

  closeModalConfirmation(): void {
    this.confirmationModal = false;
    console.log('Modal closed');
  }

  cancelModalConfirmation(cancelConfirmationParan: boolean): void {

    this.confirmationModal = true;
    this.cancelConfirmation = cancelConfirmationParan;
    console.log('me chamou, abri o modal de confirmação(setei o valor true) e atribui o este valor a cancelConfirmation: ', this.cancelConfirmation);
  }
}
