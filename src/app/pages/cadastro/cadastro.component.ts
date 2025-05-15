import { UtilsModalService } from './../../../services/utils-modal.service';
import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SucessComponent } from '../components/sucess/sucess.component';



@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf, SucessComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  cadastroForm!: FormGroup;
  showSuccessModal: boolean = false;
  formMode: string = this.utilsModal.formMode;

  constructor(private utilsModal: UtilsModalService) {

    if (this.utilsModal.formMode === 'completo') {
      this.cadastroForm = new FormGroup({
        idProduto: new FormControl('', Validators.required),
        descricao: new FormControl('', Validators.required),
        preco: new FormControl('', Validators.required),
        estoqueMinimo: new FormControl('', Validators.required),
        estoqueMaximo: new FormControl('', Validators.required),
      });
    } else {
      this.cadastroForm = new FormGroup({
        nomeFiado: new FormControl('', Validators.required),
        telefoneFiado: new FormControl('', Validators.required),
      });
    }
  }

  close() {
    this.utilsModal.closeModal();
    console.log('Modal closed');
  }


  // onSubmit() {
  //   if (this.cadastroForm.valid) {
  //     const cadastroData = this.cadastroForm.value;
  //     // quando o formulario for valido, exibir toast e fechar o modal
  //     this.showSuccessModal = true;
  //     console.log('cadastro enviado:', cadastroData);


  //   } else {
  //     console.log('Formulário inválido');
  //     this.cadastroForm.markAllAsTouched();
  //   }
  // }

  onSubmit() {
    if (this.cadastroForm.valid) {
      const cadastroData = this.cadastroForm.value;

      this.showSuccessModal = true;
      console.log('cadastro enviado:', cadastroData);

      setTimeout(() => {
        this.showSuccessModal = false;
        this.close();
      }, 2000);

    } else {
      console.log('Formulário inválido');
      this.cadastroForm.markAllAsTouched();
    }
  }
}
