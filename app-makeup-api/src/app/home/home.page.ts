import { Component, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, IonCol, IonGrid, IonRow } from '@ionic/angular';
import { Produto } from '../modelo/produtos-modelo';
import { ProdutosService } from '../api/produtos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [FormsModule, IonCol, IonRow, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonGrid,]
})
export class HomePage {
  protected produtos = signal<Produto[]>([]);
  private produtosService = inject(ProdutosService);
  protected marcaBuscada: string = '';

  constructor() { }

  protected pesquisar() {
    this.produtosService.pesquisar(this.marcaBuscada).subscribe({
      next: (resultado) => {
        console.log(resultado)
      }
    })

  }
}
