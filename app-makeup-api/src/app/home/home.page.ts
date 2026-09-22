import { Component, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, IonCol, IonGrid, IonRow, IonIcon, IonAlert, ToastController } from '@ionic/angular';
import { Produto } from '../modelo/produtos-modelo';
import { ProdutosService } from '../api/produtos.service';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonAlert, IonIcon, CurrencyPipe, FormsModule, IonCol, IonRow, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonGrid,]
})
export class HomePage {
  protected produtos = signal<Produto[]>([]);
  private produtosService = inject(ProdutosService);
  protected marcaBuscada: string = '';
  protected valorTotal: number = 0;
  protected marcaDeletada = '';
  protected openAlert = false;
  private toastController: ToastController = inject(ToastController);

  constructor() {
    addIcons({ trashOutline });
  }

  private async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2500,
      position: 'middle'
    });
    await toast.present();
  }

  protected pesquisar() {
    const marca = this.marcaBuscada.trim();
    if (!marca) {
      console.log("Nenhuma marca selecionada");
      return;
    }
    this.produtosService.pesquisar(marca).subscribe({
      next: (resultado) => {
        console.log(resultado);

        if (resultado.length === 0) {
          console.log("nenhum produto encontrado");
          this.exibirMensagem("Nenhum produto da marca " + marca + " foi encontrado");
          return;
        }

        const produtoMaisCaro = resultado.reduce((maior, produto) => {
          return Number(produto.price) > Number(maior.price) ? produto : maior
        });

        const novaConsulta = {
          brand: marca,
          quantity: resultado.length,
          name: produtoMaisCaro.name,
          price: produtoMaisCaro.price
        }

        this.produtos.update(lista => [...lista, novaConsulta]);
      },
      error: (e) => {
        console.error(e);
      }
    });
  };

  protected calcularValorTotal() {
    return this.produtos().reduce((total, item) => total + Number(item.price), 0);
  }

  protected setOpen(value: boolean) {
    this.openAlert = value;
  }

  protected alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('alerta cancelado');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {  
        const produtoRemovido = this.produtos().find(item => item.brand === this.marcaDeletada);      
        this.produtos.update(lista => lista.filter(item => item.brand !== this.marcaDeletada));
        this.exibirMensagem("O produto "+ produtoRemovido?.name+" foi removido");
        console.log('alert confirmado');
      },
    },
  ];

  protected remover(marca: string) {
    this.setOpen(true);
    this.marcaDeletada = marca;
  }
}
