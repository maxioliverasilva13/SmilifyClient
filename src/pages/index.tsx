// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Styled Component Import
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";

import StatisticsCard from "src/views/dashboard/StatisticsCard";

import ReservasTable from "src/components/Table/reservasTable";
import AddFileModal from "src/components/Modals/AddFileModal";

import { useGetReservasQuery } from "src/store/services/ReservaService";
import GlobalSpinner from "src/components/Spinner/GlobalSpinner";

import { useEffect, useState } from "react";
import { Paciente } from "src/types/paciente";

const cols: any = [
  {
    key: "nombre",
    value: "Nombre",
  },
  {
    key: "correo",
    value: "Correo",
  },
  {
    key: "telefono",
    value: "Telefono",
  },
  {
    key: "fecha",
    value: "Fecha",
  },
];

const Dashboard = () => {
  const { data: reservas, isLoading } = useGetReservasQuery({});

  const [isFileModalOpen, setIsFileModalOpen] = useState<boolean>(false);

  if (isLoading) {
    return <GlobalSpinner />;
  }

  return (
    <ApexChartWrapper className="flex flex-col gap-7">
      <Grid item xs={12} md={12}>
        <StatisticsCard />
      </Grid>
      <div className="w-full h-full flex flex-grow flex flex-row items-start justify-center max-h-full overflow-auto">
        <div className="w-full flex-grow h-auto bg-white rounded-lg shadow-xl p-6 flex flex-col items-start justify-start">
          <div className="w-full flex flex-row items-center justify-start gap-2   pb-[60px]">
            <div className="w-full flex flex-row items-center max-w-full justify-between">
              <p className="text-[28px] font-semibold text-[#84DCCC]">
                Nuevas solicitudes de turnos
              </p>
            </div>
          </div>
          <ReservasTable cols={cols} values={reservas} />
        </div>
      </div>
      <button
        onClick={() => setIsFileModalOpen((current) => !current)}
        className="w-max self-center bg-purple-700 active:bg-purple-800 hover:bg-purple-900 text-white font-semibold
        hover:shadow-md shadow text-md px-5 py-2 rounded-full outline outline-1 sm:mr-2 mb-1 ease-linear transition-all duration-150"
      >
        Subir Archivo
      </button>
    </ApexChartWrapper>
  );
};

export default Dashboard;
