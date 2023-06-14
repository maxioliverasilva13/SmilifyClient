import React from "react";
import { ChangeEvent, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseCircleOutline from "mdi-material-ui/CloseCircleOutline";
import Alert from "@mui/material/Alert";
import { createTheme } from "@mui/material";

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
    width: "45%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "35%",
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

interface Props {
  isOpen: boolean;
  setIsOpen: Function;
  text: string;
}

export default function ConfirmationModal({ isOpen, setIsOpen, text }: Props) {
  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <div className="w-full">
      <Modal
        open={isOpen}
        // onClose={}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={() => style(theme)}
          className="flex flex-col justify-start h-2/5 gap-y-2"
        >
          <div className="flex flex-row justify-center pt-1 px-5">
            <p className="text-[28px] font-semibold text-[#84DCCC]">
              Confirmación
            </p>
          </div>

          <div className="flex flex-col justify-around items-center h-4/5 gap-5">
            <p className="text-[18px] text-center">
              {text}
            </p>
          </div>
          <div className="flex flex-wrap p-6 gap-y-2 justify-around">
            <button
              className="h-14 w-36 font-semibold bg-red-500 text-white rounded-md"
              style={{ outline: "none" }}
              onClick={handleCancel}
            >
              CANCELAR
            </button>
            <button
              className="h-14 w-36 font-semibold bg-green-500 text-white rounded-md"
              style={{ outline: "none" }}
              onClick={() => setIsOpen(false)}
            >
              CONFIRMAR
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
