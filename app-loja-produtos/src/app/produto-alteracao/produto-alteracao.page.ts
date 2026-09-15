import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonSelectOption, IonButton, IonSelect, IonInput } from '@ionic/angular';
import { IonIcon } from "@ionic/angular";
import { addIcons } from 'ionicons';
import { checkmarkOutline, closeOutline} from 'ionicons/icons';
import { ProdutosService } from '../api/produtos.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Produto } from '../modelo/produto-modelo';

@Component({
  selector: 'app-produto-alteracao',
  templateUrl: './produto-alteracao.page.html',
  styleUrls: ['./produto-alteracao.page.scss'],
  imports: [RouterLink, IonInput,IonItem, IonList, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonSelectOption, IonSelect, IonInput]
})
export class ProdutoAlteracaoPage implements OnInit {

  private produtosService = inject(ProdutosService);
  private router = inject(Router);
  protected formBuilder = inject(NonNullableFormBuilder);
  private produto!: Produto;
  private route = inject(ActivatedRoute);

  protected categorias = [
  'Informática',
  'Periféricos',
  'Celulares',
  'Eletrônicos',
  'Áudio e Vídeo',
  'Acessórios'
];

  protected form = this.formBuilder.group({
    id: [''],
    nome: ['', [Validators.required, Validators.minLength(3)]],
    categoria: ['',[Validators.required]],
    preco: 0,    
    quantidade: 0,
    fornecedor: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor() { 
    addIcons({checkmarkOutline,closeOutline});
    const id = this.route.snapshot.paramMap.get('id');
    if(id) this.obterProduto(id);
  }

  ngOnInit() {
  }

  private obterProduto(id: string) {
    this.produtosService.obterPeloId(id).subscribe({
      next: (produto) => {
        this.produto = produto;
        console.log(this.produto);
        this.form.setValue(this.produto);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

    protected alterar() {
    this.produtosService.alterar(this.form.getRawValue()).subscribe({
      next: (resposta) => {
        console.log('resposta');
        console.log(resposta);
        this.router.navigate(['/home']);
      },
      error: (e) => {
        console.log('erro');
        console.log(e);
      },
    });
  }

}
