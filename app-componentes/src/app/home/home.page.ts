import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonList, IonItem, IonInput, IonGrid, IonRow, IonCol, ToastController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { heart, trash } from 'ionicons/icons';

interface Pessoa {
  nome?: string,   /// ? serve para não deixar obrigatório
  endereco?: string,
  salario?: number

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
  private toastController: ToastController = inject(ToastController);

  constructor() {
    addIcons({ heart, trash });
  }

  private async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2500,
      position: 'bottom',
    });

    await toast.present();
  }

  protected exibir() {
    console.log("Método exibir");
  }

  protected exibirCoracao() {
    console.log("<3");
  }

  protected adicionar() {
    this.pessoas.push(this.pessoa);
    this.pessoa = {};
    console.log(this.pessoas);
    this.exibirMensagem("Pessoa Adicionada");
  }

  protected remover(index: number) {
    this.pessoas.splice(index, 1);
    console.log("removido");
    this.exibirMensagem("Pessoa Removida");
  }
}
