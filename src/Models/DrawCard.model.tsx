export interface Images {
  svg?: string;
  png?: string;
}

export interface CardModel {
  id?: string;
  code?: string;
  image?: string;
  images?: Images;
  value?: string;
  suit?: string;
  flip?: boolean;
}

export interface DrawCard {
  success?: boolean;
  deck_id?: string;
  cards?: CardModel[];
  remaining?: number;
}
