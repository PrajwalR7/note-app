import { FaSkull } from "react-icons/fa6";

export const ErrorComponent = () => {
    return (
        <div className="backdrop-blur-md absolute w-full h-full flex flex-col gap-4 justify-center items-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <FaSkull style={{width: '60px', height:'60px'}}/>
            <p className="text-xl">Something went wrong, please try again later</p>
        </div>
    )
}