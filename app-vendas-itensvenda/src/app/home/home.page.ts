import { Component, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonSelect, IonButton, IonRow, IonSelectOption, IonLabel } from '@ionic/angular';
import { IonGrid, IonCol } from "@ionic/angular";
import { Venda } from '../modelo/venda-modelo';
import { Itens } from '../modelo/itens-venda-modelo';
import { VendasService } from '../api/vendas.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCol, IonGrid, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonSelect, IonRow, IonSelectOption, IonLabel]
})
export class HomePage {
  private vendasService = inject(VendasService);
  protected vendas = signal<Venda[]>([]);
  protected itensVenda = signal<Itens[]>([]);

  constructor() { }

  ionViewDidEnter() {
    this.obterVendas();
  }

  protected obterVendas() {
    this.vendasService.obterTodos().subscribe({
      next: (resposta: Venda[]) => {
        this.vendas.set(resposta);
        console.log(resposta);
      },
      error: (e) => {
        console.error(e)
      },
    });
  }


  protected selecionarCliente(event: any) {
    const selecionado = event.detail.value;
    const lista = [...this.vendas()];

  }

}
