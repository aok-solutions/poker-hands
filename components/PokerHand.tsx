import { Card, Rank, Suit } from "./Card"

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

export const getHands = (holeCards: Card[], communityCards: Card[]): Hand[] => {
  const cards: Card[] = holeCards.concat(communityCards)
  let hands: Hand[] = [Hand.HighCard]

  let rankFrequencies = new Map<Rank, number>([])
  let suitFrequencies = new Map<Suit, number>([])
  cards.forEach((card) => {
    if (rankFrequencies.has(card.props.rank)) {
      let count = rankFrequencies.get(card.props.rank) || 1
      rankFrequencies.set(card.props.rank, count + 1)
    } else {
      rankFrequencies.set(card.props.rank, 1)
    }

    if (suitFrequencies.has(card.props.suit)) {
      let count = suitFrequencies.get(card.props.suit) || 1
      suitFrequencies.set(card.props.suit, count + 1)
    } else {
      suitFrequencies.set(card.props.suit, 1)
    }
  })

  const rankCounts: number[] = Array.from(rankFrequencies.values())
  if (rankCounts.includes(4)) hands.push(Hand.FourOfAKind)
  if (rankCounts.includes(3) && rankCounts.includes(2)) hands.push(Hand.FullHouse)
  if (rankCounts.includes(3)) hands.push(Hand.ThreeOfAKind)

  const pairs: number[] = rankCounts.filter((c) => c == 2)
  if (pairs.length == 2) hands.push(Hand.TwoPair)
  if (pairs.length == 1) hands.push(Hand.Pair)

  const suitCounts: number[] = Array.from(suitFrequencies.values())
  let isFlush = suitCounts.includes(5)
  if (isFlush) hands.push(Hand.Flush)

  let possibleStraight: Rank[] = []
  const ranks: Rank[] = [
    ...new Set(cards.map((card) => card.props.rank).sort((rankA, rankB) => rankA - rankB))
  ]
  ranks.forEach((rank, index) => {
    if (index === 0) possibleStraight.push(rank)
    else {
      const lastRank: Rank = possibleStraight[possibleStraight.length - 1]
      const nextRank: Rank = lastRank + 1
      if (rank === nextRank) possibleStraight.push(rank)
      else possibleStraight = [rank]
    }
  })

  const isStraight =
    possibleStraight.length >= 5 &&
    possibleStraight
      .map((rank, index) => rank === index + possibleStraight[0])
      .reduce((boolA, boolB) => boolA && boolB)

  if (isStraight) {
    if (isFlush) {
      const hasAceHigh = possibleStraight[possibleStraight.length - 1] === Rank.Ace
      if (hasAceHigh) hands.push(Hand.RoyalFlush)
      hands.push(Hand.StraightFlush)
    }
    hands.push(Hand.Straight)
  }

  return hands
}
