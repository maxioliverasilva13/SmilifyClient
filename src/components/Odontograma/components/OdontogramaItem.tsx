import clsx from "clsx";
import { useState, useEffect } from "react";
import ModalDiente from "./ModalDiente";

type Zone = "Izquierda" | "Arriba" | "Derecha" | "Abajo" | "Centro";
type Type = "five" | "four";

interface Props {
  dienteId: string | number;
  isTop: boolean;
  type?: Type | any;
  withClick?: boolean;
  defaultZone?: string;
  uid: string;
}

const OdontoGramaItem = ({
  dienteId,
  isTop,
  type = "five",
  withClick = true,
  defaultZone,
  uid,
}: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedZone, setSelectedZone] = useState<Zone | undefined>(
    (defaultZone as Zone) || undefined
  );

  const renderDienteNumber = () => {
    return (
      <span className="text-[#514D59] text-[18px] font-light">{dienteId}</span>
    );
  };

  const handleClick = (zone: Zone) => {
    if (withClick) {
      setOpenModal(true);
      setSelectedZone(zone);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start gap-3 ">
      {openModal && (
        <ModalDiente
          zone={selectedZone}
          clearZone={() => setSelectedZone(undefined)}
          dienteId={dienteId}
          setOpen={() => setOpenModal(false)}
          type={type}
          uid={uid}
        />
      )}
      {isTop && renderDienteNumber()}
      <div
        className={clsx(
          "w-[50px] h-[50px] bg-[#8F8F8F] rounded-[3px] border-[1.5px] border-[#8F8F8F] overflow-hidden relative z-[10]"
        )}
      >
        {type === "five" && (
          <>
            <div
              onClick={() => handleClick("Izquierda")}
              className={clsx(
                "trapecio cursor-pointer transition-all trapecioLeft",
                selectedZone === "Izquierda" && "active"
              )}
            />
            <div
              onClick={() => handleClick("Derecha")}
              className={clsx(
                "trapecio cursor-pointer transition-all trapecioRight",
                selectedZone === "Derecha" && "active"
              )}
            />
            <div
              onClick={() => handleClick("Arriba")}
              className={clsx(
                "trapecio cursor-pointer transition-all trapecioTop",
                selectedZone === "Arriba" && "active"
              )}
            />
            <div
              onClick={() => handleClick("Abajo")}
              className={clsx(
                "trapecio cursor-pointer transition-all trapecioBottom",
                selectedZone === "Abajo" && "active"
              )}
            />
            <div
              onClick={() => handleClick("Centro")}
              className={clsx(
                "centerItem cursor-pointer transition-all ",
                selectedZone === "Centro" && "active"
              )}
            />
          </>
        )}

        {type === "four" && (
          <>
            <div
              onClick={() => handleClick("Izquierda")}
              className={clsx(
                " cursor-pointer transition-all triangleLeft",
                selectedZone === "Izquierda" && "active"
              )}
            />
            <div
              onClick={() => handleClick("Derecha")}
              className={clsx(
                " cursor-pointer transition-all triangleRight",
                selectedZone === "Derecha" && "active"
              )}
            />
            <div
              onClick={() => handleClick("Arriba")}
              className={clsx(
                "triangle cursor-pointer transition-all triangleTop",
                selectedZone === "Arriba" && "active"
              )}
            />
            <div
              onClick={() => handleClick("Abajo")}
              className={clsx(
                "triangle cursor-pointer transition-all triangleBottom",
                selectedZone === "Abajo" && "active"
              )}
            />
          </>
        )}
      </div>
      {!isTop && renderDienteNumber()}
    </div>
  );
};

export default OdontoGramaItem;
