import { useEffect, useState } from "react";
import { CardModel, DrawCard } from "../../Models/DrawCard.model";
import { ShuffleCardsModel } from "../../Models/ShuffleCards.model";
import useFetch from "../../useFetch";
import Card from "../Card/Card";
import { v4 } from "uuid";
import { time } from "console";
import Player from "../Player/Player";
import StartGamePage from "../StartGamePage/StartGamePage";

export enum GameState {
  INACTIVE,
  STARTED,
}

const getDeckURL = (deckCount: number) => `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckCount}`;
const drawCardURL = (deckId: string, cardCount: number) => `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=${cardCount}`;

const Game = () => {
  const [data, loading, error, performRequest] = useFetch<ShuffleCardsModel>();
  const [deckId, setDeckId] = useState<string | undefined>(undefined);
  const [decksNumber, setDecksNumber] = useState<number>(6);
  const [drawnCards, loadingDrawCards, errorDrawnCards, performDrawCard] = useFetch<DrawCard>();
  const [drawnDealerCards, loadingDrawDealerCards, errorDrawnDealerCards, performDrawDealerCard] = useFetch<DrawCard>();
  const [playerHands, setPlayerHands] = useState<[CardModel[]]>([[]]);
  const [dealerHand, setDealerHand] = useState<CardModel[]>([]);
  const [gameState, setGameState] = useState<GameState>(GameState.INACTIVE);

  useEffect(() => {
    setDeckId(data?.deck_id);
  }, [data]);

  // useEffect(() => {
  //   setPlayerHands((playerHands: [CardModel[]]) => [
  //     ...playerHands,
  //     ...(drawnCards?.cards?.map((item) => {
  //       item.id = v4();
  //       return item;
  //     }) ?? []),
  //   ]);
  // }, [drawnCards]);

  const flipCards = () => {
    setDealerHand(
      dealerHand.map((item) => {
        item.flip = false;
        return item;
      })
    );
  };

  useEffect(() => {
    let modifiedCards: CardModel[];
    if (drawnDealerCards && drawnDealerCards.cards && drawnDealerCards?.cards.length !== 0)
      modifiedCards = drawnDealerCards?.cards.map((item, index) => {
        if (index === 1) {
          item.flip = true;
        }
        return item;
      });
    else modifiedCards = drawnDealerCards?.cards ?? [];
    setDealerHand((dealerHand) => [
      ...dealerHand,
      ...(modifiedCards?.map((item) => {
        item.id = v4();
        return item;
      }) ?? []),
    ]);
  }, [drawnDealerCards]);

  const reShuffle = () => {
    performRequest(getDeckURL(decksNumber));
  };

  const drawCards = (count: number) => {
    if (deckId) {
      performDrawCard(drawCardURL(deckId, count));
      performDrawDealerCard(drawCardURL(deckId, 2));
    }
  };

  const onInsurance = () => {};

  const onSplit = () => {};

  const onBet = (amount: number): { placed: boolean; errorMessage: string } => {
    return { placed: true, errorMessage: "" };
  };

  const onDrawCards = (count: number): CardModel[] => {
    return [{ value: "ACE" }, { value: "base" }];
  };

  if (gameState === GameState.INACTIVE) return <StartGamePage onGameStart={() => {}} />;
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
        <button onClick={flipCards}>flip</button>

        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Player onDrawCards={onDrawCards} onInsurance={onInsurance} onPlaceBet={onBet} onSplit={onSplit} dealerHand={[{ value: "ACE", flip: false }]} />
        </div>
      </>
    );
};

export default Game;
