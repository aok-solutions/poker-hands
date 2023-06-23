import { ScoreContext, Value } from "components/ScoreContext"
import { useContext } from "react"
import { Text } from "react-native-ui-lib"

type Props = {
  score: number
}

export const Score = ({ score }: Props) => {
  const { highScore } = useContext(ScoreContext) as Value

  return (
    <>
      <Text $textDefault text40BO primary>
        {score}
      </Text>
      <Text $textDefault text60BO grey40 marginL-5>
        {highScore}
      </Text>
    </>
  )
}
