
export type Paciente = {
    nombre: string,
    apellido: string,
    telefono: number | string,
    correo: string,
    cedula: number,
    direccion: string,
    fechaNacimiento: number | string | null,
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