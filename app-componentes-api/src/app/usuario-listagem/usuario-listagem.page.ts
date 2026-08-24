import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonButton } from '@ionic/angular/standalone';
import { UsersService } from '../api/users.service';
import { UserResponse } from '../modelos/user-response.modelo';
import { User } from '../modelos/user.modelo';

@Component({
  selector: 'app-usuario-listagem',
  templateUrl: './usuario-listagem.page.html',
  styleUrls: ['./usuario-listagem.page.scss'],
  standalone: true,
  imports: [IonList, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class UsuarioListagemPage implements OnInit {

  private usersServices = inject(UsersService);
  //protected userResponse: UserResponse | undefined;
  protected users: User[] = [];

  constructor() {
    this.obterUsuarios();
  }

  ngOnInit() {
  }

  private obterUsuarios() {
    //console.log('1'); // chamada síncrona, depois que terminar essa intrução parte para a próxima

    // chamada assíncrona, não aguarda terminar para passar para a próxima
    this.usersServices.obterTodos().subscribe({
      //sucesso
      next: (resposta: User[]) => {
        //console.log('2');
        console.log(resposta);
        this.users = resposta;
      },

      //erro
      error: (e) => {
        console.log(e);
      }
    });

   // console.log('3');
  }

  protected remover(id: number) {
    this.usersServices.remover(id).subscribe({
      //sucesso
      next: (resposta) => {
        console.log(resposta);
      },

      //erro
      error: (e) => {
        console.log(e);
      }
    });
    
    this.obterUsuarios();
  }

}
