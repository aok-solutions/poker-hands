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

    describe("with another two cards of the same rank", () => {
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

  describe("with five cards of the same suit", () => {
    let cards = [
      <Card rank={Rank.Two} suit={Suit.Spades} />,
      <Card rank={Rank.King} suit={Suit.Spades} />,
      <Card rank={Rank.Jack} suit={Suit.Spades} />,
      <Card rank={Rank.Eight} suit={Suit.Spades} />,
      <Card rank={Rank.Three} suit={Suit.Spades} />
    ]

    it("returns a flush", () => {
      expect(getHands(cards)).toContain(Hand.Flush)
    })
  })

  describe("with five sequentially ranking cards", () => {
    let cards = [
      <Card rank={Rank.Queen} suit={Suit.Clubs} />,
      <Card rank={Rank.Jack} suit={Suit.Hearts} />,
      <Card rank={Rank.Ten} suit={Suit.Diamonds} />,
      <Card rank={Rank.Nine} suit={Suit.Spades} />,
      <Card rank={Rank.Eight} suit={Suit.Clubs} />
    ]

    it("returns a straight", () => {
      expect(getHands(cards)).toContain(Hand.Straight)
    })

    describe("with the same suit", () => {
      let cards = [
        <Card rank={Rank.Queen} suit={Suit.Spades} />,
        <Card rank={Rank.Jack} suit={Suit.Spades} />,
        <Card rank={Rank.Ten} suit={Suit.Spades} />,
        <Card rank={Rank.Nine} suit={Suit.Spades} />,
        <Card rank={Rank.Eight} suit={Suit.Spades} />
      ]

      it("returns a straight flush", () => {
        expect(getHands(cards)).toContain(Hand.StraightFlush)
      })

      describe("with an Ace high", () => {
        let cards = [
          <Card rank={Rank.Ace} suit={Suit.Spades} />,
          <Card rank={Rank.King} suit={Suit.Spades} />,
          <Card rank={Rank.Queen} suit={Suit.Spades} />,
          <Card rank={Rank.Jack} suit={Suit.Spades} />,
          <Card rank={Rank.Ten} suit={Suit.Spades} />
        ]

        it("returns a royal flush", () => {
          expect(getHands(cards)).toContain(Hand.RoyalFlush)
        })
      })
    })
  })
})
