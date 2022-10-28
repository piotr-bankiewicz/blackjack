import { useEffect, useState } from "react";
import { CardModel } from "../../Models/DrawCard.model";
import Card from "../Card/Card";

const Hand = (props: { Cards: CardModel[] }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      {props.Cards?.map((item, index) => (
        <Card {...item} key={item?.id} />
      ))}
    </div>
  );
};

export default Hand;
