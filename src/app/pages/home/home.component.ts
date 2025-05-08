import { Component } from '@angular/core';
import { HeaderComponent } from "../components/header/header.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  rotinasIcon = [
    { nome: 'cadastro', icon: '/assets/Cadastro.png' },
    { nome: 'venda', icon: '/assets/Venda.png' },
    { nome: 'estoque', icon: '/assets/Estoque.png' },
    { nome: 'fiado', icon: '/assets/Fiado.png' },
  ];


  constructor(private route: Router){}

  naveguePara(rota: string){
    console.log("oiiii estou fucionando");
    this.route.navigate( [`/${rota}`]);
  }
}
