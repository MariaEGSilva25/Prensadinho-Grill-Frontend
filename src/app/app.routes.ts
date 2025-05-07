import { Routes } from '@angular/router';
import { VinhetaComponent } from './pages/components/vinheta/vinheta.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component:VinhetaComponent },
  { path: 'login', component:LoginComponent },
  { path: 'home', component:HomeComponent },

];
