export interface IPropsCard {
  card: number;
  id: number;
  matched: boolean;
}

export interface IPropsSingleCard {
  card: IPropsCard;
  handleChoise: (card: IPropsCard) => void;
  flipped: boolean;
  disabled: boolean;
  active: boolean;
}
