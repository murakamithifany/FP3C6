import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { MedicosService } from '../api/medicos.service';
import { Medico } from '../modelo/medico.modelo';
import { PacientesService } from '../api/pacientes.service';
import { Paciente } from '../modelo/paciente.modelo';
import { Router, RouterLink } from '@angular/router';
import { AgendamentosService } from '../api/agendamentos.service';
import { Agendamento } from '../modelo/agendamento.modelo';

@Component({
  selector: 'app-agendamento-cadastro',
  templateUrl: './agendamento-cadastro.page.html',
  styleUrls: ['./agendamento-cadastro.page.scss'],
  imports: [
    IonButton,
    IonTextarea,
    IonList,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonInput,
    IonSelectOption,
    IonSelect,
    RouterLink
  ],
})
export class AgendamentoCadastroPage implements OnInit {
  private formBuider = inject(NonNullableFormBuilder);
  protected form = this.formBuider.group({
    data: ['', Validators.required],
    hora: ['', Validators.required],
    minuto: ['', Validators.required],
    medicoId: [0, [Validators.required, Validators.min(1)]],
    pacienteId: [0, [Validators.required, Validators.min(1)]],
    status: ['', Validators.required],
    observacoes: ['', Validators.maxLength(200)],
  });
  protected agendamentoService = inject(AgendamentosService);
  protected medicoService = inject(MedicosService);
  protected medicos = signal<Medico[]>([]);
  protected pacienteService = inject(PacientesService);
  protected pacientes = signal<Paciente[]>([]);
  private router = inject(Router);

  constructor() { }

  ngOnInit() {
    this.carregarMedicosEPacientes();
  }

  private carregarMedicosEPacientes() {
    this.medicoService.obterMedicos().subscribe({
      next: (resposta) => {
        this.medicos.set(resposta);
      },
      error: (e) => {
        console.log(e);
      }
    });

    this.pacienteService.obterPacientes().subscribe({
      next: (resposta) => {
        this.pacientes.set(resposta);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  protected salvar() {
    console.log(this.form.value);

    if (this.form.valid) {
      const agendamentoForm = this.form.getRawValue();

      const agendamento: Agendamento = {
        data: agendamentoForm.data,
        horario: `${agendamentoForm.hora}:${agendamentoForm.minuto}`,
        status: agendamentoForm.status,
        medicoId: agendamentoForm.medicoId,
        pacienteId: agendamentoForm.pacienteId,
        observacoes: agendamentoForm.observacoes,
        id: 0,
      }

      this.agendamentoService.obterTodos().subscribe({
        next: (agendamentos) => {
          let existeAgendamento = false;
          for (let i = 0; i < agendamentos.length && !existeAgendamento; i++) {
            let item = agendamentos[i];
            if (item.medicoId == agendamento.medicoId && item.data == agendamento.data && item.horario == agendamento.horario && item.status != 'Cancelado') {
              existeAgendamento = true;
            }
          }
          if (!existeAgendamento) {
            this.agendamentoService.cadastrar(agendamento).subscribe({
              next: (agendamentoCadastro) => {
                console.log("Cadastro com sucesso", agendamentoCadastro);
                this.router.navigate(['/home']);
              },
              error: (e) => {
                console.log(e);
              }
            });
          }
          else {
            console.log("Já existe agendamento");
          }
        },
        error: (e) => {
          console.error(e);
        }
      })
    }
    else {
      console.log("Cadastro inválido!");
    }
  }



}
