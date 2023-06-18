import { useGetDientesInfoQuery } from "src/store/services/PacienteService";
import OdontoGramaItem from "./components/OdontogramaItem";
import { getDientesInfoCount } from "src/utils/paciente";

interface Props {
  uid: string;
}

const OdontoGrama = ({ uid }: Props) => {
  const { data: dientesInfo, refetch } = useGetDientesInfoQuery(uid, {
    skip: !uid
  })

  const onSuccessAdded = () => {
    refetch();
  }

  
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center gap-y-3 p-4">
      <div className="w-full flex flex-row items-center justify-center gap-[80px]">
        <div className="flex flex-row flex-grow w-auto items-center justify-end gap-2">
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,18)} uid={uid} dienteId={18} isTop />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,17)} uid={uid} dienteId={17} isTop />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,16)} uid={uid} dienteId={16} isTop />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,15)} uid={uid} dienteId={15} isTop />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,14)} uid={uid} dienteId={14} isTop />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,13)} uid={uid} dienteId={13} isTop type="four" />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,12)} uid={uid} dienteId={12} isTop type="four" />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,11)} uid={uid} dienteId={11} isTop type="four" />
        </div>
        <div className="flex flex-row flex-grow w-auto items-center justify-start gap-2">
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,21)} uid={uid} dienteId={21} isTop type="four" />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,22)} uid={uid} dienteId={22} isTop type="four" />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,23)} uid={uid} dienteId={23} isTop type="four" />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,24)} uid={uid} dienteId={24} isTop />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,25)} uid={uid} dienteId={25} isTop />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,26)} uid={uid} dienteId={26} isTop />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,27)} uid={uid} dienteId={27} isTop />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,28)} uid={uid} dienteId={28} isTop />
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-center gap-[80px]">
        <div className="flex flex-row flex-grow w-auto items-center justify-end gap-2">
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,48)} uid={uid} dienteId={48} isTop={false} />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,47)} uid={uid} dienteId={47} isTop={false} />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,46)} uid={uid} dienteId={46} isTop={false} />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,45)} uid={uid} dienteId={45} isTop={false} />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,44)} uid={uid} dienteId={44} isTop={false} />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,43)} uid={uid} dienteId={43} isTop={false} type="four" />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,42)} uid={uid} dienteId={42} isTop={false} type="four" />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,41)} uid={uid} dienteId={41} isTop={false} type="four" />
        </div>
        <div className="flex flex-row flex-grow w-auto items-center justify-start gap-2">
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,31)} uid={uid} dienteId={31} isTop={false} type="four" />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,32)} uid={uid} dienteId={32} isTop={false} type="four" />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,33)} uid={uid} dienteId={33} isTop={false} type="four" />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,34)} uid={uid} dienteId={34} isTop={false} />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,35)} uid={uid} dienteId={35} isTop={false} />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,36)} uid={uid} dienteId={36} isTop={false} />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,37)} uid={uid} dienteId={37} isTop={false} />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,38)} uid={uid} dienteId={38} isTop={false} />
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-center gap-[80px]">
        <div className="flex flex-row flex-grow w-auto items-center justify-end gap-2">
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,55)} uid={uid} dienteId={55} isTop />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,54)} uid={uid} dienteId={54} isTop />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,53)} uid={uid} dienteId={53} isTop type="four" />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,52)} uid={uid} dienteId={52} isTop type="four" />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,51)} uid={uid} dienteId={51} isTop type="four" />
        </div>
        <div className="flex flex-row flex-grow w-auto items-center justify-start gap-2">
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,61)} uid={uid} dienteId={61} isTop type="four" />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,62)} uid={uid} dienteId={62} isTop type="four" />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,63)} uid={uid} dienteId={63} isTop type="four" />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,64)} uid={uid} dienteId={64} isTop />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,65)} uid={uid} dienteId={65} isTop />
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-center gap-[80px]">
        <div className="flex flex-row flex-grow w-auto items-center justify-end gap-2">
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,85)} uid={uid} dienteId={85} isTop={false} />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,84)} uid={uid} dienteId={84} isTop={false} />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,83)} uid={uid} dienteId={83} isTop={false} type="four" />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,82)} uid={uid} dienteId={82} isTop={false} type="four" />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,81)} uid={uid} dienteId={81} isTop={false} type="four" />
        </div>
        <div className="flex flex-row flex-grow w-auto items-center justify-start gap-2">
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,71)} uid={uid} dienteId={71} isTop={false} type="four" />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,72)} uid={uid} dienteId={72} isTop={false} type="four" />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,73)} uid={uid} dienteId={73} isTop={false} type="four" />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,74)} uid={uid} dienteId={74} isTop={false} />
          <OdontoGramaItem onSuccessAdded={() => onSuccessAdded()} countData={getDientesInfoCount(dientesInfo,75)} uid={uid} dienteId={75} isTop={false} />
        </div>
      </div>

      {/* <OdontoGramaItem dienteId={3} isTop={false} type="four" /> */}
    </div>
  );
};

export default OdontoGrama;
