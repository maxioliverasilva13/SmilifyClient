// ** React Imports
import { useState, Fragment, ChangeEvent, MouseEvent, ReactNode } from 'react'


// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import Autocomplete from '@mui/material/Autocomplete';
import {MenuItem, Select } from '@mui/material/';

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

interface State {
  nombre: string
  telefono: number
  correo: string
  hora: string
  fecha : Dayjs
  cedula: number
}


// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import React from 'react'
import dayjs, { Dayjs } from 'dayjs';
import Moment from 'react-moment';


const RegisterPage = () => {

  // ** States
  const [values, setValues] = useState<State>({
    nombre: '',
    telefono: 0,
    correo: '',
    hora: '',
    fecha: dayjs(new Date()),
    cedula: 0,
  })

  // ** Hook
  const theme = useTheme()

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  
  const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) =>
      `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${
        index % 2 === 0 ? '00' : '30'
      }`,
  );

  const [selectedOption, setSelectedOption] = useState('');
  

  const Dias = [
    { value: 'option1', label: 'Opción 1' },
    { value: 'option2', label: 'Opción 2' },
    { value: 'option3', label: 'Opción 3' },
  ];

  function DisabledOptions() {
    return (
      <Autocomplete
        id="disabled-options-demo"
        options={timeSlots}
        getOptionDisabled={(option) =>
          option === timeSlots[0] || option === timeSlots[2]
        }
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Disabled options" />}
      />
    );
  }

  const [errorNombre, setErrorNombre] = useState<boolean>(false);
  const [errorTelefono, setErrorTelefono] = useState<boolean>(false);
  const [errorCorreo, setErrorCorreo] = useState<boolean>(false);
  const [errorFecha, setErrorFecha] = useState<boolean>(false);
  const [errorHora, setErrorHora] = useState<boolean>(false);
  const [errorCedula, setErrorCedula] = useState<boolean>(false);
  
  const handlesubmit = () => {
    console.log(values) 

    // Validar campo de nombre
    if (!values.nombre) {
      console.log('Nombre');
        setErrorNombre(true)
    } else {
      setErrorNombre(false)
    }

    // Validar campo de correo electrónico
    if (!values.correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.correo)) {
      console.log('Correo');
        setErrorCorreo(true)
    } else {
      setErrorCorreo(false)
    }

    // Validar campo de telefono
    if (!values.telefono || values.telefono > 9999999 && values.telefono < 1000000000) {
      console.log('Telefono');
      setErrorTelefono(true)
    } else {
      setErrorTelefono(false)
    }

     // Validar campo de fecha
     if (!values.fecha) {
      console.log('Fecha');
      setErrorFecha(true)
    } else {
      setErrorFecha(false)
    }
    
     // Validar campo de hora
     if (!values.hora) {
      console.log('Hora');
      setErrorHora(true)
    } else {
      setErrorNombre(false)
    }

     // Validar campo de cedula
     if (!values.cedula) {
      console.log('cedula');
      setErrorCedula(true)
    } else {
      setErrorCedula(false)
    }
    
  };


  // setear handlechange
  // error=error...
  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', flexDirection: 'column'}} >
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Bienvenido a Smilify
            </Typography>
            <Typography variant='body2'>Rellena los datos para obtener tu primer turno</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            {errorNombre? 
            <TextField autoFocus fullWidth type='string' id='username' label='Nombre Invalido' sx={{ marginBottom: 4 }} error/>
            
            :<TextField autoFocus fullWidth type='string' id='username' label='Nombre' sx={{ marginBottom: 4 }}/>
            }
            {errorTelefono? 
              <TextField fullWidth type='number' label='Telefono Invalido' sx={{ marginBottom: 4 }} error/>
            :<TextField fullWidth type='number' label='Telefono' sx={{ marginBottom: 4 }} />
            }
            {errorCorreo?
              <TextField fullWidth type='email' label='Correo Invalido' sx={{ marginBottom: 4 }} error/> 
            :<TextField fullWidth type='email' label='Correo' sx={{ marginBottom: 4 }} />
            }
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  sx={{ width: '60%' }}
                  label="fecha"
                  format='YYYY/MM/DD'
                  value={dayjs(values.fecha)}
                  onChange={(newDate) => {
                    if (newDate !== null) {
                    setValues({...values, fecha: dayjs(newDate)})
                    }
                  }}
                />
              </LocalizationProvider>
              {errorHora?
                  <FormControl sx={{ width: '30%' }}>
                  <InputLabel id="combo-box-label">selecciona una hora</InputLabel>
                  <Select
                    error
                    label="Selecciona una hora"
                    labelId="combo-box-label"
                    id="combo-box"
                    value={timeSlots}
                    onChange={DisabledOptions}
                  >
                    {Dias.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              :<FormControl sx={{ width: '30%' }}>
                <InputLabel id="combo-box-label">Hora</InputLabel>
                <Select
                  label="hora"
                  labelId="combo-box-label"
                  id="combo-box"
                  value={timeSlots}
                  onChange={DisabledOptions}
                >
                  {Dias.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>           
              }            
            </Box>
            {errorCedula?
              <TextField fullWidth type='number' label='Cedula Invalida' sx={{ marginBottom: 10 }} error/>
            :<TextField fullWidth type='number' label='Cedula' sx={{ marginBottom: 10 }} />
            }
            
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 7 }} onClick={handlesubmit}>
              Obtener Turno
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default RegisterPage

