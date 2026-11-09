import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInputPasswordToggle, IonButton } from '@ionic/angular';
import { LoginService } from '../api/login.service';
import { Router } from '@angular/router';
import { IonInput } from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonInput,IonButton, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonInputPasswordToggle]
})
export class LoginPage implements OnInit {
  private loginService = inject(LoginService);
  private router = inject(Router);

  private formBuilder = inject(NonNullableFormBuilder);
  protected form = this.formBuilder.group({
    login: ['user', [Validators.required]],
    senha: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  constructor() {
    this.loginService.removeToken();
  }

  ngOnInit() {
  }

  protected acessar() {
    if (this.form.valid) {
      const login = this.form.getRawValue();
      this.loginService.login(login).subscribe({
        next: (loginResponse) => {
          this.loginService.setToken(loginResponse.access_token);
          this.router.navigate(['/home']);
        },
        error: (e) => console.log(e)
      })
    } else {
      console.log("Preencha todos os campos.");
    }
  }
}
