import { Paciente } from "./paciente";

export type Reserva = {
    id: number,
    estado: string,
    fecha: number | string,
    paciente: Paciente,
}