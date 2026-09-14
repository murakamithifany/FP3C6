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
    path: 'usuario-cadastro',
    loadComponent: () => import('./usuario-cadastro/usuario-cadastro.page').then( m => m.UsuarioCadastroPage)
  },
  {
    path: 'usuario-alteracao/:id',
    loadComponent: () => import('./usuario-alteracao/usuario-alteracao.page').then( m => m.UsuarioAlteracaoPage)
  },
];
