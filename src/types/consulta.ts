import { Paciente, Tratamiento } from "./paciente"
import { Reserva } from "./reserva"

export type Consulta = {
    id: number,
    descripcion: string,
    pago: string,
    paciente_id: number,
    reserva_id: number,
    tratamiento_id: number,
}

export type ConsultaExtended = {
    id: number,
    descripcion: string,
    pago: string,
    paciente: Paciente,
    reserva: Reserva,
    tratamiento: Tratamiento,
}