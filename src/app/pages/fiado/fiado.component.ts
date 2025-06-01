import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FiadoService } from './../../../services/fiado.service'; // ajuste o caminho conforme necessário
import { ClienteType } from '../../../types/Cliente';
import { OrdersService } from '../../../services/orders.service';


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
  quantity: number = 0

  constructor(private fiadoService: FiadoService, private ordersService: OrdersService) { }

  ngOnInit(): void {

    this.ordersService.getOrders().subscribe({
      next: (response) => {
        response.forEach((pedido: any) => {
          pedido.items.forEach((item: any) => {
            this.quantity = item.quantity
          });
        });
      },
      error(error) {
        throw error
      }
    });


    this.fiadoService.getAllFiados().subscribe({
      next: (response) => {
        console.log('Fiados recebidos:', response);
        const lista = Array.isArray(response) ? response : [];

        this.clientes = lista.map((item: any) => {
          return {
            id: item.id,
            nome: item.name,
            notaPendente: "nota anexada",
            telefone: item.phone,
            valor: this.quantity,
            data: new Date().toLocaleDateString("pt-BR"),
          };
        });

        this.semClientes = this.clientes.length === 0;
      },
      error: (error) => {
        console.error('Erro ao buscar fiados:', error);
        this.semClientes = true;
      }
    });
  }

}
