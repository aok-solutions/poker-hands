import { getBetterHands, getHands, Hand } from "../PokerHand"
import { Card, Rank, Suit } from "../Card"

describe("PokerHand.getHands", () => {
  describe("with no major hands", () => {
    let communityCards = [
      <Card rank={Rank.Two} suit={Suit.Clubs} />,
      <Card rank={Rank.Five} suit={Suit.Diamonds} />,
      <Card rank={Rank.Seven} suit={Suit.Hearts} />,
      <Card rank={Rank.Nine} suit={Suit.Spades} />,
      <Card rank={Rank.King} suit={Suit.Clubs} />
    ]

    let holeCards = [
      <Card rank={Rank.Jack} suit={Suit.Spades} />,
      <Card rank={Rank.Three} suit={Suit.Hearts} />
    ]

    it("returns high card", () => {
      expect(getBetterHands(communityCards, holeCards)[Hand.HighCard]).toContainEqual([
        <Card rank={Rank.King} suit={Suit.Clubs} />
      ])
    })
  })

  describe("with two cards of the same rank", () => {
    let communityCards = [
      <Card rank={Rank.Two} suit={Suit.Clubs} />,
      <Card rank={Rank.Five} suit={Suit.Diamonds} />,
      <Card rank={Rank.Seven} suit={Suit.Hearts} />,
      <Card rank={Rank.King} suit={Suit.Spades} />,
      <Card rank={Rank.Jack} suit={Suit.Diamonds} />
    ]

    let holeCards = [
      <Card rank={Rank.King} suit={Suit.Clubs} />,
      <Card rank={Rank.Three} suit={Suit.Hearts} />
    ]

    it("returns a pair", () => {
      expect(getBetterHands(holeCards, communityCards)[Hand.Pair]).toContainEqual([
        <Card rank={Rank.King} suit={Suit.Spades} />,
        <Card rank={Rank.King} suit={Suit.Clubs} />
      ])
    })
  })

  describe("with two sets of two cards of the same rank", () => {
    it("returns two pair", () => {
      let communityCards = [
        <Card rank={Rank.Queen} suit={Suit.Hearts} />,
        <Card rank={Rank.Two} suit={Suit.Diamonds} />,
        <Card rank={Rank.King} suit={Suit.Hearts} />,
        <Card rank={Rank.Nine} suit={Suit.Diamonds} />,
        <Card rank={Rank.Queen} suit={Suit.Diamonds} />
      ]

      let holeCards = [
        <Card rank={Rank.Eight} suit={Suit.Hearts} />,
        <Card rank={Rank.Eight} suit={Suit.Clubs} />
      ]

      expect(getBetterHands(holeCards, communityCards)[Hand.TwoPair]).toContainEqual([
        <Card rank={Rank.Queen} suit={Suit.Hearts} />,
        <Card rank={Rank.Queen} suit={Suit.Diamonds} />,
        <Card rank={Rank.Eight} suit={Suit.Hearts} />,
        <Card rank={Rank.Eight} suit={Suit.Clubs} />
      ])
    })

    it("returns two pair", () => {
      let communityCards = [
        <Card rank={Rank.Nine} suit={Suit.Hearts} />,
        <Card rank={Rank.Eight} suit={Suit.Clubs} />,
        <Card rank={Rank.King} suit={Suit.Hearts} />,
        <Card rank={Rank.Nine} suit={Suit.Diamonds} />,
        <Card rank={Rank.Queen} suit={Suit.Clubs} />
      ]

      let holeCards = [
        <Card rank={Rank.Eight} suit={Suit.Hearts} />,
        <Card rank={Rank.Queen} suit={Suit.Hearts} />
      ]

      expect(getBetterHands(holeCards, communityCards)[Hand.TwoPair]).toContainEqual([
        <Card rank={Rank.Queen} suit={Suit.Hearts} />,
        <Card rank={Rank.Queen} suit={Suit.Clubs} />,
        <Card rank={Rank.Nine} suit={Suit.Hearts} />,
        <Card rank={Rank.Nine} suit={Suit.Diamonds} />
      ])
    })
  })

  describe("with three cards of the same rank", () => {
    let communityCards = [
      <Card rank={Rank.Two} suit={Suit.Clubs} />,
      <Card rank={Rank.Five} suit={Suit.Diamonds} />,
      <Card rank={Rank.Seven} suit={Suit.Hearts} />,
      <Card rank={Rank.King} suit={Suit.Spades} />,
      <Card rank={Rank.Jack} suit={Suit.Diamonds} />
    ]

    let holeCards = [
      <Card rank={Rank.King} suit={Suit.Hearts} />,
      <Card rank={Rank.King} suit={Suit.Clubs} />
    ]

    it("returns a three of a kind", () => {
      expect(getBetterHands(holeCards, communityCards)[Hand.ThreeOfAKind]).toContainEqual([
        <Card rank={Rank.King} suit={Suit.Spades} />,
        <Card rank={Rank.King} suit={Suit.Hearts} />,
        <Card rank={Rank.King} suit={Suit.Clubs} />
      ])
    })

    describe("with another two cards of the same rank", () => {
      let communityCards = [
        <Card rank={Rank.Ace} suit={Suit.Clubs} />,
        <Card rank={Rank.Seven} suit={Suit.Hearts} />,
        <Card rank={Rank.Ace} suit={Suit.Diamonds} />,
        <Card rank={Rank.King} suit={Suit.Spades} />,
        <Card rank={Rank.Two} suit={Suit.Diamonds} />
      ]

      let holeCards = [
        <Card rank={Rank.King} suit={Suit.Hearts} />,
        <Card rank={Rank.King} suit={Suit.Clubs} />
      ]

      it("returns a full house", () => {
        expect(getBetterHands(holeCards, communityCards)[Hand.FullHouse]).toContainEqual([
          <Card rank={Rank.King} suit={Suit.Spades} />,
          <Card rank={Rank.King} suit={Suit.Hearts} />,
          <Card rank={Rank.King} suit={Suit.Clubs} />,
          <Card rank={Rank.Ace} suit={Suit.Diamonds} />,
          <Card rank={Rank.Ace} suit={Suit.Clubs} />
        ])
      })
    })
  })

  describe("with four cards of the same rank", () => {
    let communityCards = [
      <Card rank={Rank.Two} suit={Suit.Clubs} />,
      <Card rank={Rank.King} suit={Suit.Spades} />,
      <Card rank={Rank.King} suit={Suit.Diamonds} />,
      <Card rank={Rank.Six} suit={Suit.Diamonds} />,
      <Card rank={Rank.Seven} suit={Suit.Hearts} />
    ]

    let holeCards = [
      <Card rank={Rank.King} suit={Suit.Hearts} />,
      <Card rank={Rank.King} suit={Suit.Clubs} />
    ]

    it("returns a four of a kind", () => {
      expect(getBetterHands(holeCards, communityCards)[Hand.FourOfAKind]).toContainEqual([
        <Card rank={Rank.King} suit={Suit.Spades} />,
        <Card rank={Rank.King} suit={Suit.Hearts} />,
        <Card rank={Rank.King} suit={Suit.Diamonds} />,
        <Card rank={Rank.King} suit={Suit.Clubs} />
      ])
    })
  })

  describe("with five cards of the same suit", () => {
    let communityCards = [
      <Card rank={Rank.Two} suit={Suit.Clubs} />,
      <Card rank={Rank.Two} suit={Suit.Spades} />,
      <Card rank={Rank.King} suit={Suit.Spades} />,
      <Card rank={Rank.Jack} suit={Suit.Spades} />,
      <Card rank={Rank.Three} suit={Suit.Clubs} />
    ]

    let holeCards = [
      <Card rank={Rank.Eight} suit={Suit.Spades} />,
      <Card rank={Rank.Three} suit={Suit.Spades} />
    ]

    it("returns a flush", () => {
      expect(getBetterHands(holeCards, communityCards)[Hand.Flush]).toContainEqual([
        <Card rank={Rank.King} suit={Suit.Spades} />,
        <Card rank={Rank.Jack} suit={Suit.Spades} />,
        <Card rank={Rank.Eight} suit={Suit.Spades} />,
        <Card rank={Rank.Three} suit={Suit.Spades} />,
        <Card rank={Rank.Two} suit={Suit.Spades} />
      ])
    })
  })

  describe("with five sequentially ranking cards", () => {
    let communityCards = [
      <Card rank={Rank.Two} suit={Suit.Clubs} />,
      <Card rank={Rank.Queen} suit={Suit.Clubs} />,
      <Card rank={Rank.Nine} suit={Suit.Spades} />,
      <Card rank={Rank.Eight} suit={Suit.Clubs} />,
      <Card rank={Rank.Six} suit={Suit.Diamonds} />
    ]

    let holeCards = [
      <Card rank={Rank.Jack} suit={Suit.Hearts} />,
      <Card rank={Rank.Ten} suit={Suit.Diamonds} />
    ]

    it("returns a straight", () => {
      expect(getBetterHands(holeCards, communityCards)[Hand.Straight]).toContainEqual([
        <Card rank={Rank.Queen} suit={Suit.Clubs} />,
        <Card rank={Rank.Jack} suit={Suit.Hearts} />,
        <Card rank={Rank.Ten} suit={Suit.Diamonds} />,
        <Card rank={Rank.Nine} suit={Suit.Spades} />,
        <Card rank={Rank.Eight} suit={Suit.Clubs} />
      ])
    })

    it("returns a straight", () => {
      let communityCards = [
        <Card rank={Rank.Six} suit={Suit.Clubs} />,
        <Card rank={Rank.Ten} suit={Suit.Spades} />,
        <Card rank={Rank.Eight} suit={Suit.Diamonds} />,
        <Card rank={Rank.Nine} suit={Suit.Diamonds} />,
        <Card rank={Rank.Ace} suit={Suit.Spades} />
      ]

      let holeCards = [
        <Card rank={Rank.Four} suit={Suit.Diamonds} />,
        <Card rank={Rank.Seven} suit={Suit.Spades} />
      ]

      expect(getBetterHands(holeCards, communityCards)[Hand.Straight]).toContainEqual([
        <Card rank={Rank.Ten} suit={Suit.Spades} />,
        <Card rank={Rank.Nine} suit={Suit.Diamonds} />,
        <Card rank={Rank.Eight} suit={Suit.Diamonds} />,
        <Card rank={Rank.Seven} suit={Suit.Spades} />,
        <Card rank={Rank.Six} suit={Suit.Clubs} />
      ])
    })

    it("returns a straight", () => {
      let communityCards = [
        <Card rank={Rank.King} suit={Suit.Clubs} />,
        <Card rank={Rank.Six} suit={Suit.Clubs} />,
        <Card rank={Rank.Five} suit={Suit.Clubs} />,
        <Card rank={Rank.Seven} suit={Suit.Hearts} />,
        <Card rank={Rank.Four} suit={Suit.Diamonds} />
      ]

      let holeCards = [
        <Card rank={Rank.Eight} suit={Suit.Spades} />,
        <Card rank={Rank.Jack} suit={Suit.Hearts} />
      ]

      expect(getBetterHands(holeCards, communityCards)[Hand.Straight]).toContainEqual([
        <Card rank={Rank.Eight} suit={Suit.Spades} />,
        <Card rank={Rank.Seven} suit={Suit.Hearts} />,
        <Card rank={Rank.Six} suit={Suit.Clubs} />,
        <Card rank={Rank.Five} suit={Suit.Clubs} />,
        <Card rank={Rank.Four} suit={Suit.Diamonds} />
      ])
    })

    describe("with the same suit", () => {
      let communityCards = [
        <Card rank={Rank.Two} suit={Suit.Clubs} />,
        <Card rank={Rank.Queen} suit={Suit.Spades} />,
        <Card rank={Rank.Ten} suit={Suit.Spades} />,
        <Card rank={Rank.Six} suit={Suit.Diamonds} />,
        <Card rank={Rank.Eight} suit={Suit.Spades} />
      ]

      let holeCards = [
        <Card rank={Rank.Jack} suit={Suit.Spades} />,
        <Card rank={Rank.Nine} suit={Suit.Spades} />
      ]

      it("returns a straight flush", () => {
        expect(getBetterHands(holeCards, communityCards)[Hand.StraightFlush]).toContainEqual([
          <Card rank={Rank.Queen} suit={Suit.Spades} />,
          <Card rank={Rank.Jack} suit={Suit.Spades} />,
          <Card rank={Rank.Ten} suit={Suit.Spades} />,
          <Card rank={Rank.Nine} suit={Suit.Spades} />,
          <Card rank={Rank.Eight} suit={Suit.Spades} />
        ])
      })

      describe("with an Ace high", () => {
        let communityCards = [
          <Card rank={Rank.Two} suit={Suit.Clubs} />,
          <Card rank={Rank.King} suit={Suit.Spades} />,
          <Card rank={Rank.Ace} suit={Suit.Spades} />,
          <Card rank={Rank.Queen} suit={Suit.Spades} />,
          <Card rank={Rank.Six} suit={Suit.Diamonds} />
        ]

        let holeCards = [
          <Card rank={Rank.Jack} suit={Suit.Spades} />,
          <Card rank={Rank.Ten} suit={Suit.Spades} />
        ]

        it("returns a royal flush", () => {
          expect(getBetterHands(holeCards, communityCards)[Hand.RoyalFlush]).toContainEqual([
            <Card rank={Rank.Ace} suit={Suit.Spades} />,
            <Card rank={Rank.King} suit={Suit.Spades} />,
            <Card rank={Rank.Queen} suit={Suit.Spades} />,
            <Card rank={Rank.Jack} suit={Suit.Spades} />,
            <Card rank={Rank.Ten} suit={Suit.Spades} />
          ])
        })
      })
    })
  })
})
