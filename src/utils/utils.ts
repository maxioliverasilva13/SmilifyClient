import { Archivo } from "src/types/paciente";


export const getFileType = (archivo: Archivo) => {
    const fileTipo = archivo.tipo.split('/')[1] || "txt";
    return fileTipo;
}