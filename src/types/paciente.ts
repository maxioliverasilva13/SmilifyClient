
export type Paciente = {
    nombre: string,
    apellido: string,
    email: string,
    ocupacion: string,
    datosClinicos: string,
    telefono:  string,
    correo: string,
    cedula: string,
    direccion: string,
    fechaDeNacimiento: number,
    tieneAlta: boolean,
    fechaDeAlta: number,
}

export type Archivo = {
    id: number,
    tipo: string,
    url: string,
    paciente: any,
    fileName: string,
}

export type Tratamiento = {
    id: number,
    descripcion: string,
    estado: string,
}

export type PacienteInfoResponse = {
  pacienteInfo: Paciente,
  archivos: Archivo[],
  tratamientos: Tratamiento[],
  reservas: any[],
  consultas: any[],
}

export type Zone = "Izquierda" | "Arriba" | "Derecha" | "Abajo" | "Centro";


