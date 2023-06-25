// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import { MenuItem, Select } from '@mui/material/';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import appRoutes from "src/utils/appRoutes";
import { useRouter } from "next/router";
import CheckCircleOutline from "mdi-material-ui/CheckCircleOutline";
import CloseCircleOutline from "mdi-material-ui/CloseCircleOutline";


// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import React from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { useGetPacienteByIdQuery, usePostPacienteMutation } from "src/store/services/PacienteService"
import { useGetReservasByUserCedulaQuery, useGetReservasByFechaQuery, useCreateReservaMutation } from 'src/store/services/ReservaService'
import moment from 'moment';


// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  height: 'auto', // Valor de altura deseado
  bgcolor: 'white',
  boxShadow: 24,
  padding: "20px",
  //p: 4,
  borderRadius: 2,
  outline: 'none'
};


const RegisterPage = () => {

  const [errorNombre, setErrorNombre] = useState(false);
  const [errorApellido, setErrorApellido] = useState(false);
  const [errorTelefono, setErrorTelefono] = useState(false);
  const [errorCorreo, setErrorCorreo] = useState(false);
  const [errorHora, setErrorHora] = useState(false);
  const [errorCedula, setErrorCedula] = useState(false);
  const [errorCedulaCant, setErrorCedulaCant] = useState(false);
  const [errorDireccion, setErrorDireccion] = useState(false);
  const [errorNacimiento, setErrorNacimiento] = useState(false);


  const [cedula, setCedula] = useState<string>('0');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const tomorrow = dayjs().add(1, 'day');
  const [fecha, setFecha] = useState(tomorrow);
  const [fechaNacimiento, setFechaNacimiento] = useState<Dayjs | null | string>();
  const [hora, setHora] = useState('');
  const { data: data } = useGetPacienteByIdQuery(cedula);
  const { data: Reserva } = useGetReservasByUserCedulaQuery(cedula);
  const { data: fechas } = useGetReservasByFechaQuery(fecha.format("YYYY-MM-DD"));
  const [postPaciente] = usePostPacienteMutation();
  const [postReserva] = useCreateReservaMutation();
  const [response, setResponse] = useState<any>("");
  const [responseReserva, setResponseReserva] = useState<any>("");
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  }
  const [modalError, setModalError] = useState<boolean>(false);


  const theme = useTheme();

  const timeSlots = Array.from(new Array(20)).map((_, index) => {
    const hour = Math.floor(index / 2) + 9;
    const minute = index % 2 === 0 ? '00' : '30';
    return `${hour < 10 ? '0' : ''}${hour}:${minute}`;
  });

  const errorFalse = () => {
    setErrorNombre(false);
    setErrorApellido(false);
    setErrorTelefono(false);
    setErrorCorreo(false);
    setErrorDireccion(false);
    setErrorNacimiento(false);
  }

  const setVacio = () => {
    setNombre("");
    setApellido("");
    setTelefono("");
    setCorreo("");
    setDireccion("");
    setFechaNacimiento(null);
  }


  useEffect(() => {
    if (cedula != '') {
      if (data) {
        const { nombre, apellido, telefono, correo, direccion, fechaDeNacimiento } = data;
        setNombre(nombre);
        setApellido(apellido);
        setTelefono(telefono.toString());
        setCorreo(correo);
        setDireccion(direccion);
        setFechaNacimiento(dayjs(fechaDeNacimiento));
      } else {
        setErrorNombre(false);
        setErrorApellido(false);
        setErrorTelefono(false);
        setErrorCorreo(false);
        setErrorDireccion(false);
        setErrorNacimiento(false);
        setVacio();
      }
    }
  }, [data])

  const handleCedulaChange = (e: any) => {
    setErrorCedulaCant(false);
    setErrorCedula(false);
    const nuevaCedula = e.target.value;
    setCedula(nuevaCedula);
    errorFalse();
  };

  const handleSubmit = async () => {
    errorFalse();
    if (data == null) {
      if (!cedula || cedula.length != 8) {
        setErrorCedulaCant(true);
        setErrorCedula(true);
        return
      }

      if (dayjs(fechaNacimiento).isAfter(dayjs(), 'day') || fechaNacimiento == null) {
        setErrorNacimiento(true)
      } else {
        setErrorNacimiento(false)
      }

      if (!nombre) {
        setErrorNombre(true);
        return
      } else {
        setErrorNombre(false);
      }

      if (!apellido) {
        setErrorApellido(true);
        return
      } else {
        setErrorApellido(false);
      }

      if (!telefono || telefono.length != 9) {
        setErrorTelefono(true);
        return
      } else {
        setErrorTelefono(false);
      }

      if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        setErrorCorreo(true);
        return
      } else {
        setErrorCorreo(false);
      }

      if (!direccion) {
        setErrorDireccion(true);
        return
      } else {
        setErrorDireccion(false);
      }
    };
    if (!hora) {
      setErrorHora(true);
      return
    } else {
      setErrorNombre(false);
    }

    if (data == null) {

      setResponse(await postPaciente({
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        correo: correo,
        direccion: direccion,
        fechaNacimiento: formatFecha(fechaNacimiento)
      }))
    } else {

      const selected = formatFecha(fecha);
      const concatenada = selected?.concat(' ', hora)

      setResponseReserva(await postReserva({
        fecha: concatenada,
        estado: "En espera",
        pacienteId: cedula
      }).catch((err) => {
        // setErrorExiste(true)
      })
      )
    }

  }

  useEffect(() => {
    const makeReserva = async () => {
      if (response !== "") {
        if (response?.data?.statusCode === 200 || data == null) {
          const selected = formatFecha(fecha);
          const concatenada = selected?.concat(' ', hora);
          const responseReserva = await postReserva({
            fecha: concatenada,
            estado: "En espera",
            pacienteId: cedula
          });
          setResponseReserva(responseReserva);
        }
      }
    };

    makeReserva();
  }, [response]);


  useEffect(() => {
    if (responseReserva != "") {

      if (responseReserva?.data?.statusCode === 200) {
        setModalError(false);
        setOpen(true);
      } else {
        setModalError(true);
        setOpen(true);
      }
    }
  }, [responseReserva]);



  const handleTimeChange = (event: any) => {
    setErrorHora(false)
    setHora(event.target.value.toString());
  };


  const handleDateChange = (newDate: any) => {
    setFecha(newDate);
  };

  const handleNacimientoDateChange = (newDate: any) => {
    setFechaNacimiento(newDate);
  };

  const formatDates = () => {
    if (fechas) {
      const formattedDates = fechas.map((Reserva) => {
        const dateObject = new Date(Reserva);
        const formattedDate = moment(dateObject).format('HH:mm');
        return formattedDate;
      });
      return formattedDates;
    }
    return [];
  };

  const formatFecha = (fechaParam: any) => {
    if (fechaParam) {
      const dateFormated = new Date(fechaParam)
      const fecha = moment(dateFormated).format('YYYY/MM/DD');
      return fecha
    }
  }

  const filterTimeSlots = () => {
    const formattedDates = formatDates();

    const filteredTimeSlots = timeSlots.filter(timeSlot => {
      return !formattedDates.includes(timeSlot);
    });

    return filteredTimeSlots;
  };

  const isWeekend = (date: Dayjs) => {
    const day = date.day();

    return day === 0 || day === 6;
  };


  return (
    <Box className='content-center' >
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Bienvenido a Smilify
            </Typography>
            <Typography variant='body2'>Rellena los datos para obtener tu primer turno</Typography>
            {Reserva ? (
              <Alert severity="error">Ya hay una reserva para esta Cedula</Alert>
            ) : null}

            {errorCedulaCant ? (
              <Alert severity="error">La cédula debe tener 8 dígitos</Alert>
            ) : null}
          </Box>
          <form noValidate autoComplete='off' onSubmit={(e) => e.preventDefault()}>
            <TextField fullWidth type='number' label='Cedula' sx={{ marginBottom: 4 }} error={errorCedula} onChange={handleCedulaChange} />
            <TextField autoFocus fullWidth type='string' id='username' label="Nombre" value={nombre} sx={{ marginBottom: 4 }} error={errorNombre} disabled={cedula == "0" || cedula == "" || data != null} onChange={(e) => setNombre(e.target.value)} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                disableFuture
                sx={{ width: '100%' }}
                label='Fecha de Nacimiento'
                format='YYYY/MM/DD'
                value={fechaNacimiento}
                disabled={cedula == "0" || cedula == '' || data != null}
                onChange={handleNacimientoDateChange}
              />
            </LocalizationProvider>
            <TextField fullWidth type='string' label="Apellido" value={apellido} sx={{ marginBottom: 4, marginTop: 4 }} error={errorApellido} disabled={cedula == "0" || cedula == "" || data != null} onChange={(e) => setApellido(e.target.value)} />

            <TextField fullWidth type='number' label="Telefono" value={telefono} sx={{ marginBottom: 4 }} error={errorTelefono} disabled={cedula == "0" || cedula == "" || data != null} onChange={(e) => setTelefono(e.target.value)} />

            <TextField fullWidth type='email' label="Correo" value={correo} sx={{ marginBottom: 4 }} error={errorCorreo} disabled={cedula == "0" || cedula == "" || data != null} onChange={(e) => setCorreo(e.target.value)} />
            <TextField fullWidth type='email' label="Direccion" value={direccion} sx={{ marginBottom: 4 }} error={errorDireccion} disabled={cedula == "0" || cedula == "" || data != null} onChange={(e) => setDireccion(e.target.value)} />
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  disablePast
                  sx={{ width: '60%' }}
                  label='Fecha'
                  format='YYYY/MM/DD'
                  value={fecha}
                  disabled={cedula == "0" || cedula == '' || Reserva == true}
                  shouldDisableDate={(date) => isWeekend(date) || date.isSame(dayjs(), 'day')}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>

              <FormControl sx={{ width: '30%' }}>
                <InputLabel id='combo-box-label'>Hora</InputLabel>
                <Select
                  disabled={cedula == "0" || cedula === '' || Reserva == true}
                  error={errorHora}
                  label='Hora'
                  labelId='combo-box-label'
                  id='combo-box'
                  value={hora}
                  onChange={handleTimeChange}
                >
                  {!hora ? (
                    filterTimeSlots().map((time) => (
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
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button fullWidth size='large' type='submit' variant='contained' sx={{
                marginBottom: 7, marginTop: 10, backgroundColor: '#6fbfb6', '&:hover': {
                  backgroundColor: '#6fbfb6',
                }
              }} onClick={handleSubmit}>
                Obtener Turno
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='flex flex-col justify-start'>
          <div className='flex flex-row justify-between'>
          </div>
          <div className='flex flex-col justify-between items-center mt-4 mb-8'>
            {modalError ? (
              <>
                <CloseCircleOutline fontSize="large" style={{ color: 'red' }}></CloseCircleOutline>
                <p className="text-[16px] font-normal text-black mt-2">Ha ocurrido un error, intenta nuevamente</p>
              </>
            ) : (
              <>
                <CheckCircleOutline fontSize="large" style={{ color: '#84DCCC' }}></CheckCircleOutline>
                <p className="text-[16px] font-normal text-black mt-2">¡Tu reserva ha sido registrada!</p>
              </>
            )}
          </div >
          <div className='h-2/6 flex flex-col items-center justify-center'>
            <button className='h-14 w-44 font-semibold bg-[#84DCCC] text-white rounded-md mb-4' style={{ outline: 'none' }}
              onClick={handleClose}
            >Aceptar</button>
          </div>
        </Box>
      </Modal>
    </Box>
  );
};

const StyledFooterIllustrationsV1 = styled(FooterIllustrationsV1)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const RegisterPageContainer = () => {
  return (
    <BlankLayout>
      <RegisterPage />
      <StyledFooterIllustrationsV1 />
    </BlankLayout>
  );
};

export default RegisterPageContainer;
