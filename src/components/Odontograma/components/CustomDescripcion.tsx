import * as React from "react";
import { useRouter } from "next/router";
import OdontoGramaItem from "./OdontogramaItem";
import { GrClose } from "react-icons/gr";
import Table from "src/components/Table/table";

interface Props {
  text: string;
}

export default function CustomDescripcion({ text }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {!open && (
        <p className="cursor-pointer truncate" onClick={() => setOpen(true)}>
          {text}
        </p>
      )}{" "}
      {open && (
        <div className="appearsAnimation cursor-default backdrop-blur-md w-screen z-[120] h-screen fixed top-0 left-0 flex flex-col items-center justify-center">
          <div className="md:w-[550px] h-[auto] p-[30px] shadow-xs border border-gray-300 rounded-lg bg-white flex flex-col items-center gap-y-2 relative">
            <GrClose
              size={20}
              onClick={() => setOpen(false)}
              className="text-gray-900 cursor-pointer  absolute right-4 top-4"
            />

            <span className="text-gray-800 font-medium text-center pb-5">
              Vista de la descripción completa
            </span>

            <p className="text-gray-700 whitespace-break-spaces break-words h-auto break font-normal text-left w-full">
              {text}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
