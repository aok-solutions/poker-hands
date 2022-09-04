import * as React from "react";
import {StyleSheet} from "react-native";
import {View} from "../../components/Themed";
import {Card, Rank, Suit} from "../../components/Card";

export default function NameThatHandGame() {
  return (
    <View style={styles.container}>
      <Card rank={Rank.Ace} suit={Suit.Spades} />
      <Card rank={Rank.Ace} suit={Suit.Clubs} />
      <Card rank={Rank.Ace} suit={Suit.Diamonds} />
      <Card rank={Rank.Ace} suit={Suit.Hearts} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 80,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
});
