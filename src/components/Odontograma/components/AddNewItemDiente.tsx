import * as React from "react";
import { GrClose } from "react-icons/gr";
import Alert from "@mui/material/Alert";
import { DateTimeField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useCreateDienteInfoMutation } from "src/store/services/DienteService";

interface Props {
  setOpen: Function;
  dienteId: string | number;
  zona: string;
  uid: string,
  setSuccess: Function
}

export default function AddNewItemDiente({ setOpen, dienteId, zona, uid, setSuccess }: Props) {
  const [descripcion, setDescripcion] = React.useState("");
  const [fecha, setFecha] = React.useState(dayjs().format("DD/MM/YYYY HH:ss"));
  const [error, setError] = React.useState<null | string>(null);
  const [createDienteInfo, {isLoading} ] = useCreateDienteInfoMutation();

  const handleAddItem = async () => {
    if (fecha && descripcion && zona && dienteId) {
      setError(null);
      const preparedData = {
        descripcion,
        fecha,
        type: zona,
        dienteId,
        pacienteId: uid,
      };
      const response:any = await createDienteInfo(preparedData);

      if (response?.data?.statusCode === 200) {
        setSuccess(true);
        setOpen(false);
      } else {
        setError(response?.data?.message);
      }
    } else {
      setError("Campos invalidos");
    }
  };

  return (
    <div className="appearsAnimation cursor-default backdrop-blur-md w-screen z-[130] h-screen fixed top-0 left-0 flex flex-col items-center justify-center">
      <div className="md:w-[550px] h-[auto] p-[20px] shadow-xs border border-gray-300 rounded-lg bg-white flex flex-col items-center gap-y-2 relative">
        <GrClose
          size={20}
          onClick={() => setOpen(false)}
          className="text-gray-900 cursor-pointer  absolute right-4 top-4"
        />
        <span className="text-[#84DCCC] font-medium text-center">
          Agregar Nueva informacion
        </span>

        {error && (
          <Alert
            sx={{ marginBottom: 4, marginTop: 4 }}
            severity="error"
            onClick={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        <span>
          Diente nro:<span className="text-[#84DCCC]">{dienteId}</span>
        </span>
        <span>
          Zona:<span className="text-[#84DCCC]">{zona}</span>
        </span>

        {/* <input
          type="text"
          className="w-full px-4 py-2 border outline-none border-gray-400 rounded-lg"
          placeholder="Ingrese una fecha(DD:MM:YY)"
          value={fecha}
          onChange={(e: any) => setFecha(e?.target?.value || "")}
        /> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimeField format="DD/MM/YYYY HH:ss" defaultValue={dayjs()} className="w-full rounded-lg" onChange={(value: any) => setFecha(value)} />
        </LocalizationProvider>

        <textarea
          className="w-full p-4 h-[120px] border outline-none max-h-[120px] border-gray-400 rounded-lg"
          placeholder="Ingrese una descripcion"
          value={descripcion}
          onChange={(e: any) => setDescripcion(e?.target?.value || "")}
        />
        <button
          onClick={() => handleAddItem()}
          className="shadow-md text-white font-semibold disabled:bg-indigo-500 rounded-full px-4 py-2 bg-[#84DCCC]"
          disabled={isLoading}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
