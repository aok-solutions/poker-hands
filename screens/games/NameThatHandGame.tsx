import * as React from "react"
import { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { View } from "../../components/Themed"
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

  useEffect(() => {
    setDeck(shuffle(deck))
    setHoleCards(deck.splice(0, 2))
    setCommunityCards(deck.splice(0, 5))
  }, [deck])

  return (
    <View style={styles.container}>
      <View style={styles.community}>{communityCards}</View>
      <View style={styles.hole}>{holeCards}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: "column"
  },
  community: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-evenly"
  },
  hole: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center"
  }
})
