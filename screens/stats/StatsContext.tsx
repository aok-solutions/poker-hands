import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, ReactNode, useEffect, useState } from "react"

export type Value = {
  highScore: number
  setHighScore: (score: number) => void
  highScoreBeaten: number
  setHighScoreBeaten: (times: number) => void
}

export const StatsContext = createContext<Value>({} as Value)

type Props = {
  children: ReactNode
}

export const StatsProvider = ({ children }: Props) => {
  const [highScore, setHighScore] = useState<number>(0)
  const [highScoreBeaten, setHighScoreBeaten] = useState<number>(0)

  useEffect(() => {
    AsyncStorage.getItem("highScore").then((value) => setHighScore(Number(value) ?? 0))
    AsyncStorage.getItem("highScoreBeaten").then((value) => setHighScoreBeaten(Number(value) ?? 0))
  })

  return (
    <StatsContext.Provider value={{ highScore, setHighScore, highScoreBeaten, setHighScoreBeaten }}>
      {children}
    </StatsContext.Provider>
  )
}
