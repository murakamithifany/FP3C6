import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonInputPasswordToggle, IonButton } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonInput, IonHeader, IonToolbar, IonTitle, IonContent, IonInputPasswordToggle, IonButton],
})
export class HomePage {

  private formBuilder = inject(NonNullableFormBuilder);
  protected form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6)]]
  })

  constructor() {}
}
