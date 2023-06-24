import * as React from "react";
import { useRouter } from "next/router";
import { GrClose } from "react-icons/gr";
import { Alert, Snackbar } from "@mui/material";
import { FormControl, TextareaAutosize } from "@mui/base";
import { useCreateTratamientoMutation } from "src/store/services/PacienteService";

interface Props {
  setOpen: Function;
  onSuccess: Function;
  pacienteId: any;
  pacienteName: string;
}

export default function AddTratamientoModal({
  setOpen,
  pacienteId,
  onSuccess,
  pacienteName,
}: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    // handleLoadDientesInfo();
  }, []);

  const { push } = useRouter();
  const [openAddNew, setOpenAddNew] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<boolean | null>(null);

  const [createTratamiento, { isLoading: isLoadingCreate }] =
    useCreateTratamientoMutation();

  const handleCreateTratamiento = async () => {
    try {
      const resposne = await createTratamiento({
        paciente_id: pacienteId,
        descripcion: description,
      });
      setSuccess(true);
      setError(null);
      setTimeout(() => [
        setOpen(false)
      ], 1000)
      // console.log("resposne", resposne);
    } catch (error) {
      setError("Error al crear el tratamiento");
    }
  };

  return (
    <div className="appearsAnimation backdrop-blur-md w-screen z-[100] h-screen fixed top-0 left-0 flex flex-col items-center justify-center">
      <div className="md:w-[640px] h-auto p-[20px] shadow-xs border border-gray-300 rounded-lg bg-white flex flex-col items-center gap-y-2 relative">
        <GrClose
          size={20}
          onClick={handleClose}
          className="text-gray-900 cursor-pointer  absolute right-4 top-4"
        />

        <span className="text-gray-800 font-medium text-center">
          Agregar tratamiento para el paciente {pacienteName}
        </span>

        {
          <Snackbar
            open={success || error != null || error != undefined}
            autoHideDuration={6000}
            onClose={() => (success ? setSuccess(false) : setError(null))}
          >
            <Alert
              onClose={() => (success ? setSuccess(false) : setError(null))}
              severity={success ? "success" : "error"}
              sx={{ width: "100%" }}
            >
              {success ? "Tratamiento creado correctamente" : error}
            </Alert>
          </Snackbar>
        }

        <FormControl className="w-full">
          <TextareaAutosize
            color="info"
            disabled={false}
            minRows={2}
            onChange={(e: any) => setDescription(e?.target?.value)}
            value={description}
            placeholder="Ingrese una descripcion"
            className="p-4 max-h-[250px] w-full my-5 rounded-lg border-2 focus:border-violet-500"
          />
        </FormControl>

        <button
          onClick={() => handleCreateTratamiento()}
          className="shadow-md text-white font-semibold rounded-full px-4 py-2 bg-[#84DCCC]"
        >
          Agregar tratamiento
        </button>
      </div>
    </div>
  );
}
