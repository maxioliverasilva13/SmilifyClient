import OdontoGramaItem from "./components/OdontogramaItem";

interface Props {
  uid: string;
}

const OdontoGrama = ({ uid }: Props) => {

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center gap-y-3 p-4">
      <div className="w-full flex flex-row items-center justify-center gap-[80px]">
        <div className="flex flex-row flex-grow w-auto items-center justify-end gap-2">
          <OdontoGramaItem uid={uid} dienteId={18} isTop />
          <OdontoGramaItem uid={uid} dienteId={17} isTop />
          <OdontoGramaItem uid={uid} dienteId={16} isTop />
          <OdontoGramaItem uid={uid} dienteId={15} isTop />
          <OdontoGramaItem uid={uid} dienteId={14} isTop />
          <OdontoGramaItem uid={uid} dienteId={13} isTop type="four" />
          <OdontoGramaItem uid={uid} dienteId={12} isTop type="four" />
          <OdontoGramaItem uid={uid} dienteId={11} isTop type="four" />
        </div>
        <div className="flex flex-row flex-grow w-auto items-center justify-start gap-2">
          <OdontoGramaItem uid={uid} dienteId={21} isTop type="four" />
          <OdontoGramaItem uid={uid} dienteId={22} isTop type="four" />
          <OdontoGramaItem uid={uid} dienteId={23} isTop type="four" />
          <OdontoGramaItem uid={uid} dienteId={24} isTop />
          <OdontoGramaItem uid={uid} dienteId={25} isTop />
          <OdontoGramaItem uid={uid} dienteId={26} isTop />
          <OdontoGramaItem uid={uid} dienteId={27} isTop />
          <OdontoGramaItem uid={uid} dienteId={28} isTop />
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-center gap-[80px]">
        <div className="flex flex-row flex-grow w-auto items-center justify-end gap-2">
          <OdontoGramaItem uid={uid} dienteId={48} isTop={false} />
          <OdontoGramaItem uid={uid} dienteId={47} isTop={false} />
          <OdontoGramaItem uid={uid} dienteId={46} isTop={false} />
          <OdontoGramaItem uid={uid} dienteId={45} isTop={false} />
          <OdontoGramaItem uid={uid} dienteId={44} isTop={false} />
          <OdontoGramaItem uid={uid} dienteId={43} isTop={false} type="four" />
          <OdontoGramaItem uid={uid} dienteId={42} isTop={false} type="four" />
          <OdontoGramaItem uid={uid} dienteId={41} isTop={false} type="four" />
        </div>
        <div className="flex flex-row flex-grow w-auto items-center justify-start gap-2">
          <OdontoGramaItem uid={uid} dienteId={31} isTop={false} type="four" />
          <OdontoGramaItem uid={uid} dienteId={32} isTop={false} type="four" />
          <OdontoGramaItem uid={uid} dienteId={33} isTop={false} type="four" />
          <OdontoGramaItem uid={uid} dienteId={34} isTop={false} />
          <OdontoGramaItem uid={uid} dienteId={35} isTop={false} />
          <OdontoGramaItem uid={uid} dienteId={36} isTop={false} />
          <OdontoGramaItem uid={uid} dienteId={37} isTop={false} />
          <OdontoGramaItem uid={uid} dienteId={38} isTop={false} />
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-center gap-[80px]">
        <div className="flex flex-row flex-grow w-auto items-center justify-end gap-2">
          <OdontoGramaItem uid={uid} dienteId={55} isTop />
          <OdontoGramaItem uid={uid} dienteId={54} isTop />
          <OdontoGramaItem uid={uid} dienteId={53} isTop type="four" />
          <OdontoGramaItem uid={uid} dienteId={52} isTop type="four" />
          <OdontoGramaItem uid={uid} dienteId={51} isTop type="four" />
        </div>
        <div className="flex flex-row flex-grow w-auto items-center justify-start gap-2">
          <OdontoGramaItem uid={uid} dienteId={61} isTop type="four" />
          <OdontoGramaItem uid={uid} dienteId={62} isTop type="four" />
          <OdontoGramaItem uid={uid} dienteId={63} isTop type="four" />
          <OdontoGramaItem uid={uid} dienteId={64} isTop />
          <OdontoGramaItem uid={uid} dienteId={65} isTop />
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-center gap-[80px]">
        <div className="flex flex-row flex-grow w-auto items-center justify-end gap-2">
          <OdontoGramaItem uid={uid} dienteId={85} isTop={false} />
          <OdontoGramaItem uid={uid} dienteId={84} isTop={false} />
          <OdontoGramaItem uid={uid} dienteId={83} isTop={false} type="four" />
          <OdontoGramaItem uid={uid} dienteId={82} isTop={false} type="four" />
          <OdontoGramaItem uid={uid} dienteId={81} isTop={false} type="four" />
        </div>
        <div className="flex flex-row flex-grow w-auto items-center justify-start gap-2">
          <OdontoGramaItem uid={uid} dienteId={71} isTop={false} type="four" />
          <OdontoGramaItem uid={uid} dienteId={72} isTop={false} type="four" />
          <OdontoGramaItem uid={uid} dienteId={73} isTop={false} type="four" />
          <OdontoGramaItem uid={uid} dienteId={74} isTop={false} />
          <OdontoGramaItem uid={uid} dienteId={75} isTop={false} />
        </div>
      </div>

      {/* <OdontoGramaItem dienteId={3} isTop={false} type="four" /> */}
    </div>
  );
};

export default OdontoGrama;
