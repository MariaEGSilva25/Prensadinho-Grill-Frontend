import { EstoqueService } from './../../../services/estoque.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Produto {
  id?: number | string;    // Pode ser opcional, dependendo do que vem da API
  nome: string;
  qtd: number;
  valor: number;
}

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estoque.component.html' ,
  styleUrl: './estoque.component.css'
})
export class EstoqueComponent implements OnInit {
  produtos: Produto[] = [];
  semProdutos: boolean = false;

  constructor(private estoqueService: EstoqueService) {}

  ngOnInit(): void {
    this.estoqueService.getAllProducts().subscribe({
      next: (response) => {
        console.log('Produtos recebidos:', response);
        const lista = Array.isArray(response) ? response : [];
        this.produtos = lista.map((item: any) => ({
          id: item.productCode || item.id,
          nome: item.name,
          qtd: item.quantity,
          valor: item.unitPrice
        }));
        this.semProdutos = this.produtos.length === 0;
      },
      error: (error) => {
        console.error('Erro ao buscar produtos:', error);
        this.semProdutos = true;
      }
    });
  }
}
