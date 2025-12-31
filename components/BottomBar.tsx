import styles from '@/styles/index.styles';
import { Feather } from '@expo/vector-icons';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import AnimatedGradientBorder from './AnimatedGradientBorder';

export default function BottomBar({ expand, onPress }: any) {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
        <Animated.View style={{ marginLeft: expand, marginRight: expand }}>
          <AnimatedGradientBorder
            colors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#ff6b6b']}
            borderWidth={3}
            borderRadius={28}
          >
            <View style={styles.filterButton}>
              <Feather name="sliders" size={16} color="#fff" />
              <Text style={styles.filterButtonText}>Preferences</Text>
            </View>
          </AnimatedGradientBorder>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}
