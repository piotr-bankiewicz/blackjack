import React, { useEffect, useState } from "react";
import { CardModel } from "../../Models/DrawCard.model";
import "./Card.css";

const Card = (props: CardModel) => {
  const [cardClassName, setCardClassName] = useState<string>("box-wrapper loading");

  useEffect(() => {
    setTimeout(function () {
      setCardClassName("card box-wrapper");
      if (props.flip) setCardClassName("card box-wrapper is-flipped");
      console.log(props?.code + " fired");
    }, 1000);
  });
  console.log(props?.code);
  return (
    <div className={cardClassName}>
      <img className="card__face card__face--front" src={props?.images?.png} alt={props.code} />
      <img className="card__face card__face--back" src={process.env.PUBLIC_URL + "/cardback.png"} alt={props.code} />
    </div>
  );
};

export default React.memo(Card);
