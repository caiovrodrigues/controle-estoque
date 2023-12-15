import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthguardService } from './guards/authguard.service';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { 
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(module => module.DashboardModule),
    canActivate: [AuthguardService],
    //Lazy loading, faz com que o módulo seja carregado somente quando acionado
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
