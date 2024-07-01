import { useEffect } from "react";

import useDiceStore from "../store/dice";

const Status = () => {
  const { selected_number, final_number, status, setStatus, rollingTx } = useDiceStore();

  useEffect(() => {
    if (
      status === "DEFAULT" ||
      final_number === null ||
      selected_number === null
    )
      return;
    if (selected_number === final_number) setStatus("WON");
    else setStatus("LOSE");
  }, [final_number]);

  return (
    <div
      className={`text-lg font-arti-reg tracking-wider ${status === "DEFAULT" || status === "ROLLING"
        ? "text-yellow-400"
        : status === "WON"
          ? "text-green-500"
          : "text-red-600"
        } flex flex-col gap-y-6`}
    >
      {status === "DEFAULT"
        ? "Click on number"
        : status === "ROLLING"
          ? "ROLLING..."
          : `YOU ${status}`}

      {rollingTx ? <a className="underline" href={`https://preprod.cardanoscan.io/transaction/${rollingTx}`} target="_blank">{rollingTx?.slice(0, 10)}...</a> : <></>}
    </div>
  );
};

export default Status;
