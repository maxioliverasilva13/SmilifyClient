import clsx from "clsx";
import Pencil from "mdi-material-ui/Pencil";
import Table from "src/components/Table/table";
import { useEffect, useState } from "react";
import HistorialClinicoTable from "src/components/HistorialClinicoTable/HistorialClinicoTable";
import OdontoGrama from "src/components/Odontograma/Odontograma";
import { useRouter } from "next/router";
import {
  useCambiarEstadoMutation,
  useGetPacienteInfoQuery,
} from "src/store/services/PacienteService";
import Loader from "src/components/Loader/Loader";
import Error404 from "../404";
import dayjs from "dayjs";
import {
  formatConsultas,
  formatDate,
  getEdadbyFecha,
  getProximaConsulta,
} from "src/utils/paciente";
import { FcApproval, FcCancel } from "react-icons/fc";
import { Archivo } from "src/types/paciente";
import AddFileModal from "src/components/Modals/AddFileModal";
import { FileIcon, defaultStyles } from "react-file-icon";
import { getFileType } from "src/utils/utils";
import GlobalSpinner from "src/components/Spinner/GlobalSpinner";

interface ItemInfoProps {
  keyItem: string;
  value: string | any;
}

const cols: any = [
  {
    key: "customAction",
    value: "",
    customWidth: "",
  },
  {
    key: "nroConsulta",
    value: "Numero Consulta",
  },
  {
    key: "fecha",
    value: "Fecha",
  },
  {
    key: "tratamiento",
    value: "Tratamiento",
  },
];

const ItemInfo = ({ keyItem, value }: ItemInfoProps) => {
  return (
    <span className="text-[18px] text-[#514D59] font-medium max-w-full overflow-hidden truncate">
      {keyItem}: {value}
    </span>
  );
};

