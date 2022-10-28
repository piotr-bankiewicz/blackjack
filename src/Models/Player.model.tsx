import { CardModel } from "./DrawCard.model";

export interface Player {
  cards: CardModel[];
  cash: number;
}
