import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { IonInput, IonButton, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonSelect, IonSelectOption, IonIcon } from '@ionic/angular';
import { ProdutosService } from '../api/produtos.service';
import { Router } from '@angular/router';
import { Produto } from '../modelo/produto-modelo';
import { addIcons } from 'ionicons';
import { checkmarkOutline, closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.page.html',
  styleUrls: ['./produto-cadastro.page.scss'],
  imports: [IonIcon, ReactiveFormsModule, IonInput, IonButton, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSelect, IonSelectOption]
})

export class ProdutoCadastroPage implements OnInit {

  constructor() {
    addIcons({ checkmarkOutline, closeOutline });
  }

  ngOnInit() {
  }

  private produtosService = inject(ProdutosService);
  private router = inject(Router);
  private formBuilder = inject(NonNullableFormBuilder);

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

  protected cadastrar() {
    console.log(this.form.valid);
    if (this.form.valid) {
      const produto: Produto = this.form.getRawValue();
      this.produtosService.cadastrar(produto).subscribe({
        next: (produto) => {
          console.log(produto);
          this.router.navigate(['/home']);
        },
        error: (e) => {
          console.log(e);
        }
      })
    } else {
      console.log('Formulário inválido.');
    }
  }

}
