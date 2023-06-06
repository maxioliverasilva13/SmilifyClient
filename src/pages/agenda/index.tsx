import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar"; // @ts-ignore
import moment from "moment";
import "moment/locale/es"; // Importa el idioma deseado para moment.js

const localizer = momentLocalizer(moment);
moment.locale("es");

// ** Styled Component Import
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";

import ReservasTable from "src/components/Table/reservasTable";

import { useGetReservasHoyQuery } from "src/store/services/ReservaService";
import GlobalSpinner from "src/components/Spinner/GlobalSpinner";
import ConfirmationModal from "src/components/Modals/ConfirmationModal";

import { useEffect, useState } from "react";

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

const Agenda = () => {
  const { data: reservas, isLoading } = useGetReservasHoyQuery({});

  if (isLoading) {
    return <GlobalSpinner />;
  }
  const MyCalendar = () => { // El calendar recibe el listado de reservas para el día actual.
    if (!isLoading) {
      const fechas = reservas?.map((reserva) => {
        return new Object({
          id: reserva.id,
          title: reserva.paciente.nombre + " " + reserva.paciente.apellido,
          start: new Date(reserva.fecha),
          end: moment(new Date(reserva.fecha)).add(30, "minutes").toDate(),
        });
      });
      return (
        <div>
          <Calendar
            localizer={localizer}
            events={fechas}
            defaultView="week"
            // startAccessor="start"
            // endAccessor="end"
            step={30}
            culture="es"
            // timeslots={2}
            scrollToTime={moment().hour(8).toDate()}
            messages={customTags}
            // onDoubleClickEvent={(event) => {console.log(event)}}
            onSelectEvent={(event: any) => {
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
      <div className="w-full h-full flex flex-grow flex flex-row items-start justify-center max-h-full overflow-auto">
        <div className="w-full flex-grow h-auto bg-white rounded-lg shadow-xl p-6 flex flex-col items-start justify-start">
          <div className="w-full flex flex-row items-center justify-start gap-2   pb-[60px]">
            <div className="w-full flex flex-row items-center max-w-full justify-between">
              <p className="text-[28px] font-semibold text-[#84DCCC]">
                Consultas Hoy
              </p>
            </div>
          </div>
          <ReservasTable cols={cols} values={reservas} onlyDiarias={true} />
          <div className="w-full flex justify-center my-12">{MyCalendar()}</div>
        </div>
      </div>
    </ApexChartWrapper>
  );
};

export default Agenda;
