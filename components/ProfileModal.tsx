import styles from '@/styles/index.styles';
import { Feather } from '@expo/vector-icons';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileModal({ visible, onClose, onSaved }: any) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.profileModalOverlay}>
        <View style={styles.profileModalContent}>
          <View style={styles.profileModalHeader}>
            <Text style={styles.profileModalTitle}>Profile</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.profileModalBody}>
            <Pressable style={styles.savedPlaces} onPress={onSaved}>
              <Feather name="map-pin" size={24} />
              <Text>Saved Places</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
