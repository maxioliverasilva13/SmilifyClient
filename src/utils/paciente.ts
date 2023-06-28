import dayjs from "dayjs";
import { Zone } from "src/types/paciente";
import { getCostoArancel } from "./utils";

export const getEdadbyFecha = (fecha: number | null | undefined): number => {
  try {
    if (!fecha) return 0;
    const nacimiento = dayjs(fecha);
    const now = dayjs();
    const edad = now.diff(nacimiento, "years");
    return edad;
  } catch (error) {
    return 0;
  }
};

export const formatDate = (fecha: number | null | undefined): string => {
  try {
    const formatFecha = dayjs(fecha).format("DD/MM/YYYY");
    return formatFecha;
  } catch (error) {
    return "No Tiene";
  }
};

export const formatConsultas = (consultas: any[], precioOrden?: any) => {
  return consultas?.map((consulta: any) => {
    console.log(consulta)
    return {
      id: consulta?.id,
      nroConsulta: consulta?.id,
      fecha: consulta?.reserva?.fecha
        ? formatDate(consulta?.reserva?.fecha)
        : "No tiene",
      tratamiento: consulta?.tratamiento?.descripcion
        ? consulta?.tratamiento?.descripcion
        : "No tiene",
      descripcion: consulta?.descripcion,
      costo: 0,
      arancelName: consulta?.arancel?.nombre,
      arancelPrecio: getCostoArancel(consulta?.arancel,precioOrden),
      cantOrdenes: consulta?.arancel?.cantOrdenes,
      arancelLabName: consulta?.arancelLab?.nombre || null,
      arancelLabPrecio: getCostoArancel(consulta?.arancelLab, precioOrden) || null,
      entrega: consulta?.entrega || null,
      totalPrice: getCostoArancel(consulta?.arancel,precioOrden) + consulta?.entrega,
    };
  });
};

export const getProximaConsulta = (consultas: any[]) => {
  const allConsultas = [...consultas];
  const sortedConsultas = allConsultas?.sort(
    (consultaA: any, consultaB: any) => {
      return dayjs(consultaA?.reserva?.fecha).isBefore(
        dayjs(consultaB?.reserva?.fecha)
      )
        ? -1
        : 1;
    }
  );

  const proximaConsulta = sortedConsultas?.find((item: any) =>
    dayjs(item?.reserva?.fecha).isAfter(dayjs())
  );
  return proximaConsulta;
};

export const getFileName = (url: string) => {};

export const getDientesInfoCount = (
  dientesInfo: any[] | undefined,
  dienteId: number
): any[] => {
  if (!dientesInfo || dientesInfo?.length == 0 || !dientesInfo?.length ) return [];
  console.log("dienteinfo", dientesInfo)
  console.log("typeof", typeof dientesInfo)
  return dientesInfo?.filter((item) => Number(item?.dienteId) == dienteId);
};

export const getColorsByItem = (
  dientesInfo: any[] | undefined,
  zone: Zone
): string => {
  if (dientesInfo?.length === 0 || !dientesInfo || !zone) {
    return "white";
  }
  const itemsCountOfZone = dientesInfo?.filter(
    (item: any) => item?.type == zone
  );
  console.log("itemsCountOfZone?.length", itemsCountOfZone?.length);
  if (itemsCountOfZone?.length == 0) {
    return "white";
  }
  if (itemsCountOfZone?.length >= 10) {
    return "rgba(255,120,124,0.800)";
    // red
  } else if (itemsCountOfZone?.length >= 5) {
    return "rgba(235,232,54,0.8)";
    // yellow
  } else {
    return "rgba(164,255,164,0.5)";
    // green
  }
};
