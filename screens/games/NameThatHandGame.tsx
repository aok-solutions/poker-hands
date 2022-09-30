import * as React from "react"
import { useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import ScrollPicker from "react-native-wheel-scrollview-picker"
import { Card, pokerCards, Rank, Suit } from "../../components/Card"
import { getHands, Hand } from "../../components/PokerHand"

const fullDeck = (): Card[] => {
  let deck: Card[] = []
  Array.from(pokerCards.entries()).forEach(([suit, ranks]) => {
    Array.from(ranks.keys()).forEach((rank) => {
      deck.push(<Card key={`${Rank[rank]}${Suit[suit]}`} rank={rank} suit={suit} />)
    })
  })

  return deck
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)) // random index from 0 to i

    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

export default function NameThatHandGame() {
  const [deck, setDeck] = useState<Card[]>(fullDeck())
  const [communityCards, setCommunityCards] = useState<Card[]>([])
  const [holeCards, setHoleCards] = useState<Card[]>([])
  const [highHand, setHighHand] = useState<Hand>()

  const shuffleDeck = () => setDeck(shuffle(fullDeck()))

  useEffect(() => {
    setDeck(shuffle(deck))

    setHoleCards(deck.splice(0, 2))
    setCommunityCards(deck.splice(0, 5))
  }, [deck])

  useEffect(() => {
    setHighHand(getHands(holeCards, communityCards)[0])
  }, [holeCards, communityCards])

  return (
    <View style={styles.container}>
      <View style={styles.community}>{communityCards}</View>
      <View style={styles.hole}>{holeCards}</View>
      <View style={{ flex: 2, justifyContent: "space-around", alignItems: "center" }}>
        <View>
          <ScrollPicker
            dataSource={Object.keys(Hand).filter(key => !isNaN(Number(Hand[key])))}
            selectedIndex={0}
            renderItem={(data) => <Text>{data}</Text>}
            onValueChange={(data, selectedIndex) => {
              console.log(data)
            }}
            wrapperHeight={300}
            wrapperColor='#FFFFFF'
            itemHeight={60}
            highlightColor='#d8d8d8'
            highlightBorderWidth={2}
          />
        </View>
        <Pressable style={styles.button} onPress={() => shuffleDeck()}>
          <Text style={styles.buttonLabel}>Deal Cards</Text>
        </Pressable>
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
