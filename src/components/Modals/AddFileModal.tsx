import React from "react";
import { ChangeEvent, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import InputField from "@mui/material/Input";
import CloseCircleOutline from "mdi-material-ui/CloseCircleOutline";
import Alert from "@mui/material/Alert";
import { createTheme } from "@mui/material";
import { Paciente } from "src/types/paciente";
import { AiOutlineFile } from "react-icons/ai";

import useUploadFile from "src/hooks/useUploadFile";
import {
  useGetArchivosByPacienteIdQuery,
  useCreateArchivoMutation,
} from "src/store/services/FileService";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const style = (theme: any) => ({
  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "80%",
  },
  [theme.breakpoints.up("md")]: {
    width: "50%",
  },
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: "none",
});

type archivoBD = {
  url: String;
  tipo: String;
  paciente_id: Number;
};

type filePreview = {
  name: string;
  url: string;
  type: string;
};

interface Props {
  isOpen: boolean;
  setIsOpen: Function;
  paciente: Paciente;
}

export default function AddFileModal({ isOpen, setIsOpen, paciente }: Props) {
  const [createArchivo] = useCreateArchivoMutation();
  const [file, setFile] = useState<File>();
  const { handleUpload, fileError, fileUrl } = useUploadFile();
  const [preview, setPreview] = useState<filePreview>(); // imagen a mostrar

  const [error, setError] = useState({
    show: false,
    message: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setError({
        show: false,
        message: "",
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [error.show]);

  const handleClose = () => {
    setIsOpen(false);
    setFile(undefined);
    setPreview(undefined);
  };

  const handleSubmit = async () => {
    if (!file || file === undefined) {
      setError({
        show: true,
        message: "Por favor seleccione un archivo a agregar.",
      });
      // TODO: mostrar mensaje de error
      return;
    }
    await handleUpload(file)
      .catch((error) =>
        setError({
          show: true,
          message: error,
        })
      )
      .then(async (response: any) => {
        const fileData: archivoBD = {
          paciente_id: paciente.id,
          tipo: file.type,
          url: response,
        };
        await createArchivo(fileData).then(setIsOpen(false));
      });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      setPreview(undefined);
      setFile(undefined);
      return;
    }
    setFile(e?.target?.files[0]);
    setPreview({
      name: e?.target?.files[0]?.name,
      url: URL.createObjectURL(e?.target?.files[0]),
      type: e?.target?.files[0]?.type,
    });
    console.log(e.target.files[0].type);
  };

  return (
    <div className="w-full">
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={() => style(theme)}
          className="flex flex-col justify-start h-3/5 gap-y-2"
        >
          <div className="flex flex-row justify-between pt-1 px-5">
            <p className="text-[28px] font-semibold text-[#84DCCC]">
              Subir Archivo
            </p>
            <button onClick={handleClose} style={{ outline: "none" }}>
              <CloseCircleOutline fontSize="large"></CloseCircleOutline>
            </button>
          </div>

          <div className="flex flex-col justify-around items-center h-4/5 gap-5">
            <p className="text-[18px] text-center">
              Agregar un archivo a la ficha del paciente
              <br />{" "}
              <span className="font-semibold">
                {paciente.nombre + " " + paciente.apellido}
              </span>
            </p>
            <div className="flex flex-col w-full justify-center items-center gap-1">
              {preview && preview.type.split("/")[0] === "image" && (
                <img
                  src={preview.url}
                  alt="vista previa del archivo seleccionado"
                  className="shadow rounded-md object-scale-down h-32 max-h-32 w-auto align-middle border-none"
                />
              )}
              {preview && preview.type.split("/")[0] === "video" && (
                <video
                  src={preview.url}
                  // alt="vista previa del video seleccionado"
                  className="shadow rounded-md object-scale-down h-32 max-h-32 w-auto align-middle border-none"
                />
              )}
              {preview &&
                (preview.type.split("/")[0] === "application" ||
                  preview.type.split("/")[0] === "text" ||
                  preview.type.split("/")[0] === "") && (
                  <AiOutlineFile
                    size={25}
                    className="rounded-md object-scale-down h-32 max-h-32 w-auto align-middle border-none"
                  />
                )}
              <p className="text-xs">{preview?.name}</p>
            </div>
            <div className="py-4">
              <input
                type="file"
                accept="video/*, image/*, audio/*, application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                text/plain, application/pdf, text/*, .doc, .docx, .ppt, .pptx, .txt,"
                onChange={handleFileChange}
                className="px-6 py-5 text-black bg-[#84DCCC] shadow"
              />
            </div>
          </div>
          {error.show && (
            <Alert
              className="flex self-center w-2/3"
              sx={{ marginBottom: 4 }}
              severity="error"
            >
              {error.message}
            </Alert>
          )}
          <div className="flex flex-col p-6 items-center justify-center">
            <button
              className="h-14 w-44 font-semibold bg-[#84DCCC] text-white rounded-md"
              style={{ outline: "none" }}
              onClick={handleSubmit}
            >
              GUARDAR
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
