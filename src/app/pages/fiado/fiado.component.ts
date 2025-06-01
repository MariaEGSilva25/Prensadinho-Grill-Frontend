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
  quantity: number[] = []

  constructor(private fiadoService: FiadoService, private ordersService: OrdersService) { }

  ngOnInit(): void {

    this.ordersService.getOrders().subscribe({
      next: (response) => {
        console.log(response);

        this.quantity = [];  // inicializa como array vazio

        response.forEach((pedido: any) => {
          pedido.items.forEach((item: any) => {
            this.quantity.push(item.quantity);  // adiciona cada quantity ao array
            console.log(item.quantity);
          });
        });

        console.log('Array de quantities:', this.quantity);
      },
      error(error) {
        throw error;
      }
    });


    this.fiadoService.getAllFiados().subscribe({
      next: (response) => {
        console.log('Fiados recebidos:', response);
        const lista = Array.isArray(response) ? response : [];

        const clientesMap = new Map<string, ClienteType>();
        let contador = 0;

        lista.forEach((item: any) => {
          const key = `${item.name.trim().toLowerCase()}|${item.phone.trim()}`;

          if (!clientesMap.has(key)) {
            clientesMap.set(key, {
              id: item.id,
              nome: item.name,
              notaPendente: "nota anexada",
              telefone: item.phone,
              valor: this.quantity[contador] | 1,
              data: new Date().toLocaleDateString("pt-BR"),
            });
            contador++;
          }
        });

        this.clientes = Array.from(clientesMap.values());

        this.semClientes = this.clientes.length === 0;
      },
      error: (error) => {
        console.error('Erro ao buscar fiados:', error);
        this.semClientes = true;
      }
    });


  }

}
