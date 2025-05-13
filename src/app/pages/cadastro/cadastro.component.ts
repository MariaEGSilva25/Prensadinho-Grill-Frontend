import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  @Output() fechar = new EventEmitter<void>();
  @Output() concluir = new EventEmitter<void>();

  onFechar() {

    this.fechar.emit();
    console.log('esou fechando o modal de cadastro');
  }

  onConcluir() {
    console.log('Cadastro concluído!');
    this.concluir.emit();
  }
}
