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
    path: 'produto-cadastro',
    loadComponent: () => import('./produto-cadastro/produto-cadastro.page').then( m => m.ProdutoCadastroPage)
  },
  {
    path: 'produto-alteracao/:id',
    loadComponent: () => import('./produto-alteracao/produto-alteracao.page').then( m => m.ProdutoAlteracaoPage)
  },
  {
    path: 'produto-visualizacao/:id',
    loadComponent: () => import('./produto-visualizacao/produto-visualizacao.page').then( m => m.ProdutoVisualizacaoPage)
  },


];
