import * as React from "react";
import { useRouter } from "next/router";
import { GrClose } from "react-icons/gr";
import { Alert, Snackbar, TextField } from "@mui/material";
import { FormControl, TextareaAutosize } from "@mui/base";
import { useCreateTratamientoMutation } from "src/store/services/PacienteService";
import { useCreateCategoriaMutation } from "src/store/services/CategoriaService";

interface Props {
  setOpen: Function;
}

export default function AddCategoriaModal({
  setOpen,
}: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  const { push } = useRouter();
  const [openAddNew, setOpenAddNew] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<boolean | null>(null);

  const [createCategoria, { isLoading: isLoadingCreate }] =
  useCreateCategoriaMutation();

  const handleCreateCategoria = async () => {
    try {
      const resposne = await createCategoria({
        nombre: description,
      }) as any;
      console.log("resposne is", resposne)
      if (resposne?.error && resposne?.error?.status == 500) {
        throw new Error("Error al crear la categoria")
      }
      setSuccess(true);
      setError(null);
      // console.log("resposne", resposne);
    } catch (error) {
      setError("Error al crear la categoria");
    }
  };

  return (
    <div className="appearsAnimation z-[999999] backdrop-blur-md bg-black bg-opacity-50 w-screen z-[100] h-screen fixed top-0 left-0 flex flex-col items-center justify-center">
      <div className="md:w-[640px] h-auto p-[20px] gap-5 flex flex-col shadow-xs border border-gray-300 rounded-lg bg-white flex flex-col items-center gap-y-5 relative">
        <GrClose
          size={20}
          onClick={handleClose}
          className="text-gray-900 cursor-pointer  absolute right-4 top-4"
        />

        <span className="text-gray-800 font-medium text-center">
          Agregar categoria para los aranceles
        </span>

        {
          <Snackbar
            className="z-[9999999999] bg-white transition-all rounded-lg overflow-hidden"
            open={success || error != null || error != undefined}
            autoHideDuration={6000}
            onClose={() => (success ? setSuccess(false) : setError(null))}
          >
            <Alert
              onClose={() => (success ? setSuccess(false) : setError(null))}
              severity={success ? "success" : "error"}
              sx={{ width: "100%" }}
            >
              {success ? "Categoria creada correctamente" : error}
            </Alert>
          </Snackbar>
        }

        <FormControl className="w-full">
          <TextField
            color="info"
            disabled={false}
            minRows={2}
            onChange={(e: any) => setDescription(e?.target?.value)}
            value={description}
            placeholder="Ingrese un nombre"
            className="p-4 w-full my-5 rounded-lg border-2 focus:border-violet-500"
          />
        </FormControl>

        <button
          onClick={() => handleCreateCategoria()}
          className="shadow-md text-white font-semibold rounded-full px-4 py-2 bg-[#84DCCC]"
        >
          Agregar categoria
        </button>
      </div>
    </div>
  );
}
