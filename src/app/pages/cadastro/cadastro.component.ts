import { UtilsModalService } from './../../../services/utils-modal.service';
import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  constructor(private utilsModal: UtilsModalService) {}

  close(){
    this.utilsModal.closeModal();
    console.log('Modal closed');
  }

}
