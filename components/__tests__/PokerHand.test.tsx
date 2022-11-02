import { getHands, getHighHand, Hand } from "../PokerHand"
import { Rank, Suit } from "../PlayingCard"

describe("PokerHand.getHands", () => {
  describe("with no major hands", () => {
    let communityCards = [
      { rank: Rank.Two, suit: Suit.Clubs },
      { rank: Rank.Five, suit: Suit.Diamonds },
      { rank: Rank.Seven, suit: Suit.Hearts },
      { rank: Rank.Nine, suit: Suit.Spades },
      { rank: Rank.King, suit: Suit.Clubs }
    ]

    let holeCards = [
      { rank: Rank.Jack, suit: Suit.Spades },
      { rank: Rank.Three, suit: Suit.Hearts }
    ]

    it("returns high card", () => {
      expect(getHands(communityCards, holeCards)[Hand.HighCard]).toContainEqual([
        { rank: Rank.King, suit: Suit.Clubs }
      ])
    })
  })

  describe("with two cards of the same rank", () => {
    let communityCards = [
      { rank: Rank.Two, suit: Suit.Clubs },
      { rank: Rank.Five, suit: Suit.Diamonds },
      { rank: Rank.Seven, suit: Suit.Hearts },
      { rank: Rank.King, suit: Suit.Spades },
      { rank: Rank.Jack, suit: Suit.Diamonds }
    ]

    let holeCards = [
      { rank: Rank.King, suit: Suit.Clubs },
      { rank: Rank.Three, suit: Suit.Hearts }
    ]

    it("returns a pair", () => {
      expect(getHands(holeCards, communityCards)[Hand.Pair]).toContainEqual([
        { rank: Rank.King, suit: Suit.Spades },
        { rank: Rank.King, suit: Suit.Clubs }
      ])
    })
  })

  describe("with two sets of two cards of the same rank", () => {
    it("returns two pair", () => {
      let communityCards = [
        { rank: Rank.Queen, suit: Suit.Hearts },
        { rank: Rank.Two, suit: Suit.Diamonds },
        { rank: Rank.King, suit: Suit.Hearts },
        { rank: Rank.Nine, suit: Suit.Diamonds },
        { rank: Rank.Queen, suit: Suit.Diamonds }
      ]

      let holeCards = [
        { rank: Rank.Eight, suit: Suit.Hearts },
        { rank: Rank.Eight, suit: Suit.Clubs }
      ]

      expect(getHands(holeCards, communityCards)[Hand.TwoPair]).toContainEqual([
        { rank: Rank.Queen, suit: Suit.Hearts },
        { rank: Rank.Queen, suit: Suit.Diamonds },
        { rank: Rank.Eight, suit: Suit.Hearts },
        { rank: Rank.Eight, suit: Suit.Clubs }
      ])
    })

    it("returns two pair", () => {
      let communityCards = [
        { rank: Rank.Nine, suit: Suit.Hearts },
        { rank: Rank.Eight, suit: Suit.Clubs },
        { rank: Rank.King, suit: Suit.Hearts },
        { rank: Rank.Nine, suit: Suit.Diamonds },
        { rank: Rank.Queen, suit: Suit.Clubs }
      ]

      let holeCards = [
        { rank: Rank.Eight, suit: Suit.Hearts },
        { rank: Rank.Queen, suit: Suit.Hearts }
      ]

      expect(getHands(holeCards, communityCards)[Hand.TwoPair]).toContainEqual([
        { rank: Rank.Queen, suit: Suit.Hearts },
        { rank: Rank.Queen, suit: Suit.Clubs },
        { rank: Rank.Nine, suit: Suit.Hearts },
        { rank: Rank.Nine, suit: Suit.Diamonds }
      ])
    })

    it("returns two pair", () => {
      let communityCards = [
        { rank: Rank.Ace, suit: Suit.Hearts },
        { rank: Rank.Ten, suit: Suit.Diamonds },
        { rank: Rank.Eight, suit: Suit.Hearts },
        { rank: Rank.Five, suit: Suit.Diamonds },
        { rank: Rank.Ace, suit: Suit.Clubs }
      ]

      let holeCards = [
        { rank: Rank.Ten, suit: Suit.Hearts },
        { rank: Rank.Five, suit: Suit.Hearts }
      ]

      // need to sort the hands
      expect(getHands(holeCards, communityCards)[Hand.TwoPair]).toContainEqual([
        { rank: Rank.Ace, suit: Suit.Hearts },
        { rank: Rank.Ace, suit: Suit.Clubs },
        { rank: Rank.Ten, suit: Suit.Hearts },
        { rank: Rank.Ten, suit: Suit.Diamonds }
      ])
    })
  })

  describe("with three cards of the same rank", () => {
    let communityCards = [
      { rank: Rank.Two, suit: Suit.Clubs },
      { rank: Rank.Five, suit: Suit.Diamonds },
      { rank: Rank.Seven, suit: Suit.Hearts },
      { rank: Rank.King, suit: Suit.Spades },
      { rank: Rank.Jack, suit: Suit.Diamonds }
    ]

    let holeCards = [
      { rank: Rank.King, suit: Suit.Hearts },
      { rank: Rank.King, suit: Suit.Clubs }
    ]

    it("returns a three of a kind", () => {
      expect(getHands(holeCards, communityCards)[Hand.ThreeOfAKind]).toContainEqual([
        { rank: Rank.King, suit: Suit.Spades },
        { rank: Rank.King, suit: Suit.Hearts },
        { rank: Rank.King, suit: Suit.Clubs }
      ])
    })

    describe("with another two cards of the same rank", () => {
      let communityCards = [
        { rank: Rank.Ace, suit: Suit.Clubs },
        { rank: Rank.Seven, suit: Suit.Hearts },
        { rank: Rank.Ace, suit: Suit.Diamonds },
        { rank: Rank.King, suit: Suit.Spades },
        { rank: Rank.Two, suit: Suit.Diamonds }
      ]

      let holeCards = [
        { rank: Rank.King, suit: Suit.Hearts },
        { rank: Rank.King, suit: Suit.Clubs }
      ]

      it("returns a full house", () => {
        expect(getHands(holeCards, communityCards)[Hand.FullHouse]).toContainEqual([
          { rank: Rank.King, suit: Suit.Spades },
          { rank: Rank.King, suit: Suit.Hearts },
          { rank: Rank.King, suit: Suit.Clubs },
          { rank: Rank.Ace, suit: Suit.Diamonds },
          { rank: Rank.Ace, suit: Suit.Clubs }
        ])
      })
    })
  })

  describe("with four cards of the same rank", () => {
    let communityCards = [
      { rank: Rank.Two, suit: Suit.Clubs },
      { rank: Rank.King, suit: Suit.Spades },
      { rank: Rank.King, suit: Suit.Diamonds },
      { rank: Rank.Six, suit: Suit.Diamonds },
      { rank: Rank.Seven, suit: Suit.Hearts }
    ]

    let holeCards = [
      { rank: Rank.King, suit: Suit.Hearts },
      { rank: Rank.King, suit: Suit.Clubs }
    ]

    it("returns a four of a kind", () => {
      expect(getHands(holeCards, communityCards)[Hand.FourOfAKind]).toContainEqual([
        { rank: Rank.King, suit: Suit.Spades },
        { rank: Rank.King, suit: Suit.Hearts },
        { rank: Rank.King, suit: Suit.Diamonds },
        { rank: Rank.King, suit: Suit.Clubs }
      ])
    })
  })

  describe("with five cards of the same suit", () => {
    let communityCards = [
      { rank: Rank.Two, suit: Suit.Clubs },
      { rank: Rank.Two, suit: Suit.Spades },
      { rank: Rank.King, suit: Suit.Spades },
      { rank: Rank.Jack, suit: Suit.Spades },
      { rank: Rank.Three, suit: Suit.Clubs }
    ]

    let holeCards = [
      { rank: Rank.Eight, suit: Suit.Spades },
      { rank: Rank.Three, suit: Suit.Spades }
    ]

    it("returns a flush", () => {
      expect(getHands(holeCards, communityCards)[Hand.Flush]).toContainEqual([
        { rank: Rank.King, suit: Suit.Spades },
        { rank: Rank.Jack, suit: Suit.Spades },
        { rank: Rank.Eight, suit: Suit.Spades },
        { rank: Rank.Three, suit: Suit.Spades },
        { rank: Rank.Two, suit: Suit.Spades }
      ])
    })
  })

  describe("with five sequentially ranking cards", () => {
    let communityCards = [
      { rank: Rank.Two, suit: Suit.Clubs },
      { rank: Rank.Queen, suit: Suit.Clubs },
      { rank: Rank.Nine, suit: Suit.Spades },
      { rank: Rank.Eight, suit: Suit.Clubs },
      { rank: Rank.Six, suit: Suit.Diamonds }
    ]

    let holeCards = [
      { rank: Rank.Jack, suit: Suit.Hearts },
      { rank: Rank.Ten, suit: Suit.Diamonds }
    ]

    it("returns a straight", () => {
      expect(getHands(holeCards, communityCards)[Hand.Straight]).toContainEqual([
        { rank: Rank.Queen, suit: Suit.Clubs },
        { rank: Rank.Jack, suit: Suit.Hearts },
        { rank: Rank.Ten, suit: Suit.Diamonds },
        { rank: Rank.Nine, suit: Suit.Spades },
        { rank: Rank.Eight, suit: Suit.Clubs }
      ])
    })

    it("returns a straight", () => {
      let communityCards = [
        { rank: Rank.Six, suit: Suit.Clubs },
        { rank: Rank.Ten, suit: Suit.Spades },
        { rank: Rank.Eight, suit: Suit.Diamonds },
        { rank: Rank.Nine, suit: Suit.Diamonds },
        { rank: Rank.Ace, suit: Suit.Spades }
      ]

      let holeCards = [
        { rank: Rank.Four, suit: Suit.Diamonds },
        { rank: Rank.Seven, suit: Suit.Spades }
      ]

      expect(getHands(holeCards, communityCards)[Hand.Straight]).toContainEqual([
        { rank: Rank.Ten, suit: Suit.Spades },
        { rank: Rank.Nine, suit: Suit.Diamonds },
        { rank: Rank.Eight, suit: Suit.Diamonds },
        { rank: Rank.Seven, suit: Suit.Spades },
        { rank: Rank.Six, suit: Suit.Clubs }
      ])
    })

    it("returns a straight", () => {
      let communityCards = [
        { rank: Rank.King, suit: Suit.Clubs },
        { rank: Rank.Six, suit: Suit.Clubs },
        { rank: Rank.Five, suit: Suit.Clubs },
        { rank: Rank.Seven, suit: Suit.Hearts },
        { rank: Rank.Four, suit: Suit.Diamonds }
      ]

      let holeCards = [
        { rank: Rank.Eight, suit: Suit.Spades },
        { rank: Rank.Jack, suit: Suit.Hearts }
      ]

      expect(getHands(holeCards, communityCards)[Hand.Straight]).toContainEqual([
        { rank: Rank.Eight, suit: Suit.Spades },
        { rank: Rank.Seven, suit: Suit.Hearts },
        { rank: Rank.Six, suit: Suit.Clubs },
        { rank: Rank.Five, suit: Suit.Clubs },
        { rank: Rank.Four, suit: Suit.Diamonds }
      ])
    })

    it("returns a straight", () => {
      let communityCards = [
        { rank: Rank.Two, suit: Suit.Spades },
        { rank: Rank.Six, suit: Suit.Clubs },
        { rank: Rank.Five, suit: Suit.Clubs },
        { rank: Rank.Three, suit: Suit.Hearts },
        { rank: Rank.Four, suit: Suit.Diamonds }
      ]

      let holeCards = [
        { rank: Rank.Six, suit: Suit.Spades },
        { rank: Rank.Four, suit: Suit.Hearts }
      ]

      expect(getHands(holeCards, communityCards)[Hand.Straight]).toContainEqual([
        { rank: Rank.Six, suit: Suit.Spades },
        { rank: Rank.Five, suit: Suit.Clubs },
        { rank: Rank.Four, suit: Suit.Hearts },
        { rank: Rank.Three, suit: Suit.Hearts },
        { rank: Rank.Two, suit: Suit.Spades }
      ])
    })

    describe("with an Ace high", () => {
      it("does not return a royal flush", () => {
        let communityCards = [
          { rank: Rank.Two, suit: Suit.Clubs },
          { rank: Rank.King, suit: Suit.Spades },
          { rank: Rank.Jack, suit: Suit.Clubs },
          { rank: Rank.Queen, suit: Suit.Spades },
          { rank: Rank.Six, suit: Suit.Diamonds }
        ]

        let holeCards = [
          { rank: Rank.Ace, suit: Suit.Hearts },
          { rank: Rank.Ten, suit: Suit.Diamonds }
        ]

        expect(getHands(holeCards, communityCards)[Hand.RoyalFlush]).not.toContainEqual([
          { rank: Rank.Ace, suit: Suit.Hearts },
          { rank: Rank.King, suit: Suit.Spades },
          { rank: Rank.Queen, suit: Suit.Spades },
          { rank: Rank.Jack, suit: Suit.Clubs },
          { rank: Rank.Ten, suit: Suit.Diamonds }
        ])
      })
    })

    describe("with the same suit", () => {
      let communityCards = [
        { rank: Rank.Two, suit: Suit.Clubs },
        { rank: Rank.Queen, suit: Suit.Spades },
        { rank: Rank.Ten, suit: Suit.Spades },
        { rank: Rank.Six, suit: Suit.Diamonds },
        { rank: Rank.Eight, suit: Suit.Spades }
      ]

      let holeCards = [
        { rank: Rank.Jack, suit: Suit.Spades },
        { rank: Rank.Nine, suit: Suit.Spades }
      ]

      it("returns a straight flush", () => {
        expect(getHands(holeCards, communityCards)[Hand.StraightFlush]).toContainEqual([
          { rank: Rank.Queen, suit: Suit.Spades },
          { rank: Rank.Jack, suit: Suit.Spades },
          { rank: Rank.Ten, suit: Suit.Spades },
          { rank: Rank.Nine, suit: Suit.Spades },
          { rank: Rank.Eight, suit: Suit.Spades }
        ])
      })

      describe("with an Ace high", () => {
        let communityCards = [
          { rank: Rank.Two, suit: Suit.Clubs },
          { rank: Rank.King, suit: Suit.Spades },
          { rank: Rank.Ace, suit: Suit.Spades },
          { rank: Rank.Queen, suit: Suit.Spades },
          { rank: Rank.Six, suit: Suit.Diamonds }
        ]

        let holeCards = [
          { rank: Rank.Jack, suit: Suit.Spades },
          { rank: Rank.Ten, suit: Suit.Spades }
        ]

        it("returns a royal flush", () => {
          expect(getHands(holeCards, communityCards)[Hand.RoyalFlush]).toContainEqual([
            { rank: Rank.Ace, suit: Suit.Spades },
            { rank: Rank.King, suit: Suit.Spades },
            { rank: Rank.Queen, suit: Suit.Spades },
            { rank: Rank.Jack, suit: Suit.Spades },
            { rank: Rank.Ten, suit: Suit.Spades }
          ])
        })
      })
    })
  })
})
