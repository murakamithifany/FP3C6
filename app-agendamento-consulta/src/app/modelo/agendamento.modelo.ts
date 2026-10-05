export interface Agendamento{
    id: number,
    data: string,
    horario: string,
    observacoes: string,
    status: string,
    medicoId: number,
    pacienteId: number,
}