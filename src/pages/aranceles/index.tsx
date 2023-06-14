import Table from "src/components/Table/table";
import SearchIcon from "mdi-material-ui/Magnify";
import Filter from "mdi-material-ui/FilterVariant";
import { useGetArancelesQuery } from "src/store/services/ArancelService";
import GlobalSpinner from "src/components/Spinner/GlobalSpinner";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import appRoutes from "src/utils/appRoutes";
import { TipoArancel } from "src/utils/enums/TipoArancel.enum";

const cols: any = [
  {
    key: "nombre",
    value: "Nombre",
  },
 
  {
    key: "precio",
    value: "Precio",
  },

  {
    key: "nombreCategoria",
    value: "Prestación",
  }
 
];

const Aranceles= () => {
  const { data: aranceles, isLoading } = useGetArancelesQuery({});
 // const [query, setQuery] = useState("");
 // const [filterData, setFilterData] = useState<any>([]);
 // const { push } = useRouter();

 const [tipoArancelSelected,setTipoArancelSelected] = useState(TipoArancel.Privado);
 const [ filterData , setFilterData ] = useState([]);

 const dataToUse =  aranceles;

 useEffect(() => {
    if (tipoArancelSelected) {
      const results:any = dataToUse?.filter((item:any) => {
            return item.type  == tipoArancelSelected;
      });

      setFilterData(results);
  }
}, [tipoArancelSelected]);


  if (isLoading) {
    return <GlobalSpinner />;
  }

  

  function onSelectTipoArancel(type:TipoArancel):void{
        if(type == tipoArancelSelected){
            return;
        }
        setTipoArancelSelected(type);
  }

  function onClick(){
      console.log("hola")
  }

  

  return (
    <div className="w-full h-full flex flex-grow flex flex-row items-start justify-center max-h-full overflow-auto">
      <div className="w-full flex-grow h-auto bg-white rounded-lg shadow-xl p-6 flex flex-col items-start justify-start">
        <div className="w-full flex flex-row items-center justify-start gap-2   pb-[60px]">
          <div className="w-full flex flex-row items-center max-w-full justify-between">
          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                    <li className="mr-2" onClick={()=> { onSelectTipoArancel(TipoArancel.Privado)}}>
                        <a href="#" className={"text-xl inline-block p-4 border-b-2 rounded-t-lg hover:text-blue-600 hover:border-gray-300 dark:hover:text-gray-300 " + (tipoArancelSelected == TipoArancel.Privado ? "border-blue-600 text-blue-600" : "border-transparent")}>Arancel Privado</a>
                    </li>
                    <li className="mr-2" onClick={()=> { onSelectTipoArancel(TipoArancel.Colectivo)}}>
                        <a href="#"className={"text-xl	 inline-block p-4  border-b-2 border-blue-600 hover:text-blue-600  rounded-t-lg  dark:text-blue-500 dark:border-blue-500 " + (tipoArancelSelected == TipoArancel.Colectivo ? "border-blue-600 text-blue-600" : "border-transparent")} aria-current="page">Arancel Colectivo</a>
                    </li>
                   
                </ul>
            </div>
            <div className="overflow-hidden flex flex-row items-center justify-start gap-1 border-[0.5px] border-[#A8A8A8] px-4 py-2 rounded-full h-[40px] w-[240px] ">
              <SearchIcon />
              <input
                
                className="bg-transparent text-[#A8A8A8] outline-none"
                placeholder="Search..."
              />
            </div>
          </div>
          <Filter className="cursor-pointer" /> 
        </div>

        <Table customClick={onClick} cols={cols} values={filterData} />
      </div>
    </div>
  );
};

export default Aranceles;
