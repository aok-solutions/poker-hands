import * as React from "react"
import { useEffect, useState } from "react"
import { Text, View, StyleSheet, Pressable } from "react-native"
import { Card, pokerCards, Rank, Suit } from "../../components/Card"

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

  const shuffleDeck = () => setDeck(shuffle(fullDeck()))

  useEffect(() => {
    setDeck(shuffle(deck))
    setHoleCards(deck.splice(0, 2))
    setCommunityCards(deck.splice(0, 5))
  }, [deck])

  return (
    <View style={styles.container}>
      <View style={styles.community}>{communityCards}</View>
      <View style={styles.hole}>{holeCards}</View>
      <View style={{ flex: 4, justifyContent: "center", alignItems: "center" }}>
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
    paddingHorizontal: 30,
    paddingVertical: 80,
    flexDirection: "column",
    backgroundColor: "white"
  },
  community: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 65
  },
  hole: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 65
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 6,
    backgroundColor: "oldlace",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center"
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "coral"
  }
})
