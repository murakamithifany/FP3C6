import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonInput, IonItem, IonButton, IonRouterLink } from '@ionic/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Itens } from '../modelo/itens-venda-modelo';
import { VendasService } from '../api/vendas.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-itens-alteracao',
  templateUrl: './itens-alteracao.page.html',
  styleUrls: ['./itens-alteracao.page.scss'],
  imports: [RouterLink,IonRouterLink,IonList, ReactiveFormsModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonItem, IonButton, IonRouterLink]
})
export class ItensAlteracaoPage implements OnInit {

  private vendaService = inject(VendasService);
  private router = inject(Router);
  protected formBuilder = inject(NonNullableFormBuilder);
  private item!: Itens;
  private route = inject(ActivatedRoute);

  protected form = this.formBuilder.group({
    id: [0],
    produto: ['', Validators.required],
    quantidade: [0, Validators.min(0)],
    valorUnitario: [0, Validators.min(0)]
  });

  constructor() {
    const idVenda = this.route.snapshot.paramMap.get('idVenda');
    const id = this.route.snapshot.paramMap.get('idItem');
    if (idVenda && id)
      this.obterItem(Number(idVenda), Number(id));
  }

  ngOnInit() {
  }

  private obterItem(idVenda: number, id: number) {
    this.vendaService.obterItem(idVenda, id).subscribe({
      next: (item) => {
        if (!item) {
          return;
        }
        this.item = item;
        console.log(this.item);
        this.form.setValue(this.item);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  protected alterar() {
    const idVenda = this.route.snapshot.paramMap.get('idVenda');
    if (!Number(idVenda)) {
      return;
    }
    const itemAlterado = this.form.getRawValue();
    this.vendaService.obterPeloId(Number(idVenda)).subscribe({
      next: (venda) => {
        venda.itens = venda.itens.map(item => {
          if (item.id === itemAlterado.id) {
            return {
              ...item,
              produto: itemAlterado.produto,
              quantidade: itemAlterado.quantidade,
              valorUnitario: itemAlterado.valorUnitario
            };
          }
          return item;
        });
        this.vendaService.alterar(venda).subscribe({
          next: (resposta) => {
            console.log(resposta);
            this.router.navigate(['/home']);
          },
          error: (e) => {
            console.error(e);
          }
        });
      },
      error: (e) =>{
        console.log(e);
      }
    })
  }

}
