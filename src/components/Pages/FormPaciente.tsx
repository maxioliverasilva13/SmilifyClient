import Table from "src/components/Table/table";
import { usePostPacienteMutation, useEditarPacienteMutation } from "src/store/services/PacienteService";
import GlobalSpinner from "src/components/Spinner/GlobalSpinner";
import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import appRoutes from "src/utils/appRoutes";
import TextField from '@mui/material/TextField';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Paciente } from "src/types/paciente";
import { Action } from "src/utils/enums/Action.enum";
import dayjs from 'dayjs';




interface PacienteDTO {
    nombre: string
    telefono: string,
    fechaNacimiento: string,
    correo: string,
    direccion: string,
    ocupacion: string,
    datosClinicos: string,
    apellido: string,
    cedula : string,
    activo: boolean,
    tieneAlta: boolean
}

interface errorFormulario {
    nombre: string | null,
    telefono: string | null,
    fechaNacimiento: string | null,
    correo: string | null,
    datosClinicos: string | null,
    ocupacion: string | null,
    direccion: string | null,
    apellido: string | null,
    cedula  : string | null,
}


export default function FormPaciente(props: { formValues: any,  action : Action}) {

    const [postPaciente, { isLoading, isError }] = usePostPacienteMutation();
    const [EditarPaciente, { isLoading: loadingEdit, isError : errorEdit }] = useEditarPacienteMutation();


    const [values, setValues] = useState<PacienteDTO>(props.formValues ? props.formValues : {
        cedula: '',
        nombre: '',
        apellido: '',
        telefono: '',
        fechaNacimiento: '',
        correo: '',
        direccion: '',
        ocupacion: '',
        datosClinicos: ''
    })




    const [formErrors, setFormErrors] = useState<errorFormulario>({
        cedula: null,
        nombre: '',
        telefono: null,
        fechaNacimiento: null,
        correo: null,
        direccion: null,
        ocupacion: null,
        datosClinicos: null,
        apellido: null
    });

    const [submit, setSubmit] = useState<boolean>(false);



    const handleChange = (prop: keyof PacienteDTO) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleFechaDeNacimiento = (value: any) => {
        if (!value) {
            return;
        }
        setValues({ ...values, fechaNacimiento: moment(value.$d).format("DD/MM/YYYY") })
    }



    const validarFormulario = () => {

        const errors: errorFormulario = {
            nombre: null,
            telefono: null,
            fechaNacimiento: null,
            correo: null,
            datosClinicos: null,
            direccion: null,
            ocupacion: null,
            apellido: null,
            cedula: null

        };
        let formularioValido = true;

        // Nombres y Apellidos 

        if (!values["cedula"]) {
            formularioValido = false;
            errors["cedula"] = "Cedula es requerida";
        }


        if (!values["nombre"]) {
            formularioValido = false;
            errors["nombre"] = "Nombre es requerido";
        }

        if (!values["apellido"]) {
            formularioValido = false;
            errors["apellido"] = "Apellido es requerido";
        }


        // Email
        if (!values["telefono"]) {
            formularioValido = false;
            errors["telefono"] = "Telefono es requerido.";
        }


        // Asunto
        if (!values["fechaNacimiento"]) {
            formularioValido = false;
            errors["fechaNacimiento"] = "Fecha de Nacimiento es requerido";
        }

        // Validamos si el formato del Email es correcto 
        if (!values["correo"]) {
           
            errors["correo"] = "Email es requerido";
         
        }else{
             const regexEmail = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
             if(!regexEmail.test(values["correo"])){
                errors["correo"] = "Email es invalido";

             }
        }



        // Área o Departamento
        if (!values["direccion"]) {
            formularioValido = false;
            errors["direccion"] = "direccion es requerido";
        }

        // Archivo 
        if (!values["ocupacion"]) {
            formularioValido = false;
            errors["ocupacion"] = "Ocupacion es requerido.";
        }

        // Mensaje
        if (!values["datosClinicos"]) {
            formularioValido = false;
            errors["datosClinicos"] = "Datos clinicos es requerido";
        }

        setFormErrors(errors);

        return formularioValido;
    }

    const resetForm = async ()=>{
        setValues({
            cedula: '',
            nombre: '',
            apellido: '',
            telefono: '',
            fechaNacimiento: '',
            correo: '',
            direccion: '',
            ocupacion: '',
            datosClinicos: '',
            tieneAlta : true,
            activo: true

        });
    }

    const onSubmit = async () => {
        setSubmit(true);
        if (!validarFormulario()) {
            return;
        }
        try{
            const res: any = props.action == Action.CREATE ? await postPaciente(values) : await EditarPaciente(values);
            if(res.error){
                const { data } = res.error;
                const { message } = data;
                toast.error(message);  
                return;
            }
            const { data } = res;
            toast.success("Paciente creado correctamente"); 
            if(props.action == Action.CREATE){
                resetForm(); 
            }
        }catch(e){
            toast.error("Ha ocurrido un error!");  
        }
        
    }


    return (
        <div className="w-full h-full flex flex-grow flex flex-row items-start justify-center max-h-full overflow-auto">
            <div className="w-full flex-grow h-auto bg-white rounded-lg shadow-xl p-6 flex flex-col items-start justify-start">
                <div className="w-full flex flex-row items-center justify-start gap-2   pb-[60px]">
                    <div className="w-full flex flex-row items-center max-w-full justify-between">
                        <p className="text-[28px] font-semibold text-[#84DCCC]">
                           { props.action == Action.CREATE ?  'Agregar Paciente' : 'Editar Paciente'} 
                        </p>
                    </div>

                </div>
                <div className="mx-5 w-full">
                    <p className="text-lg">Datos Personales</p>
                    <div className="flex mt-5 w-full gap-10 p-2">
                        
                        <div className="w-full">
                            <div className="flex">
                                <p className="mb-2">Cedula</p>
                                {
                                    submit && formErrors['cedula'] && (
                                        <span className="ml-5 text-red-500">{formErrors['cedula']}</span>

                                    )

                                }

                            </div>
                            <TextField id="outlined-basic" label="Cedula" variant="outlined" className='mb-4'
                                disabled={ props.action == Action.EDIT}
                                value={values.cedula} onChange={handleChange('cedula')}
                                style={{width: '50%'}}
                            />
                        </div>
                       


                    </div>
                    <div className="flex mt-5 w-full gap-10 p-2">
                        
                        <div className="w-full">
                            <div className="flex">
                                <p className="mb-2">Nombre</p>
                                {
                                    submit && formErrors['nombre'] && (
                                        <span className="ml-5 text-red-500">{formErrors['nombre']}</span>

                                    )

                                }

                            </div>
                            <TextField id="outlined-basic" label="Nombre" variant="outlined" className='mb-4'

                                value={values.nombre} onChange={handleChange('nombre')}
                                fullWidth={true}
                            />
                        </div>
                        <div className="w-full">
                            <div className="flex">
                                <p className="mb-2">Apellido</p>
                                {
                                    submit && formErrors['apellido'] && (
                                        <span className="ml-5 text-red-500">{formErrors['apellido']}</span>

                                    )

                                }

                            </div>
                            <TextField id="outlined-basic" label="Apellido" variant="outlined" className='mb-4'
                                value={values.apellido} onChange={handleChange('apellido')} 
                                fullWidth={true}

                            />
                        </div>

                        <div className="w-full">
                            <div className="flex">
                                <p className="mb-2">Telefono</p>
                                {
                                    submit && formErrors['telefono'] && (
                                        <span className="ml-5 text-red-500">{formErrors['telefono']}</span>

                                    )

                                }

                            </div>
                            <TextField id="outlined-basic" label="Telefono" variant="outlined" className='mb-4'
                                value={values.telefono} onChange={handleChange('telefono')}
                                fullWidth={true}

                            />
                        </div>


                    </div>

                    <div className="flex mt-5 w-full gap-10 p-2 items-center">
                        <div className="w-full">
                            <div className="flex">
                               <p className="mb-2">Fecha de nacimiento</p>
                               {
                                    submit && formErrors['fechaNacimiento'] && (
                                        <span className="ml-5 text-red-500">{formErrors['fechaNacimiento']}</span>

                                    )

                                }

                            </div>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker format="DD/MM/YYYY"
                                    defaultValue={values.fechaNacimiento ?  dayjs(values.fechaNacimiento) : null}
                                    className="w-full"
                                    onChange={(newValue) => handleFechaDeNacimiento(newValue)} />
                            </LocalizationProvider>
                        </div>
                        <div className="w-full">
                            <div className="flex"> 
                              <p className="mb-2"> Correo</p>
                                { submit && formErrors['correo'] && (
                                                <span className="ml-5 text-red-500">{formErrors['correo']}</span>

                                )}
                            </div>
                            <TextField id="outlined-basic" label="Correo" variant="outlined" className='mb-4'
                                value={values.correo} onChange={handleChange('correo')}
                                fullWidth={true}

                            />

                        </div>

                    </div>

                    <div className="flex mt-5 w-full gap-10 p-2">
                        <div className="w-full">
                            <div className="flex">
                              <p className="mb-2">Domicilio</p>
                              { submit && formErrors['direccion'] && (
                                                <span className="ml-5 text-red-500">{formErrors['direccion']}</span>

                                )}

                            </div>
                            <TextField id="outlined-basic" label="Domicilio" variant="outlined" className='mb-4'

                                value={values.direccion} onChange={handleChange('direccion')}
                                fullWidth={true}
                            />
                        </div>
                        <div className="w-full">
                            <div className="flex">
                                <p className="mb-2">Ocupacion</p>
                                { submit && formErrors['ocupacion'] && (
                                                <span className="ml-5 text-red-500">{formErrors['ocupacion']}</span>

                                )}

                            </div>
                            <TextField id="outlined-basic" label="Ocupacion" variant="outlined" className='mb-4'
                                value={values.ocupacion} onChange={handleChange('ocupacion')}
                                fullWidth={true}

                            />
                        </div>

                    </div>

                    <div className="flex mt-5 w-full  p-2 flex-col">
                        <div className="flex">
                            <p className="mb-2">Datos clinicos</p>
                             { submit && formErrors['datosClinicos'] && (
                                                <span className="ml-5 text-red-500">{formErrors['datosClinicos']}</span>

                              )}
                            

                        </div>
                        <TextField id="outlined-basic" label="Datos Clinicos" variant="outlined" className='mb-4'

                            value={values.datosClinicos} onChange={handleChange('datosClinicos')}
                            fullWidth={true}
                            inputProps={{
                                style: {
                                    height: "70px",
                                },
                            }}

                        />
                    </div>
                    <div className="flex justify-end mt-3 mx-3">
                        <button className="bg-[#84dccc]  text-white font-bold py-2 px-4 rounded"
                            onClick={() => onSubmit()}>
                            CONFIRMAR
                        </button>
                    </div>


                </div>
            </div>
            <ToastContainer  />

        </div>
        
    );
};

