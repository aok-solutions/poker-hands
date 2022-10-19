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

const sortCards = (cardA: Card, cardB: Card): number => {
  if (cardA.props.rank > cardB.props.rank) return -1
  else if (cardA.props.rank === cardB.props.rank) {
    if (cardA.props.suit > cardB.props.suit) return -1
    else return 1
  } else return 1
}

export const getBetterHands = (
  holeCards: Card[],
  communityCards: Card[]
): Record<Hand, Card[][]> => {
  let possibleHands: Record<Hand, Card[][]> = {
    [Hand.RoyalFlush]: [],
    [Hand.StraightFlush]: [],
    [Hand.FourOfAKind]: [],
    [Hand.FullHouse]: [],
    [Hand.Flush]: [],
    [Hand.Straight]: [],
    [Hand.ThreeOfAKind]: [],
    [Hand.TwoPair]: [],
    [Hand.Pair]: [],
    [Hand.HighCard]: []
  }

  let groupBySuit: Record<Suit, Card[]> = {
    [Suit.Spades]: [],
    [Suit.Hearts]: [],
    [Suit.Diamonds]: [],
    [Suit.Clubs]: []
  }
  let groupByRank: Record<Rank, Card[]> = {
    [Rank.Ace]: [],
    [Rank.King]: [],
    [Rank.Queen]: [],
    [Rank.Jack]: [],
    [Rank.Ten]: [],
    [Rank.Nine]: [],
    [Rank.Eight]: [],
    [Rank.Seven]: [],
    [Rank.Six]: [],
    [Rank.Five]: [],
    [Rank.Four]: [],
    [Rank.Three]: [],
    [Rank.Two]: []
  }

  const cards: Card[] = holeCards.concat(communityCards)
  const sortedCards = cards.sort(sortCards)

  sortedCards.forEach((card: Card) => groupBySuit[card.props.suit].push(card))
  sortedCards.forEach((card: Card) => groupByRank[card.props.rank].push(card))

  possibleHands[Hand.HighCard].push([sortedCards[0]])

  for (const [key, value] of Object.entries(groupByRank)) {
    if (value.length === 2) possibleHands[Hand.Pair].push(value)
    if (value.length === 3) possibleHands[Hand.ThreeOfAKind].push(value)
    if (value.length === 4) possibleHands[Hand.FourOfAKind].push(value)
  }

  if (possibleHands[Hand.Pair].length > 1) {
    for (let i = 0; i < possibleHands[Hand.Pair].length - 1; i++) {
      possibleHands[Hand.TwoPair].push(
        [...possibleHands[Hand.Pair][i], ...possibleHands[Hand.Pair][i + 1]].sort(sortCards)
      )
    }
  }

  for (const [key, value] of Object.entries(groupBySuit)) {
    if (value.length === 5) possibleHands[Hand.Flush].push(value)
  }

  return possibleHands
}

export const getHands = (holeCards: Card[], communityCards: Card[]): [Hand, Card[]][] => {
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
  if (pairs.length >= 2) hands.push(Hand.TwoPair)
  if (pairs.length == 1) hands.push(Hand.Pair)

  const suitCounts: number[] = Array.from(suitFrequencies.values())
  let isFlush = suitCounts.includes(5)
  if (isFlush) hands.push(Hand.Flush)

  let possibleStraight: Rank[] = []
  const ranks: Rank[] = [
    ...new Set(cards.map((card) => card.props.rank).sort((rankA, rankB) => rankA - rankB))
  ]

  for (const [index, rank] of ranks.entries()) {
    if (index === 0) possibleStraight.push(rank)
    else {
      const lastRank: Rank = possibleStraight[possibleStraight.length - 1]
      const nextRank: Rank = lastRank + 1
      if (rank === nextRank) possibleStraight.push(rank)
      else if (possibleStraight.length >= 5) continue
      else possibleStraight = [rank]
    }
  }

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

  return hands.map((h) => [h, []]).sort((handA, handB) => handB[0] - handA[0])
}
