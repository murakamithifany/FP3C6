import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonInput, IonSelectOption, IonSelect, IonButton } from '@ionic/angular';
import { ProdutosService } from '../api/produtos.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Produto } from '../modelo/produto-modelo';
import { IonIcon } from "@ionic/angular";
import { addIcons } from 'ionicons';
import { returnDownBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-produto-visualizacao',
  templateUrl: './produto-visualizacao.page.html',
  styleUrls: ['./produto-visualizacao.page.scss'],
  imports: [IonButton, IonIcon, IonGrid, IonRow, IonCol, RouterLink, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ProdutoVisualizacaoPage implements OnInit {

  private produtosService = inject(ProdutosService);
  private router = inject(Router);
  protected formBuilder = inject(NonNullableFormBuilder);
  protected produto = signal<Produto | null>(null);
  private route = inject(ActivatedRoute);

  protected valorEmEstoque = computed(() => {
    const p = this.produto();
    return p ? p.preco * p.quantidade : 0;
  });

  constructor() {
    addIcons({ returnDownBackOutline });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.obterProduto(id);
  }

  ngOnInit() {
  }

  private obterProduto(id: string) {
    this.produtosService.obterPeloId(id).subscribe({
      next: (produto) => this.produto.set(produto),
      error: (e) => {
        console.log(e);
      },
    });
  }

}
