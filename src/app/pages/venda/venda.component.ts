import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UtilsModalService } from '../../../services/utils-modal.service';
import { CadastroComponent } from '../cadastro/cadastro.component';

@Component({
  selector: 'app-venda',
  standalone: true,
  imports: [CommonModule, FormsModule, CadastroComponent],
  templateUrl: './venda.component.html',
  styleUrl: './venda.component.css'
})
export class VendaComponent {
  botoes = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','];

  tiposSelecionados: string[] = [];
  valorAtual = '';

  itens = [
    { qtd: 1, nome: 'Coca Cola 2L', valor: 12.0 },
    { qtd: 2, nome: 'Guaraviton', valor: 6.0 },
  ];

  desconto = 0;

  constructor(public utilsModal: UtilsModalService) {

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
}
