import Dots from "./dots";
import Numbers from "./numbers";
import Status from "./status";

const Dice = () => {
    return (
        <div className={`flex justify-center items-center flex-col gap-5 `}>
            <div className="flex gap-3 items-center">
                <Numbers />
            </div>

            <div className={`w-[100px] h-[100px] bg-white border-2 rounded-lg border-black grid grid-cols-3 grid-rows-3 gap-1.5 place-items-center p-3`}>
                <Dots />
            </div>

            <div className="">
                <Status />
            </div>
        </div>
    );
};

export default Dice;