import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function GamesScreen({ navigation }: RootTabScreenProps<'Games'>) {
  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
