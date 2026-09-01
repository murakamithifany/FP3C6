import { Component, inject, signal } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonRouterLink, IonList, IonItem, IonLabel, IonSearchbar,
  IonButtons, IonButton, IonIcon
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personAddOutline, trashOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { User } from '../modelo/user.modelo';
import { UsersService } from '../api/users.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonSearchbar, IonLabel, IonItem, IonList, RouterLink, IonRouterLink, IonIcon, IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  constructor() {
    addIcons({ personAddOutline, trashOutline });
    this.obterUsuarios();
  }
  private usersService = inject(UsersService);
  protected users = signal<User[]>([]);

  private obterUsuarios() {
    this.usersService.obterTodos().subscribe({
      //sucesso
      next: (resposta: User[]) => {
        // this.users = resposta;
        console.log(resposta);
        this.users.set(resposta);
      },
      //erro
      error: (e) => {
        console.error(e);
      },
    });
  }

  protected remover(id: number) {
    this.usersService.remover(id).subscribe({
      next: () => {
        this.obterUsuarios();
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  protected pesquisar(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.usersService.obterPeloNome(query).subscribe({
      next: (resultado) => {
        this.users.set(resultado);
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

}
