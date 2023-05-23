import * as React from 'react';
import { ChangeEvent, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import appRoutes from "src/utils/appRoutes";
import { useRouter } from "next/router";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CloseCircleOutline from "mdi-material-ui/CloseCircleOutline";
import { useGetcategoriasQuery } from 'src/store/services/CategoriaService';
import { usePostArancelPublicoMutation } from 'src/store/services/ArancelPublicoService'
import useGlobal from 'src/hooks/useGlobal';
import Alert from '@mui/material/Alert';
import { ok } from 'assert';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '35%',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    outline: 'none'
};


function formatCategorias(categoria: any) {
    if (!categoria)
        return [];
    return categoria.map((item: any) => ({
        label: item.nombre, id: item.id
    }))
};


interface State {
    nombre: string
    idCategoria: string
    precio: string
}

export default function BasicModal() {
    const handleClose = () => {
        push(appRoutes.index())
    }
    const { push } = useRouter();
    const { data } = useGetcategoriasQuery({});
    const categoriaList = formatCategorias(data);
    const [valueA, setValueA] = React.useState('');
    const [idCat, setIdCat] = React.useState('');
    const [values, setValues] = useState<State>({
        nombre: '',
        idCategoria: '',
        precio: ''
    })

    const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
    }
    const handleChangeCat = () => {
        setValues({ ...values, idCategoria: idCat }); // Asignar el valor de idCat a idCategoria en values
    };

    const [postArancelPublico, { isLoading: isLoadingSignIn }] = usePostArancelPublicoMutation();

    const [errorNombre, setErrorNombre] = useState<boolean>(false);
    const [errorCosto, setErrorCosto] = useState<boolean>(false);
    const [Accepted, setAccepted] = useState<boolean>();
    const [NotAccepted, setNotAccepted] = useState<boolean>();
    const [response, setResponse] = useState<any>();
    const { handleChangeLoading, loading } = useGlobal();

    const handleSubmit = async () => {
        if (!values.nombre || !values.precio) {
            if (!values.nombre) {
                setErrorNombre(true)
            } else {
                setErrorNombre(false)
            }

            // Validar campo de cedula
            if (!values.precio) {
                setErrorCosto(true)
            } else {
                setErrorCosto(false)
            }
            return
        }
        //handleChangeLoading(true);
        setResponse (await postArancelPublico({
            nombre: values.nombre,
            idCategoria: values.idCategoria,
            precio: values.precio
        })
        )

    }

    useEffect(()=>{
        if (response != null){
            error()   
        }
        
    }, [response])

    function error() {
        console.log(response)
        if (response?.data?.statusCode === 200) {
            // Mostrar mensaje de éxito
            setAccepted(true);
            console.log('accepted')
          } else {
            // Mostrar mensaje de error
            setNotAccepted(true);
            console.log('Notaccepted')
          }
    }

    function Redireccion() {
        push(appRoutes.index());
    }

    return (
        <div>
            <Modal
                open={true}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='flex flex-col justify-start h-3/5'>
                    <div className='flex flex-row justify-between'>
                        <p className="text-[28px] font-semibold text-[#84DCCC]">
                            Agregar Item
                        </p>
                        <button onClick={handleClose} style={{ outline: 'none' }}>
                            <CloseCircleOutline fontSize="large"></CloseCircleOutline>
                        </button>
                    </div>

                    <div className='flex flex-col justify-between items-center mt-28 h-3/5 mb-8'>
                        <TextField id="outlined-basic" label="Nombre" variant="outlined" style={{ width: '75%' }} className='mb-4'
                            value={values.nombre} onChange={handleChange('nombre')} error={errorNombre}
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={categoriaList}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Categoria" />}
                            style={{ width: '75%' }}
                            className='mb-4'
                            value={valueA}
                            onChange={(event: any, newValue: any) => {
                                setValueA(newValue)
                                setIdCat(newValue.id)
                                handleChangeCat()
                            }}
                        />
                        <TextField id="outlined-basic" label="Costo" variant="outlined" style={{ width: '75%' }}
                            value={values.precio} onChange={handleChange('precio')} type='number' error={errorCosto}
                        />
                    </div >
                    <div className='h-2/6 flex flex-col items-center justify-center'>
                        {Accepted ?
                            <Alert sx={{ marginBottom: 4 }} severity="success" onClick={Redireccion}>Agregado Coorectamente, presione aqui para volver al inicio</Alert>
                            :null
                        }
                        {NotAccepted ?
                             <Alert sx={{ marginBottom: 4 }} severity="error">Ha ocurrido un error, intente Nuevamente</Alert>
                            :null
                        }
                        <button className='h-14 w-44 font-semibold bg-[#84DCCC] text-white rounded-md mb-4' style={{ outline: 'none' }}
                            onClick={handleSubmit}
                        >GUARDAR</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}