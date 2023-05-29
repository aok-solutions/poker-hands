import { Text, View } from "react-native-ui-lib"
import { ScrollView } from "react-native"

export default function StatsScreen() {
  return (
    <View flex backgroundColor="white">
      <ScrollView>
        <View paddingV-50 paddingH-20>
          <Text text40 $textDefault marginB-20>
            Stats
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}
