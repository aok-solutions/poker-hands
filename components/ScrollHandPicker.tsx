import { View } from "./Themed"
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native"
import * as React from "react"
import ScrollPicker from "react-native-wheel-scrollview-picker"
import { Hand } from "./PokerHand"
import { FontAwesome } from "@expo/vector-icons"
import { useState } from "react"

type Props = {
  height?: number
  onSubmit: (value: string) => void
}

export default function ScrollHandPicker({ height = 80, onSubmit }: Props): JSX.Element {
  const [selectedValue, setSelectedValue] = useState("")
  const propStyles: ViewStyle = {
    height: height
  }

  return (
    <View style={styles.container}>
      <View style={styles.scrollPickerContainer}>
        <View style={styles.scrollPicker}>
          <ScrollPicker
            dataSource={Object.keys(Hand).filter((key) => !isNaN(Number(Hand[key])))}
            selectedIndex={0}
            renderItem={(data) => <Text>{data}</Text>}
            onValueChange={(data: string, selectedIndex) => {
              setSelectedValue(data)
            }}
            wrapperHeight={300}
            wrapperColor="#FFFFFF"
            itemHeight={80}
            highlightColor="#d8d8d8"
            highlightBorderWidth={1}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.submitButton, propStyles]}
          onPress={() => onSubmit(selectedValue)}
        >
          <FontAwesome name="arrow-up" size={40} color="white" />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  scrollPickerContainer: {
    flex: 8,
    flexDirection: "column",
    justifyContent: "center",
    overflow: "hidden",
    borderColor: "#d8d8d8",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10
  },
  scrollPicker: {
    height: 300
  },
  buttonContainer: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center"
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    textAlign: "center"
  },
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: "lightblue"
  }
})
