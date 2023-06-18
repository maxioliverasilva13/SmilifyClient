import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";

import { FormControl, MenuItem, Select } from "@mui/material/";
import InputLabel from "@mui/material/InputLabel";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";

interface Props {
  setOpen: Function;
  setSuccess: Function;
  setDate: Function;
}


export default function ModificarFechaModal({
  setOpen,
  setSuccess,
  setDate,
}: Props) {
  const [fecha, setFecha] = useState<any>(dayjs().add(1, "day"));
  const [hora, setHora] = useState(null);
  const [errorHora, setErrorHora] = useState(false);
  const timeSlots = Array.from(new Array(20)).map((_, index) => {
    const hour = Math.floor(index / 2) + 9;
    const minute = index % 2 === 0 ? "00" : "30";
    return `${hour < 10 ? "0" : ""}${hour}:${minute}`;
  });
  const isWeekend = (date: Dayjs) => {
    const day = date.day();

    return day === 0 || day === 6;
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleTimeChange = (event: any) => {
    setHora(event.target.value.toString());
  };
  const handleDateChange = (newDate: any) => {
    setFecha(newDate);
  };
  const handleConfirm = () => {
    if (hora === null) {
      setErrorHora(true);
      return;
    }
      setErrorHora(true);
      setSuccess(true);
      setOpen(false);
      setDate(moment(new Date(fecha)).format("YYYY-MM-DD") + " " + hora);
  };
  useEffect(() => {
    console.log(timeSlots);
  }, []);
  return (
    <div className="appearsAnimation backdrop-blur-md w-screen z-[100] h-screen fixed top-0 left-0 flex flex-col items-center justify-center">
      <div className="md:w-[640px] h-auto p-[20px] shadow-xs border border-gray-300 rounded-lg bg-white flex flex-col items-center gap-y-8 relative">
        <GrClose
          size={20}
          onClick={handleClose}
          className="text-gray-900 cursor-pointer  absolute right-4 top-4"
        />

        <span className="text-gray-800 font-medium text-center">
          Modificar Fecha
        </span>
        <p className="font-medium text-center w-full px-4 text-[16px]">
          Por favor seleccione una fecha a la que desee mover la reserva:
        </p>
        <div className="flex gap-5">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              disablePast
              sx={{ width: "60%" }}
              label="Fecha"
              format="YYYY-MM-DD"
              value={fecha}
              shouldDisableDate={(date) =>
                isWeekend(date) || date.isSame(dayjs(), "day")
              }
              onChange={handleDateChange}
            />
          </LocalizationProvider>
          <FormControl>
            <InputLabel id="combo-box-label">Hora</InputLabel>

            <Select
              error={errorHora}
              label="Hora"
              labelId="combo-box-label"
              id="combo-box"
              value={hora}
              onChange={handleTimeChange}
            >
              {timeSlots.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="flex gap-5">
          <button
            onClick={() => setOpen(false)}
            className="shadow-md text-white font-semibold rounded-full px-4 py-2 bg-red-500"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="shadow-md text-white font-semibold rounded-full px-4 py-2 bg-green-500"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
