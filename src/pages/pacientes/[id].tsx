import clsx from "clsx";
import Pencil from "mdi-material-ui/Pencil";
import Table from "src/components/Table/table";
import { useEffect, useState } from "react";
import HistorialClinicoTable from "src/components/HistorialClinicoTable/HistorialClinicoTable";
import OdontoGrama from "src/components/Odontograma/Odontograma";
import { useRouter } from "next/router";

interface ItemInfoProps {
  keyItem: string;
  value: string;
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

const historialClilinco = [
  {
    id: 1,
    nroConsulta: 11,
    fecha: "28/09/2022",
    tratamiento: "Extraccion",
    descripcion: "Esto es una descripcion",
    costo: "400",
    archivos: [
      {
        name: "Archivo1.pdf",
        link: "#",
      },
      {
        name: "File2.jpg",
        link: "#",
      },
    ],
  },
  {
    id: 2,
    nroConsulta: 11,
    fecha: "28/09/2022",
    tratamiento: "Subiction",
    descripcion: "Esto es una descripcion",
    costo: "400",
    archivos: [
      {
        name: "Archivo1.pdf",
        link: "#",
      },
      {
        name: "File2.jpg",
        link: "#",
      },
    ],
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
  const fechaAlta = "01/01/2020";
  const router = useRouter();
  const { id = "" } = router.query;
  const userId = id as string;

  const [itemsToMap, setItemsToMap] = useState<any[]>(historialClilinco);

  return (
    <div className="w-full h-full flex-grow flex flex-col py-20 gap-5 overflow-auto">
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
            <ItemInfo keyItem="Nombre" value="Maximiliano Olivera" />
            <ItemInfo keyItem="Edad" value="21" />
            <ItemInfo keyItem="Correo" value="test@gmail.com" />
            <ItemInfo keyItem="Telefono" value="098719635" />
            <ItemInfo keyItem="Fecha Ingreso" value="03/02/2015" />
          </div>
          <div className="w-[350px] h-auto flex flex-col items-start gap-2">
            <ItemInfo keyItem="T.C" value="44" />
            <ItemInfo keyItem="T.S" value="21" />
            <ItemInfo keyItem="Sen. Anestesia" value="Test Other" />
            <ItemInfo keyItem="P.A MAX" value="11" />
            <ItemInfo keyItem="P.A MIN" value="32" />
            <ItemInfo keyItem="Sen. Antibiotico" value="Test" />
          </div>
          <div className="flex pr-2 flex-grow h-auto gap-2 items-end justify-start flex-col">
            <span className="text-base text-[#514D59] font-normal max-w-[200px] ">
              {fechaAlta
                ? fechaAlta
                : "Actualmente el paciente no tiene una fecha de alta"}
            </span>
            <button
              className={clsx(
                "px-4 py-2 rounded-md shadow-md text-white",
                fechaAlta ? "bg-red-500" : "bg-[#84DCCC]"
              )}
            >
              {fechaAlta ? "Dar de baja" : "Dar de baja"}
            </button>
          </div>
        </div>

        <span className="text-[#84DCCC] font-semibold text-[26px] my-2">
          Odontograma
        </span>
        <OdontoGrama uid={userId} />

        <span className="text-[#84DCCC] font-semibold text-[26px] my-2">
          Historial de consultas
        </span>
        <HistorialClinicoTable cols={cols} values={itemsToMap} />
      </div>
      <div className="flex w-full items-center gap-5 justify-start">
        <div className="w-[400px] h-[120px] p-4 bg-white rounded-[12px] flex flex-col  overflow-hidden">
          <span className="text-[#84DCCC] font-semibold text-[26px] my-2">
            Proxima consulta
          </span>
          <span className="text-base text-[#514D59] font-normal max-w-[200px] ">
            23/12/2020
          </span>
        </div>
        <div className="flex-grow w-full h-[120px] p-4 bg-white rounded-[12px] flex flex-col  overflow-hidden">
          <span className="text-[#84DCCC] font-semibold text-[26px] my-2">
            Archivos
          </span>
          <div className="w-full flex-grow flex items-center justify-start gap-2">
          <span className="text-[#84DCCC] cursor-pointer text-base font-medium">File1.pdf</span>
          <span className="text-[#84DCCC] cursor-pointer text-base font-medium">File2.pdf</span>
          <span className="text-[#84DCCC] cursor-pointer text-base font-medium">imagen.jpg</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PacienteInfo;
