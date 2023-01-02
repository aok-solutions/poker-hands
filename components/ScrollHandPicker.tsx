import { useState } from "react"
import { FontAwesome } from "@expo/vector-icons"
import { Button, Incubator, View } from "react-native-ui-lib"

import { Hand } from "components/PokerHand"
import * as React from "react"
import { AnswerBadge } from "./AnswerBadge"

type Props = {
  correctAnswer?: string
  answerCorrect: boolean
  onSubmit: (value: string) => void
  isDisabled: boolean
}

export default function ScrollHandPicker({
  correctAnswer,
  answerCorrect,
  onSubmit,
  isDisabled
}: Props): JSX.Element {
  const [selectedValue, setSelectedValue] = useState("")

  const toOption = (value: string) => {
    return { label: value, value }
  }

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
            label={selectedValue || "HighCard"}
            onPress={() => onSubmit(selectedValue)}
            iconOnRight
            iconSource={(_iconStyle) => (
              <FontAwesome name="arrow-up" size={20} color="white" style={{ marginLeft: 10 }} />
            )}
            disabled={isDisabled}
          />
          {correctAnswer ? (
            <AnswerBadge
              answerCorrect={answerCorrect}
              text={answerCorrect ? "" : correctAnswer?.toString() || ""}
            />
          ) : null}
        </View>
      </View>
    </View>
  )
}
