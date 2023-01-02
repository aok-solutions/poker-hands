import { StyleSheet } from "react-native"
import { Text, View } from "components/Themed"

type Props = {
  time: number
}

export const Timer = ({ time }: Props) => (
  <View style={styles.clock}>
    <Text style={styles.text}>{time}</Text>
  </View>
)

const styles = StyleSheet.create({
  clock: {
    height: 50,
    width: 50,
    backgroundColor: "steelblue",
    borderRadius: 5000
  },
  text: {
    textAlign: "center",
    lineHeight: 50,
    color: "white",
    fontWeight: "bold"
  }
})
