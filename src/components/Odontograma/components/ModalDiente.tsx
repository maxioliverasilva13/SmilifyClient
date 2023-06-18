import * as React from "react";
import { useRouter } from "next/router";
import OdontoGramaItem from "./OdontogramaItem";
import { GrClose } from "react-icons/gr";
import Table from "src/components/Table/table";
import CustomDescripcion from "./CustomDescripcion";
import AddNewItemDiente from "./AddNewItemDiente";
import { useGetInfoDienteMutation } from "src/store/services/DienteService";
import { Alert } from "@mui/material";

interface Props {
  setOpen: Function;
  dienteId: string | number;
  type: string;
  zone: string | any;
  clearZone: any;
  uid: string;
  onSuccess: Function,
}

const cols: any = [
  {
    key: "fecha",
    value: "Fecha",
  },
  {
    key: "type",
    value: "Zona",
  },
  {
    key: "dienteId",
    value: "Nro Diente",
  },
  {
    key: "descripcion",
    value: "Descripcion",
  },
];

export default function ModalDiente({
  setOpen,
  type,
  dienteId,
  zone,
  clearZone,
  uid,
  onSuccess,
}: Props) {
  const handleClose = () => {
    if (clearZone) clearZone();
    setOpen(false);
  };
  const [getInfoDiente, { isLoading }] = useGetInfoDienteMutation();
  const [values, setValues] = React.useState([]);
  const [success, setSuccess] = React.useState(false);

  const handleLoadDientesInfo = async () => {
    const response: any = await getInfoDiente({
      dienteId: dienteId,
      pacienteId: uid,
      type: zone,
    });
    setValues(response?.data);
  };

  React.useEffect(() => {
    if (success) {
      handleLoadDientesInfo();
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [success]);

  React.useEffect(() => {
    handleLoadDientesInfo();
  }, []);

  const { push } = useRouter();
  const [openAddNew, setOpenAddNew] = React.useState(false);

  React.useEffect(() => {
    if (openAddNew) {
      setSuccess(false);
    }
  }, [openAddNew])
  
  const formatVales =
    values?.map((item: any) => {
      return {
        ...item,
        descripcion: <CustomDescripcion text={item?.descripcion} />,
      };
    }) || [];

  return (
    <div className="appearsAnimation backdrop-blur-md w-screen z-[100] h-screen fixed top-0 left-0 flex flex-col items-center justify-center">
      {openAddNew && (
        <AddNewItemDiente
          setSuccess={setSuccess}
          uid={uid}
          zona={zone}
          dienteId={dienteId}
          setOpen={setOpenAddNew}
        />
      )}
      <div className="md:w-[640px] h-auto p-[20px] shadow-xs border border-gray-300 rounded-lg bg-white flex flex-col items-center gap-y-2 relative">
        <GrClose
          size={20}
          onClick={handleClose}
          className="text-gray-900 cursor-pointer  absolute right-4 top-4"
        />

        <span className="text-gray-800 font-medium text-center">
          Informacion Diente Numero: {dienteId}
        </span>

        <OdontoGramaItem
          dienteId={dienteId}
          onSuccessAdded={() => null}
          isTop={false}
          defaultZone={zone}
          withClick={false}
          type={type}
          uid={uid}
        />
        {success && (
          <div className="w-full transition-all appearsAnimation flex items-center justify-start">
            <Alert
              sx={{ marginBottom: 2, marginTop: 2 }}
              severity="success"
              className="w-full"
              onClose={() => setSuccess(false)}
            >
              Informacion agregada correctamente
            </Alert>
          </div>
        )}

        <span className="text-[#84DCCC] px-4 font-semibold w-full text-left text-[26px] my-2">
          Informacion
        </span>
        <span className="font-medium text-left w-full px-4 text-[14px]">
          Haz click en una descripcion para ver el texto completo
        </span>
        <div className="w-full appearsAnimation transition-all h-auto flex flex-col items-start justify-start">
          <div className="max-h-[350px] appearsAnimation transition-all w-full overflow-auto">
            <Table
              isLoading={isLoading}
              customClick={() => null}
              cols={cols}
              values={formatVales}
            />
          </div>
        </div>
        <button
          onClick={() => setOpenAddNew(true)}
          className="shadow-md text-white font-semibold rounded-full px-4 py-2 bg-[#84DCCC]"
        >
          Agregar nuevo
        </button>
      </div>
    </div>
  );
}
