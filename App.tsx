import { ScoreProvider } from "components/ScoreContext"
import { StatusBar } from "expo-status-bar"
import useCachedResources from "hooks/useCachedResources"
import useColorScheme from "hooks/useColorScheme"
import Navigation from "navigation"
import { SafeAreaProvider } from "react-native-safe-area-context"

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <ScoreProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ScoreProvider>
      </SafeAreaProvider>
    )
  }
}
