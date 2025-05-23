import { EstoqueService } from './../../../services/estoque.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FiadoService } from './../../../services/fiado.service'; // ajuste o caminho conforme necessário
import { SharedService } from '../../../services/shared.service';
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


  constructor(private fiadoService: FiadoService,
  private sharedService: SharedService) { }

  ngOnInit(): void {
  const prices = this.sharedService.getUnitPrices();
  let contador = 0;

  this.fiadoService.getAllFiados().subscribe({
    next: (response) => {
      console.log('Fiados recebidos:', response);
      const lista = Array.isArray(response) ? response : [];

      this.clientes = lista.map((item: any) => {
        const valor = prices[contador] || 0;
        contador++;

        return {
          id: item.id,
          nome: item.name,
          notaPendente: "nota anexada",
          telefone: item.phone,
          valor: valor,
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
