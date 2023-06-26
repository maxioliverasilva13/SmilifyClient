import FormPaciente from "src/components/Pages/FormPaciente";
import { Action } from "src/utils/enums/Action.enum";
import { useGetPacienteInfoQuery } from "src/store/services/PacienteService";
import { useRouter } from "next/router";
import { useEffect ,useState} from "react";
import moment from "moment";


import  Error404  from "src/components/Pages/404";


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

export default function EditarPaciente() {
    
    const router = useRouter();
    const { id = "" } = router.query;

    const userId = id as string;

    const { data, isLoading, refetch } = useGetPacienteInfoQuery<any>(userId, {
        skip: !userId,
    });

    const [pacienteData, setPacienteData] = useState<PacienteDTO | undefined>(undefined);

    useEffect(() => {

        if (data) {
            const { pacienteInfo} = data;
            const { nombre, apellido, correo ,ocupacion,datosClinicos,telefono,direccion,fechaDeNacimiento ,id,activo,tieneAlta} = pacienteInfo;
            
            
            setPacienteData({
                nombre,
                apellido,
                ocupacion,
                datosClinicos,
                telefono,
                correo,
                direccion,
                activo,
                tieneAlta,
                cedula : id,
                fechaNacimiento: moment(fechaDeNacimiento).format("YYYY-MM-DD")
            }) 

            
        }
     }, [data]);


 
    return (
        <div>
            {
                pacienteData && !isLoading ? (
                    <FormPaciente formValues={ pacienteData } action={Action.EDIT}></FormPaciente>  

                ): (!pacienteData && !isLoading)  ? (<div>
                    <Error404></Error404>
                </div>): null
            }

        </div>
    
    );
};

