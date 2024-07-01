import Dot from "./dot";

const Dots = () => {
    return (
        <>
            {Array.from({ length: 9 }, (_, i) => <Dot i={i} key={i} />)}
        </>
    );
};

export default Dots;