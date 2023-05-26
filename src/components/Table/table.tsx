import clsx from "clsx";
import Loader from "../Loader/Loader";

type ColItem = {
  key: string;
  value: any;
  customWidth?: number | string;
};

interface Props {
  cols: ColItem[];
  values?: any[];
  customClick: Function,
  isLoading?: boolean,
}

const Table = ({ cols, values, customClick, isLoading = false }: Props) => {
  const renderNoResults = () => {
    return (<div className="w-full h-full flex-grow transition-all flex items-center justify-center ">
      <span className="text-[#514D59] font-medium py-8">No se encontraron resultados</span>
    </div>)
  }

  return (
    <div className="w-full h-auto flex relative flex-col items-start justify-start">
      {
        <div className="w-full h-auto sticky top-0 flex flex-row items-center justify-between row">
          {cols?.map((item: ColItem, index: number) => {
            return (
              <div
                key={index}
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
      {
      isLoading ? <Loader /> : 
      values && values?.length > 0 ? values?.map((item: any, index: number) => {
        return (
          <div key={index} className="w-full h-auto flex flex-row items-center justify-between row">
            {cols?.map((col: ColItem, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() => customClick(item)} 
                  className={clsx(
                    "max-w-full cursor-pointer truncate flex-grow h-auto flex text-[#514D59] text-center text-[18px] font-normal flex-row items-center justify-between",
                    col?.customWidth ? `w-[${col?.customWidth}]` : "flex-grow w-full "
                  )}
                >
                  {col?.key === "historialClinicoLink" ? (
                    <a href="#" className="decoration-none text-[#84DCCC]">
                      Historia Clinica
                    </a>
                  ) : (
                    <span className="text-center m-auto max-w-full truncate">{item[col?.key] || "-"}</span>
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
