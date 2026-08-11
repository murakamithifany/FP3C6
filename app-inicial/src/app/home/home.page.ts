import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, FormsModule],
})
export class HomePage {
  //atributos
  public nome: string = "Thifany"; //disponível para uso dentro e fora da classe HomePage, mas vai ser mais usado em Serviços

  protected salario: number = 15000; //disponível para uso dentro da classe HomePage e classes filhas, acessar dentro doTemplate html (Interpolação)
  protected fonte: string = "text-align: center; color: pink;"; 

  private telefone:string = "9999-9999"; //disponível para uso dentro da classe HomePage

  constructor() {
    console.log(this.telefone);
    this.exibir(); //chamada do método exibir()
  }

  //métodos
  protected exibir(){
    console.log("método exibir()");
  }

  protected alterarEstilo(){
    this.fonte = "text-align: center; color: blue;";
  }
}