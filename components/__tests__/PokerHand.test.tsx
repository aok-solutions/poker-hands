import { getHands, Hand } from "../PokerHand"
import { Card, Rank, Suit } from "../Card"

describe("PokerHand.getHands", () => {
  describe("with no major hands", () => {
    let cards = [
      <Card rank={Rank.Two} suit={Suit.Clubs} />,
      <Card rank={Rank.Five} suit={Suit.Diamonds} />,
      <Card rank={Rank.Seven} suit={Suit.Hearts} />,
      <Card rank={Rank.Nine} suit={Suit.Spades} />,
      <Card rank={Rank.King} suit={Suit.Clubs} />
    ]

    it("returns high card", () => {
      expect(getHands(cards)).toEqual([Hand.HighCard])
    })
  })

  describe("with two cards of the same rank", () => {
    let cards = [
      <Card rank={Rank.Two} suit={Suit.Clubs} />,
      <Card rank={Rank.Five} suit={Suit.Diamonds} />,
      <Card rank={Rank.Seven} suit={Suit.Hearts} />,
      <Card rank={Rank.King} suit={Suit.Spades} />,
      <Card rank={Rank.King} suit={Suit.Clubs} />
    ]

    it("returns a pair", () => {
      expect(getHands(cards)).toContain(Hand.Pair)
    })
  })

  describe("with three cards of the same rank", () => {
    let cards = [
      <Card rank={Rank.Two} suit={Suit.Clubs} />,
      <Card rank={Rank.Five} suit={Suit.Diamonds} />,
      <Card rank={Rank.King} suit={Suit.Hearts} />,
      <Card rank={Rank.King} suit={Suit.Spades} />,
      <Card rank={Rank.King} suit={Suit.Clubs} />
    ]

    it("returns a three of a kind", () => {
      expect(getHands(cards)).toContain(Hand.ThreeOfAKind)
    })
  })

  describe("with three cards and two cards of the same rank", () => {
    let cards = [
      <Card rank={Rank.Ace} suit={Suit.Clubs} />,
      <Card rank={Rank.Ace} suit={Suit.Diamonds} />,
      <Card rank={Rank.King} suit={Suit.Hearts} />,
      <Card rank={Rank.King} suit={Suit.Spades} />,
      <Card rank={Rank.King} suit={Suit.Clubs} />
    ]

    it("returns a full house", () => {
      expect(getHands(cards)).toContain(Hand.FullHouse)
    })
  })

  describe("with four cards of the same rank", () => {
    let cards = [
      <Card rank={Rank.Two} suit={Suit.Clubs} />,
      <Card rank={Rank.King} suit={Suit.Diamonds} />,
      <Card rank={Rank.King} suit={Suit.Hearts} />,
      <Card rank={Rank.King} suit={Suit.Spades} />,
      <Card rank={Rank.King} suit={Suit.Clubs} />
    ]

    it("returns a four of a kind", () => {
      expect(getHands(cards)).toContain(Hand.FourOfAKind)
    })
  })
})
