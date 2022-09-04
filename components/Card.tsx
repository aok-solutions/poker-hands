import {Text} from "react-native";

type CardProps = {
  rank: Rank;
  suit: Suit;
};

export enum Suit {
  Spades,
  Clubs,
  Diamonds,
  Hearts
}

export enum Rank {
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
  Ace
}

const deck = new Map([
  [Suit.Spades, new Map(
    [
      [Rank.Two, "🂢"],
      [Rank.Three, "🂣"],
      [Rank.Four, "🂤"],
      [Rank.Five, "🂥"],
      [Rank.Six, "🂦"],
      [Rank.Seven, "🂧"],
      [Rank.Eight, "🂨"],
      [Rank.Nine, "🂩"],
      [Rank.Ten, "🂪"],
      [Rank.Jack, "🂫"],
      [Rank.Queen, "🂭"],
      [Rank.King, "🂮"],
      [Rank.Ace, "🂡"]
    ])
  ],
  [Suit.Clubs, new Map(
    [
      [Rank.Two, "🃒"],
      [Rank.Three, "🃓"],
      [Rank.Four, "🃔"],
      [Rank.Five, "🃕"],
      [Rank.Six, "🃖"],
      [Rank.Seven, "🃗"],
      [Rank.Eight, "🃘"],
      [Rank.Nine, "🃙"],
      [Rank.Ten, "🃚"],
      [Rank.Jack, "🃛"],
      [Rank.Queen, "🃝"],
      [Rank.King, "🃞"],
      [Rank.Ace, "🃑"]
    ])
  ],
  [Suit.Diamonds, new Map(
    [
      [Rank.Two, "🃂"],
      [Rank.Three, "🃃"],
      [Rank.Four, "🃄"],
      [Rank.Five, "🃅"],
      [Rank.Six, "🃆"],
      [Rank.Seven, "🃇"],
      [Rank.Eight, "🃈"],
      [Rank.Nine, "🃉"],
      [Rank.Ten, "🃊"],
      [Rank.Jack, "🃋"],
      [Rank.Queen, "🃍"],
      [Rank.King, "🃎"],
      [Rank.Ace, "🃁"]
    ])
  ],
  [Suit.Hearts, new Map(
    [
      [Rank.Two, "🂲"],
      [Rank.Three, "🂳"],
      [Rank.Four, "🂴"],
      [Rank.Five, "🂵"],
      [Rank.Six, "🂶"],
      [Rank.Seven, "🂷"],
      [Rank.Eight, "🂸"],
      [Rank.Nine, "🂹"],
      [Rank.Ten, "🂺"],
      [Rank.Jack, "🂻"],
      [Rank.Queen, "🂽"],
      [Rank.King, "🂾"],
      [Rank.Ace, "🂱"]
    ])
  ]
])

const cardColor = (suitInQuestion: Suit) => (suitInQuestion == Suit.Spades || suitInQuestion == Suit.Clubs) ? "black" : "red"

export function Card(props: CardProps) {
  return (
    <Text style={{ color: cardColor(props.suit), fontSize: 120 }}>
      {deck.get(props.suit).get(props.rank)}
    </Text>
  );
}
