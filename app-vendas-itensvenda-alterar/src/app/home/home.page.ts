import { Component, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonSelect, IonButton, IonRow, IonSelectOption, IonLabel, IonAlert,IonIcon } from '@ionic/angular';
import { IonGrid, IonCol } from "@ionic/angular";
import { Venda } from '../modelo/venda-modelo';
import { VendasService } from '../api/vendas.service';
import { CurrencyPipe } from '@angular/common';
import { addIcons } from 'ionicons';
import {createOutline} from 'ionicons/icons'
import { RouterLink } from '@angular/router';

type Status = 'loading' | 'sucess' | 'error';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [RouterLink,IonIcon, IonAlert, CurrencyPipe, IonCol, IonGrid, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonSelect, IonRow, IonSelectOption, IonLabel,]
})

export class HomePage {
  private vendasService = inject(VendasService);
  protected vendas = signal<Venda[]>([]);
  protected vendaSelecionada = signal<Venda | undefined>(undefined);
  protected valorTotal: number = 0;
  protected openAlert = false;
  protected idVendaDelete = 0;
  protected status = signal<Status>('loading');
  protected mensagemErro = signal<string>('');

  constructor() {
    addIcons({createOutline});
   }

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
    const idAtual = this.vendaSelecionada()?.id;

    this.vendasService.obterTodos().subscribe({
      next: (resposta: Venda[]) => {
        this.vendas.set(resposta);
        console.log(resposta);
        this.status.set('sucess');

        if(idAtual){
          const vendaAtualizada = resposta.find(v => v.id === idAtual);
          this.vendaSelecionada.set(vendaAtualizada);
           this.valorTotal = this.calcularTotal(vendaAtualizada);
        }

      },
      error: (e) => {
        console.error(e);
        this.status.set('error');
        this.mensagemErro.set(this.mapearErro(e));
      },
    });
  }

  protected selecionarVenda(id: number) {
    const venda = this.vendas().find(v => v.id === id);
    this.vendaSelecionada.set(venda);

    this.valorTotal = this.calcularTotal(venda);
  }

  private calcularTotal(venda?: Venda){
    return venda?.itens.reduce((total, item) => {
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

  protected remover(id: number) {
    this.setOpen(true);
    this.idVendaDelete = id;
  }
}
