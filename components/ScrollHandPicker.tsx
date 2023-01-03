import { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { Chip } from "@rneui/themed"
import { Button, Incubator, View } from "react-native-ui-lib"

import { Hand } from "components/PokerHand"

type Props = {
  isAnswering: boolean
  answer?: string
  isCorrectAnswer: boolean
  onSubmit: (value: string) => void
}

type icon = "arrow-up" | "check" | "ban"
type color = "#5A48F5" | "#00A87E" | "#FC3D2F"

export default function ScrollHandPicker({
  isAnswering,
  answer,
  isCorrectAnswer,
  onSubmit
}: Props): JSX.Element {
  const [selectedValue, setSelectedValue] = useState("")
  const [submittedAnswer, setSubmittedAnswer] = useState("")
  const [buttonIcon, setButtonIcon] = useState<icon>("arrow-up")
  const [buttonColor, setButtonColor] = useState<color>("#5A48F5")

  const toOption = (value: string) => {
    return { label: value, value }
  }

  const getAnswer = (value: string | undefined) => value || "HighCard"

  useEffect(() => {
    if (isAnswering) {
      setButtonIcon("arrow-up")
      setButtonColor("#5A48F5")
    } else if (isCorrectAnswer) {
      setButtonIcon("check")
      setButtonColor("#00A87E")
    } else {
      setButtonIcon("ban")
      setButtonColor("#FC3D2F")
    }
  }, [isAnswering, isCorrectAnswer])

  return (
    <View flex row>
      <View flex-3 center margin-10 styles={{ overflow: "hidden", borderRadius: 10 }}>
        <View>
          <Incubator.WheelPicker
            items={Object.keys(Hand)
              .filter((key) => !isNaN(Number(Hand[key])))
              .map(toOption)}
            onChange={(data: string) => setSelectedValue(data)}
            itemHeight={50}
          />
        </View>
      </View>
      <View flex-2 row center>
        <View flex>
          <Button
            label={isAnswering ? getAnswer(selectedValue) : getAnswer(submittedAnswer)}
            backgroundColor={buttonColor}
            onPress={() => {
              if (isAnswering) {
                setSubmittedAnswer(selectedValue)
                onSubmit(selectedValue)
              }
            }}
            iconOnRight
            iconSource={(_iconStyle) => (
              <FontAwesome name={buttonIcon} size={20} color="white" style={{ marginLeft: 10 }} />
            )}
          />
          {!(isCorrectAnswer || isAnswering) ? (
            <Chip
              title={answer?.toString() || ""}
              color={"lightgrey"}
              containerStyle={styles.correctAnswer}
            />
          ) : null}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  correctAnswer: {
    position: "absolute",
    top: -30
  }
})
