import { StyleSheet } from 'react-native';
import { AppleCard } from "react-native-apple-card-views"

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import nameThatHandImage from '../assets/images/name-that-hand.png'

export default function GamesScreen({ navigation }: RootTabScreenProps<'Games'>) {
  return (
    <View style={styles.container}>
      <AppleCard
        smallTitle=""
        largeTitle="Name That Hand"
        largeTitleTextStyle={{ fontSize: 50 }}
        backgroundStyle={{
          height: 300,
        }}
        footnoteText="Multiple choices, so pick the right one!"
        resizeMode="cover"
        source={nameThatHandImage}
        onPress={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 50
  },
});
