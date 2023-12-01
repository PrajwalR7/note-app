import { GiHappySkull } from "react-icons/gi";

export const SuccessComponent = () => {
    return (
        <div className="backdrop-blur-md absolute w-full h-full flex flex-col gap-4 justify-center items-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <GiHappySkull style={{width: '60px', height:'60px'}}/>
            <p className="text-xl">Success</p>
        </div>
    )
}