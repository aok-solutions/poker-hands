import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, ReactNode, useEffect, useState } from "react"

export type Value = {
  highScore: number
  setHighScore: (score: number) => void
}

export const ScoreContext = createContext<Value>({} as Value)

type Props = {
  children: ReactNode
}

export const ScoreProvider = ({ children }: Props) => {
  const [highScore, setHighScore] = useState<number>(0)

  useEffect(() => {
    AsyncStorage.getItem("highScore").then((value) => setHighScore(Number(value) ?? 0))
  })

  return (
    <ScoreContext.Provider value={{ highScore, setHighScore }}>{children}</ScoreContext.Provider>
  )
}
