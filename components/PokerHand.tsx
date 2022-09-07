import { Card, Rank } from "Card"

export enum Hand {
  HighCard,
  Pair,
  TwoPair,
  ThreeOfAKind,
  Straight,
  Flush,
  FullHouse,
  FourOfAKind,
  StraightFlush,
  RoyalFlush
}

export const getHands = (cards: Card[]): Hand[] => {
  let hands: Hand[] = [Hand.HighCard]

  let ranks = new Map<Rank, number>([])
  cards.forEach((card) => {
    if (ranks.has(card.props.rank)) {
      let count = ranks.get(card.props.rank) || 1
      ranks.set(card.props.rank, count + 1)
    } else {
      ranks.set(card.props.rank, 1)
    }
  })

  const rankCounts: number[] = Array.from(ranks.values())
  if (rankCounts.includes(4)) hands.push(Hand.FourOfAKind)
  if (rankCounts.includes(3) && rankCounts.includes(2)) hands.push(Hand.FullHouse)
  if (rankCounts.includes(3)) hands.push(Hand.ThreeOfAKind)

  const pairs: number[] = rankCounts.filter((c) => c == 2)
  if (pairs.length == 2) hands.push(Hand.TwoPair)
  if (pairs.length == 1) hands.push(Hand.Pair)

  return hands
}
