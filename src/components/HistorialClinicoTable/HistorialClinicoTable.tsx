import clsx from "clsx";
import DownIcon from "mdi-material-ui/ChevronDown";
import { Consulta } from "src/types/consulta";
import { useEffect, useState } from "react";

type ColItem = {
  key: string;
  value: any;
  customWidth?: number | string;
};

interface Props {
  cols: ColItem[];
  values?: any[];
}

const HistorialClinicoTable = ({ cols, values }: Props) => {
  const initialValues = [];

  const [expandedItems, setExpandedItems] = useState<any>([]);

  useEffect(() => {
    if (values) {
      setExpandedItems(
        values?.map((item) => {
          return {
            id: item?.id,
            isExpanded: false,
          };
        })
      );
    }
  }, [values]);
  const handleToggleExpandItem = (item: any) => {
    const itemExpand = expandedItems?.find((i: any) => i?.id == item?.id);
    if (itemExpand) {
      setExpandedItems(
        expandedItems?.map((item: any) => {
          if (item?.id === itemExpand?.id) {
            return {
              ...itemExpand,
              isExpanded: !itemExpand?.isExpanded,
            };
          }
          return item;
        })
      );
    }
  };

  return (
    <div className="w-full h-auto flex flex-col items-start justify-start">
      {
        <div className="w-full h-auto flex flex-row items-center justify-between row">
          {cols?.map((item: ColItem, index: number) => {
            if (item?.key === "customAction") {
              return <div key={`idx-${index}`} className="w-[200px]"></div>;
            }
            return (
              <div
                className={clsx(
                  "w-full flex-grow h-auto flex text-[#514D59] text-center text-[18px] font-medium flex-row items-center justify-between",
                  item?.customWidth &&
                    `${
                      item?.customWidth === "auto"
                        ? "w-min"
                        : `w-[${item?.customWidth}]`
                    }`
                )}
              >
                <span className="text-center w-full m-auto">{item.value}</span>
              </div>
            );
          })}
        </div>
      }
      {values && values?.length === 0 && (
        <div className="w-full flex items-center justify-center h-auto p-10">
          <span>No se encontraron consultas</span>
        </div>
      )}
      {values
        ? values?.map((item: any, index: number) => {
            // TODO: expandedItems llega vacío 
            const isExpanded = expandedItems?.find(
              (i: any) => i?.id === item?.id
            )?.isExpanded;
              console.log("Current item: ", item, " index: ", index, " isExpanded: ", isExpanded);
            return (
              <div
                className="w-full h-auto flex flex-col items-start justify-start"
                key={`item-${index}`}
              >
                <div className="w-full h-auto flex flex-row items-center justify-between row">
                  {cols?.map((col: ColItem) => {
                    if (col?.key === "customAction") {
                      return (
                        <div key={`items-j-${col?.key}`} className="w-[200px]">
                          <DownIcon
                            className={clsx(
                              "font-semibold cursor-pointer text-gray-800 text-[20px] transform transition-all duration-500",
                              isExpanded ? "rotate-180" : "rotate-0"
                            )}
                            onClick={() => handleToggleExpandItem(item)}
                          />
                        </div>
                      );
                    }
                    return (
                      <div
                        key={`item-2-${index}`}
                        className={clsx(
                          "max-w-full truncate flex-grow h-auto flex text-[#514D59] text-center text-[18px] font-normal flex-row items-center justify-between",
                          col?.customWidth
                            ? `w-[${col?.customWidth}]`
                            : "flex-grow w-full "
                        )}
                      >
                        <span className="text-center m-auto w-full">
                          {item[col?.key] || "-"}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div
                  className={clsx(
                    "w-full px-5 flex flex-row bg-white transition-all overflow-hidden",
                    isExpanded ? "h-[auto] py-4 " : "p-0 h-0 opacity-0"
                  )}
                >
                  <div className="flex flex-col justify-center gap-y-6 w-full flex-grow h-full">
                    <span className="text-[#514D59] text-[20px] font-medium">
                      Datos de la consulta
                    </span>
                    <span className="text-[#514D59] text-[18px] font-normal max-w-[80%] overflow-hidden truncate overflow-hidden">
                      Descripcion: {item?.descripcion}
                    </span>
                    <span className="text-[#514D59] text-[18px] font-normal max-w-[80%] overflow-hidden truncate overflow-hidden">
                      Arancel: {item?.arancelName} - {" "}
                      {item?.arancelPrecio &&<span className="text-[#84DCCC]">
                        ${item?.arancelPrecio}
                      </span>}
                      <span>
                      {item?.cantOrdenes && (
                        <span className="block">
                          Ordenes:{" "}
                          <span className="text-[#84DCCC]">
                            {item?.cantOrdenes}
                          </span>
                        </span>
                      )}
                      </span>

                      {
                        item?.arancelLabName && <span className="block text-gray-900 font-semibold">
                        Arancel Laboratorio:{" "}
                        <span className="fonr-medium text-[#84DCCC]">
                          {item?.arancelLabName}
                        </span>
                      </span>
                      }
                      {
                        item?.arancelLabPrecio && <span className="block text-gray-900 font-normal">
                        Costo Arancel Laboratorio:{" "}
                        <span className="fonr-medium text-[#84DCCC]">
                          ${item?.arancelLabPrecio}
                        </span>
                      </span>
                      }
                      {
                        item?.entrega && <span className="block text-gray-900 font-normal">
                        Entrega {" "}
                        <span className="fonr-medium text-[#84DCCC]">
                          ${item?.entrega}
                        </span>
                      </span>
                      }
                    </span>
                  </div>
                  <div className="w-full flex-grow h-full flex flex-col justify-end">
                    {/* <div className="text-[#514D59] text-[20px] flex flex-row gap-2 font-medium">
                      Archivos Asociados:
                      <div className="flex flex-col gap-1">
                        {item?.archivos?.map((file: any) => {
                          return (
                            <span className="text-[#84DCCC] cursor-pointer text-base font-medium">
                              {file.name}
                            </span>
                          );
                        })}
                      </div>
                    </div> */}
                    <span className="text-[#514D59] text-[18px] font-normal max-w-full overflow-hidden truncate">
                      Total:{" "}
                      <span className="text-[#84DCCC]">
                        ${item?.totalPrice}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default HistorialClinicoTable;
