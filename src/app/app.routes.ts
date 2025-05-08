import { Routes } from '@angular/router';
import { VinhetaComponent } from './pages/components/vinheta/vinheta.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { VendaComponent } from './pages/venda/venda.component';
import { EstoqueComponent } from './pages/estoque/estoque.component';
import { FiadoComponent } from './pages/fiado/fiado.component';

export const routes: Routes = [
  { path: '', component:VinhetaComponent },
  { path: 'home', component:VinhetaComponent },
  { path: 'login', component:HomeComponent },
  { path: 'cadastro', component:CadastroComponent },
  { path: 'venda', component:VendaComponent },
  { path: 'estoque', component:EstoqueComponent },
  { path: 'fiado', component:FiadoComponent },

];
