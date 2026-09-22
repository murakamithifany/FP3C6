import { Component, computed, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonSearchbar, IonList, IonItem, IonLabel, IonAlert, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption } from '@ionic/angular';
import { ProdutosService } from '../api/produtos.service';
import { Produto } from '../modelo/produto-modelo';
import { addIcons } from 'ionicons';
import { eyeOutline, addCircleOutline, trashOutline, createOutline } from 'ionicons/icons';
import { IonIcon } from "@ionic/angular";
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [FormsModule, IonItem, IonList, CurrencyPipe, IonGrid, IonRow, RouterLink, IonAlert, IonLabel, IonSearchbar, IonIcon, IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonSelect, IonSelectOption],
})
export class HomePage {
  private produtosService = inject(ProdutosService);
  protected produtos = signal<Produto[]>([]);
  //protected produtosFiltrados = signal<Produto[]>([]);
  protected openAlert = false;
  protected idUserDelete = '';
  protected valorEstoque: number = 0;
  protected quantidadeEstoque: number = 0;
  protected precoMedio: number = 0;
  protected ordenacao = '';
  protected paginaAtual = signal(1);
  protected itensPorPagina = 3;

  constructor() {
    addIcons({ eyeOutline, addCircleOutline, trashOutline, createOutline });
  }

  ionViewDidEnter() {
    this.obterProdutos();
    this.calcularEstoque();
    this.ordenacao = '';
    this.paginaAtual.set(1);
  }

  private obterProdutos() {
    this.produtosService.obterTodos().subscribe({
      //sucesso
      next: (resposta: Produto[]) => {
        console.log(resposta);
        this.produtos.set(resposta);
        //this.produtosFiltrados.set(resposta);
        this.calcularEstoque();
      },
      //erro
      error: (e) => {
        console.error(e);
      },
    });
  }

  private calcularEstoque() {
    this.quantidadeEstoque = this.produtos().reduce((total, produto) => {
      return total + produto.quantidade;
    }, 0);

    this.valorEstoque = this.produtos().reduce((total, produto) => {
      return total + (produto.quantidade * produto.preco);
    }, 0);

    this.precoMedio = this.valorEstoque / this.quantidadeEstoque;
  }

  protected ordenarLista(event: any) {
    const opcao = event.detail.value;
    const lista = [...this.produtos()];

    if (opcao == 'nome') {
      lista.sort((a, b) => a.nome.localeCompare(b.nome));
      console.log("lista ordenada por nome", lista);
    }
    else {
      lista.sort((a, b) => a.preco - b.preco);
    }
    this.produtos.set(lista);
    this.paginaAtual.set(1);
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

    this.paginaAtual.set(1);

    if (query === '') {
      this.obterProdutos();
      return;
    }

    this.produtosService.pesquisarNomeOuCategoria(query).subscribe({
      next: (resultado) => {
        this.produtos.set(resultado);
        this.calcularEstoque();
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  protected paginacao = computed(() => {
    const inicio = (this.paginaAtual() - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.produtos().slice(inicio, fim);
  });

  protected totalPaginas = computed(() => {
    return Math.ceil(this.produtos().length / this.itensPorPagina);
  });

  protected paginaAnterior() {
    if (this.paginaAtual() > 1) {
      this.paginaAtual.update(v => v - 1);
    }
  };

  protected proximaPagina() {
    if (this.paginaAtual() < this.totalPaginas()) {
      this.paginaAtual.update(v => v + 1);
    }
  }

}

