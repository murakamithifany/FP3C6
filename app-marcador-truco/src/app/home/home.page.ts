import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, remove } from 'ionicons/icons';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonIcon, IonButton, IonCol, IonRow, IonGrid, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  constructor() {
    addIcons({ add, remove });
  }

  public placarN: number = 0;
  public placarE: number = 0;
  private toastController: ToastController = inject(ToastController);


  private async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2500,
      position: 'bottom',
    });

    await toast.present();
  }

  protected adicionarNos() {
    this.placarN = this.placarN + 1;
    if (this.placarN == 12) {
      this.exibirMensagem("Nós - VENCEDOR");
    }
  }

  protected adicionarEles() {
    this.placarE = this.placarE + 1;
    if (this.placarE == 12) {
      this.exibirMensagem("Eles - VENCEDOR");
    }
  }

  protected removerNos() {
    if (this.placarN > 0) {
      this.placarN = this.placarN - 1;
    }
  }

  protected removerEles() {
    if (this.placarE > 0) {
      this.placarE = this.placarE - 1;
    }

  }
}
