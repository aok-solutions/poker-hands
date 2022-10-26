import TwoClubs from "../assets/images/cards/Two.Clubs.png"
import ThreeClubs from "../assets/images/cards/Three.Clubs.png"
import FourClubs from "../assets/images/cards/Four.Clubs.png"
import FiveClubs from "../assets/images/cards/Five.Clubs.png"
import SixClubs from "../assets/images/cards/Six.Clubs.png"
import SevenClubs from "../assets/images/cards/Seven.Clubs.png"
import EightClubs from "../assets/images/cards/Eight.Clubs.png"
import NineClubs from "../assets/images/cards/Nine.Clubs.png"
import TenClubs from "../assets/images/cards/Ten.Clubs.png"
import JackClubs from "../assets/images/cards/Jack.Clubs.png"
import QueenClubs from "../assets/images/cards/Queen.Clubs.png"
import KingClubs from "../assets/images/cards/King.Clubs.png"
import AceClubs from "../assets/images/cards/Ace.Clubs.png"

import TwoDiamonds from "../assets/images/cards/Two.Diamonds.png"
import ThreeDiamonds from "../assets/images/cards/Three.Diamonds.png"
import FourDiamonds from "../assets/images/cards/Four.Diamonds.png"
import FiveDiamonds from "../assets/images/cards/Five.Diamonds.png"
import SixDiamonds from "../assets/images/cards/Six.Diamonds.png"
import SevenDiamonds from "../assets/images/cards/Seven.Diamonds.png"
import EightDiamonds from "../assets/images/cards/Eight.Diamonds.png"
import NineDiamonds from "../assets/images/cards/Nine.Diamonds.png"
import TenDiamonds from "../assets/images/cards/Ten.Diamonds.png"
import JackDiamonds from "../assets/images/cards/Jack.Diamonds.png"
import QueenDiamonds from "../assets/images/cards/Queen.Diamonds.png"
import KingDiamonds from "../assets/images/cards/King.Diamonds.png"
import AceDiamonds from "../assets/images/cards/Ace.Diamonds.png"

import TwoHearts from "../assets/images/cards/Two.Hearts.png"
import ThreeHearts from "../assets/images/cards/Three.Hearts.png"
import FourHearts from "../assets/images/cards/Four.Hearts.png"
import FiveHearts from "../assets/images/cards/Five.Hearts.png"
import SixHearts from "../assets/images/cards/Six.Hearts.png"
import SevenHearts from "../assets/images/cards/Seven.Hearts.png"
import EightHearts from "../assets/images/cards/Eight.Hearts.png"
import NineHearts from "../assets/images/cards/Nine.Hearts.png"
import TenHearts from "../assets/images/cards/Ten.Hearts.png"
import JackHearts from "../assets/images/cards/Jack.Hearts.png"
import QueenHearts from "../assets/images/cards/Queen.Hearts.png"
import KingHearts from "../assets/images/cards/King.Hearts.png"
import AceHearts from "../assets/images/cards/Ace.Hearts.png"

import TwoSpades from "../assets/images/cards/Two.Spades.png"
import ThreeSpades from "../assets/images/cards/Three.Spades.png"
import FourSpades from "../assets/images/cards/Four.Spades.png"
import FiveSpades from "../assets/images/cards/Five.Spades.png"
import SixSpades from "../assets/images/cards/Six.Spades.png"
import SevenSpades from "../assets/images/cards/Seven.Spades.png"
import EightSpades from "../assets/images/cards/Eight.Spades.png"
import NineSpades from "../assets/images/cards/Nine.Spades.png"
import TenSpades from "../assets/images/cards/Ten.Spades.png"
import JackSpades from "../assets/images/cards/Jack.Spades.png"
import QueenSpades from "../assets/images/cards/Queen.Spades.png"
import KingSpades from "../assets/images/cards/King.Spades.png"
import AceSpades from "../assets/images/cards/Ace.Spades.png"
import { Image, StyleSheet } from "react-native"

