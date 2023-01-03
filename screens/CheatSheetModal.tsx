import { StatusBar } from "expo-status-bar"
import { Image, Platform } from "react-native"
import { View } from "react-native-ui-lib"

import pokerHands from "assets/images/poker-hands.png"

export default function CheatSheetModal() {
  return (
    <View flex backgroundColor="white" center>
      <Image source={pokerHands} style={{ width: 300, height: 650 }} />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  )
}
