import { CadastroService } from './../../../services/cadastro.service';
import { UtilsModalService } from './../../../services/utils-modal.service';
import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SucessComponent } from '../components/sucess/sucess.component';
import { HttpClientModule } from '@angular/common/http';
import { FiadoService } from '../../../services/fiado.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { OrdersService } from '../../../services/orders.service';
import { EMPTY, switchMap, take } from 'rxjs';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf, SucessComponent, HttpClientModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  cadastroForm!: FormGroup;
  showSuccessModal: boolean = false;
  formMode: string = this.utilsModal.formMode;


  constructor(private utilsModal: UtilsModalService,
    private cadastroService: CadastroService,
    private fiadoService: FiadoService,
    private sharedService: SharedService,
    private orderService: OrdersService,
    private route: Router) {

    if (this.utilsModal.formMode === 'completo') {
      this.cadastroForm = new FormGroup({
        productCode: new FormControl('', Validators.required),
        //mudei o nome do campo descricao para name
        name: new FormControl('', Validators.required),
        quantity: new FormControl('', Validators.required),
        unitPrice: new FormControl('', Validators.required),
        minimumStock: new FormControl('', Validators.required),
        maximumStock: new FormControl('', Validators.required),
      });
    } else {
      this.cadastroForm = new FormGroup({
        name: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
      });
    }
  }

  close() {
    this.utilsModal.closeModal();
    console.log('Modal closed');
  }


onSubmit() {
  if (this.cadastroForm.valid) {
    const cadastroData = this.cadastroForm.value;

    if (this.formMode === 'completo') {
      this.cadastroService.criarProduto(cadastroData).subscribe({
        next: (response) => {
          console.log('Produto criado com sucesso:', response);
          this.exibirModalSucesso();
        },
        error: (error) => {
          console.error('Erro ao criar produto:', error);
        }
      });
    } else {
      const cadastroFiadoData = this.cadastroForm.value;

      console.log('Cadastro de fiado funcionando, olha o valor dele ai: ', cadastroFiadoData);

      this.fiadoService.criarClienteFiado(cadastroFiadoData).pipe(
        switchMap((response) => {
          console.log('Fiado criado com sucesso:', response);

          // Validações
          const isNameValid = cadastroFiadoData.name.trim() !== '';
          const isPhoneValid = cadastroFiadoData.phone.toString().length >= 10;

          if (isNameValid && isPhoneValid) {
            return this.sharedService.currentOrder$.pipe(
              take(1),
              switchMap(orders => {
                const newOrder = { ...orders, spun: cadastroFiadoData };
                console.log("valor orders", newOrder.items[0].quantity);

                if (cadastroData) {
                  console.log("rodei aqui!");
                  this.exibirModalSucesso()
                  return this.orderService.criarFiado(newOrder);
                } else {
                  console.log("Orders inválido, não enviando.");
                  return EMPTY;  // Importar do rxjs
                }
              })
            );
          } else {
            console.log("Dados inválidos para fiado.");
            return EMPTY;
          }
        })
      ).subscribe({
        next: (response) => {
          if (response) {
            console.log("Urru deu certo! ", response);
            this.exibirModalSucesso();
          }
        },
        error: (error) => {
          console.error('Erro ao criar fiado ou ordem:', error);
        }
      });
    }
  } else {
    console.log('Formulário inválido');
    this.cadastroForm.markAllAsTouched();
  }
}



  private exibirModalSucesso() {
    this.showSuccessModal = true;
    setTimeout(() => {
      this.close();
      this.showSuccessModal = false;
      this.route.navigate(["/home"]);
    }, 2000);
  }


}

