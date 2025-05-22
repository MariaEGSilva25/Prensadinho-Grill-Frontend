import { EstoqueService } from './../../../services/estoque.service';
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
  semClientes: boolean = true;
  valor = 0;

  constructor(private fiadoService: FiadoService, private estoqueService: EstoqueService) { }

  ngOnInit(): void {
    this.estoqueService.getAllProducts().subscribe({
      next: (response) => {
        // agora que eu sei que o array é valido
        const arrayValid = Array.isArray(response) ? response : []
        for (const p of arrayValid) {
          this.valor = p.unitPrice;
        }

        console.log("Preço produto: ", this.valor)
      },
      error: (error) => {
        console.log("não deu certo deu erro: ", error)
      }
    })



    this.fiadoService.getAllFiados().subscribe({
      next: (response) => {
        console.log('Fiados recebidos:', response);
        const lista = Array.isArray(response) ? response : [];

        this.clientes = lista.map((item: any) => ({
          id: item.id,
          nome: item.name,
          notaPendente: "nota anexada",
          telefone: item.phone,
          valor: this.valor,
          data: new Date().toLocaleDateString("pt-BR"),
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
