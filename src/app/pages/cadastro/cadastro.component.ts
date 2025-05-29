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

        const unitPrice = cadastroFiadoData.unitPrice

        this.sharedService.addUnitPrice(unitPrice)
        console.log("Eu sou a velocidade: ", unitPrice)

        this.fiadoService.criarClienteFiado(cadastroFiadoData).subscribe({
          next: (response) => {
            console.log('Fiado criado com sucesso:', response);

            this.exibirModalSucesso();
                setTimeout(() => {
                  this.route.navigate(['/home']);
                }, 2000);

            // this.deleteAll.deleteAllProducts().subscribe({
            //   next: (response) => {
            //     console.log('Produtos deletados:', response);

            //     // ✅ Exibe o modal e depois de 2 segundos navega

            //   },
            //   error: (error) => {
            //     console.error('Erro ao deletar produtos:', error);

            //     // Mesmo se der erro, você pode exibir o modal e depois navegar
            //     this.exibirModalSucesso();
            //     setTimeout(() => {
            //       this.route.navigate(['/home']);
            //     }, 2000);
            //   }
            // });

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
