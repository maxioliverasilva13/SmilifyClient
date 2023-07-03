import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import clsx from "clsx";
import { useEffect, useState } from "react";
import useGlobal from "src/hooks/useGlobal";
import { useGetArancelesQuery } from "src/store/services/ArancelService";
import {
  useCreateConsultaMutation,
  useGetPacientesQuery,
  useGetReservasByPacienteQuery,
} from "src/store/services/PacienteService";
import { Paciente } from "src/types/paciente";
import { formatAranceles, formatArancelesLab } from "src/utils/aranceles";
import { IoMdAdd } from "react-icons/io";
import AddTratamientoModal from "src/components/AddTratamientoModal/AddTratamientoModal";
import { getCostoArancel } from "src/utils/utils";
import Input from "@mui/joy/Input";
import moment from "moment";
import "moment/locale/es";
import { useRouter } from "next/router";
moment.locale("es");

const AddConsulta = () => {
  const router = useRouter();
  const query = router?.query;
  const userId = query?.user;
  const [selectedPaciente, setSelectedpaciente] = useState(userId);
  const [selectedArancel, setSelectedArancel] = useState(null);
  const [selectedReserva, setSelectedReserva] = useState<string | null>(null);
  const [asignarTratamiento, setAsignarTratamiento] = useState(false);
  const [asignarCostoslab, setAsignarCostoslab] = useState(false);
  const [selectedTratamiento, setSelectedTratamiento] = useState(null);
  const [selectedArancelLab, setSelectedArancelLab] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [openAddTratamientoModal, setOpenAddTratamientoModal] = useState(false);
  const [entrega, setEntrega] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { handleChangeLoading, userInfo } = useGlobal();
  const precioOrden = userInfo?.configuracion?.precioPorOrden || 0;

  const { data: reservasPaciente, isLoading: isLoadingReservasPaciente } =
    useGetReservasByPacienteQuery(selectedPaciente, {
      skip: !selectedPaciente,
    });

  const handlePacienteChange = (event: any) => {
    setSelectedpaciente(event.target.value.toString());
  };

  const handleArancelChange = (event: any) => {
    setSelectedArancel(event.target.value.toString());
  };

  const handleTratamientoChange = (event: any) => {
    setSelectedTratamiento(event.target.value.toString());
  };

  const [createConsulta, { isLoading: isLoadingCreate }] =
    useCreateConsultaMutation();

  const { data: pacientes, isLoading } = useGetPacientesQuery({});
  const { data: allAranceles, isLoading: isLoadingArancel } =
    useGetArancelesQuery({});

  const aranceles = formatAranceles(allAranceles || []);
  const arancelesLab = formatArancelesLab(allAranceles || []);

  useEffect(() => {
    if (error || success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [error, success]);

  useEffect(() => {
    if (success) {
      setError(null);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setSuccess(null);
    }
  }, [error]);

  const handleArancelLabChange = (event: any) => {
    const arancelId = event.target.value.toString();
    setSelectedArancelLab(arancelId);
    const entregaDefault = arancelesLab?.find(
      (item: any) => item?.id == arancelId
    );
    setEntrega(entregaDefault?.precio);
  };

  const selectedPacienteInfo = pacientes?.find(
    (paciente: any) => paciente.id == selectedPaciente
  );

  const selectedArancelInfo = aranceles?.find(
    (arancel: any) => arancel?.id == selectedArancel
  );
  const tratamientosToMap = selectedPacienteInfo?.tratamientos || [];

  const getTotalAmount = () => {
    const costosLab = Number(asignarCostoslab ? entrega || 0 : 0);
    const costoArancel = Number(
      getCostoArancel(selectedArancelInfo, precioOrden) || 0
    );

    return costosLab + costoArancel;
  };

  useEffect(() => {
    // if (isLoading || isLoadingArancel) {
    //   handleChangeLoading(true);
    // } else {
    //   handleChangeLoading(false);
    // }
  }, [isLoading, isLoadingArancel]);

  const handleSubmitForm = async () => {
    if (!selectedPaciente) {
      setError("Debes seleccionar un paciente");
      return;
    }

    if (!selectedArancel) {
      setError("Debes seleccionar un arancel");
      return;
    }

    if (!descripcion || descripcion?.trim() == "") {
      setError("Ingresa una descripcion valida");
      return;
    }

    if (asignarTratamiento && !selectedTratamiento) {
      setError("Seleccione un tratamiento para continuar");
      return;
    }

    if (asignarCostoslab && !selectedArancelLab) {
      setError("Seleccione un tratamiento de laboratorio para continuar");
      return;
    }

    if ((entrega || 0) < 0) {
      setError("Ingrese una entrega valida");
      return;
    }
    setError(null);

    const dataToSend = {
      descripcion: descripcion,
      pago: entrega && entrega !== 0 ? true : false,
      pacienteId: selectedPaciente,
      reservaId: selectedReserva,
      tratamientoId: selectedTratamiento,
      arancelId: selectedArancel,
      arancelLabId: selectedArancelLab,
      entrega: entrega || 0,
    };
    setError(null);
    const response = (await createConsulta(dataToSend)) as any;
    if (response?.data?.statusCode == 200) {
      setSuccess("Consulta creada correctamente");
      setError(null);
    } else {
      setError("Error al crear la consulta");
      setSuccess(null);
    }
  };

  return (
    <div className="w-full h-full flex-grow flex flex-col py-20 gap-5 overflow-auto">
      {selectedPacienteInfo && openAddTratamientoModal && (
        <AddTratamientoModal
          onSuccess={() => null}
          pacienteName={
            selectedPacienteInfo?.nombre +
              " " +
              selectedPacienteInfo?.apellido || ""
          }
          pacienteId={selectedPaciente}
          setOpen={(val: any) => setOpenAddTratamientoModal(val)}
        />
      )}
      <div className="w-full h-auto p-10  gap-5 flex bg-white transition-all rounded-lg shadow-md flex flex-col items-start justify-start">
        {error && (
          <div className="w-full h-auto rounded-md text-white font-medium p-4 h-auto bg-red-400 shadow-md my-5">
            {error}
          </div>
        )}

        {success && (
          <div className="w-full h-auto rounded-md text-white font-medium p-4 h-auto bg-green-400 shadow-md my-5">
            {success}
          </div>
        )}
        <span className="text-[#84DCCC] font-semibold text-[26px]">
          Agregar nueva consulta
        </span>

        <FormControl className="flex flex-col gap-5" sx={{ width: "100%" }}>
          <InputLabel id="combo-paciente">Seleccione un paciente</InputLabel>
          <Select
            label="Seleccionar paciente"
            labelId="combo-paciente"
            id="combo-box"
            value={selectedPaciente}
            onChange={handlePacienteChange}
          >
            {(pacientes?.length || 0) > 0 ? (
              pacientes?.map((paciente: Paciente) => {
                return (
                  <MenuItem key={paciente?.cedula} value={paciente?.id}>
                    {paciente?.nombre} {paciente?.apellido} {"-"} {paciente?.id}
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

        {selectedPaciente && (
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="select-reserva">Seleccionar reserva</InputLabel>
            <Select
              label="Seleccionar una reserva"
              labelId="select-reserva"
              id="select-reserva"
              value={selectedReserva}
              onChange={(e) => {
                setSelectedReserva(e?.target?.value?.toString() || null);
              }}
            >
              {(reservasPaciente?.length || 0) > 0 ? (
                reservasPaciente?.map((reserva: any) => {
                  const fecha = moment(reserva?.fecha);
                  const finalFecha = fecha.format("MMMM Do YYYY, h:mm a");
                  return (
                    <MenuItem key={reserva?.id} value={reserva?.id}>
                      {finalFecha.toString()} {" - "} {reserva?.estado}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem disabled value="">
                  No hay reservas disponibles
                </MenuItem>
              )}
            </Select>
          </FormControl>
        )}

        <FormControl className="flex flex-col gap-5" sx={{ width: "100%" }}>
          <InputLabel id="combo-arancel">Seleccione un arancel</InputLabel>
          <Select
            label="Seleccionar arancel"
            labelId="combo-arancel"
            id="combo-arancel"
            value={selectedArancel}
            onChange={handleArancelChange}
          >
            {aranceles?.length > 0 ? (
              aranceles?.map((arancel: any) => {
                return (
                  <MenuItem key={arancel?.id} value={arancel?.id}>
                    {arancel?.nombre} {"-"} {arancel?.type}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem disabled value="">
                No hay aranceles disponibles
              </MenuItem>
            )}
          </Select>
        </FormControl>

        <span className="text-[#84DCCC] my-4 font-semibold text-[26px]">
          Descripcion de la consulta
        </span>

        <FormControl sx={{ width: "100%" }}>
          <TextareaAutosize
            color="info"
            disabled={false}
            minRows={2}
            placeholder="Ingrese una descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e?.target?.value)}
            className="p-4 max-h-[250px] rounded-lg border-2 focus:border-violet-500"
          />
        </FormControl>

        <span className="text-[#84DCCC] my-4 font-semibold text-[26px]">
          Tratamiento
        </span>

        <FormControlLabel
          label="Desea asignar un tratamiento?"
          control={
            <Checkbox
              id="checkbox-tratamiento"
              disabled={false}
              checked={asignarTratamiento}
              onChange={(val: any) => {
                if (!selectedPaciente) {
                  setError("Debes seleccionar un paciente");
                  setOpenAddTratamientoModal(false);
                  return;
                }
                setError(null);
                setAsignarTratamiento(val?.target?.checked);
              }}
              className="p-4 max-h-[250px] rounded-lg border-2 focus:border-violet-500"
            />
          }
          sx={{ width: "auto" }}
        />

        <div
          className={clsx(
            "w-full flex flex-col overflow-hidden items-start justify-start gap-2 transition-all",
            asignarTratamiento ? "h-auto py-5" : "h-0"
          )}
        >
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="select-tratamiento">
              Seleccione un tratamiento
            </InputLabel>
            <Select
              label="Seleccionar tratamiento"
              labelId="select-tratamiento"
              id="select-tratamiento"
              value={selectedTratamiento}
              onChange={handleTratamientoChange}
            >
              {tratamientosToMap?.length > 0 ? (
                tratamientosToMap?.map((tratamiento: any) => {
                  return (
                    <MenuItem key={tratamiento?.id} value={tratamiento?.id}>
                      {tratamiento?.descripcion} {"-"} {tratamiento?.status}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem disabled value="">
                  No hay tratamientos disponibles
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <span
            onClick={() => setOpenAddTratamientoModal(true)}
            className="text-[#84DCCC] flex flex-row items-center cursor-pointer my-4 font-semibold text-[18px]"
          >
            <IoMdAdd
              color="#84DCCC"
              className="text-[#84DCCC] stroke-current"
              size={30}
            />
            Agregar nuevo
          </span>
        </div>

        <span className="text-[#84DCCC] my-4 font-semibold text-[26px]">
          Costos Laboratorio
        </span>

        <FormControlLabel
          label="Desea agregar costos de laboratorio?"
          control={
            <Checkbox
              id="checkbox-"
              disabled={false}
              checked={asignarCostoslab}
              onChange={(val: any) => {
                setAsignarCostoslab(val?.target?.checked);
              }}
              className="p-4 max-h-[250px] rounded-lg border-2 focus:border-violet-500"
            />
          }
          sx={{ width: "auto" }}
        />

        <div
          className={clsx(
            "w-full flex flex-col overflow-hidden items-start justify-start gap-2 transition-all",
            asignarCostoslab ? "h-auto py-5" : "h-0"
          )}
        >
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="select-tratamientoLab">
              Seleccionar arancel
            </InputLabel>
            <Select
              label="Seleccionar arancel"
              labelId="select-tratamientoLab"
              id="select-tratamientoLab"
              value={selectedArancelLab}
              onChange={handleArancelLabChange}
            >
              {arancelesLab?.length > 0 ? (
                arancelesLab?.map((arancelLab: any) => {
                  return (
                    <MenuItem key={arancelLab?.id} value={arancelLab?.id}>
                      {arancelLab?.nombre} {" - $"} {arancelLab?.precio}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem disabled value="">
                  No hay aranceles disponibles
                </MenuItem>
              )}
            </Select>
          </FormControl>
          {/* <span
            onClick={() => setOpenAddTratamientoModal(true)}
            className="text-[#84DCCC] flex flex-row items-center cursor-pointer my-4 font-semibold text-[18px]"
          >
            <IoMdAdd
              color="#84DCCC"
              className="text-[#84DCCC] stroke-current"
              size={30}
            />
            Agregar nuevo
          </span> */}

          {selectedArancelLab && (
            <FormControl>
              <TextField
                value={entrega}
                onChange={(e) => {
                  const value = e?.target?.value;
                  if (/^[0-9\b]+$/.test(value) || value === "") {
                    setEntrega(Number(e.target.value));
                  }
                }}
                placeholder="Recibio una entrega?"
                id="entrega"
                name="entrega"
                type="text"
                variant="outlined"
                className="w-full"
              />
            </FormControl>
          )}
        </div>

        <div className="w-full h-auto mt-10 flex flex-col items-start justify-start gap-4">
          <span className="text-[#84DCCC] my-4 font-semibold text-[26px]">
            Total: {getTotalAmount()}
          </span>
          <span className="text-black font-medium text-lg flex flex-row gap-1 items-center">
            Costos arancel:{" "}
            <span className="text-[#84DCCC]">
              ${getCostoArancel(selectedArancelInfo, precioOrden)}
            </span>
          </span>
          {asignarCostoslab && (
            <span className="text-black transition-all font-medium text-lg flex flex-row gap-1 items-center">
              Costos laboratorio:{" "}
              <span className="text-[#84DCCC] transition-all">${entrega}</span>
            </span>
          )}
        </div>

        <button
          className={clsx(
            "px-6 py-4 my-5 w-[190px] font-semibold text-center items-center justify-center flex rounded-md shadow-md text-white",
            "bg-[#84DCCC]"
          )}
          onClick={() => handleSubmitForm()}
        >
          Agregar Consulta
        </button>
      </div>
    </div>
  );
};

export default AddConsulta;
