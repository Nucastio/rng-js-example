import useDiceStore from "../store/dice";

const Numbers = () => {
    const { rollDice, selected_number, setSelectedNumber, status } = useDiceStore();

    const handleClick = (n) => {
        setSelectedNumber(n);
        rollDice();
    }

    return (
        <>
            {
                Array(6).fill(0).map((_, i) => (
                    <button
                        key={i}
                        className={`w-12 aspect-square rounded grid place-items-center cursor-pointer font-mono font-medium text-xl ${selected_number === i + 1 ? status === "WON" ? "bg-green-500" : status === "LOSE" ? "bg-red-600" : "bg-white text-black" : "bg-gray/30 text-white"} disabled:opacity-50 disabled:cursor-not-allowed`}
                        onClick={() => handleClick(i + 1)}
                        disabled={status === "ROLLING"}
                    >
                        {i + 1}
                    </button>
                ))
            }
        </>
    );
};

export default Numbers;