import clsx from "clsx";
import { Reserva } from "src/types/reserva";

type ColItem = {
  key: string;
  value: any;
  customWidth?: number | string;
};

interface Props {
  cols: ColItem[];
  values?: Reserva[];
  onlyDiarias?: Boolean;
}

const ReservasTable = ({ cols, values, onlyDiarias }: Props) => {
  const renderNoResults = () => {
    <div className="w-full h-full flex-grow flex items-center justify-center ">
      <span className="text-[#514D59] font-medium">
        No se encontraron resultados
      </span>
    </div>;
  };

  const renderSwitch = (value: any, col: any) => {
    switch (col?.key) {
      case "nombre":
        return (
          <span className="text-center m-auto">{value.paciente?.nombre + " " + value.paciente?.apellido}</span>
        );
      case "correo":
        return (
          <span className="text-center m-auto">{value.paciente?.correo}</span>
        );
      case "telefono":
        return (
          <span className="text-center m-auto">{value.paciente?.telefono}</span>
        );
      case "fecha":
        return (
          <span className="text-center m-auto">
            {getProperDate(value[col?.key])?.toLocaleDateString("es-UY")}
          </span>
        );
      case "hora":
        return (
          <span className="text-center m-auto">
            {getProperDate(value["fecha"])?.toLocaleTimeString("es-UY")}
          </span>
        );
      default:
        return <span className="text-center m-auto">{value[col?.key]}</span>;
    }
  };

  function getProperDate(date: Number) {
    if (date == null) return null;
    return new Date(parseInt(date.toString(6)));
  }

  return (
    <div className="w-full h-auto flex flex-col items-start justify-start">
      {
        <div className="w-full h-auto flex flex-row items-center justify-between row pr-36 xl:pr-52 2xl:pr-54">
          {cols?.map((item: ColItem, index: number) => {
            return (
              <div
                key={index}
                className={clsx(
                  "w-full flex-grow h-auto flex text-[#514D59] text-center text-[18px] font-semibold flex-row items-center justify-between",
                  item?.customWidth &&
                    `${
                      item?.customWidth === "auto"
                        ? "w-min"
                        : `w-[${item?.customWidth}]`
                    }`
                )}
              >
                <span className="text-center m-auto">{item.value}</span>
              </div>
            );
          })}
        </div>
      }
      {values
        ? values?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className="w-full h-auto flex flex-row items-center justify-between row"
              >
                {cols?.map((col: ColItem, index: number) => {
                  return (
                    <div
                      key={index}
                      className={clsx(
                        "w-full flex-grow h-auto flex text-[#514D59] text-center text-[18px] font-normal flex-row items-center justify-between",
                        col?.customWidth && `w-[${col?.customWidth}]`
                      )}
                    >
                      {renderSwitch(item, col)}
                    </div>
                  );
                })}
                <div className="flex w-3/4 gap-6">
                  <a href="#" className="decoration-none text-[#84DCCC]">
                    {onlyDiarias ? "Cancelar" : "Aceptar"}
                  </a>
                  {!onlyDiarias ? (
                    <a href="#" className="decoration-none text-[#84DCCC]">
                      Modificar
                    </a>
                  ) : (
                    <a href="#" className="decoration-none uppercase text-[#84DCCC]">
                      Iniciar Consulta
                    </a>
                  )}
                </div>
              </div>
            );
          })
        : renderNoResults()}
    </div>
  );
};

export default ReservasTable;
