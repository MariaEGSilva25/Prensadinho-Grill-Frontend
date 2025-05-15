import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { UtilsModalService } from '../../../services/utils-modal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [HeaderComponent, CadastroComponent, CommonModule],
})
export class HomeComponent {


  rotinasIcon = [
    { nome: 'cadastro', icon: '/assets/Cadastro.png' },
    { nome: 'venda', icon: '/assets/Venda.png' },
    { nome: 'estoque', icon: '/assets/Estoque.png' },
    { nome: 'fiado', icon: '/assets/Fiado.png' },
  ];


  constructor(private route: Router, public utilsModal: UtilsModalService) {}

  naveguePara(rota: string) {
    if (rota === 'cadastro') {
      this.utilsModal.openModal("completo");
      return;
    }

    this.route.navigate([`/${rota}`]);
  }


}
