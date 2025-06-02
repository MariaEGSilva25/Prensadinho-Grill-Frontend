import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FiadoService } from './../../../services/fiado.service';
import { ClienteType } from '../../../types/Cliente';


@Component({
  selector: 'app-fiado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fiado.component.html',
  styleUrl: './fiado.component.css'
})
export class FiadoComponent implements OnInit {
  clientes: ClienteType[] = [];
  semClientes: boolean = true;
  posicoesImpares: number[] = []


  constructor(private fiadoService: FiadoService) { }

  ngOnInit(): void {

    this.fiadoService.getAllFiados().subscribe({
      next: (response) => {
        console.log('Fiados recebidos:', response);
        const lista = Array.isArray(response) ? response : [];

        this.posicoesImpares = lista.filter((item: any, index: number) => index % 2 !== 0);

        console.log('Elementos nas posições ímpares:', this.posicoesImpares);

        this.clientes = this.posicoesImpares.map((item: any) => {
          let unitPrice = item.orders[0].items[0].product.unitPrice;
          return {
            id: item.id,
            nome: item.name,
            notaPendente: "nota anexada",
            telefone: item.phone,
            valor: unitPrice,
            data: new Date().toLocaleDateString("pt-BR"),
          };
        });
        this.semClientes = this.clientes.length === 0;

      },
      error: (error) => {
        console.error('Erro ao buscar fiados:', error);
        this.semClientes = true;
        this.posicoesImpares = [];
      }
    });
  }
}
