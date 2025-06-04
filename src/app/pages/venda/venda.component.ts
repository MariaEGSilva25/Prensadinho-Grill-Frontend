
import { EstoqueService } from './../../../services/estoque.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UtilsModalService } from '../../../services/utils-modal.service';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';
import { DeleteAllService } from '../../../services/delete-all.service';
import { SharedService } from '../../../services/shared.service';
import { CadastroService } from '../../../services/cadastro.service';


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
    { id: -1, qtd: 0, nome: '', valor: 0 },
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
  updateProduto = [{
        productCode: 0,
        name: "",
        unitPrice: 0,
				quantity: 0,
        minimumStock: 0,
        maximumStock: 0
}]
  desconto = 0;
  pago = false;

  constructor(public utilsModal: UtilsModalService,
    private estoqueService: EstoqueService,
    private deleteAll: DeleteAllService,
    private sharedService: SharedService,
    private cadastroComponent: CadastroService
  ) { }

  ngOnInit() {
    //corrigir erro do modal de confirmação iniciar como true
    this.utilsModal.confirmationModal = false;
    console.log("Valor do modal de confirmação: ", this.utilsModal.confirmationModal);

    // verificando se tal valo é igual a zero
    console.log("Valor de itens: ", this.itens[0]);

    // executa get de produtos
    this.estoqueService.getAllProducts().subscribe({
      next: (response) => {
        const isArrayResponse = Array.isArray(response) ? response : []
        //sempre add o obj na primeira posição do meu array
        console.log("valor do array: ", isArrayResponse);
        isArrayResponse.forEach((item: any) => {
          let newItem;

          if (item.quantity === 0) {
            console.log("sou igual a zero");
            newItem = { id: -1, qtd: 0, nome: '', valor: 0 }
          } else {
            newItem = {
              id: item.productCode,
              qtd: item.quantity,
              nome: item.name,
              valor: item.unitPrice
            }
          }
          this.itens.unshift(newItem);
          this.itens.pop()
        });

        // o valor de itens já foi atribuido ou negativo ou valor do produto
        console.log(this.itens);

        if(this.itens[0].id >=0 && this.itens[0].nome){
          this.pago = false
          alert("voce tem um debito pendente, marque como fiado ou receba esse produto!")
        }else{
          this.pago = true
        }
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
      // precisa fazer um update pra jogar o valor de quantidade 0
      console.log('tipo selecionado: ', this.tiposSelecionados);
      this.itens[0].qtd = 0;
      //precisa enviar o obj com os nomes corretos

      this.updateProduto = this.itens.map((item: any)=> ({
        productCode: item.id,
        name: item.nome,
        unitPrice: item.valor ,
				quantity: item.qtd,
        minimumStock: 1,
        maximumStock: 1
      }));

      this.itens.pop()


      this.cadastroComponent.atualizarProduto(this.updateProduto[0], this.updateProduto[0].productCode).subscribe({
        next:(response) =>{
          console.log("Produto atualizado!")
          console.log(response)
        },
        error:(error) =>{
          throw error
        }
      })

      this.utilsModal.openModalConfirmation(true);
      // this.deletarProdutos();
      console.log("ultimo valor de itens: " ,this.itens[0])
    } else {
      alert('Você tem um debito pendente, pague o que deve!');
    }
  }

  cadastrarFiado() {
    this.cadastroFiado.items = this.itens.map((item: any) => ({
      productCode: item.id,
      quantity: item.qtd,
    }))


    // montar valores pra req post
    this.sharedService.setOrders(this.cadastroFiado)
    console.log("enviando array para getOrders: ", this.cadastroFiado)
    this.utilsModal.openModal('simples')
  }

  cancelar(){
    if(this.itens[0].id >=0 && this.itens[0].nome){
          this.pago = false
          alert("voce tem um debito pendente, marque como fiado ou receba esse produto!")
        }else{
          this.pago = true
          this.utilsModal.cancelModalConfirmation(true)
        }
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



