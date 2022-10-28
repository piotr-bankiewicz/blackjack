import { MutableRefObject, useEffect, useRef, useState } from "react";

const StartGamePage = (props: { onGameStart: (startMoney: string) => void }) => {
  const [startMoney, setStartMoney] = useState<string>("");

  return (
    <div className="h-screen w-screen z-10 bg-gray-500/50 flex flex-col justify-center items-center">
      <div className="text-9xl absolute top-36">Black Jack</div>
      <label className="text-lg p-1 font-bold text-slate-600">With how much money do you wish to start the game</label>
      <input
        onWheel={(e) => e.currentTarget.blur()}
        onChange={(e) => setStartMoney(e.target.value)}
        type={"number"}
        placeholder={"Max 20 000"}
        className="bg-gray-300 focus:bg-gray-100 focus:border-gray-500 p-2 rounded-md  [appearance:textfield] mb-2"
      ></input>
      <button
        onClick={() => {
          props.onGameStart(startMoney);
        }}
        className="bg-slate-300 h-10 p-2 rounded-md font-bold hover:bg-slate-400"
      >
        Start Game
      </button>
    </div>
  );
};

export default StartGamePage;
