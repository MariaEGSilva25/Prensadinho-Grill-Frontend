import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fiado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fiado.component.html',
  styleUrl: './fiado.component.css'
})
export class FiadoComponent {
  clientes = [
    { id: '000001', nome: 'Seu Chico',  notaPendente: "Nota Anexada", telefone: "11 4002-8922", valor: 12.00, data: "09/11" },
    { id: '000002', nome: 'Benones',  notaPendente: "Nota Anexada", telefone: "11 4002-8527", valor: 10.00, data: "09/11" },

  ];
}
