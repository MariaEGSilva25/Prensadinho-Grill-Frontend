import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estoque.component.html',
  styleUrl: './estoque.component.css'
})
export class EstoqueComponent {
  produtos = [
    { id: '000001', descricao: 'Coca Cola 2L', estoque: 30, preco: 12.00 },
    { id: '000002', descricao: 'Guaraviton', estoque: 55, preco: 4.00 }
  ];
}
