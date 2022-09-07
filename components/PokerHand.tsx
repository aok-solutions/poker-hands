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

  let rankFrequencies = new Map<Rank, number>([])
  cards.forEach((card) => {
    if (rankFrequencies.has(card.props.rank)) {
      let count = rankFrequencies.get(card.props.rank) || 1
      rankFrequencies.set(card.props.rank, count + 1)
    } else {
      rankFrequencies.set(card.props.rank, 1)
    }
  })

  const rankCounts: number[] = Array.from(rankFrequencies.values())
  if (rankCounts.includes(4)) hands.push(Hand.FourOfAKind)
  if (rankCounts.includes(3) && rankCounts.includes(2)) hands.push(Hand.FullHouse)
  if (rankCounts.includes(3)) hands.push(Hand.ThreeOfAKind)

  const pairs: number[] = rankCounts.filter((c) => c == 2)
  if (pairs.length == 2) hands.push(Hand.TwoPair)
  if (pairs.length == 1) hands.push(Hand.Pair)

  const isFlush = cards.filter((card) => card.props.suit === cards[0].props.suit).length === 5
  if (isFlush) hands.push(Hand.Flush)

  const ranks: Rank[] = cards.map((c) => c.props.rank).sort((a: Rank, b: Rank) => a - b)
  const straight = [...Array(5).keys()].map((i) => i + ranks[0])
  const isStraight = ranks.map((rank, index) => rank === straight[index]).reduce((a, b) => a && b)
  if (isStraight) {
    if (isFlush) {
      const hasAceHigh = ranks[ranks.length - 1] === 12 // Rank.Ace is 12
      if (hasAceHigh) hands.push(Hand.RoyalFlush)
      hands.push(Hand.StraightFlush)
    }
    hands.push(Hand.Straight)
  }

  return hands
}
