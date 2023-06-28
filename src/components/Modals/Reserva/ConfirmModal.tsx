import * as React from "react";
import { GrClose } from "react-icons/gr";

interface Props {
  setOpen: Function;
  setSuccess: Function;
  title: string;
  text: string;
}

export default function ConfirmModal({
  setOpen,
  setSuccess,
  title,
  text,
}: Props) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="appearsAnimation backdrop-blur-md w-screen z-[100] h-screen fixed top-0 left-0 flex flex-col items-center justify-center">
      <div className="md:w-[640px] h-auto p-[20px] shadow-xs border border-gray-300 rounded-lg bg-white flex flex-col items-center gap-y-8 relative">
        <GrClose
          size={20}
          onClick={handleClose}
          className="text-gray-900 cursor-pointer  absolute right-4 top-4"
        />

        <span className="text-gray-800 font-medium text-[18px] text-center">
          {title}
        </span>
        <p className="font-medium text-center w-full px-4 text-[16px]">
          {text}
        </p>
        <div className="flex gap-5">
          <button
            onClick={() => setOpen(false)}
            className="shadow-md text-white font-semibold rounded-md px-4 py-2 bg-[#FF8C8C]"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              setSuccess(true);
              setOpen(false);
            }}
            className="shadow-md text-white font-semibold rounded-md px-4 py-2 bg-[#84DCCC]"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
