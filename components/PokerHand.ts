import { Card, Rank, Suit } from "components/PlayingCard"

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
  if (cardA.rank > cardB.rank) return -1
  else if (cardA.rank === cardB.rank) {
    if (cardA.suit > cardB.suit) return -1
    else return 1
  } else return 1
}

const findStraight = (cards: Card[], straight: Card[]): Card[] => {
  if (cards.length + straight.length < 5) return []
  if (straight.length === 5) return straight
  if (cards.length === 0) return straight

  const nextCard = cards.shift()

  if (nextCard) {
    if (straight.length === 0) return findStraight(cards, [nextCard])
    else {
      const prevCard = straight[0]
      if (prevCard.rank - 1 === nextCard.rank) return findStraight(cards, [nextCard, ...straight])
      else if (prevCard.rank === nextCard.rank) return findStraight(cards, straight)
      else return findStraight(cards, [nextCard])
    }
  } else return findStraight([], [])
}

export const getHands = (holeCards: Card[], communityCards: Card[]): Record<Hand, Card[][]> => {
  let dealtHands: Record<Hand, Card[][]> = {
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

  sortedCards.forEach((card: Card) => groupBySuit[card.suit].push(card))
  sortedCards.forEach((card: Card) => groupByRank[card.rank].push(card))

  dealtHands[Hand.HighCard].push([sortedCards[0]])

  Object.values(groupByRank).forEach((cardsByRank) => {
    if (cardsByRank.length === 4) dealtHands[Hand.FourOfAKind].push(cardsByRank)
    if (cardsByRank.length === 3) {
      dealtHands[Hand.ThreeOfAKind].push(cardsByRank)

      Object.values(groupByRank).forEach((subCardsByRank) => {
        if (subCardsByRank.length === 2)
          dealtHands[Hand.FullHouse].push([...cardsByRank, ...subCardsByRank])
      })
    }
    if (cardsByRank.length === 2) dealtHands[Hand.Pair].push(cardsByRank)
  })

  if (dealtHands[Hand.Pair].length > 1) {
    for (let i = 0; i < dealtHands[Hand.Pair].length - 1; i++) {
      dealtHands[Hand.TwoPair].push(
        [...dealtHands[Hand.Pair][i], ...dealtHands[Hand.Pair][i + 1]].sort(sortCards)
      )
    }
  }

  Object.values(groupBySuit).forEach((cardsBySuit) => {
    if (cardsBySuit.length === 5) dealtHands[Hand.Flush].push(cardsBySuit)
  })

  const straight = findStraight(cards, []).sort(sortCards)
  if (straight.length > 0) {
    dealtHands[Hand.Straight].push(straight)

    const suits = new Set(straight.map((card) => card.suit))
    const isStraightFlush = suits.size === 1
    if (isStraightFlush) dealtHands[Hand.StraightFlush].push(straight)

    const isAceHigh = straight[0].rank === Rank.Ace
    if (isStraightFlush && isAceHigh) dealtHands[Hand.RoyalFlush].push(straight)
  }

  return dealtHands
}

export const getHighHand = (hands: Record<Hand, Card[][]>): [Hand, Card[]] => {
  const sortedHands = Object.entries(hands)
    .filter(([_hand, cards]) => cards.length > 0)
    .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))

  return [Hand[sortedHands[0][0] as keyof typeof Hand], sortedHands[0][1][0]]
}
