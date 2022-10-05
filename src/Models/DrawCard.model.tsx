export interface Images {
  svg?: string;
  png?: string;
}

export interface CardModel {
  code?: string;
  image?: string;
  images?: Images;
  value?: string;
  suit?: string;
}

export interface DrawCard {
  success?: boolean;
  deck_id?: string;
  cards?: CardModel[];
  remaining?: number;
}
