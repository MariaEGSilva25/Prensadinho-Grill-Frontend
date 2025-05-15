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

  chamaModalSucess() {
    this.showSuccessModal = true;
    setTimeout(() => {
      this.showSuccessModal = false;
      this.route.navigate(['home']);
    }, 2000)

  }
}
