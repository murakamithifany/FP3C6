import { Component, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonSearchbar, IonList, IonItem, IonLabel, IonAlert, IonGrid, IonRow, IonCol } from '@ionic/angular';
import { ProdutosService } from '../api/produtos.service';
import { Produto } from '../modelo/produto-modelo';
import { addIcons } from 'ionicons';
import { eyeOutline,addCircleOutline, trashOutline, createOutline } from 'ionicons/icons';
import { IonIcon } from "@ionic/angular";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonGrid, IonRow, RouterLink, IonAlert, IonLabel, IonSearchbar, IonIcon, IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent,  IonCol],
})
export class HomePage {
  constructor() {
    addIcons({ eyeOutline,addCircleOutline, trashOutline, createOutline });
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
        console.log(resposta);
        this.produtos.set(resposta);
      },
      //erro
      error: (e) => {
        console.error(e);
      },
    });
  }

  protected setOpen(value: boolean) {
    this.openAlert = value;
  }
  protected alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.produtosService.remover(this.idUserDelete).subscribe({
          next: () => {
            this.obterProdutos();
          },
          error: (e) => {
            console.error(e);
          },
        });
        console.log('Alert confirmed');
      },
    },
  ];

  protected remover(id: string) {
    this.setOpen(true);
    this.idUserDelete = id;
  }

  protected pesquisar(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.produtosService.pesquisarNomeOuCategoria(query).subscribe({
      next: (resultado) => {
        this.produtos.set(resultado);
      },
      error: (e) => {
        console.error(e);
      }
    })
  }


}

