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
    path: 'agendamento-cadastro',
    loadComponent: () => import('./agendamento-cadastro/agendamento-cadastro.page').then( m => m.AgendamentoCadastroPage)
  },
  {
    path: 'agendamento-detalhes/:id',
    loadComponent: () => import('./agendamento-detalhes/agendamento-detalhes.page').then( m => m.AgendamentoDetalhesPage)
  },
];
