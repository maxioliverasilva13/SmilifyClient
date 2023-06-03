import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

// ** Styled Component Import
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";

import StatisticsCard from "src/views/dashboard/StatisticsCard";

import ReservasTable from "src/components/Table/reservasTable";

import { useGetReservasQuery } from "src/store/services/ReservaService";
import GlobalSpinner from "src/components/Spinner/GlobalSpinner";

import { useEffect, useState } from "react";
import { useGetArchivosByPacienteIdQuery, useCreateArchivoMutation } from "src/store/services/FileService"; 
import useGlobal from "src/hooks/useGlobal";
import { Reserva } from "src/types/reserva";

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

const events = [
  {
    id: 1,
    title: 'Event 1',
    start: new Date(),
    end: new Date(moment().add(1, 'hours').toDate()),
  },
  {
    id: 2,
    title: 'Event 2',
    start: new Date(moment().add(1, 'day').toDate()),
    end: new Date(moment().add(1, 'day').add(2, 'hours').toDate()),
  },
];


const MyCalendar = () => (
  <div>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      step={30}
      popup={true} // Indica si se deben mostrar los eventos en un cuadro emergente
      popupOffset={{ x: 30, y: 20 }} // Ajusta la posición del cuadro emergente en relación con el evento seleccionado
      culture="es"
      
      style={{ height: 500 }}
    />
  </div>
)

const Agenda = () => {
  const { data: reservas, isLoading } = useGetReservasQuery({});

  if (isLoading) {
    return <GlobalSpinner />;
  }

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
          <div className='w-full flex justify-center my-12'>
            <MyCalendar />
          </div>
        </div>
      </div>
    </ApexChartWrapper>
  );
};

export default Agenda;
