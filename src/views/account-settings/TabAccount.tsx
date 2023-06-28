// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent } from 'react';



// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useEditMeInfoMutation } from 'src/store/services/UserService';

import  useUploadFile   from 'src/hooks/useUploadFile';

import GlobalImage from 'src/components/GlobalImage/GlobalImage';


import dayjs from 'dayjs';
// ** Icons Imports
import Close from 'mdi-material-ui/Close';

import moment from 'moment';
import { read } from 'fs';
import GlobalSpinner from 'src/components/Spinner/GlobalSpinner';

interface errorFormulario {
  nombre: string | null,
  celular: string | null,
  fechaNacimiento: string | null,
  correo: string | null,
  apellido: string | null,
}


const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))


const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))


const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = ({userData}) => {
  // ** State
  const [openAlert, setOpenAlert] = useState<boolean>(true)
  const [userInfo, setUserInfo] = useState<any>(userData);
  const [imgSrc, setImgSrc] = useState<string>(userInfo?.avatar);
  const [submit ,setSubmit] = useState<boolean>(false);

  const [avatarImported , setAvatarFileImported] = useState<File | null>(null);
  const { handleUpload, fileError, fileUrl,uploadingFile } = useUploadFile();

  const [formErrors, setFormErrors] = useState<errorFormulario>({
      nombre: '',
      celular: null,
      fechaNacimiento: null,
      correo: null,
      apellido: null
  });
  const [editMeInfo, { isLoading: loadingEdit, isError : errorEdit }] = useEditMeInfoMutation();



  
  const handleChange = (prop: keyof any) => (event: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [prop]: event.target.value })
  }


  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      
      reader.onload = () => {
        setImgSrc(reader.result as string)
        setAvatarFileImported(files[0]);
      }
      reader.readAsDataURL(files[0])
    }
  }


  const validarFormulario = ()=>{
    const errors: errorFormulario = {
      nombre: null,
      celular: null,
      fechaNacimiento: null,
      correo: null,
      apellido: null,
  };

  let formularioValido = true;

  // Nombres y Apellidos 

  if (!userInfo["nombre"]) {
      formularioValido = false;
      errors["nombre"] = "Nombre es requerido";
  }

  if (!userInfo["apellido"]) {
      formularioValido = false;
      errors["apellido"] = "Apellido es requerido";
  }


  // Email
  if (!userInfo["celular"]) {
      formularioValido = false;
      errors["celular"] = "Celular es requerido.";
  }


  // Asunto
  if (!userInfo["fechaNacimiento"]) {
      formularioValido = false;
      errors["fechaNacimiento"] = "Fecha de Nacimiento es requerido";
  }

  // Validamos si el formato del Email es correcto 
  if (!userInfo["email"]) {
      errors["correo"] = "Correo requerido";
   
  }else{
       const regexEmail = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
       if(!regexEmail.test(userInfo["email"])){
          errors["correo"] = "Email es invalido";

       }
  }
  setFormErrors(errors);

  return formularioValido;
  }

  const onSubmit = async()=>{
      setSubmit(true);
      if(!validarFormulario()){
        return;
      }
      
      const { email , ...data } = userInfo;
      let body  = {
        ...data,
        fechaNacimiento:  moment(data.fechaNacimiento.$d).format("DD/MM/YYYY")
      }
      if(avatarImported){
        const urlNewAvatar = await handleUpload(avatarImported);
        body = {
          ...body,
          avatar: urlNewAvatar
        }
        setAvatarFileImported(null);
      }

      try{
        const res:any = await editMeInfo(body);
        const { data } = res;
        const { statusCode , message } = data;
        if(statusCode != 200){
          toast.error("Ha ocurrido un error!"); 
          return;
        }
        toast.success(message);

      }catch(e){
        toast.error("Ha ocurrido un error!"); 

      }
      
  }

  const handleFechaDeNacimiento = (value: any) => {
    if (!value) {
        return;
    }
    setUserInfo({ ...userInfo, fechaNacimiento:  value })
  }

  
  
  if (loadingEdit || uploadingFile) {
    return <GlobalSpinner />;
  }
  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>
              <div className="relative w-[150px] h-[150px] mr-5"> 
                  <GlobalImage
                      src={imgSrc}
                      loader={() => userInfo?.avatar}
                      layout="fill"
                      objectFit="cover"
                      className="w-full h-full rounded"
                    
                    ></GlobalImage>
                </div>
            </Box>
           
              <Box >
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Subir nuevo avatar
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Solo archivos PNG , JPG o JPEG
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
          <div className="flex">
              <p className="mb-2">Nombre</p>
              {
                  submit && formErrors['nombre'] && (
                      <span className="ml-5 text-red-500">{formErrors['nombre']}</span>

                  )

              }

          </div>

                                
            <TextField fullWidth label='Nombre' value={userInfo.nombre} onChange={handleChange('nombre')}/> 
           
          </Grid>
          <Grid item xs={12} sm={6}>
              <div className="flex">
                  <p className="mb-2">Apellido</p>
                  {
                      submit && formErrors['apellido'] && (
                          <span className="ml-5 text-red-500">{formErrors['apellido']}</span>

                      )

                  }
              </div>
              <TextField fullWidth label='Apellido'  value={userInfo.apellido} onChange={handleChange('apellido')}/>
          </Grid>
          <Grid item xs={12} sm={6}>
          <div className="flex">  
                  <p className="mb-2">Correo Electronico</p>
                  {
                      submit && formErrors['correo'] && (
                          <span className="ml-5 text-red-500">{formErrors['correo']}</span>

                      )

                  }
              </div>
            <TextField
              fullWidth
              type='email'
              label='Correo Electronico'
              disabled
              value={userInfo.email}
              onChange={handleChange('email')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
           <div className="flex">
                  <p className="mb-2">Fecha de Nacimiento</p>
                  {
                      submit && formErrors['fechaNacimiento'] && (
                          <span className="ml-5 text-red-500">{formErrors['fechaNacimiento']}</span>

                      )

                  }
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker format="DD/MM/YYYY"
                      defaultValue={userInfo.fechaNacimiento ?  dayjs(userInfo.fechaNacimiento) : null}
                      className="w-full"
                      onChange={(newValue) => handleFechaDeNacimiento(newValue)} />
              </LocalizationProvider>

          </Grid>
          
          <Grid item xs={12} sm={7}>
               <div className="flex">
                  <p className="mb-2">Celular</p>
                  {
                      submit && formErrors['celular'] && (
                          <span className="ml-5 text-red-500">{formErrors['celular']}</span>

                      )

                  }
              </div>
              <TextField
                    fullWidth
                    type='email'
                    label='Celular'
                    value={userInfo.celular}
                    onChange={handleChange('celular')}
                
                  />
          </Grid>
         
         

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}
              onClick={()=> onSubmit()}>
              Guardar Cambios
            </Button>
          
          </Grid>
        </Grid>
      </form>
      <ToastContainer  />

    </CardContent>

    
  )
}

export default TabAccount
