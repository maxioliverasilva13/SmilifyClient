import clsx from "clsx";
import { Paciente } from "src/types/paciente";

type ColItem = {
  key: string;
  value: any;
  customWidth?: number | string;
};

interface Props {
  cols: ColItem[];
  values?: Paciente[];
}

const Table = ({ cols, values }: Props) => {

  const renderNoResults = () => {
    <div className="w-full h-full flex-grow flex items-center justify-center ">
      <span className="text-[#514D59] font-medium">No se encontraron resultados</span>
    </div>
  }

  return (
    <div className="w-full h-auto flex flex-col items-start justify-start">
      {
        <div className="w-full h-auto flex flex-row items-center justify-between row">
          {cols?.map((item: ColItem, index: number) => {
            return (
              <div
                className={clsx(
                  "w-full flex-grow h-auto flex text-[#514D59] text-center text-[18px] font-normal flex-row items-center justify-between",
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
      {values ? values?.map((item: any, index: number) => {
        return (
          <div className="w-full h-auto flex flex-row items-center justify-between row">
            {cols?.map((col: ColItem) => {
              return (
                <div
                  className={clsx(
                    "w-full max-w-full truncate flex-grow h-auto flex text-[#514D59] text-center text-[18px] font-normal flex-row items-center justify-between",
                    col?.customWidth && `w-[${col?.customWidth}]`
                  )}
                >
                  {col?.key === "historialClinicoLink" ? (
                    <a href="#" className="decoration-none text-[#84DCCC]">
                      Historia Clinica
                    </a>
                  ) : (
                    <span className="text-center m-auto">{item[col?.key]}</span>
                  )}
                </div>
              );
            })}
          </div>
        );
      }) : renderNoResults()}
    </div>
  );
};

export default Table;
