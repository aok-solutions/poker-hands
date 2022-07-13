import { StatusBar } from 'expo-status-bar';
import { Image, Platform, StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import pokerHands from "../assets/images/poker-hands.png"

export default function CheatSheet() {
  return (
    <View style={styles.container}>
      <Image source={pokerHands} style={{ width: 300, height: 650 }} />


      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
