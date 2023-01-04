import { FontAwesome } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { Pressable } from "react-native"
import { Button, Modal, Text, View } from "react-native-ui-lib"
import { createMachine } from "xstate"
import { useMachine } from "@xstate/react"

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

const gameStateMachine = createMachine({
  initial: "ended",
  states: {
    playing: {
      on: {
        PAUSE: "paused",
        END: "ended"
      }
    },
    paused: {
      on: {
        PLAY: "playing",
        END: "ended"
      }
    },
    ended: {
      on: {
        PLAY: "playing"
      }
    }
  }
})

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
  const [showModal, setShowModal] = useState(true)

  const [state, send] = useMachine(gameStateMachine)

  const isPlaying = state.value === "playing"
  const isPaused = state.value === "paused"
  const isEnded = state.value === "ended"

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
      if (isAnswering && isPlaying) setTimer((time) => time - 1)
    }, 1000)
    if (timer <= ZERO) {
      setTimer(0)
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  })

  return (
    <View flex paddingH-20 paddingT-20 paddingB-90 bg-white>
      <Modal visible={showModal}>
        <View flex center>
          <View marginB-15>
            <Text $textDefault text40>
              Ready?
            </Text>
          </View>
          <Button
            link
            iconSource={() => <FontAwesome name="play-circle" color="#ff369b" size={80} />}
            onPress={() => {
              setShowModal(false)
              send("PLAY")
            }}
            size={Button.sizes.large}
          />
        </View>
      </Modal>
      <View flex-2 row spread>
        <Timer time={timer} />
      </View>
      {isAnswering ? (
        <>
          <View flex-2 row style={{ justifyContent: "center" }}>
            {communityCards.map(displayCard)}
          </View>
          <View flex-2 row style={{ justifyContent: "center" }}>
            {holeCards.map(displayCard)}
          </View>
        </>
      ) : (
        <>
          <View flex-2 row style={{ justifyContent: "center" }}>
            {communityCards.map((card) => displayCardResult(card, highHandCards))}
          </View>
          <View flex-2 row style={{ justifyContent: "center" }}>
            {holeCards.map((card) => displayCardResult(card, highHandCards))}
          </View>
        </>
      )}
      <View flex-4 center>
        <ScrollHandPicker
          isAnswering={isAnswering}
          answer={correctAnswer}
          isCorrectAnswer={answerCorrect}
          onSubmit={submitAnswer}
        />
      </View>
      <View flex row>
        <Pressable
          onPress={() => navigation.navigate("CheatSheetModal")}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1
          })}
        >
          <FontAwesome
            name="question-circle"
            size={40}
            color={Colors[colorScheme].tabIconDefault}
            style={{ marginRight: 15, marginTop: 10 }}
          />
        </Pressable>
      </View>
    </View>
  )
}
