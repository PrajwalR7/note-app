import { ImSpinner9 } from "react-icons/im";

export const LoadingComponent = () => {
    return (
        <div className="backdrop-blur-md absolute w-full h-full flex justify-center items-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <span className="animate-spin"><ImSpinner9 style={{width: '60px', height:'60px'}}/></span>
        </div>
    )
}