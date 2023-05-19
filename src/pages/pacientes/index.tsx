import Table from "src/components/Table/table";
import SearchIcon from "mdi-material-ui/Magnify";
import Filter from "mdi-material-ui/FilterVariant";
import { useGetPacientesQuery } from "src/store/services/PacienteService";
import GlobalSpinner from "src/components/Spinner/GlobalSpinner";
import { getToken } from "src/utils/prepareHeaders";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import appRoutes from "src/utils/appRoutes";

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
    key: "ultimaConsulta",
    value: "Ultima Consulta",
  },
  {
    key: "historialClinicoLink",
    value: "",
    customWidth: "700px",
  },
];

const Pacientes = () => {
  const { data: pacientes, isLoading } = useGetPacientesQuery({});
  const [query, setQuery] = useState("");
  const [filterData, setFilterData] = useState<any>([]);
  const { push } = useRouter();

  useEffect(() => {
    if (query) {
      const results = pacientes?.filter((item) => {
        return item?.apellido?.includes(query) ||
          item?.nombre?.includes(query) ||
          item?.correo?.includes(query) ||
          item?.direccion?.includes(query) ||
          item?.telefono?.toString()?.includes(query);
      });
      setFilterData(results);
    }
  }, [query]);

  const dataToUse = query ? filterData : pacientes;

  if (isLoading) {
    return <GlobalSpinner />;
  }

  const handleGoingToPacientePage = (data: any) => {
    const id = data?.id;
    push(appRoutes.pacientePage(id))
  }

  return (
    <div className="w-full h-full flex flex-grow flex flex-row items-start justify-center max-h-full overflow-auto">
      <div className="w-full flex-grow h-auto bg-white rounded-lg shadow-xl p-6 flex flex-col items-start justify-start">
        <div className="w-full flex flex-row items-center justify-start gap-2   pb-[60px]">
          <div className="w-full flex flex-row items-center max-w-full justify-between">
            <p className="text-[28px] font-semibold text-[#84DCCC]">
              Listado Pacientes
            </p>
            <div className="overflow-hidden flex flex-row items-center justify-start gap-1 border-[0.5px] border-[#A8A8A8] px-4 py-2 rounded-full h-[40px] w-[240px] ">
              <SearchIcon />
              <input
                value={query}
                onChange={(e) => setQuery(e?.target?.value)}
                className="bg-transparent text-[#A8A8A8] outline-none"
                placeholder="Search..."
              />
            </div>
          </div>
          <Filter className="cursor-pointer" />
        </div>

        <Table customClick={handleGoingToPacientePage} cols={cols} values={dataToUse} />
      </div>
    </div>
  );
};

export default Pacientes;
