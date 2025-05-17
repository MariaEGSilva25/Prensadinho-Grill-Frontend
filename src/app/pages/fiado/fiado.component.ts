import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FiadoService } from './../../../services/fiado.service'; // ajuste o caminho conforme necessário

interface Cliente {
  id: string;
  nome: string;
  notaPendente: string;
  telefone: string;
  valor: number;
  data: string;
}

@Component({
  selector: 'app-fiado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fiado.component.html',
  styleUrl: './fiado.component.css'
})
export class FiadoComponent implements OnInit {
  clientes: Cliente[] = [];
  semClientes: boolean = false;

  constructor(private fiadoService: FiadoService) {}

  ngOnInit(): void {
    this.fiadoService.getAllFiados().subscribe({
      next: (response) => {
        console.log('Fiados recebidos:', response);
        const lista = Array.isArray(response) ? response : [];
        this.clientes = lista.map((item: any) => ({
          id: item.id || 'SEM_ID',
          nome: item.nome || item.name || 'Cliente Desconhecido',
          notaPendente: item.notaPendente || 'Sem Nota',
          telefone: item.telefone || 'Sem Telefone',
          valor: item.valor || 0,
          data: item.data || 'Sem Data'
        }));
        this.semClientes = this.clientes.length === 0;
      },
      error: (error) => {
        console.error('Erro ao buscar fiados:', error);
        this.semClientes = true;
      }
    });
  }
}
