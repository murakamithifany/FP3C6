import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonList, IonItem, IonInput, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';

interface Pessoa {
  nome?: string,   /// ? serve para não deixar obrigatório
  endereco?: string
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCol, IonRow, IonGrid, IonInput, IonItem, IonList, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, FormsModule],
})
export class HomePage {
  //protected nome = '';
  protected pessoa: Pessoa = {};
  protected pessoas: Pessoa[] = [];

  constructor() {
    addIcons({ heart }); 
  }

  protected exibir() {
    console.log("Método exibir");
    console.log("this.pessoa");
  }

  protected exibirCoracao() {
    console.log("<3");
  }

  protected adicionar() {
    this.pessoas.push(this.pessoa);
    this.pessoa = {
      nome: '',
      endereco: '',
    };
    console.log(this.pessoas);
  }
}
