import { Text } from "react-native-ui-lib"

type Props = {
  score: number
  highScore: number
}

export const Score = ({ score, highScore }: Props) => {
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
