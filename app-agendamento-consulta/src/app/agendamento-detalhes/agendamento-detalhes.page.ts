import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-agendamento-detalhes',
  templateUrl: './agendamento-detalhes.page.html',
  styleUrls: ['./agendamento-detalhes.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AgendamentoDetalhesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
