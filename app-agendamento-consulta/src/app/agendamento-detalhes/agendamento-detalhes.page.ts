import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonItem, IonTitle, IonToolbar } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MedicosService } from '../api/medicos.service';
import { Medico } from '../modelo/medico.modelo';
import { PacientesService } from '../api/pacientes.service';
import { Paciente } from '../modelo/paciente.modelo';
import { AgendamentosService } from '../api/agendamentos.service';
import { Agendamento } from '../modelo/agendamento.modelo';
@Component({
  selector: 'app-agendamento-detalhe',
  templateUrl: './agendamento-detalhes.page.html',
  styleUrls: ['./agendamento-detalhes.page.scss'],
  imports: [IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AgendamentoDetalhesPage implements OnInit {

  private activatedRoute = inject(ActivatedRoute);

  private medicoService = inject(MedicosService);
  protected medico = signal<Medico | undefined>(undefined);

  private pacienteService = inject(PacientesService);
  protected paciente = signal<Paciente | undefined>(undefined);

  private agendamentoService = inject(AgendamentosService);
  protected agendamento = signal<Agendamento | undefined>(undefined);

  constructor() { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    console.log(id);
    this.obterAgendamento(id);
  }

  private obterAgendamento(id: number) {
    this.agendamentoService.obterPeloId(id).subscribe({
      next: (agendamento) => {
        this.agendamento.set(agendamento);

        this.medicoService.obterPeloId(agendamento.medicoId).subscribe({
          next: (medico) => {
            this.medico.set(medico)
          }
        });
        this.pacienteService.obterPeloId(agendamento.pacienteId).subscribe({
          next: (paciente) => {
            this.paciente.set(paciente)
          }
        })
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

}

