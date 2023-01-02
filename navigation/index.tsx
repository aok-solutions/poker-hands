/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import * as React from "react"
import { ColorSchemeName } from "react-native"

import Colors from "constants/Colors"
import useColorScheme from "hooks/useColorScheme"
import CheatSheetModal from "screens/CheatSheetModal"
import NotFoundScreen from "screens/NotFoundScreen"
import GamesScreen from "screens/GamesScreen"
import PreferencesScreen from "screens/PreferencesScreen"
import NameThatHandGame from "screens/games/NameThatHandGame"
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from "types"
import LinkingConfiguration from "navigation/LinkingConfiguration"

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
  const colorScheme = useColorScheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors[colorScheme].tint,
        headerShadowVisible: false,
        headerBackTitleVisible: false
      }}
    >
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
      <Stack.Screen
        name="NameThatHandGame"
        component={NameThatHandGame}
        options={({ navigation }: RootTabScreenProps<"NameThatHandGame">) => ({
          title: "",
          headerStyle: { shadowOpacity: 0, elevation: 0 }
        })}
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
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName="Games"
      screenOptions={{
        tabBarStyle: { borderTopWidth: 0, elevation: 0 },
        tabBarActiveTintColor: Colors[colorScheme].tint
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
        name="Preferences"
        component={PreferencesScreen}
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />
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
