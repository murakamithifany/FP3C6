import { Component, inject, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
} from '@ionic/angular';
import { IonGrid, IonRow, IonCol } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { IonIcon } from '@ionic/angular';
import { expandOutline, addCircleOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { AgendamentosService } from '../api/agendamentos.service';
import { Agendamento } from '../modelo/agendamento.modelo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    RouterLink,
    IonIcon,
    IonCol,
    IonRow,
    IonGrid,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
  ],
})
export class HomePage {
  private agendamentoService = inject(AgendamentosService);
  protected agendamentos = signal<Agendamento[]>([]);

  constructor() {
    addIcons({ expandOutline, addCircleOutline });
  }

  ngOnInit() {
    this.obterAgendamentos();
  }

  private obterAgendamentos() {
    this.agendamentoService.obterTodos().subscribe({
      next: (agendamentos) => {
        this.agendamentos.set(agendamentos);
        console.log(agendamentos);
      },
    });
  }
}
