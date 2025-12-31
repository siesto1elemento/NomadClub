import styles from '@/styles/index.styles';
import { Feather } from '@expo/vector-icons';
import { Animated, Text, TouchableOpacity } from 'react-native';

export default function TopBar({ padding, onProfile }: any) {
  return (
    <Animated.View style={[styles.topBar, { paddingBottom: padding }]}>
      <Text style={styles.brandName}>NomadClub</Text>
      <TouchableOpacity style={styles.profileButton} onPress={onProfile}>
        <Feather name="user" size={22} color="#333" />
      </TouchableOpacity>
    </Animated.View>
  );
}
