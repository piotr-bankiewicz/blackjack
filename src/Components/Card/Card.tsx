import React, { useEffect, useState } from "react";
import { CardModel } from "../../Models/DrawCard.model";
import "./Card.css";

const Card = (props: CardModel) => {
  const [cardClassName, setCardClassName] = useState<string>("box-wrapper loading");

  useEffect(() => {
    setTimeout(function () {
      setCardClassName("box-wrapper");
      console.log(props?.code + " fired");
    }, 1000);
  });
  console.log(props?.code);
  return (
    <div className={cardClassName}>
      <img src={props?.images?.png} alt={props.code} width="226" height="314"></img>
    </div>
  );
};

export default React.memo(Card);
