import { useEffect, useState } from "react";
import { CardModel, DrawCard } from "../../Models/DrawCard.model";
import { ShuffleCardsModel } from "../../Models/ShuffleCards.model";
import useFetch from "../../useFetch";
import Card from "../Card/Card";

const getDeckURL = (deckCount: number) => `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckCount}`;
const drawCardURL = (deckId: string, cardCount: number) => `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=${cardCount}`;

const flipedCard: CardModel = { images: { png: process.env.PUBLIC_URL + "/cardback.png" } };

const Game = () => {
  const [data, loading, error, performRequest] = useFetch<ShuffleCardsModel>();
  const [deckId, setDeckId] = useState<string | undefined>(undefined);
  const [decksNumber, setDecksNumber] = useState<number>(6);
  const [drawnCards, loadingDrawCards, errorDrawnCards, performDrawCard] = useFetch<DrawCard>();
  const [drawnDealerCards, loadingDrawDealerCards, errorDrawnDealerCards, performDrawDealerCard] = useFetch<DrawCard>();
  const [playerHand, setPlayerHand] = useState<CardModel[]>([]);
  const [dealerHand, setDealerHand] = useState<CardModel[]>([]);

  useEffect(() => {
    setDeckId(data?.deck_id);
  }, [data]);

  useEffect(() => {
    setPlayerHand((playerHand) => [...playerHand, ...(drawnCards?.cards ?? [])]);
  }, [drawnCards]);

  useEffect(() => {
    setDealerHand((dealerHand) => [...(drawnDealerCards?.cards ?? []), flipedCard]);
  }, [drawnDealerCards]);
  const reShuffle = () => {
    performRequest(getDeckURL(decksNumber));
  };

  const drawCards = (count: number) => {
    if (deckId) {
      performDrawCard(drawCardURL(deckId, count));
      performDrawDealerCard(drawCardURL(deckId, 1));
    }
  };

  if (loading) return <div>Loading ...</div>;
  else
    return (
      <>
        <img src={process.env.PUBLIC_URL + "/cardback_prev_ui.png"} alt="cardback" width="226" height="314"></img>
        <div>{deckId}</div>
        <button onClick={reShuffle}>resuffle</button>
        <button
          onClick={() => {
            drawCards(2);
          }}
        >
          draw 2 cards
        </button>

        <div style={{ display: "flex" }}>
          {playerHand?.map((item, index) => (
            <Card {...item} key={index} />
          ))}
        </div>
        <div style={{ display: "flex" }}>
          {dealerHand?.map((item, index) => (
            <Card {...item} key={index} />
          ))}
        </div>
      </>
    );
};

export default Game;
