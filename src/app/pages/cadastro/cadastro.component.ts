import { CadastroService } from './../../../services/cadastro.service';
import { UtilsModalService } from './../../../services/utils-modal.service';
import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SucessComponent } from '../components/sucess/sucess.component';
import { HttpClientModule } from '@angular/common/http';
import { FiadoService } from '../../../services/fiado.service';
import { DeleteAllService } from '../../../services/delete-all.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { OrdersService } from '../../../services/orders.service';


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
    private deleteAll: DeleteAllService,
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

        this.fiadoService.criarClienteFiado(cadastroFiadoData).subscribe({
          next: (response) => {
            console.log('Fiado criado com sucesso:', response);

            this.sharedService.currentOrder$.subscribe(orders => {
              orders.spun = cadastroFiadoData
              console.log("valor orders", orders.items[0].quantity);

              // post orders
              this.orderService.criarFiado(orders).subscribe({
                next: (response) => {
                  console.log("Urru deu certo! ", response);
                  this.exibirModalSucesso()
                  this.route.navigate(['/home'])
                },
                error: (error) => {
                  throw error
                }
              });
            });



          },
          error: (error) => {
            console.error('Erro ao criar fiado:', error);
          }
        });


      }
    } else {
      console.log('Formulário inválido');
      this.cadastroForm.markAllAsTouched();
    }
  }

  // ✅ Aqui está o método que você perguntou
  private exibirModalSucesso() {
    this.showSuccessModal = true;
    setTimeout(() => {
      this.close();
      this.showSuccessModal = false;
    }, 2000);
  }


}

