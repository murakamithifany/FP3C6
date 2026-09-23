import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'itens-alteracao/:idVenda/:idItem',
    loadComponent: () => import('./itens-alteracao/itens-alteracao.page').then( m => m.ItensAlteracaoPage)
  },

];
