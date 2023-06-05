import dayjs from "dayjs";

export const getEdadbyFecha = (fecha: number | null | undefined): number => {
  try {
    if (!fecha) return 0;

    const nacimiento = dayjs(fecha).format("DD/MM/YYYY");
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

export const formatConsultas = (consultas: any[]) => {
  return consultas?.map((consulta: any) => {
    return {
      id: consulta?.id,
      nroConsulta: consulta?.id,
      fecha: consulta?.reserva?.fecha ? formatDate(consulta?.reserva?.fecha) : "No tiene",
      tratamiento: consulta?.tratamiento?.descripcion ? consulta?.tratamiento?.descripcion : "No tiene",
      descripcion: consulta?.descripcion,
      costo: 0,
    };
  });
};

export const getProximaConsulta = (consultas: any[]) => {
    const allConsultas = [...consultas]
    const sortedConsultas =  allConsultas?.sort((consultaA: any, consultaB: any) => {
        return dayjs(consultaA?.reserva?.fecha).isBefore(dayjs(consultaB?.reserva?.fecha)) ? -1 : 1;
    });

    const proximaConsulta = sortedConsultas?.find((item: any) => dayjs(item?.reserva?.fecha).isAfter(dayjs()));
    return proximaConsulta;
}


export const getFileName = (url: string) => {

}