import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonButton,
  IonInput,
} from '@ionic/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../api/users.service';
import { User } from '../modelo/user.modelo';


@Component({
  selector: 'app-usuario-alteracao',
  templateUrl: './usuario-alteracao.page.html',
  styleUrls: ['./usuario-alteracao.page.scss'],
  imports: [
    IonButton,
    IonItem,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonInput,
    RouterLink
  ],
})
export class UsuarioAlteracaoPage {
  private route = inject(ActivatedRoute);
  private userService = inject(UsersService);
  private user!: User;

  protected formBuilder = inject(NonNullableFormBuilder); //não permite que os campos sejam nulos
  private router = inject(Router);

  protected form = this.formBuilder.group({
    first_name: ['', [Validators.required, Validators.minLength(3)]],
    last_name: [''],
    email: [''],
    id: [''],
    avatar: [''],
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.obterUsuario(id);
  }

  private obterUsuario(id: string) {
    this.userService.obterPeloId(id).subscribe({
      next: (user) => {
        this.user = user;
        console.log(this.user);
        this.form.setValue(this.user);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  protected alterar() {
    this.userService.alterar(this.form.getRawValue()).subscribe({
      next: (resposta) => {
        console.log('resposta');
        console.log(resposta);
        //console.log(this.form.getRawValue());
        this.router.navigate(['/home']);
      },
      error: (e) => {
        console.log('erro');
        console.log(e);
      },
    });
  }
}