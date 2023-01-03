import * as Progress from "react-native-progress"
import { useEffect, useState } from "react"

type Props = {
  time: number
}

export const Timer = ({ time }: Props) => {
  const [timeRemaining, setTimeRemaining] = useState<number>()

  useEffect(() => {
    let timeLeft: number

    if (time > 30) timeLeft = 30
    else if (time < 0) timeLeft = 0
    else timeLeft = time

    setTimeRemaining(timeLeft / parseFloat("30"))
  }, [time])

  return <Progress.Pie progress={timeRemaining} size={50} borderWidth={0} color="#5A48F5" />
}
