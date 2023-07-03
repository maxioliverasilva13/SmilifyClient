import * as React from "react";
import { useState } from "react";
import appRoutes from "src/utils/appRoutes";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { Alert, MenuItem, Select, Snackbar } from "@mui/material";
import { useGetPacientesQuery } from "src/store/services/PacienteService";
import { Paciente } from "src/types/paciente";
import { FormControl, InputLabel } from "@mui/material";
import {
  useCreateReservaMutation,
  useGetReservasByFechaQuery,
} from "src/store/services/ReservaService";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import clsx from "clsx";
import { ToastContainer, toast } from "react-toastify";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35%",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: "none",
};

interface Prps {
  open: boolean;
  setOpen: any;
  onsuccess: any;
}

export default function AgregarReservaModal({
  open,
  setOpen,
  onsuccess,
}: Prps) {
  const { push } = useRouter();
  const { data: pacientes, isLoading } = useGetPacientesQuery({});

  const [selectedPacienteId, setSelectedPacienteId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [selectedHora, setSelectedHora] = useState("");
  const tomorrow = dayjs().add(1, "day");
  const [fecha, setFecha] = useState(tomorrow);
  const { data: fechas } = useGetReservasByFechaQuery(
    fecha?.format("YYYY-MM-DD")
  );
  const [postReserva] = useCreateReservaMutation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePaciente = (event: any) => {
    setSelectedPacienteId(event?.target?.value?.toString());
  };

  const handleTimeChange = (event: any) => {
    setSelectedHora(event.target.value.toString());
  };

  const timeSlots = Array.from(new Array(20)).map((_, index) => {
    const hour = Math.floor(index / 2) + 9;
    const minute = index % 2 === 0 ? "00" : "30";
    return `${hour < 10 ? "0" : ""}${hour}:${minute}`;
  });

  const formatDates = () => {
    if (fechas) {
      const formattedDates = fechas.map((Reserva: any) => {
        const dateObject = new Date(Reserva);
        const formattedDate = moment(dateObject).format("HH:mm");
        return formattedDate;
      });
      return formattedDates;
    }
    return [];
  };

  const isWeekend = (date: Dayjs) => {
    const day = date.day();

    return day === 0 || day === 6;
  };

  const filterTimeSlots = () => {
    const formattedDates = formatDates();

    const filteredTimeSlots = timeSlots.filter((timeSlot) => {
      return !formattedDates.includes(timeSlot);
    });

    return filteredTimeSlots;
  };

  const handleDateChange = (newDate: any) => {
    setFecha(newDate);
  };

  const formatFecha = (fechaParam: any) => {
    if (fechaParam) {
      const dateFormated = new Date(fechaParam);
      const fecha = moment(dateFormated).format("YYYY/MM/DD");
      return fecha;
    }
  };

  const handleSubmit = async () => {
    const selected = formatFecha(fecha);
    const concatenada = selected?.concat(" ", selectedHora);
    const responseReserva = (await postReserva({
      fecha: concatenada,
      estado: "En espera",
      pacienteId: selectedPacienteId,
    })) as any;
    if (responseReserva?.data?.statusCode) {
      setSuccess(true);
      console.log(responseReserva);
      if (onsuccess) {
        onsuccess();
      }
    } else {
      setError(false);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Snackbar
            className="z-[9999999999] bg-white transition-all rounded-lg overflow-hidden"
            open={success || error}
            autoHideDuration={6000}
            onClose={() => (success ? setSuccess(false) : setError(false))}
          >
            <Alert
              onClose={() => (success ? setSuccess(false) : setError(false))}
              severity={success ? "success" : "error"}
              sx={{ width: "100%" }}
            >
              {success
                ? "Reserva creada correctamente"
                : "Error al crear la reserva"}
            </Alert>
          </Snackbar>
          <Box sx={style}>
            <div className="w-full h-auto flex flex-col items-center gap-5 justify-start">
              <p className="text-[28px] font-semibold text-[#84DCCC]">
                Nueva reserva
              </p>

              <FormControl
                className="flex flex-col gap-5"
                sx={{ width: "100%" }}
              >
                <InputLabel id="combo-box">Seleccione un paciente</InputLabel>
                <Select
                  label="Seleccionar paciente"
                  labelId="combo-box"
                  id="combo-box"
                  value={selectedPacienteId}
                  onChange={handleChangePaciente}
                >
                  {(pacientes?.length || 0) > 0 ? (
                    pacientes?.map((paciente: Paciente) => {
                      return (
                        <MenuItem key={paciente?.cedula} value={paciente?.id}>
                          {paciente?.nombre} {paciente?.apellido} {"-"}{" "}
                          {paciente?.id}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem disabled value="">
                      No hay pacientes disponibles
                    </MenuItem>
                  )}
                </Select>
              </FormControl>

              <FormControl sx={{ width: "100%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    disablePast
                    sx={{ width: "100%" }}
                    label="Fecha"
                    format="YYYY/MM/DD"
                    value={fecha}
                    disabled={!selectedPacienteId}
                    shouldDisableDate={(date) =>
                      isWeekend(date) || date.isSame(dayjs(), "day")
                    }
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
              </FormControl>

              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="combo-box-label">Hora</InputLabel>
                <Select
                  disabled={!selectedPacienteId}
                  label="Hora"
                  labelId="combo-box-label"
                  id="combo-box"
                  value={selectedHora}
                  onChange={handleTimeChange}
                >
                  {filterTimeSlots().length > 0 ? (
                    filterTimeSlots().map((time: any) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled value="">
                      No hay turnos disponibles para este día
                    </MenuItem>
                  )}
                </Select>
              </FormControl>

              <button
                className={clsx(
                  "px-4 py-2 w-[190px] text-center items-center justify-center flex rounded-md shadow-md text-white",
                  "bg-[#84DCCC]"
                )}
                onClick={handleSubmit}
              >
                Agregar
              </button>
            </div>
          </Box>
        </>
      </Modal>
    </div>
  );
}
