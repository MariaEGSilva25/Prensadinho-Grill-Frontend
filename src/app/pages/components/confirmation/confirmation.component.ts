import { Component } from '@angular/core';
import { SucessComponent } from '../sucess/sucess.component';
import { CommonModule } from '@angular/common';
import { UtilsModalService } from '../../../../services/utils-modal.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [SucessComponent, CommonModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {

  showSuccessModal: boolean = false;

  constructor(public utils: UtilsModalService, private route: Router) { }

  //o que eu preciso que execute quando o modal vier do botão cancelar


  chamaModalSucess() {
    if (this.utils.cancelConfirmation) {
      this.utils.closeModalConfirmation
      this.route.navigate(['home']);
      console.log("voltando pra home e fechando o modal de confirmação");
    } else {
      this.showSuccessModal = true;
      setTimeout(() => {
        this.showSuccessModal = false;
        this.utils.closeModalConfirmation
        this.route.navigate(['home']);
        console.log("voltando pra home e fechando o modal de confirmação e exibindo o modal de sucesso");
      }, 2000)


    }

  }
}
