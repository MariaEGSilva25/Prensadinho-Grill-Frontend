
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vinheta',
  standalone: true,
  imports: [],
  templateUrl: './vinheta.component.html',
  styleUrl: './vinheta.component.css'
})
export class VinhetaComponent {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.router.navigate(["/login"]);
    }, 3000);
  }
}
