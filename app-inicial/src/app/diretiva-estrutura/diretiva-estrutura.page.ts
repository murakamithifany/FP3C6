import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-diretiva-estrutura',
  templateUrl: './diretiva-estrutura.page.html',
  styleUrls: ['./diretiva-estrutura.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class DiretivaEstruturaPage implements OnInit {

  protected numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  protected exibir = 2;

  protected objeto = {
    funcionarios: [
        {
            id: 1,
            nome: "ana",
            salario: 1000,
            dependentes: [
                { id: 1, nome: "pedro" },
                { id: 2, nome: "lucas" }
            ]
        },
        {
            id: 2,
            nome: "maria",
            salario: 2000,
            dependentes: [
                { id: 3, nome: "sofia" }
            ]
        },
        {
            id: 3,
            nome: "joao",
            salario: 3000,
            dependentes: [
                { id: 4, nome: "gabriel" },
                { id: 5, nome: "beatriz" },
                { id: 6, nome: "helena" }
            ]
        }
    ]
};

  constructor() { }

  ngOnInit() {
  }

}
