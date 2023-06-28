// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// ** Third Party Imports

// ** Styled Components

import { useEditConfigMutation } from 'src/store/services/UserService'
import GlobalSpinner from 'src/components/Spinner/GlobalSpinner'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Precio por orden' fullWidth {...props} />
});

interface errorFormulario{
  precioPorOrden : string |  null
}

const TabInfo = ({configuracionData}) => {
  // ** State
  const [configuracionInfo, setConfiguracionInfo] = useState(configuracionData);
  const [ formErrors ,setFormErrors] = useState<errorFormulario>({
     precioPorOrden : null
  });
  const [editConfig, { isLoading: loadingEdit, isError : errorEdit }] = useEditConfigMutation();

  const [submit, setSubmit ] = useState<boolean>(false);

  const handleChange = (prop: keyof any) => (event: ChangeEvent<HTMLInputElement>) => {
    setConfiguracionInfo({ ...configuracionInfo, [prop]: event.target.value })
  }

  const validarFormulario = ()=>{
    const errors: errorFormulario = {
      precioPorOrden : null
  };

  let formularioValido = true;

  // Nombres y Apellidos 

  if (!configuracionInfo["precioPorOrden"]) {
      formularioValido = false;
      errors["precioPorOrden"] = "Precio por orden es requerido";
  }else{
    const reg = new RegExp("^[0-9]*$"); //only numbers
    if(!reg.test(configuracionInfo['precioPorOrden'])){
      errors["precioPorOrden"] = "Precio por orden debe contener unicamente numeros";
      formularioValido = false;
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

    const { id,  precioPorOrden } = configuracionInfo;
    const body = {
      id,
      precioPorOrden
    }
    

    try{
      const res:any = await editConfig(body);
      toast.success("Configuracion de la aplicacion editada correctamente!");

    }catch(e){
      toast.error("Ha ocurrido un error!"); 

    }

    
  }

  if(loadingEdit){
    return <GlobalSpinner></GlobalSpinner>
  }
  
  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
         
          <Grid item xs={12} sm={6}>
               <div className="flex">
                  <p className="mb-2">Precio por orden</p>
                  {
                      submit && formErrors['precioPorOrden'] && (
                          <span className="ml-5 text-red-500">{formErrors['precioPorOrden']}</span>

                      )

                  }
              </div>
            <Grid item xs={12} sm={3}>
              
              <TextField fullWidth label='Precio por orden' value={configuracionInfo.precioPorOrden} onChange={handleChange('precioPorOrden')}/>
            </Grid>
         
          </Grid>
          
      
          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={()=> onSubmit()}>
              Guardar cambios
            </Button>
          
          </Grid>


        </Grid>
      </form>
      <ToastContainer  />

    </CardContent>
  )
}

export default TabInfo
