import * as React from "react";
import { GrClose } from "react-icons/gr";
import clsx from "clsx";
import { ConsultaExtended } from "src/types/consulta";
import moment from "moment";
import "moment/locale/es"; // Importa el idioma deseado para moment.js
import { useEffect, useState } from "react";
import CustomDescripcion from "../Odontograma/components/CustomDescripcion";
moment.locale("es");

interface Props {
  setOpen: Function;
  title: string;
  values: ConsultaExtended[] | undefined;
}

type ColItem = {
  key: string;
  value: any;
  customWidth?: number | string;
};

const cols: any = [
  {
    key: "id",
    value: "Numero Consulta",
  },
  {
    key: "descripcion",
    value: "Descripción",
  },
  {
    key: "fecha",
    value: "Fecha",
  },
];

export default function ConsultasListModal({ setOpen, title, values }: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="appearsAnimation backdrop-blur-md w-screen z-[100] h-screen fixed top-0 left-0 flex flex-col items-center justify-center">
      <div className="md:w-[640px] xl:w-[750px] 2xl:w-[1000px] h-auto p-[20px] shadow-xs border border-gray-300 rounded-lg bg-white flex flex-col items-center gap-y-8 relative">
        <GrClose
          size={20}
          onClick={handleClose}
          className="text-gray-900 cursor-pointer  absolute right-4 top-4"
        />

        <span className="text-gray-800 font-medium text-[18px] text-center">
          {title}
        </span>
        <div className="w-full h-auto flex flex-col items-start justify-start">
        <span className="font-medium text-center w-full px-4 text-[14px]">
          Haz click en una descripcion para ver el texto completo
        </span>
          {
            <div className="w-full h-auto flex flex-row items-center justify-between row">
              {cols?.map((item: ColItem, index: number) => {
                if (item?.key === "customAction") {
                  return <div className="w-[200px]"></div>;
                }
                return (
                  <div
                  key={`key-${index}`}
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
              <span>No hay consultas asociadas.</span>
            </div>
          )}
          {values
            ? values?.map((item: any, index: number) => {
                return (
                  <div 
                    key={`item-2-${index + 1}`}
                  className="w-full h-auto flex flex-col items-start justify-start">
                    <div
                      className="w-full h-auto flex flex-row items-center justify-between row"
                    >
                      {cols?.map((col: ColItem) => {
                        if (col?.key === "fecha") {
                          return (
                            <div
                              key={`item-1-${index}`}
                              className={clsx(
                                "max-w-full truncate flex-grow h-auto flex text-[#514D59] text-center text-[18px] font-normal flex-row items-center justify-between flex-grow w-full"
                              )}
                            >
                              <span className="text-center m-auto w-full">
                                {moment(item?.reserva?.fecha)
                                  ?.format("DD-MM-YYYY, HH:mm:ss")
                                  ?.toString()}
                              </span>
                            </div>
                          );
                        }
                        return (
                          <div
                            key={`key-idx-${index + 2}`}
                            className={clsx(
                              "max-w-full truncate flex-grow h-auto flex text-[#514D59] text-center text-[18px] font-normal flex-row items-center justify-between",
                              col?.customWidth
                                ? `w-[${col?.customWidth}]`
                                : "flex-grow w-full "
                            )}
                          >
                            <span
                              //   onClick={handleClick}
                              className="text-center m-auto w-full"
                            >
                              {item[col?.key] || "-"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        <div className="flex gap-5">
          {/* <button
            onClick={() => setOpen(false)}
            className="shadow-md text-white font-semibold rounded-full px-4 py-2 bg-red-500"
          >
            Cancelar
          </button> */}
          <button
            onClick={() => {
              setOpen(false);
            }}
            className="shadow-md text-white font-semibold rounded-full px-4 py-2 bg-green-500"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
