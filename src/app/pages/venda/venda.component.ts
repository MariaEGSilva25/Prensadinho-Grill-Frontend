
import { EstoqueService } from './../../../services/estoque.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UtilsModalService } from '../../../services/utils-modal.service';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';
import { DeleteAllService } from '../../../services/delete-all.service';
import { OrdersService } from '../../../services/orders.service';


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

  itens = [
    { id: 0, qtd: 0, nome: '', valor: 0 },
  ];
  // usar esse objeto para montar a requisição post orders
  cadastroFiado =
    {
      items: [
        {
          productCode: 1,
          quantity: 1
        },
      ],
      type: 'CREDIT',
      spun: {
        name: "Marcos",
        phone: "11111111111"
      },
    }



  desconto = 0;

  constructor(public utilsModal: UtilsModalService,
    private estoqueService: EstoqueService,
    private deleteAll: DeleteAllService,
    private orderService: OrdersService,
  ) {

  }

  ngOnInit() {

    //corrigir erro do modal de confirmação iniciar como true
    this.utilsModal.confirmationModal = false;
    console.log("Valor do modal de confirmação: ", this.utilsModal.confirmationModal);

    // executa get de produtos
    this.estoqueService.getAllProducts().subscribe({
      next: (response) => {
        const isArrayResponse = Array.isArray(response) ? response : []

        // faz map para criar um novo objeto com os dados da requisição
        this.itens = (isArrayResponse).map((item: any) => ({
          id: item.productCode,
          qtd: item.quantity,
          nome: item.name,
          valor: item.unitPrice
        }))

        // this.cadastrarFiado = this.itens[0]
        console.log(this.itens);
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
      this.utilsModal.openModalConfirmation(true);
      this.deletarProdutos();
    } else {
      alert('Você tem um debito pendente, pague o que deve!');
    }
  }

  cadastrarFiado() {
    // this.cadastrarFiado = this.itens.map((item: any) => ({
    //   id: item.productCode,
    //   qtd: item.quantity,
    //   nome: item.name,
    //   valor: item.unitPrice
    // }))

    this.cadastroFiado.items = this.itens.map((item: any) => ({
      productCode: item.id,
      quantity: item.qtd,
    }))

    // montar valores pra req post
    this.utilsModal.openModal('simples')




    console.log(this.cadastroFiado.items)

    this.orderService.criarFiado(this.cadastroFiado).subscribe({
      next: (response) => {
        console.log("Urru deu certo! ", response);
      },
      error: (error) => {
        console.log("droga deu errado", error);
      }
    })

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



