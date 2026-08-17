import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/angular/standalone';
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

  protected adicionarNos() {
    this.placarN = this.placarN + 1;
  }

  protected adicionarEles() {
    this.placarE = this.placarE + 1;
  }

  protected removerNos() {
      this.placarN = this.placarN - 1;
  }

  protected removerEles() {
    this.placarE = this.placarE - 1;
  }
}
