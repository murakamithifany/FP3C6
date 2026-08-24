import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'usuario-listagem',
    pathMatch: 'full',
  },
  {
    path: 'usuario-listagem',
    loadComponent: () => import('./usuario-listagem/usuario-listagem.page').then( m => m.UsuarioListagemPage)
  },
];
