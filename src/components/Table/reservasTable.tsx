import clsx from "clsx";
import { Reserva } from "src/types/reserva";

import ConfirmModal from "../Modals/Reserva/ConfirmModal";
import ModificarFechaModal from "../Modals/Reserva/ModificarFechaModal";

import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FcCalendar } from "react-icons/fc";
import { IoLogoWhatsapp } from "react-icons/io";

import moment from "moment";
import "moment/locale/es"; // Importa el idioma deseado para moment.js
import { useEffect, useState } from "react";
moment.locale("es");

import { useCambiarEstadoReservaMutation } from "src/store/services/ReservaService";

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

const ReservasTable = ({ cols, values = [], onlyDiarias }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(false);
  const [isAceptarModalOpen, setIsAceptarModalOpen] = useState(false);
  const [isRechazarModalOpen, setIsRechazarModalOpen] = useState(false);
  const [isModificarFechaMOpen, setIsModificarFechaMOpen] = useState(false);
  const [currentReserva, setCurrentReserva] = useState(null);
  const [successApprove, setSuccessApprove] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [successModifyDate, setSuccessModifyDate] = useState(false);
  const [
    camibarEstado,
    { isLoading: isLoadingEstado },
  ] = useCambiarEstadoReservaMutation();
  useEffect(() => {
    if (successApprove) {
      handleAceptarRes(currentReserva);
      setCurrentReserva(null);
      setSuccessApprove(false);
    }
    if (successDelete) {
      handleRechazarRes(currentReserva);
      setCurrentReserva(null);
      setSuccessDelete(false);
    }
    if (successModifyDate) {
      handleModificarRes(currentReserva);
      setCurrentReserva(null);
      setSuccessModifyDate(false);
    }
  }, [successApprove, successDelete, successModifyDate]);
  useEffect(() => {
    if (isAceptarModalOpen) {
      setSuccessApprove(false);
    }
  }, [isAceptarModalOpen]);

  const renderNoResults = () => {
    return (
      <div className="w-full h-full flex-grow transition-all flex items-center justify-center ">
        <span className="text-[#514D59] font-medium py-8">
          No se encontraron reservas para el día de hoy.
        </span>
      </div>
    );
  };

  const renderSwitch = (value: any, col: any) => {
    switch (col?.key) {
      case "nombre":
        return (
          <span className="text-center m-auto">
            {value.paciente?.nombre + " " + value.paciente?.apellido}
          </span>
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
            {getProperDate(value[col?.key])
              ?.format("DD-MM-YYYY, HH:mm:ss")
              .toString()}
          </span>
        );
      case "hora":
        return (
          <span className="text-center m-auto">
            {getProperDate(value["fecha"])?.format("HH:mm:ss").toString()}
          </span>
        );
      default:
        return <span className="text-center m-auto">{value[col?.key]}</span>;
    }
  };

  function getProperDate(date: number) {
    if (date == null) return null;
    return moment(new Date(date));
  }

  async function handleAceptarRes(item: any) {
    console.log(item);
    let dataToSend: any = {
      id: item?.id,
      operacion: "aceptar",
    };
    await camibarEstado(dataToSend).then((res) => console.log(res));
  }

  async function handleModificarRes(item: any) {
    if (date) {
      let dataToSend: any = {
        id: item?.id,
        operacion: "modificar",
        // fecha: moment(new Date()).format("YYYY-MM-DD HH:mm:ss").toString(),
        fecha: date,
      };
      //console.log(dataToSend)
      await camibarEstado(dataToSend).then((res) => console.log(res));
    }
  }

  async function handleRechazarRes(item: any) {
    let dataToSend: any = {
      id: item.id,
      operacion: "rechazar",
    };
    //console.log(dataToSend)
    await camibarEstado(dataToSend).then((res) => console.log(res));
  }

  return (
    <>
      {isAceptarModalOpen && (
        <ConfirmModal
          setOpen={setIsAceptarModalOpen}
          setSuccess={setSuccessApprove}
          title="Confirmar"
          text="¿Confirma el ACEPTAR esta reserva?"
        />
      )}
      {isRechazarModalOpen && (
        <ConfirmModal
          setOpen={setIsRechazarModalOpen}
          setSuccess={setSuccessDelete}
          title="Rechazar"
          text="¿Confirma el RECHAZAR esta reserva?"
        />
      )}
      {isModificarFechaMOpen && (
        <ModificarFechaModal
          setOpen={setIsModificarFechaMOpen}
          setSuccess={setSuccessModifyDate}
          setDate={setDate}
        />
      )}
      <div className="w-full h-auto flex flex-col items-start justify-start">
        {
          <div className="w-full h-auto flex flex-row items-center justify-between row pr-36 xl:pr-52 2xl:pr-64">
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
        {values?.length > 0
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
                    {onlyDiarias && (
                      <>
                        <button className="decoration-none text-[#84DCCC]">
                          Cancelar
                        </button>
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="decoration-none uppercase text-[#84DCCC]"
                        >
                          Iniciar Consulta
                        </button>
                      </>
                    )}
                    {!onlyDiarias && (
                      <>
                        <button
                          onClick={() => {
                            setCurrentReserva(item);
                            setIsModificarFechaMOpen(true);
                          }}
                          className="decoration-none text-[#84DCCC]"
                        >
                          {/* Modificar */}
                          <FcCalendar title="Modificar fecha" size={28} />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentReserva(item);
                            setIsAceptarModalOpen(true);
                          }}
                          className="decoration-none text-[#84DCCC]"
                        >
                          {/* Aceptar */}
                          <FaCheck title="Aceptar" size={25} />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentReserva(item);
                            setIsRechazarModalOpen(true);
                          }}
                          className="decoration-none text-[#FF8C8C]"
                        >
                          {/* Rechazar */}
                          <ImCross title="Rechazar" size={20} />
                        </button>
                        <a
                          target="_blank"
                          href={`https://wa.me/598${item?.paciente?.telefono}?text=Estimado(a)%20${item?.paciente?.nombre},%20es%20un%20placer%20dirigirnos%20hacia%20usted%20desde%20la%20Clínica%20Dental%20Smilify.`}
                          className="decoration-none text-[#25D366]"
                        >
                          <IoLogoWhatsapp
                            title={
                              "Mensaje privado a " + item?.paciente?.telefono
                            }
                            size={25}
                          />
                        </a>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          : renderNoResults()}
      </div>
    </>
  );
};

export default ReservasTable;
