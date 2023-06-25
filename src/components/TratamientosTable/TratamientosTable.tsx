import { current } from "@reduxjs/toolkit";
import clsx from "clsx";
import DownIcon from "mdi-material-ui/ChevronDown";
import { useState } from "react";

import ConsultasListModal from "./ConsultasListModal";
import { ConsultaExtended } from "src/types/consulta";
import { Tratamiento } from "src/types/paciente";
import CustomDescripcion from "../Odontograma/components/CustomDescripcion";

type ColItem = {
  key: string;
  value: any;
  customWidth?: number | string;
};

interface Props {
  cols: ColItem[];
  values?: Tratamiento[];
  consultas?: ConsultaExtended[];
}

const TratamientosTable = ({ cols, values, consultas }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [consultasTratamiento, setConsultasTratamiento] = useState<
    ConsultaExtended[]
  >();

  const handleClick = (tratamientoId: number) => {
    const consultasFiltradas = consultas?.filter(
      (consulta) => consulta?.tratamiento?.id === tratamientoId
    );
    setConsultasTratamiento(consultasFiltradas);
    setOpenModal((current) => !current);
  };

  const formatVales =
    consultasTratamiento?.map((item: any) => {
      return {
        ...item,
        descripcion: <CustomDescripcion text={item?.descripcion} />,
      };
    }) || [];

  return (
    <>
      {openModal && (
        <ConsultasListModal
          values={formatVales}
          setOpen={setOpenModal}
          title="Consultas asociadas al tratamiento"
        />
      )}
      <div className="w-full h-auto flex flex-col items-start justify-start">
        {
          <div className="w-full h-auto flex flex-row items-center justify-between row">
            {cols?.map((item: ColItem, index: number) => {
              if (item?.key === "customAction") {
                return <div className="w-[200px]"></div>;
              }
              return (
                <div
                  key={`item-column-${index}`}
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
                  <span className="text-center w-full m-auto">
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        }
        {values && values?.length === 0 && (
          <div className="w-full flex items-center justify-center h-auto p-10">
            <span>No hay tratamientos por el momento.</span>
          </div>
        )}
        {values
          ? values?.map((item: any, index: number) => {
              return (
                <div
                  className="w-full h-auto flex flex-col items-start justify-start"
                  key={`item-col-${index}`}
                >
                  <div className="w-full h-auto flex flex-row items-center justify-between row">
                    {cols?.map((col: ColItem) => {
                      return (
                        <div
                          key={`item-r-${index}`}
                          className={clsx(
                            "max-w-full truncate flex-grow h-auto flex text-[#514D59] text-center text-[18px] font-normal flex-row items-center justify-between",
                            col?.customWidth
                              ? `w-[${col?.customWidth}]`
                              : "flex-grow w-full "
                          )}
                        >
                          <button
                            onClick={() => handleClick(item.id)}
                            className="text-center m-auto w-full cursor-pointer"
                          >
                            {item[col?.key] || "-"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};

export default TratamientosTable;
