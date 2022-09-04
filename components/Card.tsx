import TwoClubs from "../assets/images/cards/Two.Clubs.svg"
import ThreeClubs from "../assets/images/cards/Three.Clubs.svg"
import FourClubs from "../assets/images/cards/Four.Clubs.svg"
import FiveClubs from "../assets/images/cards/Five.Clubs.svg"
import SixClubs from "../assets/images/cards/Six.Clubs.svg"
import SevenClubs from "../assets/images/cards/Seven.Clubs.svg"
import EightClubs from "../assets/images/cards/Eight.Clubs.svg"
import NineClubs from "../assets/images/cards/Nine.Clubs.svg"
import TenClubs from "../assets/images/cards/Ten.Clubs.svg"
import JackClubs from "../assets/images/cards/Jack.Clubs.svg"
import QueenClubs from "../assets/images/cards/Queen.Clubs.svg"
import KingClubs from "../assets/images/cards/King.Clubs.svg"
import AceClubs from "../assets/images/cards/Ace.Clubs.svg"

import TwoDiamonds from "../assets/images/cards/Two.Diamonds.svg"
import ThreeDiamonds from "../assets/images/cards/Three.Diamonds.svg"
import FourDiamonds from "../assets/images/cards/Four.Diamonds.svg"
import FiveDiamonds from "../assets/images/cards/Five.Diamonds.svg"
import SixDiamonds from "../assets/images/cards/Six.Diamonds.svg"
import SevenDiamonds from "../assets/images/cards/Seven.Diamonds.svg"
import EightDiamonds from "../assets/images/cards/Eight.Diamonds.svg"
import NineDiamonds from "../assets/images/cards/Nine.Diamonds.svg"
import TenDiamonds from "../assets/images/cards/Ten.Diamonds.svg"
import JackDiamonds from "../assets/images/cards/Jack.Diamonds.svg"
import QueenDiamonds from "../assets/images/cards/Queen.Diamonds.svg"
import KingDiamonds from "../assets/images/cards/King.Diamonds.svg"
import AceDiamonds from "../assets/images/cards/Ace.Diamonds.svg"

import TwoHearts from "../assets/images/cards/Two.Hearts.svg"
import ThreeHearts from "../assets/images/cards/Three.Hearts.svg"
import FourHearts from "../assets/images/cards/Four.Hearts.svg"
import FiveHearts from "../assets/images/cards/Five.Hearts.svg"
import SixHearts from "../assets/images/cards/Six.Hearts.svg"
import SevenHearts from "../assets/images/cards/Seven.Hearts.svg"
import EightHearts from "../assets/images/cards/Eight.Hearts.svg"
import NineHearts from "../assets/images/cards/Nine.Hearts.svg"
import TenHearts from "../assets/images/cards/Ten.Hearts.svg"
import JackHearts from "../assets/images/cards/Jack.Hearts.svg"
import QueenHearts from "../assets/images/cards/Queen.Hearts.svg"
import KingHearts from "../assets/images/cards/King.Hearts.svg"
import AceHearts from "../assets/images/cards/Ace.Hearts.svg"

import TwoSpades from "../assets/images/cards/Two.Spades.svg"
import ThreeSpades from "../assets/images/cards/Three.Spades.svg"
import FourSpades from "../assets/images/cards/Four.Spades.svg"
import FiveSpades from "../assets/images/cards/Five.Spades.svg"
import SixSpades from "../assets/images/cards/Six.Spades.svg"
import SevenSpades from "../assets/images/cards/Seven.Spades.svg"
import EightSpades from "../assets/images/cards/Eight.Spades.svg"
import NineSpades from "../assets/images/cards/Nine.Spades.svg"
import TenSpades from "../assets/images/cards/Ten.Spades.svg"
import JackSpades from "../assets/images/cards/Jack.Spades.svg"
import QueenSpades from "../assets/images/cards/Queen.Spades.svg"
import KingSpades from "../assets/images/cards/King.Spades.svg"
import AceSpades from "../assets/images/cards/Ace.Spades.svg"
import {View} from "./Themed";

