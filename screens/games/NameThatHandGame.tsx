import { MaterialCommunityIcons } from "@expo/vector-icons"
import * as React from "react"
import { useEffect, useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import { AnswerBadge } from "components/AnswerBadge"
import { Card, displayCard, displayCardResult, pokerCards } from "components/PlayingCard"
import { getHands, getHighHand, Hand } from "components/PokerHand"
import ScrollHandPicker from "components/ScrollHandPicker"
import { Timer } from "components/Timer"
import Colors from "constants/Colors"
import useColorScheme from "hooks/useColorScheme"
import { RootTabScreenProps } from "types"

const fullDeck = (): Card[] => {
  const deck: Card[] = []
  Array.from(pokerCards.entries()).forEach(([suit, ranks]) => {
    Array.from(ranks.keys()).forEach((rank) => deck.push({ rank, suit }))
  })

  return deck
}

function shuffle(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)) // random index from 0 to i

    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export default function NameThatHandGame({ navigation }: RootTabScreenProps<"NameThatHandGame">) {
  const [deck, setDeck] = useState<Card[]>(fullDeck())
  const [communityCards, setCommunityCards] = useState<Card[]>([])
  const [holeCards, setHoleCards] = useState<Card[]>([])
  const [highHand, setHighHand] = useState<Hand>()
  const [highHandCards, setHighHandCards] = useState<Card[]>([])
  const [correctAnswer, setCorrectAnswer] = useState<string>()
  const [answerCorrect, setAnswerCorrect] = useState<boolean>(false)
  const [isAnswering, setIsAnswering] = useState<boolean>(true)
  const [timer, setTimer] = useState<number>(30)

  const ZERO = 0
  const colorScheme = useColorScheme()

  const shuffleDeck = () => setDeck(shuffle(fullDeck()))
  const submitAnswer = async (answer: string) => {
    setIsAnswering(false)

    answer = answer.trim().length === 0 ? "HighCard" : answer
    const highestHand: string = highHand ? highHand.toString() : Hand.HighCard.toString()
    const isAnswerCorrect = answer === highestHand

    setCorrectAnswer(highestHand)
    setAnswerCorrect(isAnswerCorrect)

    if (isAnswerCorrect) setTimer((time) => time + 5)
    else setTimer((time) => time - 5)

    const delayDuration = isAnswerCorrect ? 1000 : 3000

    await delay(delayDuration)
    resumeGame()
  }

  const resumeGame = () => {
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
    const highHandWithCards = getHighHand(getHands(holeCards, communityCards))
    setHighHand(highHandWithCards[0])
    setHighHandCards(highHandWithCards[1])
  }, [holeCards, communityCards])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAnswering) setTimer((time) => time - 1)
    }, 1000)
    if (timer <= ZERO) {
      setTimer(0)
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  })

  return (
    <View style={styles.container}>
      <View style={styles.cheatSheet}>
        <Pressable
          onPress={() => navigation.navigate("CheatSheetModal")}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1
          })}
        >
          <MaterialCommunityIcons
            name="cards-playing-spade-multiple"
            size={40}
            color={Colors[colorScheme].tabIconDefault}
            style={{ marginRight: 15, marginTop: 10 }}
          />
        </Pressable>
        <Timer time={timer} />
      </View>
      {isAnswering ? (
        <>
          <View style={styles.community}>{communityCards.map(displayCard)}</View>
          <View style={styles.hole}>{holeCards.map(displayCard)}</View>
        </>
      ) : (
        <>
          <View style={styles.community}>
            {communityCards.map((card) => displayCardResult(card, highHandCards))}
          </View>
          <View style={styles.hole}>
            {holeCards.map((card) => displayCardResult(card, highHandCards))}
          </View>
        </>
      )}
      <View style={styles.scrollPicker}>
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
    paddingTop: 20,
    paddingBottom: 90,
    flexDirection: "column",
    backgroundColor: "white"
  },
  community: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center"
  },
  hole: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center"
  },
  scrollPicker: {
    flex: 4,
    justifyContent: "space-around",
    alignItems: "center"
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
  },
  cheatSheet: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between"
  }
})
