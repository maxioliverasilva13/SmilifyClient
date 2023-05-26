import LottieReact from "lottie-react"
import lottieLoading from "../../lottie/lottieLoading.json";

const Loader = () => {
    return <div className="w-full flex flex-row py-4 items-center justify-center">
        <div className="relative w-[250px] h-auto flex flex-col items-center gap-2 ">
       <LottieReact animationData={lottieLoading} loop={true} />
       <span className="text-[#84DCCC]">Loading...</span>
    </div>
    </div>
}

export default Loader;