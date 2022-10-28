import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { CardModel } from "../../Models/DrawCard.model";

export interface PlayerProps {
  onDrawCards: (count: number) => CardModel[];
  onPlaceBet: (amount: number) => { placed: boolean; errorMessage: string };
  onSplit: () => void;
  onInsurance: () => void;
  dealerHand: CardModel[];
}

const Player = (props: PlayerProps) => {
  const [hand, setHand] = useState<CardModel[]>([]);
  const [bet, setBet] = useState<number>(0);
  const [insurance, setInsurance] = useState<boolean>(false);
  const inputElement = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const insuranceButtonVisible = bet !== 0 && props.dealerHand.find((x) => x.flip === false && x.value === "ACE");
  const splitButtonVisible = bet !== 0 && hand.length === 2 && hand[0].value === hand[1].value;

  const betHandler = () => {
    const result: { placed: boolean; errorMessage: string } = props.onPlaceBet(parseInt(inputElement.current.value));
    if (result.placed) setBet(parseInt(inputElement.current.value));
  };

  useEffect(() => {
    setHand(props.onDrawCards(2));
  }, []);
  return (
    <>
      <input ref={inputElement} type={"number"} defaultValue={50} />
      <button onClick={betHandler}>bet</button>
      <button style={{ display: insuranceButtonVisible ? "block" : "none" }}>insurance</button>
      <button style={{ display: splitButtonVisible ? "block" : "none" }}>split</button>
    </>
  );
};

export default Player;
