import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput } from '@ionic/angular';
import { IonItem, IonList, IonButton } from "@ionic/angular";
import { UsersService } from '../api/users.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../modelo/user.modelo';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.page.html',
  styleUrls: ['./usuario-cadastro.page.scss'],
  imports: [RouterLink, IonButton, IonList, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonInput]
})
export class UsuarioCadastroPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private usersService = inject(UsersService);
  private router = inject(Router);
  private formBuilder = inject(NonNullableFormBuilder);

  protected form = this.formBuilder.group({
    first_name: ['', [Validators.required, Validators.minLength(3)]],
    last_name: [''],
    email: [''],
    id: [''],
    avatar: ['']
  })

  protected cadastrar() {
    console.log(this.form.valid);
    if (this.form.valid) {
      const user: User = this.form.getRawValue();
      this.usersService.cadastrar(user).subscribe({
        next: (user) => {
          console.log(user);
          // this.form.reset();
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
