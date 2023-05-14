import Table from "src/components/Table/table";
import SearchIcon from "mdi-material-ui/Magnify";
import Filter from "mdi-material-ui/FilterVariant";
import { useGetPacientesQuery } from "src/store/services/PacienteService";
import GlobalSpinner from "src/components/Spinner/GlobalSpinner";
import { getToken } from "src/utils/prepareHeaders";

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

    // const handleGetPacientes = async () => {
    //     const response = await fetch("http://localhost:8080/Smilify-1.0/resources/entities.paciente", {
    //         method: "GET",
    //         headers: {
    //             "Authorization": getToken(),
    //         }
    //     })
    //     const data = await response.json()
    //     console.log(data)
    // }

    // handleGetPacientes();

  if (isLoading) {
    return <GlobalSpinner />;
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
                className="bg-transparent text-[#A8A8A8] outline-none"
                placeholder="Search..."
              />
            </div>
          </div>
          <Filter className="cursor-pointer" />
        </div>

        <Table cols={cols} values={pacientes} />
      </div>
    </div>
  );
};

export default Pacientes;
