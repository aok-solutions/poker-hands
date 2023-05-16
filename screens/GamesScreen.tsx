import { FontAwesome } from "@expo/vector-icons"
import chipsStackedImage from "assets/images/chips-stacked.png"
import nameThatHandImage from "assets/images/name-that-hand.png"
import { ScrollView } from "react-native"
import { Button, Card, Text, View } from "react-native-ui-lib"
import { RootTabScreenProps } from "types"

export default function GamesScreen({ navigation }: RootTabScreenProps<"Games">) {
  const borderRadius = 15
  return (
    <View flex backgroundColor="white">
      <ScrollView>
        <View paddingV-50 paddingH-20>
          <Text text40 $textDefault marginB-20>
            Games
          </Text>
          <Card row marginB-30 borderRadius={borderRadius}>
            <View flex-3 padding-20>
              <Text text60 $textDefault>
                Name That Hand
              </Text>
              <Text text70 $textDefault>
                Select the highest possible hand combination!
              </Text>
              <View row>
                <Button
                  text90
                  marginT-30
                  label="Play Now"
                  onPress={() => navigation.navigate("NameThatHandGame")}
                  iconOnRight
                  iconSource={() => (
                    <FontAwesome
                      size={10}
                      color="white"
                      style={{ marginLeft: 5 }}
                      name="arrow-right"
                    />
                  )}
                />
              </View>
            </View>
            <Card.Section
              flex-2
              imageSource={nameThatHandImage}
              imageStyle={{ width: "100%", height: 180 }}
            />
          </Card>
          <Card row marginB-30 borderRadius={borderRadius}>
            <Card.Section
              flex-2
              imageSource={chipsStackedImage}
              imageStyle={{ width: "100%", height: 180 }}
            />
            <View flex-3 padding-20>
              <Text text60 $textDefault>
                High Hand
              </Text>
              <Text text70 $textDefault>
                Which hand trumps the other?
              </Text>
              <View row>
                <Button text90 marginT-30 link label="Coming Soon" />
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  )
}
