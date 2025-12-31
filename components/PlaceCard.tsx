import styles from '@/styles/index.styles';
import { Image, Pressable, Text, View } from 'react-native';

export default function PlaceCard({ item, onPress }: any ) {
  return (
    <View style={styles.card}>
        <Pressable style={{ flex: 1}} onPress={onPress}>
            <Image source={{ uri: item.background_image }} style={styles.image} />

                <View style={styles.overlay}>
                    <View style={styles.topRow}>
                    <View style={styles.countryBadge}>
                        <Text style={styles.countryText}>{item.country}</Text>
                    </View>
                    <Text style={styles.wifi}>{item.wifi_}</Text>
                    </View>

                    <View style={styles.bottomInfo}>
                    <Text style={styles.city}>{item.title}</Text>
                    <Text style={styles.cost}>${item.rent}/m</Text>
                    </View>
                </View>
        </Pressable>
    </View>
            
    
  );
}
