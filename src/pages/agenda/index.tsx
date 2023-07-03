import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar"; // @ts-ignore
import moment from "moment";
import "moment/locale/es"; // Importa el idioma deseado para moment.js

const localizer = momentLocalizer(moment);
moment.locale("es");

// ** Styled Component Import
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";

import ReservasTable from "src/components/Table/reservasTable";

import {
  useGetReservasHoyQuery,
  useGetReservasMonthQuery,
} from "src/store/services/ReservaService";
import GlobalSpinner from "src/components/Spinner/GlobalSpinner";
import ConfirmationModal from "src/components/Modals/ConfirmationModal";

import { useEffect, useState } from "react";
import { Reserva } from "src/types/reserva";
import ReservaInfoModal from "src/components/Modals/Reserva/ReservaInfoModal";
import clsx from "clsx";
import AgregarReservaModal from "src/components/AgregarReservaModal";

const cols: any = [
  {
    key: "nombre",
    value: "Nombre",
  },
  {
    key: "hora",
    value: "Hora",
  },
];

const customTags = {
  today: "Hoy",
  previous: "<",
  next: ">",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  showMore: (total: any) => `Ver más (${total})`,
};

type fetchMonthlyInfo = {
  month: number;
  year: number;
};

const Agenda = () => {
  const [currentViewDate, setCurrentViewDate] = useState<fetchMonthlyInfo>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const [openModal, setOpenModal] = useState(false);
  const [openModalAgregarReserva, setOpenModalAgregarReserva] = useState(false);


  const [selectedReserva, setSelectedReserva] = useState<Reserva>();

  const { data: reservasToday, isLoading: isReservasTodayLoading } =
    useGetReservasHoyQuery({});
  const {
    data: reservasMonth,
    isLoading: isRMonthLoading,
    refetch: refetchMonth,
  } = useGetReservasMonthQuery(currentViewDate);

  useEffect(() => {
    refetchMonth();
  }, [currentViewDate]);

  if (isReservasTodayLoading || isRMonthLoading) {
    return <GlobalSpinner />;
  }
  const MyCalendar = () => {
    // El calendar recibe el listado de reservas para el MES actual.
    if (!isRMonthLoading) {
      const fechas = reservasMonth?.map((reserva) => {
        return new Object({
          id: reserva.id,
          title: reserva.paciente.nombre + " " + reserva.paciente.apellido,
          start: new Date(reserva.fecha),
          end: moment(new Date(reserva.fecha)).add(30, "minutes").toDate(),
          reserva: reserva,
        });
      });

      const handleNavigate = (newDate: Date, view: any) => {
        if (newDate.getMonth() + 1 !== currentViewDate.month) {
          setCurrentViewDate({
            month: newDate.getMonth() + 1,
            year: newDate.getFullYear(),
          });
        }
      };

      const handleOpenModal = (eventInfo: any) => {
        // con un if validar si la fecha de ESA reserva, es menor o mayor a la actual, para saber que datos mostrarle.
        setOpenModal(true);
        setSelectedReserva(eventInfo.reserva as Reserva);
      };

      return (
        <div>
          <Calendar
            localizer={localizer}
            events={fechas}
            defaultView="week"
            step={30}
            culture="es"
            scrollToTime={moment().hour(8).toDate()}
            messages={customTags}
            onNavigate={handleNavigate}
            // onDoubleClickEvent={(event) => {console.log(event)}}
            onSelectEvent={(event: any) => {
              handleOpenModal(event);
              console.log(event);
            }}
            style={{ height: 600, width: 800 }}
          />
        </div>
      );
    }
  };

  return (
    <ApexChartWrapper className="flex flex-col gap-7">
      {openModal && (
        <ReservaInfoModal
          reserva={selectedReserva}
          setSelected={setSelectedReserva}
          setOpen={setOpenModal}
          title="Información de la Reserva"
        />
      )}
                <AgregarReservaModal 
            open={openModalAgregarReserva}
            setOpen={setOpenModalAgregarReserva}
          />
      <div className="w-full h-full flex flex-grow flex flex-row items-start justify-center max-h-full overflow-auto">
        <div className="w-full flex-grow h-auto bg-white rounded-lg shadow-xl p-6 flex flex-col items-start justify-start">
          <div className="w-full flex flex-row items-center justify-start gap-2   pb-[60px]">
            <div className="w-full flex flex-row items-center max-w-full justify-between">
              <p className="text-[28px] font-semibold text-[#84DCCC]">
                Consultas Hoy
              </p>
            </div>
            <button
              className={clsx(
                "px-4 py-2 w-[190px] text-center items-center justify-center flex rounded-md shadow-md text-white",
                "bg-[#84DCCC]"
              )}
              onClick={() => {
                setOpenModalAgregarReserva(true);
                // open modal here
              }}
            >
              Agregar reserva
            </button>
          </div>
          <ReservasTable
            cols={cols}
            values={reservasToday}
            onlyDiarias={true}
          />
          <div className="w-full flex justify-center my-12">{MyCalendar()}</div>
        </div>
      </div>
    </ApexChartWrapper>
  );
};

export default Agenda;
