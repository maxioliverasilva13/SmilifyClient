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
}

const ReservasTable = ({ cols, values }: Props) => {
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
          <span className="text-center m-auto">{value.paciente?.nombre}</span>
        );
      case "correo":
        return (
          <span className="text-center m-auto">{value.paciente?.correo}</span>
        );
      case "telefono":
        return (
          <span className="text-center m-auto">{value.paciente?.telefono}</span>
        );
      default:
        return <span className="text-center m-auto">{value[col?.key]}</span>;
    }
  };

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
                    Aceptar
                  </a>
                  <a href="#" className="decoration-none text-[#84DCCC]">
                    Modificar
                  </a>
                </div>
              </div>
            );
          })
        : renderNoResults()}
    </div>
  );
};

export default ReservasTable;
