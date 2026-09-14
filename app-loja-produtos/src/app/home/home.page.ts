import { Component, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import { ProdutosService } from '../api/produtos.service';
import { Produto } from '../modelo/produto-modelo';
import { addIcons } from 'ionicons';
import { personAddOutline, trashOutline, createOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  constructor() { 
    addIcons({ personAddOutline, trashOutline, createOutline });
  }
   ionViewDidEnter() {
    this.obterProdutos();
  }

  private produtosService = inject(ProdutosService);
  protected produtos = signal<Produto[]>([]);
  protected openAlert = false;
  protected idUserDelete = '';

    private obterProdutos() {
    this.produtosService.obterTodos().subscribe({
      //sucesso
      next: (resposta: Produto[]) => {
        // this.users = resposta;
        console.log(resposta);
        this.produtos.set(resposta);
      },
      //erro
      error: (e) => {
        console.error(e);
      },
    });
  }

}

