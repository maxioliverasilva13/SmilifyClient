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
 const [search, setSearch] = useState('');

 const dataToUse =  aranceles;



 useEffect(() => {
    if (tipoArancelSelected) {
      const results:any = dataToUse?.filter((item:any) => {
            if(search.trim().length > 0){
              const arancelNameLower = item.nombre.toLowerCase();
              const searchLower = search.toLowerCase();
              return item.type  == tipoArancelSelected && arancelNameLower.includes(searchLower);

            }else{
              return item.type  == tipoArancelSelected;

            }
      });

      setFilterData(results);
  }
}, [tipoArancelSelected,aranceles,search]);


  if (isLoading) {
    return <GlobalSpinner />;
  }

  

  function onSelectTipoArancel(type:TipoArancel):void{
        if(type == tipoArancelSelected){
            return;
        }
        setSearch('');
        setTipoArancelSelected(type);
  }


  const  handleChangeSearch = ($event:any)=>{
    const value = $event.target.value;
    setSearch(value);

  }

  

  

  return (
    <div className="w-full h-full flex flex-grow flex flex-row items-start justify-center max-h-full overflow-auto">
      <div className="w-full flex-grow h-auto bg-white rounded-lg shadow-xl p-6 flex flex-col items-start justify-start">
        <div className="w-full flex flex-row items-center justify-start gap-2   pb-[60px]">
          <div className="w-full flex flex-row items-center max-w-full justify-between">
          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                    <li className="mr-2" onClick={()=> { onSelectTipoArancel(TipoArancel.Privado)}}>
                        <a href="#" className={"text-xl inline-block p-4 border-b-2 rounded-t-lg hover:text-blue-[#84dccc] hover:border-gray-300 dark:hover:text-gray-300 " + (tipoArancelSelected == TipoArancel.Privado ? "border-[#84dccc] text-[#84dccc]" : "border-transparent")}>Arancel Privado</a>
                    </li>
                    <li className="mr-2" onClick={()=> { onSelectTipoArancel(TipoArancel.Colectivo)}}>
                        <a href="#"className={"text-xl	 inline-block p-4  border-b-2 border-[#84dccc] hover:text-blue-[#84dccc]  rounded-t-lg  dark:text-blue-500 dark:border-blue-500 " + (tipoArancelSelected == TipoArancel.Colectivo ? "border-[#84dccc] text-[#84dccc]" : "border-transparent")} aria-current="page">Arancel Colectivo</a>
                    </li>

                    <li className="mr-2" onClick={()=> { onSelectTipoArancel(TipoArancel.Laboratorio)}}>
                        <a href="#"className={"text-xl	 inline-block p-4  border-b-2 border-[#84dccc] hover:text-blue-[#84dccc]  rounded-t-lg  dark:text-blue-500 dark:border-blue-500 " + (tipoArancelSelected == TipoArancel.Laboratorio ? "border-[#84dccc] text-[#84dccc]" : "border-transparent")} aria-current="page">Arancel de Laboratorio</a>
                    </li>
                   

                   
                </ul>
            </div>
            <div className="overflow-hidden flex flex-row items-center justify-start gap-1 border-[0.5px] border-[#A8A8A8] px-4 py-2 rounded-full h-[40px] w-[240px] ">
              <SearchIcon />
              <input
                value={search}
                className="bg-transparent text-[#A8A8A8] outline-none"
                placeholder="Search..."
                onChange={ ($event:any) => handleChangeSearch($event) }
              />
            </div>
          </div>
        </div>

        <Table  cols={cols} values={filterData} />
      </div>
    </div>
  );
};

export default Aranceles;