const PacienteInfo = () => {
  const router = useRouter();
  const { id = "" } = router.query;
  const userId = id as string;

  const [fileModalOpen, setFileModalOpen] = useState(false);
  const [files, setFiles] = useState<Archivo[]>([]);
  const { data, isLoading, refetch } = useGetPacienteInfoQuery(userId, {
    skip: !userId,
  });
  const [camibarEstado, { isLoading: isLoadingCambiar }] =
    useCambiarEstadoMutation();

  useEffect(() => {}, [isLoading]);

  useEffect(() => {
    if (data?.archivos && data?.archivos?.length > 0) {
      setFiles(data?.archivos);
    }
  }, [data]);


  if (!isLoading && !data) {
    return <Error404 />;
  }

  const formattedConsultas = formatConsultas(data?.consultas || []);

  const handleCambiarEstado = async (alta?: boolean) => {
    let dataToSend: any = {
      pacienteId: userId,
    };
    if (alta) {
      dataToSend = {
        ...dataToSend,
        fechaAlta: dayjs().format("DD/MM/YYYY"),
        alta,
      };
    } else {
      dataToSend = {
        ...dataToSend,
        fechaAlta: pacienteInfo?.fechaDeAlta,
        alta: false,
      };
    }
    const response = await camibarEstado(dataToSend);
  };

  const pacienteInfo = data?.pacienteInfo;
  const tieneAlta = pacienteInfo?.tieneAlta;

  const proximaConsulta = getProximaConsulta(data?.consultas || []);

  return (
    <div className="w-full h-full flex-grow flex flex-col py-20 gap-5 overflow-auto">
      {(isLoading || isLoadingCambiar) && <GlobalSpinner />}
      {pacienteInfo && (
        <AddFileModal
          isOpen={fileModalOpen}
          setIsOpen={setFileModalOpen}
          onSuccess={() => refetch()}
          paciente={pacienteInfo}
        />
      )}
      <div className="w-full h-auto p-4 flex bg-white rounded-lg shadow-md flex flex-col items-start justify-start">
        <div className="w-full h-auto flex items-center justify-between">
          <span className="text-[#84DCCC] font-semibold text-[26px]">
            Informacion del Paciente
          </span>
          <div className="flex gap-2 items-center cursor-pointer">
            <Pencil className="text-[#514D59] text-[20px]" />
            <span className="font-medium text-[#514D59] text-[20px]">
              Editar
            </span>
          </div>
        </div>
        <div className="w-full flex flex-row items-start justify-start">
          <div className="w-[400px] h-auto flex flex-col items-start gap-2">
            <ItemInfo keyItem="Nombre" value={pacienteInfo?.nombre} />
            <ItemInfo keyItem="Apellido" value={pacienteInfo?.apellido} />
            <ItemInfo
              keyItem="Edad"
              value={getEdadbyFecha(pacienteInfo?.fechaDeNacimiento)}
            />
            <ItemInfo keyItem="Correo" value={pacienteInfo?.correo} />
            <ItemInfo keyItem="Telefono" value={pacienteInfo?.telefono} />
          </div>
          {/* <div className="w-[350px] h-auto flex flex-col items-start gap-2">
            <ItemInfo keyItem="T.C" value="44" />
            <ItemInfo keyItem="T.S" value="21" />
            <ItemInfo keyItem="Sen. Anestesia" value="Test Other" />
            <ItemInfo keyItem="P.A MAX" value="11" />
            <ItemInfo keyItem="P.A MIN" value="32" />
            <ItemInfo keyItem="Sen. Antibiotico" value="Test" />
          </div> */}
          <div className="flex pr-2 flex-grow h-auto gap-2 items-end justify-start flex-col">
            <div className="flex flex-row items-center justify-center gap-2">
              {tieneAlta ? (
                <FcApproval color="green" size={25} />
              ) : (
                <FcCancel color="red" size={25} />
              )}
              <span>
                {tieneAlta ? "Usuario Dado de alta" : "Usuario Dado de baja"}
              </span>
            </div>
            <span className="text-base text-[#514D59] font-normal max-w-[250px] ">
              {tieneAlta
                ? `Fecha Alta: ${formatDate(pacienteInfo?.fechaDeAlta)}`
                : pacienteInfo?.fechaDeAlta
                ? `Ultima fecha alta: ${formatDate(pacienteInfo?.fechaDeAlta)}`
                : "Actualmente el paciente no tiene una fecha de alta"}
            </span>
            <button
              className={clsx(
                "px-4 py-2 rounded-md shadow-md text-white",
                tieneAlta ? "bg-red-500" : "bg-[#84DCCC]"
              )}
              onClick={() => handleCambiarEstado(!tieneAlta)}
            >
              {tieneAlta ? "Dar de baja" : "Dar de alta"}
            </button>
          </div>
        </div>

        <span className="text-[#84DCCC] font-semibold text-[26px] my-2">
          Odontograma
        </span>
        <OdontoGrama uid={userId} />

        <span className="text-[#84DCCC] font-semibold text-[26px] my-2">
          Historial de consultas y reservas
        </span>
        <HistorialClinicoTable cols={cols} values={formattedConsultas || []} />
      </div>
      <div className="flex w-full items-start gap-5 justify-start">
        <div className="w-[400px] h-[160px] p-4 bg-white rounded-[12px] flex flex-col  overflow-hidden">
          <span className="text-[#84DCCC] font-semibold text-[26px] my-2">
            Proxima consulta
          </span>
          {proximaConsulta && (
            <abbr
              title={proximaConsulta?.descripcion}
              className="text-base decoration-none text-[#514D59] max-h-[70px] truncate font-normal max-w-[200px] "
            >
              {`Descripcion: ${proximaConsulta?.descripcion}`}
            </abbr>
          )}

          <span className="text-base text-[#514D59] font-normal max-w-[200px] ">
            {proximaConsulta
              ? formatDate(proximaConsulta?.reserva?.fecha)
              : "Sin consultas a futuro"}
          </span>
        </div>
        <div className="flex-grow w-full h-auto p-4 bg-white rounded-[12px] flex flex-col  overflow-hidden">
          <span className="text-[#84DCCC] font-semibold text-[26px] my-2">
            Archivos
          </span>
          <div className="w-full flex-grow flex items-center justify-start gap-4 flex-wrap">
            {files?.map((archivo: Archivo) => {
              console.log(getFileType(archivo));
              return (
                <div className="w-[90px] h-auto max-w-[90px] overflow-hidden flex flex-col items-center justify-center gap-4">
                  <div className="w-[50px] h-[50px]">
                    <FileIcon
                      extension={archivo.tipo}
                      {...defaultStyles[getFileType(archivo)]}
                    />
                    ;
                  </div>
                  <a
                    href={archivo?.url}
                    target="_blank"
                    className="text-[#84DCCC] max-w-full truncate overflow-hidden cursor-pointer text-base font-medium"
                  >
                    {archivo?.fileName}
                  </a>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setFileModalOpen((current) => !current)}
            className="w-max self-center bg-purple-700 active:bg-purple-800 hover:bg-purple-900 text-white font-semibold
        hover:shadow-md shadow text-md px-5 py-2 rounded-full outline outline-1 sm:mr-2 mb-1 ease-linear transition-all duration-150"
          >
            Subir Archivo
          </button>
        </div>
      </div>
    </div>
  );
};

export default PacienteInfo;
