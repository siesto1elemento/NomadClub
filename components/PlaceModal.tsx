import styles from '@/styles/index.styles';
import { Entypo, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Dimensions, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const SAFETY_CATEGORY_MAP = {
  "Safe": { score: 10 },
  "Moderate": { score: 5 },
  "Unsafe": { score: 2 }
};

const CRIME_CATEGORY_MAP = {
  "Very Low": { score: 10 },
  "Low": { score: 7 },
  "Moderate": { score: 5 },
  "High": { score: 3 },
  "Very High": { score: 1 },
};

const COFFEE_CULTURE_MAP = {
  "Excellent": { score: 10 },
  "Good": { score: 8 },
  "Limited": { score: 5 },
};

const FOOD_SCENE_MAP = {
  "Excellent": { score: 10 },
  "Good": { score: 8 },
  "Limited": { score: 5 },
  "Poor": { score: 2 },
};

const CLEANLINESS_MAP = {
  "Excellent": { score: 10 },
  "Good": { score: 8 },
  "Limited": { score: 5 },
  "Poor": { score: 2 },
};

const NIGHTLIFE_MAP = {
  "Excellent": { score: 10 },
  "Good": { score: 8 },
  "Limited": { score: 5 },
  "Poor": { score: 2 },
};

const COWORKING_MAP = {
  "Excellent": { score: 10 },
  "Good": { score: 8 },
  "Limited": { score: 5 },
  "Poor": { score: 2 },
};

const POWER_MAP = {
  "Excellent": { score: 10 },
  "Good": { score: 8 },
  "Limited": { score: 5 },
  "Poor": { score: 2 },
};

const CAFES_MAP = {
  "Excellent": { score: 10 },
  "Good": { score: 8 },
  "Limited": { score: 5 },
  "Poor": { score: 2 },
};

const NOMAD_COMMUNITY_MAP = {
  "Excellent": { score: 10 },
  "Good": { score: 8 },
  "Okay": { score: 6 },
  "Limited": { score: 4 },
};

const WALKABILITY_MAP = {
  "Excellent": { score: 10 },
  "Good": { score: 8 },
  "Okay": { score: 6 },
  "Limited": { score: 4 },
};

const TRANSIT_MAP = {
  "World-Class": { score: 10 },
  "Excellent": { score: 9 },
  "Okay": { score: 6 },
  "Limited": { score: 4 },
  "Minimal": { score: 2 },
};

const BIKEABILITY_MAP = {
  "Biker's Dream": { score: 10 },
  "Excellent": { score: 9 },
  "Okay": { score: 6 },
  "Bad": { score: 3 },
  "Very-Bad": { score: 1 },
};

const GREEN_SPACES_MAP = {
  "Excellent": { score: 10 },
  "Good": { score: 8 },
  "Limited": { score: 5 },
  "Poor": { score: 2 },
};

type PlaceModalProps = {
  visible: boolean;
  place: any | null;
  onClose: () => void;
};

export default function PlaceModal({
  visible,
  place,
  onClose,
}: PlaceModalProps) {
  const [fontsLoaded] = useFonts({
    'DancingScript-Bold': require('../assets/fonts/DancingScript-Bold.ttf'),
    'Inter': require('../assets/fonts/Inter.ttf')
  });

  if (!place) return null;

  const getScoreColor = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (numValue >= 8) return ['#10b981', '#059669'];
    if (numValue >= 7) return ['#84cc16', '#65a30d'];
    if (numValue >= 6) return ['#eab308', '#ca8a04'];
    if (numValue >= 5) return ['#f97316', '#ea580c'];
    return ['#ef4444', '#dc2626'];
  };

  const getScoreEmoji = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (numValue >= 8) return '🔥';
    if (numValue >= 7) return '✨';
    if (numValue >= 6) return '👍';
    if (numValue >= 5) return '⚠️';
    return '👎';
  };

  const ScoreBar = ({ value, max = 10 }: { value: any; max?: number }) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    const percentage = (numValue / max) * 100;
    const colors = getScoreColor(numValue);

    return (
      <View style={modalStyles.scoreBarContainer}>
        <View style={modalStyles.scoreBarTrack}>
          <View style={[modalStyles.scoreBarFill, { width: `${percentage}%`, backgroundColor: colors[0] }]} />
        </View>
      </View>
    );
  };

  const MetricCard = ({
    icon,
    label,
    value,
    accentColor = '#6366f1',
    iconType = 'feather'
  }: {
    icon: string;
    label: string;
    value: any;
    accentColor?: string;
    iconType?: 'feather' | 'fontawesome5' | 'entypo';
  }) => {
    if (!value) return null;

    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    const displayValue = typeof value === 'number' && !isNaN(numValue) ? numValue.toFixed(1) : value;
    const isNumeric = !isNaN(numValue);

    const renderIcon = () => {
      if (iconType === 'fontawesome5') {
        return <FontAwesome5 name={icon} size={25} color={accentColor} />;
      }
      if (iconType === 'entypo') {
        return <Entypo name={icon as any} size={25} color={accentColor} />;
      }
      return <Feather name={icon as any} size={25} color={accentColor} />;
    };

    return (
      <View style={modalStyles.metricCard}>
        <View style={modalStyles.metricTop}>
          <View style={[modalStyles.iconBubble, { backgroundColor: accentColor + '12' }]}>
            {renderIcon()}
          </View>
          {isNumeric && (
            <Text style={modalStyles.metricEmoji}>{getScoreEmoji(numValue)}</Text>
          )}
        </View>
        <Text style={modalStyles.metricLabel}>{label}</Text>
        <Text style={[modalStyles.metricValue, isNumeric && { color: getScoreColor(numValue)[0] }]}>
          {displayValue}
        </Text>
        {isNumeric && <ScoreBar value={numValue} />}
      </View>
    );
  };

  const HeroCard = () => {
    const totalCost = (parseFloat(place.rent || 0) + parseFloat(place.groceries || 0));

    return (
      <View style={modalStyles.heroCard}>
        <View style={modalStyles.heroGradient}>
          <View style={modalStyles.heroPattern} />
          <View style={modalStyles.heroContent}>
            <View style={modalStyles.heroTop}>
              <View>
                <Text style={modalStyles.heroLabel}>Monthly Budget</Text>
                <Text style={modalStyles.heroValue}>${totalCost.toLocaleString()}</Text>
              </View>
              <View style={modalStyles.costBreakdown}>
                <View style={modalStyles.costItem}>
                  <Feather name="home" size={15} color="#fff" />
                  <Text style={modalStyles.costText}>${place.rent || 0}</Text>
                </View>
                <View style={modalStyles.costItem}>
                  <Feather name="shopping-cart" size={15} color="#fff" />
                  <Text style={modalStyles.costText}>${place.groceries || 0}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const SafetyDashboard = () => {
    const safetyKey = place.safety_index?.trim();
    const crimeKey = place.crime_index?.trim();

    const safetyScore = SAFETY_CATEGORY_MAP[safetyKey]?.score ?? 5;
    const crimeScore = CRIME_CATEGORY_MAP[crimeKey]?.score ?? 5;
    const overallSafety = (safetyScore + crimeScore) / 2;

    return (
      <View style={modalStyles.safetyDashboard}>
        <View style={modalStyles.safetyHeader}>
          <View style={modalStyles.safetyBadge}>
            <Feather name="shield" size={22} color="#fff" />
          </View>
          <View>
            <Text style={modalStyles.safetyTitle}>Safety Score</Text>
            <Text style={modalStyles.safetySubtitle}>Overall rating</Text>
          </View>
          <View style={modalStyles.safetyScoreCircle}>
            <Text style={modalStyles.safetyScoreText}>{overallSafety.toFixed(1)}</Text>
          </View>
        </View>
        <View style={modalStyles.safetyGrid}>
          <View style={modalStyles.safetyMiniCard}>
            <Feather name="sun" size={28} color="#fbbf24" />
            <Text style={modalStyles.safetyMiniLabel}>Day</Text>
            <Text style={modalStyles.safetyMiniValue}>{place.safety_day || 'N/A'}</Text>
          </View>
          <View style={modalStyles.safetyMiniCard}>
            <Feather name="moon" size={28} color="#818cf8" />
            <Text style={modalStyles.safetyMiniLabel}>Night</Text>
            <Text style={modalStyles.safetyMiniValue}>{place.safety_night || 'N/A'}</Text>
          </View>
          <View style={modalStyles.safetyMiniCard}>
            <Feather name="alert-circle" size={28} color="#ef4444" />
            <Text style={modalStyles.safetyMiniLabel}>Crime</Text>
            <Text style={modalStyles.safetyMiniValue}>{place.crime_index || 'N/A'}</Text>
          </View>
        </View>
      </View>
    );
  };

  const CategorySection = ({
    title,
    icon,
    color,
    children
  }: {
    title: string;
    icon: string;
    color: string;
    children: React.ReactNode;
  }) => (
    <View style={modalStyles.categorySection}>
      <View style={modalStyles.categoryHeader}>
        <View style={[modalStyles.categoryIcon, { backgroundColor: color + '15' }]}>
          <Feather name={icon as any} size={22} color={color} />
        </View>
        <Text style={modalStyles.categoryTitle}>{title}</Text>
        <View style={[modalStyles.categoryLine, { backgroundColor: color + '20' }]} />
      </View>
      <View style={modalStyles.categoryGrid}>
        {children}
      </View>
    </View>
  );

  const coffee_culture_key = place.coffee_culture?.trim();
  const coffee_culture_value = COFFEE_CULTURE_MAP[coffee_culture_key]?.score ?? 5;

  const food_scene_key = place.food_scene?.trim();
  const food_scene_value = FOOD_SCENE_MAP[food_scene_key]?.score ?? 5;

  const cleanliness_key = place.cleanliness?.trim();
  const cleanliness_value = CLEANLINESS_MAP[cleanliness_key]?.score ?? 5;

  const nightlife_key = place.nightlife?.trim();
  const nightlife_value = NIGHTLIFE_MAP[nightlife_key]?.score ?? 5;

  const coworking_key = place.coworking?.trim();
  const coworking_value = COWORKING_MAP[coworking_key]?.score ?? 5;

  const power_key = place.power?.trim();
  const power_value = POWER_MAP[power_key]?.score ?? 5;

  const cafes_key = place.cafes?.trim();
  const cafes_value = CAFES_MAP[cafes_key]?.score ?? 5;

  const nomad_community_key = place.nomad_community?.trim();
  const nomad_community_value = NOMAD_COMMUNITY_MAP[nomad_community_key]?.score ?? 5;

  const walkability_key = place.walkability?.trim();
  const walkability_value = WALKABILITY_MAP[walkability_key]?.score ?? 5;

  const transit_key = place.transit?.trim();
  const transit_value = TRANSIT_MAP[transit_key]?.score ?? 5;

  const bikeability_key = place.bikeability?.trim();
  const bikeability_value = BIKEABILITY_MAP[bikeability_key]?.score ?? 5;

  const green_spaces_key = place.green_spaces?.trim();
  const green_spaces_value = GREEN_SPACES_MAP[green_spaces_key]?.score ?? 5;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Pressable style={modalStyles.backdrop} onPress={onClose} />
        <View style={[styles.modalContent, modalStyles.enhancedModal]}>
          {/* HEADER */}
          <View style={modalStyles.header}>
            <ImageBackground
              source={{ uri: place.background_image }}
              style={modalStyles.headerImage}
              resizeMode="cover"
            >
              <View style={modalStyles.headerOverlay}>
                <View style={modalStyles.headerContent}>
                  <View style={modalStyles.headerTop}>
                    <View style={modalStyles.headerLeft}>
                      <View style={modalStyles.titlePill}>
                        <Text style={modalStyles.title}>{place.title}</Text>
                      </View>
                      

                      <View style={modalStyles.locationRow}>
                        <View style={modalStyles.locationPill}>
                          <Feather name="map-pin" size={13} color="#fff" />
                          <Text style={modalStyles.locationText}>{place.country}</Text>
                        </View>

                        {place.region && (
                          <View style={modalStyles.regionPill}>
                            <Text style={modalStyles.regionText}>{place.region}</Text>
                          </View>
                        )}
                      </View>
                    </View>

                    <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
                      <View style={modalStyles.closeCircle}>
                        <Feather name="x" size={22} color="#64748b" />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>

          {/* BODY */}
          <ScrollView
            contentContainerStyle={modalStyles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <HeroCard />
            <SafetyDashboard />

            <CategorySection title="Lifestyle Vibes" icon="heart" color="#ec4899">
              <MetricCard icon="coffee" label="Coffee Culture" value={coffee_culture_value} accentColor="#8b5cf6" />
              <MetricCard icon="award" label="Food Scene" value={food_scene_value} accentColor="#ec4899" />
              <MetricCard icon="droplet" label="Cleanliness" value={cleanliness_value} accentColor="#06b6d4" />
              <MetricCard icon="music" label="Nightlife" value={nightlife_value} accentColor="#f59e0b" />
            </CategorySection>

            <CategorySection title="Remote Work Hub" icon="briefcase" color="#3b82f6">
              <MetricCard icon="wifi" label="Coworking" value={coworking_value} accentColor="#3b82f6" />
              <MetricCard icon="zap" label="Power Grid" value={power_value} accentColor="#eab308" />
              <MetricCard icon="coffee" label="Work Cafés" value={cafes_value} accentColor="#8b5cf6" />
              <MetricCard icon="users" label="Nomad Scene" value={nomad_community_value} accentColor="#06b6d4" />
            </CategorySection>

            <CategorySection title="Getting Around" icon="navigation" color="#10b981">
              <MetricCard icon="walking" label="Walkability" value={walkability_value} accentColor="#10b981" iconType="fontawesome5" />
              <MetricCard icon="truck" label="Public Transit" value={transit_value} accentColor="#3b82f6" />
              <MetricCard icon="wind" label="Bikeability" value={bikeability_value} accentColor="#84cc16" />
              {place.green_spaces && (
                <MetricCard icon="tree" label="Green Spaces" value={green_spaces_value} accentColor="#059669" iconType="entypo" />
              )}
            </CategorySection>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(15,23,42,0.6)',
  },

  enhancedModal: {
    maxHeight: '92%',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
  },

  header: {
    overflow: 'hidden',
  },

  headerGradient: {
    backgroundColor: '#6366f1',
    paddingTop: 24,
    paddingBottom: 20,
  },

  headerContent: {
    paddingHorizontal: 20,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  headerLeft: {
    flex: 1,
    marginRight: 16,
    alignItems: 'flex-start',
    includeFontPadding: false,
    justifyContent: 'center',

  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    fontFamily: 'Inter',
    color: '#ffffffff',
    letterSpacing: -0.8,
    marginBottom: 12,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 12,
    borderRadius:18,

  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },

  locationText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#ffffff',
    letterSpacing: 0.2,
  },

  regionPill: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },

  regionText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#ffffff',
    letterSpacing: 0.2,
  },

  closeCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 48,
    backgroundColor: '#fafafa',
  },

  heroCard: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.1)',
  },

  heroGradient: {
    backgroundColor: '#6366f1',
  },

  heroContent: {
    padding: 24,
  },

  heroTop: {
    gap: 0,
  },

  heroLabel: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: 'rgba(255,255,255,0.75)',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 8,
  },

  heroValue: {
    fontSize: 42,
    fontWeight: '800',
    fontFamily: 'Inter',
    color: '#ffffff',
    letterSpacing: -1.5,
  },

  costBreakdown: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },

  costItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },

  costText: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#ffffff',
    letterSpacing: 0.3,
  },

  safetyDashboard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 22,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },

  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 14,
  },

  safetyBadge: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  safetyTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#0f172a',
    letterSpacing: -0.3,
  },

  safetySubtitle: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#64748b',
    letterSpacing: 0.1,
  },

  safetyScoreCircle: {
    marginLeft: 'auto',
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#ecfdf5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#d1fae5',
  },

  safetyScoreText: {
    fontSize: 24,
    fontWeight: '800',
    fontFamily: 'Inter',
    color: '#10b981',
    letterSpacing: -0.5,
  },

  safetyScoreMax: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#64748b',
  },

  safetyGrid: {
    flexDirection: 'row',
    gap: 12,
  },

  safetyMiniCard: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  safetyMiniLabel: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#64748b',
    textTransform: 'uppercase',
    marginTop: 8,
    letterSpacing: 0.8,
  },

  safetyMiniValue: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#0f172a',
    marginTop: 4,
    letterSpacing: 0.2,
  },

  categorySection: {
    marginBottom: 32,
  },

  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    gap: 12,
  },

  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryTitle: {
    fontSize: 19,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#0f172a',
    letterSpacing: -0.4,
  },

  categoryLine: {
    flex: 1,
    height: 2,
    borderRadius: 2,
    marginLeft: 10,
  },

  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  metricCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    flexBasis: '48%',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },

  metricTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  iconBubble: {
    width: 40,
    height: 40,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },

  metricEmoji: {
    fontSize: 20,
    opacity: 0.7,
  },

  metricLabel: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },

  metricValue: {
    fontSize: 26,
    fontWeight: '800',
    fontFamily: 'Inter',
    color: '#0f172a',
    marginBottom: 10,
    letterSpacing: -0.5,
  },

  scoreBarContainer: {
    width: '100%',
  },

  scoreBarTrack: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
    overflow: 'hidden',
  },

  scoreBarFill: {
    height: '100%',
    borderRadius: 999,
  },

  headerImage: {
    paddingTop: 28,
    paddingBottom: 24,
  },
});