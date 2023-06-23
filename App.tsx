import { StatusBar } from "expo-status-bar"
import useCachedResources from "hooks/useCachedResources"
import useColorScheme from "hooks/useColorScheme"
import Navigation from "navigation"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatsProvider } from "screens/stats/StatsContext"

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <StatsProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </StatsProvider>
      </SafeAreaProvider>
    )
  }
}
