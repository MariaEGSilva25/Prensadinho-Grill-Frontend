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
  data: any


  constructor(private fiadoService: FiadoService) { }

  ngOnInit(): void {

    this.fiadoService.getAllFiados().subscribe({
      next: (response) => {
        console.log('Fiados recebidos:', response);
        const lista = Array.isArray(response) ? response : [];

        this.posicoesImpares = lista.filter((item: any, index: number) => index % 2 !== 0);

        console.log('Elementos nas posições ímpares:', this.posicoesImpares);


        this.clientes = this.posicoesImpares.map((item: any) => {

          let total = item.orders[0].value;
          console.log("Valor total: ", total);

          const dataOriginal = item.now.split(' ')[1]; // '2025-06-06'
          const [ano, mes, dia] = dataOriginal.split('-'); // ['2025', '06', '06']
          const dataFormatada = `${dia}/${mes}/${ano}`; // '06/06/2025'

          this.data = dataOriginal

          return {
            id: item.id,
            nome: item.name,
            notaPendente: "nota anexada",
            telefone: item.phone,
            valor: total,
            data: dataFormatada,
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
