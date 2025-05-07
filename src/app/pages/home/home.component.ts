import { Component } from '@angular/core';
import { HeaderComponent } from "../components/header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  rotinasIcon = [
    { nome: 'Cadastro', icon: '/assets/Cadastro.png' },
    { nome: 'Venda', icon: '/assets/Venda.png' },
    { nome: 'Estoque', icon: '/assets/Estoque.png' },
    { nome: 'Fiado', icon: '/assets/Fiado.png' },
  ];
}
