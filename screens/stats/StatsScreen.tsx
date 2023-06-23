import { useContext } from "react"
import { ScrollView } from "react-native"
import { Card, Text, View } from "react-native-ui-lib"
import { StatsContext } from "screens/stats/StatsContext"

export default function StatsScreen() {
  const { highScore, highScoreBeaten } = useContext(StatsContext)

  return (
    <View flex backgroundColor="white">
      <ScrollView>
        <View paddingV-50 paddingH-20>
          <Text text40 $textDefault marginB-20>
            Stats
          </Text>
          <Card marginB-30 padding-20 borderRadius={15}>
            <View row spread marginB-20>
              <Text text70BO $textDefault>
                High Score
              </Text>
              <Text text70BO $textDefault grey40>
                {highScore}
              </Text>
            </View>
            <View row spread marginB-20>
              <Text text70BO $textDefault>
                High Score Beaten
              </Text>
              <Text text70BO $textDefault grey40>
                {highScoreBeaten}
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  )
}