const SIZE = "20%"

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
  [Suit.Clubs, new Map(
    [
      [Rank.Two, <TwoClubs width={SIZE} height={SIZE} />],
      [Rank.Three, <ThreeClubs width={SIZE} height={SIZE} />],
      [Rank.Four, <FourClubs width={SIZE} height={SIZE} />],
      [Rank.Five, <FiveClubs width={SIZE} height={SIZE} />],
      [Rank.Six, <SixClubs width={SIZE} height={SIZE} />],
      [Rank.Seven, <SevenClubs width={SIZE} height={SIZE} />],
      [Rank.Eight, <EightClubs width={SIZE} height={SIZE} />],
      [Rank.Nine, <NineClubs width={SIZE} height={SIZE} />],
      [Rank.Ten, <TenClubs width={SIZE} height={SIZE} />],
      [Rank.Jack, <JackClubs width={SIZE} height={SIZE} />],
      [Rank.Queen, <QueenClubs width={SIZE} height={SIZE} />],
      [Rank.King, <KingClubs width={SIZE} height={SIZE} />],
      [Rank.Ace, <AceClubs width={SIZE} height={SIZE} />]
    ])
  ],
  [Suit.Diamonds, new Map(
    [
      [Rank.Two, <TwoDiamonds width={SIZE} height={SIZE} />],
      [Rank.Three, <ThreeDiamonds width={SIZE} height={SIZE} />],
      [Rank.Four, <FourDiamonds width={SIZE} height={SIZE} />],
      [Rank.Five, <FiveDiamonds width={SIZE} height={SIZE} />],
      [Rank.Six, <SixDiamonds width={SIZE} height={SIZE} />],
      [Rank.Seven, <SevenDiamonds width={SIZE} height={SIZE} />],
      [Rank.Eight, <EightDiamonds width={SIZE} height={SIZE} />],
      [Rank.Nine, <NineDiamonds width={SIZE} height={SIZE} />],
      [Rank.Ten, <TenDiamonds width={SIZE} height={SIZE} />],
      [Rank.Jack, <JackDiamonds width={SIZE} height={SIZE} />],
      [Rank.Queen, <QueenDiamonds width={SIZE} height={SIZE} />],
      [Rank.King, <KingDiamonds width={SIZE} height={SIZE} />],
      [Rank.Ace, <AceDiamonds width={SIZE} height={SIZE} />]
    ])
  ],
  [Suit.Hearts, new Map(
    [
      [Rank.Two, <TwoHearts width={SIZE} height={SIZE} />],
      [Rank.Three, <ThreeHearts width={SIZE} height={SIZE} />],
      [Rank.Four, <FourHearts width={SIZE} height={SIZE} />],
      [Rank.Five, <FiveHearts width={SIZE} height={SIZE} />],
      [Rank.Six, <SixHearts width={SIZE} height={SIZE} />],
      [Rank.Seven, <SevenHearts width={SIZE} height={SIZE} />],
      [Rank.Eight, <EightHearts width={SIZE} height={SIZE} />],
      [Rank.Nine, <NineHearts width={SIZE} height={SIZE} />],
      [Rank.Ten, <TenHearts width={SIZE} height={SIZE} />],
      [Rank.Jack, <JackHearts width={SIZE} height={SIZE} />],
      [Rank.Queen, <QueenHearts width={SIZE} height={SIZE} />],
      [Rank.King, <KingHearts width={SIZE} height={SIZE} />],
      [Rank.Ace, <AceHearts width={SIZE} height={SIZE} />]
    ])
  ],
  [Suit.Spades, new Map(
    [
      [Rank.Two, <TwoSpades width={SIZE} height={SIZE} />],
      [Rank.Three, <ThreeSpades width={SIZE} height={SIZE} />],
      [Rank.Four, <FourSpades width={SIZE} height={SIZE} />],
      [Rank.Five, <FiveSpades width={SIZE} height={SIZE} />],
      [Rank.Six, <SixSpades width={SIZE} height={SIZE} />],
      [Rank.Seven, <SevenSpades width={SIZE} height={SIZE} />],
      [Rank.Eight, <EightSpades width={SIZE} height={SIZE} />],
      [Rank.Nine, <NineSpades width={SIZE} height={SIZE} />],
      [Rank.Ten, <TenSpades width={SIZE} height={SIZE} />],
      [Rank.Jack, <JackSpades width={SIZE} height={SIZE} />],
      [Rank.Queen, <QueenSpades width={SIZE} height={SIZE} />],
      [Rank.King, <KingSpades width={SIZE} height={SIZE} />],
      [Rank.Ace, <AceSpades width={SIZE} height={SIZE} />]
    ])
  ]
])

export const Card = (props: CardProps) => {
  return deck.get(props.suit).get(props.rank)
}
