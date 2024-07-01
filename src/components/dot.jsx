import { DICE } from "../constants";
import useDiceStore from "../store/dice";

const Dot = ({ i }) => {
    const { displayed_number } = useDiceStore();

    return (
        <div
            className={`${`w-[20px] h-[20px] bg-black rounded-full transition-all duration-[0s] ${DICE[displayed_number]?.includes(i) ? `opacity-100` : `opacity-0`}`}`}
        />
    );
};

export default Dot;