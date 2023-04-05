import { FontAwesome } from "@expo/vector-icons"
import { useMachine } from "@xstate/react"
import { Card, displayCard, displayCardResult, pokerCards } from "components/PlayingCard"
import { getHands, getHighHand, Hand } from "components/PokerHand"
import ScrollHandPicker from "components/ScrollHandPicker"
import { Timer } from "components/Timer"
import Colors from "constants/Colors"
import useColorScheme from "hooks/useColorScheme"
import { useEffect, useState } from "react"
import { Pressable } from "react-native"
import { Button, Colors as UiColors, Modal, Text, View } from "react-native-ui-lib"
import { RootTabScreenProps } from "types"
import { createMachine } from "xstate"

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
  predictableActionArguments: true,
  initial: "paused",
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
        END: "ended",
        EXIT: "exited"
      }
    },
    ended: {
      on: {
        PLAY: "playing",
        EXIT: "exited"
      }
    },
    exited: {}
  }
})

export default function NameThatHandGame({ navigation }: RootTabScreenProps<"NameThatHandGame">) {
  const [deck, setDeck] = useState<Card[]>(shuffle(fullDeck()))
  const [communityCards, setCommunityCards] = useState<Card[]>([])
  const [holeCards, setHoleCards] = useState<Card[]>([])
  const [highHand, setHighHand] = useState<Hand>()
  const [highHandCards, setHighHandCards] = useState<Card[]>([])
  const [correctAnswer, setCorrectAnswer] = useState<string>()
  const [answerCorrect, setAnswerCorrect] = useState<boolean>(false)
  const [isAnswering, setIsAnswering] = useState<boolean>(true)
  const [timer, setTimer] = useState<number>(1000)
  const [showStartModal, setShowStartModal] = useState(true)
  const [showPausedModal, setShowPausedModal] = useState(false)
  const [showGameOverModal, setShowGameOverModal] = useState(false)

  const [state, send] = useMachine(gameStateMachine)

  const isPlaying = state.matches("playing")
  const isExited = state.matches("exited")

  const colorScheme = useColorScheme()

  const shuffleDeck = () => setDeck(shuffle(fullDeck()))
  const submitAnswer = async (answer: string) => {
    setIsAnswering(false)

    answer = answer.trim().length === 0 ? "HighCard" : answer
    const highestHand: string = highHand ? highHand.toString() : Hand.HighCard.toString()
    const isAnswerCorrect = answer === highestHand

    setCorrectAnswer(highestHand)
    setAnswerCorrect(isAnswerCorrect)

    if (isAnswerCorrect) setTimer((time) => time + 200)
    else setTimer((time) => time - 300)

    const delayDuration = isAnswerCorrect ? 1000 : 3000

    await delay(delayDuration)
    await resumeGame()
  }

  const resumeGame = async () => {
    await shuffleDeck()
    setCorrectAnswer(undefined)
    setIsAnswering(true)
  }

  const resetGame = async () => {
    await shuffleDeck()
    setCorrectAnswer(undefined)
    setIsAnswering(true)
    setTimer(1000)
  }

  useEffect(() => {
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
    }, 1)
    if (timer <= 0) {
      resetGame().then(() => {
        send("END")
        setShowGameOverModal(true)
        clearInterval(interval)
      })
    }
    return () => clearInterval(interval)
  })

  useEffect(() => {
    if (isExited) navigation.navigate("Root", { screen: "Games" })
  }, [isExited])

  return (
    <View flex paddingH-20 paddingT-20 paddingB-60 bg-white>
      <Modal visible={showStartModal}>
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
              setShowStartModal(false)
              send("PLAY")
            }}
            size={Button.sizes.large}
          />
        </View>
      </Modal>
      <Modal visible={showPausedModal}>
        <View flex center>
          <View marginB-15>
            <Text $textDefault text40>
              Paused
            </Text>
          </View>
          <View>
            <Button
              label="Resume"
              labelStyle={{ fontWeight: "800" }}
              enableShadow
              iconOnRight
              iconSource={() => (
                <FontAwesome name="play" color="white" size={20} style={{ marginLeft: 10 }} />
              )}
              style={{ marginBottom: 10 }}
              onPress={() => {
                setShowPausedModal(false)
                send("PLAY")
              }}
            />
            <Button
              label="Exit"
              labelStyle={{ fontWeight: "800" }}
              enableShadow
              backgroundColor={UiColors.$backgroundDangerHeavy}
              iconOnRight
              iconSource={() => (
                <FontAwesome name="close" color="white" size={20} style={{ marginLeft: 10 }} />
              )}
              onPress={() => {
                setTimer(1000)
                setShowPausedModal(false)
                send("EXIT")
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal visible={showGameOverModal}>
        <View flex center>
          <View marginB-15>
            <Text $textDefault text40>
              Game Over
            </Text>
          </View>
          <View>
            <Button
              label="Play Again"
              labelStyle={{ fontWeight: "800" }}
              enableShadow
              iconOnRight
              iconSource={() => (
                <FontAwesome name="play" color="white" size={20} style={{ marginLeft: 10 }} />
              )}
              style={{ marginBottom: 10 }}
              onPress={() => {
                setShowGameOverModal(false)
                send("PLAY")
              }}
            />
            <Button
              label="Exit"
              labelStyle={{ fontWeight: "800" }}
              enableShadow
              backgroundColor={UiColors.$backgroundDangerHeavy}
              iconOnRight
              iconSource={() => (
                <FontAwesome name="close" color="white" size={20} style={{ marginLeft: 10 }} />
              )}
              onPress={() => {
                setTimer(1000)
                setShowGameOverModal(false)
                send("EXIT")
              }}
            />
          </View>
        </View>
      </Modal>
      <View flex-2 row spread>
        <View row centerV>
          <Timer time={timer} />
          <Button
            link
            iconSource={() => <FontAwesome name="pause" color={UiColors.grey20} size={30} />}
            size={Button.sizes.medium}
            style={{ marginLeft: 15 }}
            onPress={() => {
              setShowPausedModal(true)
              send("PAUSE")
            }}
          />
        </View>
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
