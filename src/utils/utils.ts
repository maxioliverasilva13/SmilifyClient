import { Archivo } from "src/types/paciente";


export const getFileType = (archivo: Archivo) => {
    const fileTipo = archivo.tipo.split('/')[1] || "txt";
    return fileTipo;
}


export const getCostoArancel = (arancelInfo: any, precioOrden?: number) => {
    if (arancelInfo?.type !== "ArancelColectivo" && arancelInfo?.type !== null  && arancelInfo?.type !== undefined) {
        return arancelInfo?.precio;
    }
    if (arancelInfo?.type === "ArancelColectivo") {
        return Number(precioOrden || 0) * Number(arancelInfo?.cantOrdenes);
    }

    return 0;
}


