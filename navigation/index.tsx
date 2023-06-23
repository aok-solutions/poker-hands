/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LinkingConfiguration from "navigation/LinkingConfiguration"
import { ColorSchemeName } from "react-native"
import { Colors } from "react-native-ui-lib"
import CheatSheetModal from "screens/CheatSheetModal"
import GamesScreen from "screens/GamesScreen"
import NotFoundScreen from "screens/NotFoundScreen"
import StatsScreen from "screens/StatsScreen"
import NameThatHandGame from "screens/games/NameThatHandGame"
import { RootStackParamList, RootTabParamList } from "types"

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTintColor: Colors.primary
      }}
    >
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
      <Stack.Screen
        name="NameThatHandGame"
        component={NameThatHandGame}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="CheatSheetModal"
          component={CheatSheetModal}
          options={{ title: "", headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Games"
      screenOptions={{
        tabBarStyle: { borderTopWidth: 0, elevation: 0 },
        tabBarActiveTintColor: Colors.primary
      }}
    >
      <BottomTab.Screen
        name="Games"
        component={GamesScreen}
        options={{
          title: "",
          headerStyle: { shadowOpacity: 0, elevation: 0 },
          tabBarIcon: ({ color }) => <TabBarIcon name="gamepad" color={color} />
        }}
      />
      <BottomTab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          title: "",
          headerStyle: { shadowOpacity: 0, elevation: 0 },
          tabBarIcon: ({ color }) => <Ionicons name="stats-chart" size={40} color={color} />
        }}
      />
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"]
  color: string
}) {
  return <FontAwesome size={40} style={{ marginBottom: -10 }} {...props} />
}