export enum Suit {
  Clubs,
  Diamonds,
  Hearts,
  Spades
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

export type Card = {
  rank: Rank
  suit: Suit
}

export const pokerCards = new Map([
  [
    Suit.Clubs,
    new Map([
      [Rank.Two, TwoClubs],
      [Rank.Three, ThreeClubs],
      [Rank.Four, FourClubs],
      [Rank.Five, FiveClubs],
      [Rank.Six, SixClubs],
      [Rank.Seven, SevenClubs],
      [Rank.Eight, EightClubs],
      [Rank.Nine, NineClubs],
      [Rank.Ten, TenClubs],
      [Rank.Jack, JackClubs],
      [Rank.Queen, QueenClubs],
      [Rank.King, KingClubs],
      [Rank.Ace, AceClubs]
    ])
  ],
  [
    Suit.Diamonds,
    new Map([
      [Rank.Two, TwoDiamonds],
      [Rank.Three, ThreeDiamonds],
      [Rank.Four, FourDiamonds],
      [Rank.Five, FiveDiamonds],
      [Rank.Six, SixDiamonds],
      [Rank.Seven, SevenDiamonds],
      [Rank.Eight, EightDiamonds],
      [Rank.Nine, NineDiamonds],
      [Rank.Ten, TenDiamonds],
      [Rank.Jack, JackDiamonds],
      [Rank.Queen, QueenDiamonds],
      [Rank.King, KingDiamonds],
      [Rank.Ace, AceDiamonds]
    ])
  ],
  [
    Suit.Hearts,
    new Map([
      [Rank.Two, TwoHearts],
      [Rank.Three, ThreeHearts],
      [Rank.Four, FourHearts],
      [Rank.Five, FiveHearts],
      [Rank.Six, SixHearts],
      [Rank.Seven, SevenHearts],
      [Rank.Eight, EightHearts],
      [Rank.Nine, NineHearts],
      [Rank.Ten, TenHearts],
      [Rank.Jack, JackHearts],
      [Rank.Queen, QueenHearts],
      [Rank.King, KingHearts],
      [Rank.Ace, AceHearts]
    ])
  ],
  [
    Suit.Spades,
    new Map([
      [Rank.Two, TwoSpades],
      [Rank.Three, ThreeSpades],
      [Rank.Four, FourSpades],
      [Rank.Five, FiveSpades],
      [Rank.Six, SixSpades],
      [Rank.Seven, SevenSpades],
      [Rank.Eight, EightSpades],
      [Rank.Nine, NineSpades],
      [Rank.Ten, TenSpades],
      [Rank.Jack, JackSpades],
      [Rank.Queen, QueenSpades],
      [Rank.King, KingSpades],
      [Rank.Ace, AceSpades]
    ])
  ]
])

type Props = {
  rank: Rank
  suit: Suit
  isHighlighted?: boolean
}

export const PlayingCard = ({ rank, suit, isHighlighted = false }: Props) => {
  const highlightedStyle = {
    borderColor: "dodgerblue",
    borderWidth: 5,
    borderRadius: 5
  }
  const cardStyle = isHighlighted ? { ...styles.card, ...highlightedStyle } : styles.card

  return <Image source={pokerCards.get(suit)?.get(rank)} style={cardStyle} />
}

export const displayCard = (card: Card) => (
  <PlayingCard key={`${Rank[card.rank]}${Suit[card.suit]}`} rank={card.rank} suit={card.suit} />
)

export const displayCardResult = (card: Card, hand: Card[]) => {
  const cardInHand = hand.some((c: Card) => c.rank === card.rank && c.suit === card.suit)
  return (
    <PlayingCard
      key={`${Rank[card.rank]}${Suit[card.suit]}`}
      rank={card.rank}
      suit={card.suit}
      isHighlighted={cardInHand}
    />
  )
}

const styles = StyleSheet.create({
  card: {
    height: 90,
    width: 62,
    marginHorizontal: 5
  }
})
