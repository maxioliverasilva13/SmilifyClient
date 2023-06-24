import * as React from "react";
import { GrClose } from "react-icons/gr";
import moment from "moment";
import "moment/locale/es"; // Importa el idioma deseado para moment.js
import { Reserva } from "src/types/reserva";
moment.locale("es");

import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoLogoWhatsapp } from "react-icons/io";

// Modals
import ConfirmModal from "./ConfirmModal";

import { useCambiarEstadoReservaMutation } from "src/store/services/ReservaService";

interface Props {
  setOpen: Function;
  setSelected: Function;
  title: string;
  reserva: Reserva | undefined;
}

export default function ReservaInfoModal({
  setOpen,
  title,
  reserva,
  setSelected,
}: Props) {
  const handleClose = () => {
    setOpen(false);
    setSelected(undefined);
  };
  const [isRechazarModalOpen, setIsRechazarModalOpen] = React.useState(false);
  const [successApprove, setSuccessApprove] = React.useState(false);
  const [successDelete, setSuccessDelete] = React.useState(false);
  const [
    camibarEstado,
    { isLoading: isLoadingEstado },
  ] = useCambiarEstadoReservaMutation();

  React.useEffect(() => {
    /* if (successApprove) {
      handleAceptarRes(currentReserva);
      setCurrentReserva(null);
      setSuccessApprove(false);
    } */
    if (successDelete) {
      handleRechazarRes(reserva?.id);
      setSuccessDelete(false);
      setOpen(false);
      setSelected(undefined);
    }
  }, [successApprove, successDelete]);

  async function handleRechazarRes(resId: any) {
    let dataToSend: any = {
      id: resId,
      operacion: "rechazar",
    };
    await camibarEstado(dataToSend).then((res) => console.log(res));
  }

  return (
      <div className="appearsAnimation backdrop-blur-md w-screen z-[100] h-screen fixed top-0 left-0 flex flex-col items-center justify-center">
      {isRechazarModalOpen && (
        <ConfirmModal
          setOpen={setIsRechazarModalOpen}
          setSuccess={setSuccessDelete}
          title="Rechazar"
          text="¿Confirma el RECHAZAR esta reserva?"
        />
      )}
        <div className="md:w-[640px] xl:w-[750px] 2xl:w-[1000px] h-auto p-[20px] shadow-xs border border-gray-300 rounded-lg bg-white flex flex-col items-center gap-y-5 relative">
          <GrClose
            size={20}
            onClick={handleClose}
            className="text-gray-900 cursor-pointer  absolute right-4 top-4"
          />

          <span className="text-gray-800 font-semibold text-[18px] text-center">
            {title}
          </span>
          <div className="w-full h-auto flex flex-col items-start justify-start gap-4">
            <span className="font-medium text-center w-full px-4 text-[16px]">
              {`Número de reserva: ${reserva?.id}`}
            </span>
            <span className="font-medium text-center w-full px-4 text-[16px]">
              {`Fecha: ${moment(reserva?.fecha)
                ?.format("DD-MM-YYYY")
                .toString()}`}
            </span>
            <span className="font-medium text-center w-full px-4 text-[16px]">
              {`Hora: ${moment(reserva?.fecha)?.format("HH:mm:ss").toString()}`}
            </span>
          </div>
          <span className="font-semibold text-center w-full px-4 text-[18px]">
            Información del Paciente asociado
          </span>
          <div className="w-full h-auto flex flex-col items-start justify-start gap-4">
            <span className="font-medium text-center w-full px-4 text-[16px]">
              {`Nombre Completo: ${reserva?.paciente.nombre} ${reserva?.paciente.apellido}`}
            </span>
            <span className="font-medium text-center w-full px-4 text-[16px]">
              {`Celular: ${reserva?.paciente.telefono}`}
            </span>
            <span className="font-medium text-center w-full px-4 text-[16px]">
              {`Correo: ${reserva?.paciente.correo}`}
            </span>
          </div>
          <div className="flex w-full justify-center gap-5 py-2">
            <button
              onClick={() => {
                // Rechazar reserva
                setIsRechazarModalOpen(true);
              }}
              className="decoration-none text-red-500"
            >
              {/* Rechazar */}
              <ImCross title="Rechazar reserva" size={30} />
            </button>
            <a
              target="_blank"
              href={`https://wa.me/598${reserva?.paciente?.telefono}?text=Estimado(a)%20${reserva?.paciente?.nombre},%20es%20un%20placer%20dirigirnos%20hacia%20usted%20desde%20la%20Clínica%20Dental%20Smilify.`}
              className="decoration-none text-[#25D366]"
            >
              <IoLogoWhatsapp
                title={`Mensaje privado a ${reserva?.paciente?.nombre} (${reserva?.paciente?.telefono})`}
                size={40}
              />
            </a>
          </div>
          <div className="flex gap-5">
            <button
              onClick={() => {
                // TODO: Funcionalidad iniciar consulta
              }}
              className="shadow-md text-white font-semibold rounded-md px-4 py-2 bg-blue-500"
            >
              Iniciar Consulta
            </button>
            <button
              onClick={() => {
                setOpen(false);
                setSelected(undefined);
              }}
              className="shadow-md text-white font-semibold rounded-md px-4 py-2 bg-green-500"
            >
              Volver a la Agenda
            </button>
          </div>
        </div>
      </div>
  );
}
