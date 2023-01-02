import { Chip } from "@rneui/themed"
import * as React from "react"
import { StyleSheet } from "react-native"

type AnswerBadgeProps = {
  answerCorrect: boolean
  text: string
}

export const AnswerBadge = (props: AnswerBadgeProps) => {
  const correctStyles = {
    name: "check",
    type: "font-awesome"
  }

  const incorrectStyles = {
    name: "ban",
    type: "font-awesome-5"
  }

  const baseIconStyles = {
    size: 20,
    color: "white"
  }

  const iconStyle = props.answerCorrect
    ? { ...correctStyles, ...baseIconStyles }
    : { ...incorrectStyles, ...baseIconStyles }

  return (
    <Chip
      title={props.text || ""}
      icon={iconStyle}
      color={props.answerCorrect ? "success" : "error"}
      containerStyle={styles.badge}
    />
  )
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -28,
    left: -10
  }
})
