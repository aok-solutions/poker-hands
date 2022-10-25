import * as React from "react"
import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Card, displayCard, pokerCards } from "../../components/PlayingCard"
import { getHands, Hand } from "../../components/PokerHand"
import ScrollHandPicker from "../../components/ScrollHandPicker"
import { AnswerBadge } from "../../components/AnswerBadge"

const fullDeck = (): Card[] => {
  let deck: Card[] = []
  Array.from(pokerCards.entries()).forEach(([suit, ranks]) => {
    Array.from(ranks.keys()).forEach((rank) => deck.push({ rank, suit }))
  })

  return deck
}

function shuffle(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)) // random index from 0 to i

    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export default function NameThatHandGame() {
  const [deck, setDeck] = useState<Card[]>(fullDeck())
  const [communityCards, setCommunityCards] = useState<Card[]>([])
  const [holeCards, setHoleCards] = useState<Card[]>([])
  const [highHand, setHighHand] = useState<Hand>()
  const [correctAnswer, setCorrectAnswer] = useState<string>()
  const [answerCorrect, setAnswerCorrect] = useState<boolean>(false)
  const [isAnswering, setIsAnswering] = useState<boolean>(true)

  const shuffleDeck = () => setDeck(shuffle(fullDeck()))
  const submitAnswer = async (answer: string) => {
    setIsAnswering(false)

    const highestHand: string = highHand ? Hand[highHand] : "HighCard"
    const isAnswerCorrect = answer === highestHand
    setCorrectAnswer(highestHand)
    setAnswerCorrect(isAnswerCorrect)

    const delayDuration = isAnswerCorrect ? 1000 : 3000

    await delay(delayDuration)
    resetState()
  }

  const resetState = () => {
    shuffleDeck()
    setCorrectAnswer(undefined)
    setIsAnswering(true)
  }

  useEffect(() => {
    setDeck(shuffle(deck))

    setHoleCards(deck.splice(0, 2))
    setCommunityCards(deck.splice(0, 5))
  }, [deck])

  useEffect(() => {
    setHighHand(getHands(holeCards, communityCards)[0][0])
  }, [holeCards, communityCards])

  return (
    <View style={styles.container}>
      <View style={styles.community}>{communityCards.map(displayCard)}</View>
      <View style={styles.hole}>{holeCards.map(displayCard)}</View>
      <View style={{ flex: 2, justifyContent: "space-around", alignItems: "center" }}>
        <ScrollHandPicker onSubmit={submitAnswer} isDisabled={!isAnswering} />
        {correctAnswer ? (
          <AnswerBadge
            answerCorrect={answerCorrect}
            text={answerCorrect ? "" : correctAnswer?.toString() || ""}
          />
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 80,
    flexDirection: "column",
    backgroundColor: "white"
  },
  community: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  hole: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 6,
    backgroundColor: "oldlace",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%"
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "coral",
    textAlign: "center"
  },
  pokerHand: {
    fontSize: 16,
    fontWeight: "700",
    borderWidth: 3,
    borderColor: "coral",
    textAlign: "center",
    borderRadius: 6,
    paddingVertical: 20,
    paddingHorizontal: 60
  }
})
