import { Component, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonSelect, IonButton, IonRow, IonSelectOption, IonLabel, IonAlert } from '@ionic/angular';
import { IonGrid, IonCol } from "@ionic/angular";
import { Venda } from '../modelo/venda-modelo';
import { VendasService } from '../api/vendas.service';
import { CurrencyPipe } from '@angular/common';

type Status = 'loading' | 'sucess' | 'error';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonAlert, CurrencyPipe, IonCol, IonGrid, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonSelect, IonRow, IonSelectOption, IonLabel]
})

export class HomePage {
  private vendasService = inject(VendasService);
  protected vendas = signal<Venda[]>([]);
  protected vendaSelecionada = signal<Venda | undefined>(undefined);
  protected valorTotal: number = 0;
  protected openAlert = false;
  protected idVendaDelete = '';
  protected status = signal<Status>('loading');
  protected mensagemErro = signal<string>('');

  constructor() { }

  ionViewDidEnter() {
    this.obterVendas();
  }

  private mapearErro(e: any): string {
    if (e.status === 0) {
      return 'Não foi possível conectar ao servidor';
    }
    if (e.status >= 500) {
      return 'O servidor encontrou um problema';
    }
    if (e.status === 400) {
      return 'Não encontrado';
    }
    return 'Erro ao carregar as vendas';
  }

  protected obterVendas() {
    this.vendasService.obterTodos().subscribe({
      next: (resposta: Venda[]) => {
        this.vendas.set(resposta);
        console.log(resposta);
        this.status.set('sucess');
      },
      error: (e) => {
        console.error(e);
        this.status.set('error');
        this.mensagemErro.set(this.mapearErro(e));
      },
    });
  }

  protected selecionarVenda(id: string) {
    const venda = this.vendas().find(v => v.id === id);
    this.vendaSelecionada.set(venda);

    this.valorTotal = venda?.itens.reduce((total, item) => {
      return total + (item.quantidade * item.valorUnitario)
    }, 0) ?? 0;
  }

  protected setOpen(value: boolean) {
    this.openAlert = value;
  }

  protected alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.vendasService.remover(this.idVendaDelete).subscribe({
          next: () => {
            this.vendaSelecionada.set(undefined);
            this.valorTotal = 0;
            this.obterVendas();
          },
          error: (e) => {
            console.log(e);
          },
        });
        console.log('alert confirmado');
      },
    },
  ];

  protected remover(id: string) {
    this.setOpen(true);
    this.idVendaDelete = id;
  }
}
