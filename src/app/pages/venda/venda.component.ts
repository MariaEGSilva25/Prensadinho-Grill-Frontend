
import { EstoqueService } from './../../../services/estoque.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UtilsModalService } from '../../../services/utils-modal.service';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';
import { DeleteAllService } from '../../../services/delete-all.service';
import { CadastroService } from '../../../services/cadastro.service';
import { Product } from '../../../types/Product';

@Component({
  selector: 'app-venda',
  standalone: true,
  imports: [CommonModule, FormsModule, CadastroComponent, ConfirmationComponent],
  templateUrl: './venda.component.html',
  styleUrl: './venda.component.css'
})
export class VendaComponent {


  chamaModalConfirmation(arg0: string) {
    throw new Error('Method not implemented.');
  }
  botoes = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','];

  tiposSelecionados: string[] = [];
  valorAtual = '';
  executarGet : boolean = false;

  itens = [
    { qtd: 0, nome: '', valor: 0 },
    { qtd: 0, nome: '', valor: 0 },
  ];

  cadastroFiado: Product[] = []

  desconto = 0;

  constructor(public utilsModal: UtilsModalService,
    private estoqueService: EstoqueService,
    private deleteAll: DeleteAllService,
    private cadastroService: CadastroService) {

  }

  ngOnInit() {
    //corrigir erro do modal de confirmação iniciar como true
    this.utilsModal.confirmationModal = false;
    console.log("Valor do modal de confirmação: ", this.utilsModal.confirmationModal);


    this.estoqueService.getAllProducts().subscribe({

      next: (response) => {
        if(!this.executarGet){
          console.log("Bloqueado pelo controle")
          return
        }

        const isArrayResponse = Array.isArray(response) ? response : []

        console.log('Produtos recebidos:', response);
        console.log('Valor do isArrayResponse:', isArrayResponse);
        this.cadastroFiado = (isArrayResponse)
        this.itens = (isArrayResponse).map((item: any) => ({
          qtd: item.quantity,
          nome: item.name,
          valor: item.unitPrice
        }))
      },
      error: (error) => {
        console.error('Erro ao buscar produtos:', error);
      }
    })
  }

  get itensFiltrados() {
    return this.itens.filter(i => i.qtd !== 0 && i.nome !== '');
  }



  get subtotal() {
    return this.itens.reduce((soma, item) => soma + item.valor * item.qtd, 0);
  }

  get total() {
    return this.subtotal - this.desconto;
  }

  adicionarValor(btn: string) {
    this.valorAtual += btn;
  }

  apagar() {
    this.valorAtual = this.valorAtual.slice(0, -1);
  }

  confirmar() {
    alert('Valor confirmado: ' + this.valorAtual);
  }

  selecionarTipo(tipo: string) {
    this.tiposSelecionados.push(`${tipo} - R$ ${this.valorAtual}`);
    this.valorAtual = '';
  }


  receberValor() {
    const condicao1 = this.itens[0].valor !== 0;
    const condicao2 = this.tiposSelecionados.length != 0;

    if (condicao1 && condicao2) {
      console.log('tipo selecionado: ', this.tiposSelecionados);
      this.utilsModal.openModalConfirmation(true)

      this.deletarProdutos();

    } else {
      alert('Você tem um debito pendente, pague o que deve!');
    }
  }

  cadastrarFiado() {

    this.utilsModal.openModal('simples')

  }


  deletarProdutos() {
    this.deleteAll.deleteAllProducts().subscribe({
      next: (response) => {
        console.log('Produtos deletados:', response);
      },
      error: (error) => {
        console.error('Erro ao deletar produtos:', error);
      }
    })

  }
}



