// import { useState } from 'react';
// import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import data from '../data.json';

// const places = data.places;

// export default function Index() {
//   const [filterVisible, setFilterVisible] = useState(false);
//   const [selectedCountry, setSelectedCountry] = useState('All');
//   const [maxBudget, setMaxBudget] = useState(5000);
//   const [minWifi, setMinWifi] = useState(0);

//   // Get unique countries
//   const countries = ['All', ...new Set(places.map(p => p.country))];

//   // Filter places
//   const filteredPlaces = places.filter(place => {
//     if (selectedCountry !== 'All' && place.country !== selectedCountry) return false;
//     if (place.monthlyCostUSD > maxBudget) return false;
//     if (place.wifiMbps < minWifi) return false;
//     return true;
//   });

//   return (
//     <View style={styles.container}>
//       {/* Filter Button */}
//       <View style={styles.header}>
//         <TouchableOpacity 
//           style={styles.filterButton}
//           onPress={() => setFilterVisible(true)}
//         >
//           <Text style={styles.filterButtonText}>🔍 Filter ({filteredPlaces.length} places)</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Filter Modal */}
//       <Modal
//         visible={filterVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setFilterVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Filters</Text>
//               <TouchableOpacity onPress={() => setFilterVisible(false)}>
//                 <Text style={styles.closeButton}>✕</Text>
//               </TouchableOpacity>
//             </View>

//             <ScrollView style={styles.filterScroll}>
//               {/* Country Filter */}
//               <View style={styles.filterSection}>
//                 <Text style={styles.filterLabel}>Country</Text>
//                 <ScrollView 
//                   horizontal 
//                   showsHorizontalScrollIndicator={false}
//                   style={styles.chipScroll}
//                 >
//                   {countries.map(country => (
//                     <TouchableOpacity
//                       key={country}
//                       style={[
//                         styles.chip,
//                         selectedCountry === country && styles.chipActive
//                       ]}
//                       onPress={() => setSelectedCountry(country)}
//                     >
//                       <Text style={[
//                         styles.chipText,
//                         selectedCountry === country && styles.chipTextActive
//                       ]}>
//                         {country}
//                       </Text>
//                     </TouchableOpacity>
//                   ))}
//                 </ScrollView>
//               </View>

//               {/* Budget Filter */}
//               <View style={styles.filterSection}>
//                 <Text style={styles.filterLabel}>Max Budget: ${maxBudget}/month</Text>
//                 <View style={styles.chipContainer}>
//                   {[1500, 2000, 2500, 3000, 4000, 5000].map(budget => (
//                     <TouchableOpacity
//                       key={budget}
//                       style={[
//                         styles.chip,
//                         maxBudget === budget && styles.chipActive
//                       ]}
//                       onPress={() => setMaxBudget(budget)}
//                     >
//                       <Text style={[
//                         styles.chipText,
//                         maxBudget === budget && styles.chipTextActive
//                       ]}>
//                         ${budget}
//                       </Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               </View>

//               {/* WiFi Filter */}
//               <View style={styles.filterSection}>
//                 <Text style={styles.filterLabel}>Min WiFi Speed: {minWifi} Mbps</Text>
//                 <View style={styles.chipContainer}>
//                   {[0, 50, 100, 150, 200, 250].map(speed => (
//                     <TouchableOpacity
//                       key={speed}
//                       style={[
//                         styles.chip,
//                         minWifi === speed && styles.chipActive
//                       ]}
//                       onPress={() => setMinWifi(speed)}
//                     >
//                       <Text style={[
//                         styles.chipText,
//                         minWifi === speed && styles.chipTextActive
//                       ]}>
//                         {speed}+ Mbps
//                       </Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               </View>

//               {/* Reset Button */}
//               <TouchableOpacity 
//                 style={styles.resetButton}
//                 onPress={() => {
//                   setSelectedCountry('All');
//                   setMaxBudget(5000);
//                   setMinWifi(0);
//                 }}
//               >
//                 <Text style={styles.resetButtonText}>Reset All Filters</Text>
//               </TouchableOpacity>
//             </ScrollView>

//             {/* Apply Button */}
//             <TouchableOpacity 
//               style={styles.applyButton}
//               onPress={() => setFilterVisible(false)}
//             >
//               <Text style={styles.applyButtonText}>Apply Filters</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Places Grid */}
//       <ScrollView style={styles.scrollContainer}>
//         <View style={styles.grid}>
//           {filteredPlaces.length === 0 ? (
//             <Text style={styles.noResults}>No places match your filters</Text>
//           ) : (
//             Array.from({ length: Math.ceil(filteredPlaces.length / 2) }).map((_, rowIndex) => {
//               const firstPlace = filteredPlaces[rowIndex * 2];
//               const secondPlace = filteredPlaces[rowIndex * 2 + 1];
              
//               return (
//                 <View key={rowIndex} style={styles.row}>
//                   {/* First card */}
//                   <View style={styles.card}>
//                     <Image source={{ uri: firstPlace.image }} style={styles.image} />
//                     <View style={styles.overlay}>
//                       <View style={styles.topRow}>
//                         <View style={styles.countryBadge}>
//                           <Text style={styles.countryFlag}>{getCountryFlag(firstPlace.countryCode)}</Text>
//                           <Text style={styles.countryText}>{firstPlace.country}</Text>
//                         </View>
//                         <Text style={styles.wifi}>{firstPlace.wifiMbps} Mbps</Text>
//                       </View>
                      
//                       <View style={styles.bottomInfo}>
//                         <Text style={styles.city}>{firstPlace.city}</Text>
//                         <View style={styles.bottomRow}>
//                           <Text style={styles.cost}>${firstPlace.monthlyCostUSD}/m</Text>
//                           <Text style={styles.weather}>
//                             {firstPlace.weather.minC}° {firstPlace.weather.maxC}° {getWeatherIcon(firstPlace.weather.condition)}
//                           </Text>
//                         </View>
//                       </View>
//                     </View>
//                   </View>
                  
//                   {/* Second card */}
//                   {secondPlace && (
//                     <View style={styles.card}>
//                       <Image source={{ uri: secondPlace.image }} style={styles.image} />
//                       <View style={styles.overlay}>
//                         <View style={styles.topRow}>
//                           <View style={styles.countryBadge}>
//                             <Text style={styles.countryFlag}>{getCountryFlag(secondPlace.countryCode)}</Text>
//                             <Text style={styles.countryText}>{secondPlace.country}</Text>
//                           </View>
//                           <Text style={styles.wifi}>{secondPlace.wifiMbps} Mbps</Text>
//                         </View>
                        
//                         <View style={styles.bottomInfo}>
//                           <Text style={styles.city}>{secondPlace.city}</Text>
//                           <View style={styles.bottomRow}>
//                             <Text style={styles.cost}>${secondPlace.monthlyCostUSD}/m</Text>
//                             <Text style={styles.weather}>
//                               {secondPlace.weather.minC}° {secondPlace.weather.maxC}° {getWeatherIcon(secondPlace.weather.condition)}
//                             </Text>
//                           </View>
//                         </View>
//                       </View>
//                     </View>
//                   )}
//                 </View>
//               );
//             })
//           )}
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// function getCountryFlag(code) {
//   const flags = {
//     PT: '🇵🇹', MX: '🇲🇽', BG: '🇧🇬', RO: '🇷🇴', US: '🇺🇸', BR: '🇧🇷',
//     TH: '🇹🇭', SI: '🇸🇮', JP: '🇯🇵', AU: '🇦🇺', GB: '🇬🇧', ZA: '🇿🇦',
//     BA: '🇧🇦', RS: '🇷🇸', FR: '🇫🇷', IN: '🇮🇳', PL: '🇵🇱', EG: '🇪🇬',
//     NL: '🇳🇱', GR: '🇬🇷', HU: '🇭🇺', CZ: '🇨🇿', IT: '🇮🇹', EE: '🇪🇪'
//   };
//   return flags[code] || '🏳️';
// }

// function getWeatherIcon(condition) {
//   if (condition.includes('Rain')) return '🌧️';
//   if (condition.includes('Cloud')) return '☁️';
//   if (condition.includes('Partly')) return '⛅';
//   return '☀️';
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     backgroundColor: 'white',
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   filterButton: {
//     backgroundColor: '#2563eb',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   filterButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'flex-end',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: '80%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   closeButton: {
//     fontSize: 24,
//     color: '#666',
//   },
//   filterScroll: {
//     padding: 20,
//   },
//   filterSection: {
//     marginBottom: 24,
//   },
//   filterLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 12,
//     color: '#333',
//   },
//   chipScroll: {
//     flexGrow: 0,
//   },
//   chipContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   chip: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: '#f0f0f0',
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     marginRight: 8,
//   },
//   chipActive: {
//     backgroundColor: '#2563eb',
//     borderColor: '#2563eb',
//   },
//   chipText: {
//     fontSize: 14,
//     color: '#666',
//     fontWeight: '500',
//   },
//   chipTextActive: {
//     color: 'white',
//   },
//   resetButton: {
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   resetButtonText: {
//     color: '#666',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   applyButton: {
//     backgroundColor: '#2563eb',
//     padding: 16,
//     margin: 20,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   applyButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   scrollContainer: {
//     flex: 1,
//   },
//   grid: {
//     padding: 10,
//   },
//   noResults: {
//     textAlign: 'center',
//     padding: 40,
//     fontSize: 16,
//     color: '#666',
//   },
//   row: {
//     flexDirection: 'row',
//     gap: 10,
//     marginBottom: 10,
//   },
//   card: {
//     flex: 1,
//     height: 200,
//     borderRadius: 16,
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     position: 'absolute',
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.3)',
//     padding: 12,
//     justifyContent: 'space-between',
//   },
//   topRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   countryBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//     gap: 4,
//   },
//   countryFlag: {
//     fontSize: 14,
//   },
//   countryText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   wifi: {
//     color: 'white',
//     fontSize: 13,
//     fontWeight: '600',
//   },
//   bottomInfo: {
//     gap: 4,
//   },
//   city: {
//     color: 'white',
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   bottomRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   cost: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   weather: {
//     color: 'white',
//     fontSize: 13,
//   },
// });



// import { Feather } from '@expo/vector-icons';
// import { useFonts } from 'expo-font';
// import { useRouter } from 'expo-router';
// import { useRef, useState } from 'react';
// import { Animated, FlatList, Image, Modal, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import AnimatedGradientBorder from '../components/AnimatedGradientBorder';
// import data from '../data.json';
// import { db } from '../db';


// const PAGE_SIZE = 30

// function loadPage(page: number){
//   return db.getAllSync(
//     `
//     SELECT *
//     FROM places
//     LIMIT ? OFFSET ?
//     `,
//     [PAGE_SIZE, page * PAGE_SIZE]
//   )
// }


// const places = data.places;

// export default function Index() {

//   const router = useRouter();


//   const scrollY = useRef(new Animated.Value(0)).current;

//   const topBarPaddingVertical = scrollY.interpolate({
//     inputRange:[0, 50],
//     outputRange: [7, 16],
//     extrapolate: 'clamp',
//   });

//   const [fontsLoaded] = useFonts({
//     'DancingScript-Bold':require('../assets/fonts/DancingScript-Bold.ttf'),
//   });

//   const [filterVisible, setFilterVisible] = useState(false);
//   const [selectedCountry, setSelectedCountry] = useState('All');
//   const [maxBudget, setMaxBudget] = useState(5000);
//   const [minWifi, setMinWifi] = useState(0);
//   const buttonExpand = useRef(new Animated.Value(100)).current;

//   const [isModalOpen, setModalOpen ] = useState(false)

//   const countries = ['All', ...new Set(places.map(p => p.country))];

//   if (!fontsLoaded) {
//     return null; // or a loading component
//   }
//   const filteredPlaces = places.filter(place => {
//     if (selectedCountry !== 'All' && place.country !== selectedCountry) return false;
//     if (place.monthlyCostUSD > maxBudget) return false;
//     if (place.wifiMbps < minWifi) return false;
//     return true;
//   });

//   const [items, setItems] = useState([])
//   const [page, setPage] = useState(0);
//   const [loading, setLoading] = useState(false);

//   function loadMore() {
//   const rows = loadPage(page);

//   if (rows.length > 0) {
//     setItems(prev => [...prev, ...rows]);
//     setPage(prev => prev + 1);
//   }
//   }



//   const renderPlace = ({ item }) => (
//     <View style={styles.card}>
//       <Image source={{ uri: item.image }} style={styles.image} />
//       <View style={styles.overlay}>
//         <View style={styles.topRow}>
//           <View style={styles.countryBadge}>
//             <Text style={styles.countryFlag}>{getCountryFlag(item.countryCode)}</Text>
//             <Text style={styles.countryText}>{item.country}</Text>
//           </View>
//           <Text style={styles.wifi}>{item.wifiMbps} Mbps</Text>
//         </View>
        
//         <View style={styles.bottomInfo}>
//           <Text style={styles.city}>{item.city}</Text>
//           <View style={styles.bottomRow}>
//             <Text style={styles.cost}>${item.monthlyCostUSD}/m</Text>
//             <Text style={styles.weather}>
//               {item.weather.minC}° {item.weather.maxC}° {getWeatherIcon(item.weather.condition)}
//             </Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

//       <Animated.View style={[
//         styles.topBar,
//         { paddingBottom: topBarPaddingVertical}
//       ]}>
//         <Text style={styles.brandName}>NomadClub</Text>
//         <TouchableOpacity style={styles.profileButton} onPress={() => setModalOpen(true)}>
//           <Feather name="user" size={22} color="#333" />
//         </TouchableOpacity>
//       </Animated.View>

//       <Modal
//         visible={isModalOpen}
//         animationType='slide'
//         transparent={true}
//         onRequestClose={() => setModalOpen(false)}
//       >
//         {/* Layer 1: Full-screen overlay (background) */}
//         <View style={styles.profileModalOverlay}>
//           {/* Layer 2: Actual modal content with controlled size */}
//           <View style={styles.profileModalContent}>
//             <View style={styles.profileModalHeader}>
//               <Text style={styles.profileModalTitle}>Profile</Text>
//               <TouchableOpacity onPress={() => setModalOpen(false)}>
//                 <Feather name='x' size={24} color="#333" />
//               </TouchableOpacity>
//             </View>
            
//             <View style={styles.profileModalBody}>
//               <Pressable style={[styles.savedPlaces, {paddingTop: 5}]} onPress={() => {
//     setModalOpen(false);

//     requestAnimationFrame(() => {
//       router.push('/saved-places');
//     });
//   }}
// >
//                 <Feather name='map-pin' size={24} color="#333"></Feather>
//                 <Text style={{fontSize:15}}>Saved Places</Text>
//               </Pressable>
//               <View style={styles.savedPlaces}>
//                 <Feather name='calendar' size={24} color="#333"></Feather>
//                 <Text style={{fontSize:15}}>My Visits</Text>
//               </View>
//               <View style={styles.savedPlaces}>
//                 <Feather name='log-out' size={24} color="#333"></Feather>
//                 <Text style={{fontSize:15}}>Log out</Text>
//               </View>
//               <View style={styles.savedPlaces}>
//                 <Feather name='bell' size={24} color="#333"></Feather>
//                 <Text style={{fontSize:15}}>Alerts</Text>
//               </View>
//               <View style={styles.savedPlaces}>
//                 <Feather name='mail' size={24} color="#333"></Feather>
//                 <Text style={{fontSize:15}}>Email Preferences</Text>
//               </View>
//               <View style={styles.lastSavedPlaces}>
//                 <Feather name='trash' size={24} color="#da0303ff"></Feather>
//                 <Text style={{fontSize:15}}>Delete Account</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </Modal>


        

//       <Animated.FlatList
//         data={filteredPlaces}
//         renderItem={renderPlace}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         contentContainerStyle={styles.grid}
//         columnWrapperStyle={styles.row}
//         ListEmptyComponent={
//           <Text style={styles.noResults}>No places match your filters</Text>
//         }
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           {
//             useNativeDriver: false, // padding animations can't use native driver
//             listener: (event) => {
//               // Keep your existing button expand logic
//               const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
//               const isEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
//               Animated.timing(buttonExpand, {
//                 toValue: isEnd ? 12 : 100,
//                 duration: 300,
//                 useNativeDriver: false,
//               }).start();
//             },
//           }
//         )}
//         scrollEventThrottle={16}
//       />

//       <View style={styles.bottomBar}>
//         <TouchableOpacity
//           onPress={() => setFilterVisible(true)}
//           activeOpacity={0.85}
//         >
//           <Animated.View style={{ marginLeft: buttonExpand, marginRight: buttonExpand }}>
//             <AnimatedGradientBorder
//               colors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#ff6b6b']}
//               borderWidth={3}
//               borderRadius={28}
//             >
//               <View style={styles.filterButton}>
//                 <Feather name="sliders" size={16} color="#ffffff" />
//                 <Text style={styles.filterButtonText}>Preferences</Text>
//               </View>
//             </AnimatedGradientBorder>
//           </Animated.View>
//         </TouchableOpacity>
//       </View>

//       <Modal
//         visible={filterVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setFilterVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Filters</Text>
//               <TouchableOpacity onPress={() => setFilterVisible(false)}>
//                 <Text style={styles.closeButton}>✕</Text>
//               </TouchableOpacity>
//             </View>

//             <FlatList
//               data={[1]}
//               renderItem={() => (
//                 <View style={styles.filterScroll}>
//                   <View style={styles.filterSection}>
//                     <Text style={styles.filterLabel}>Country</Text>
//                     <FlatList
//                       horizontal
//                       data={countries}
//                       renderItem={({ item }) => (
//                         <TouchableOpacity
//                           style={[
//                             styles.chip,
//                             selectedCountry === item && styles.chipActive
//                           ]}
//                           onPress={() => setSelectedCountry(item)}
//                         >
//                           <Text style={[
//                             styles.chipText,
//                             selectedCountry === item && styles.chipTextActive
//                           ]}>
//                             {item}
//                           </Text>
//                         </TouchableOpacity>
//                       )}
//                       keyExtractor={(item) => item}
//                       showsHorizontalScrollIndicator={false}
//                     />
//                   </View>

//                   <View style={styles.filterSection}>
//                     <Text style={styles.filterLabel}>Max Budget: ${maxBudget}/month</Text>
//                     <View style={styles.chipContainer}>
//                       {[1500, 2000, 2500, 3000, 4000, 5000].map(budget => (
//                         <TouchableOpacity
//                           key={budget}
//                           style={[
//                             styles.chip,
//                             maxBudget === budget && styles.chipActive
//                           ]}
//                           onPress={() => setMaxBudget(budget)}
//                         >
//                           <Text style={[
//                             styles.chipText,
//                             maxBudget === budget && styles.chipTextActive
//                           ]}>
//                             ${budget}
//                           </Text>
//                         </TouchableOpacity>
//                       ))}
//                     </View>
//                   </View>

//                   <View style={styles.filterSection}>
//                     <Text style={styles.filterLabel}>Min WiFi Speed: {minWifi} Mbps</Text>
//                     <View style={styles.chipContainer}>
//                       {[0, 50, 100, 150, 200, 250].map(speed => (
//                         <TouchableOpacity
//                           key={speed}
//                           style={[
//                             styles.chip,
//                             minWifi === speed && styles.chipActive
//                           ]}
//                           onPress={() => setMinWifi(speed)}
//                         >
//                           <Text style={[
//                             styles.chipText,
//                             minWifi === speed && styles.chipTextActive
//                           ]}>
//                             {speed}+ Mbps
//                           </Text>
//                         </TouchableOpacity>
//                       ))}
//                     </View>
//                   </View>

//                   <TouchableOpacity 
//                     style={styles.resetButton}
//                     onPress={() => {
//                       setSelectedCountry('All');
//                       setMaxBudget(5000);
//                       setMinWifi(0);
//                     }}
//                   >
//                     <Text style={styles.resetButtonText}>Reset All Filters</Text>
//                   </TouchableOpacity>
//                 </View>
//               )}
//               keyExtractor={() => 'filters'}
//             />

//             <TouchableOpacity 
//               style={styles.applyButton}
//               onPress={() => setFilterVisible(false)}
//             >
//               <Text style={styles.applyButtonText}>Apply Filters</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// function getCountryFlag(code) {
//   const flags = {
//     PT: '🇵🇹', MX: '🇲🇽', BG: '🇧🇬', RO: '🇷🇴', US: '🇺🇸', BR: '🇧🇷',
//     TH: '🇹🇭', SI: '🇸🇮', JP: '🇯🇵', AU: '🇦🇺', GB: '🇬🇧', ZA: '🇿🇦',
//     BA: '🇧🇦', RS: '🇷🇸', FR: '🇫🇷', IN: '🇮🇳', PL: '🇵🇱', EG: '🇪🇬',
//     NL: '🇳🇱', GR: '🇬🇷', HU: '🇭🇺', CZ: '🇨🇿', IT: '🇮🇹', EE: '🇪🇪'
//   };
//   return flags[code] || '🏳️';
// }

// import { Feather } from '@expo/vector-icons';
// import { useFonts } from 'expo-font';
// import { useRouter } from 'expo-router';
// import { useEffect, useRef, useState } from 'react';
// import {
//   Animated,
//   Image,
//   Modal,
//   Pressable,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';

// import AnimatedGradientBorder from '../components/AnimatedGradientBorder';
// import { db } from '../db';

// /* -------------------- PAGINATION -------------------- */

// const PAGE_SIZE = 30;

// function loadPage(page: number) {
//   return db.getAllSync(
//     `
//     SELECT *
//     FROM places
//     LIMIT ? OFFSET ?
//     `,
//     [PAGE_SIZE, page * PAGE_SIZE]
//   );
// }

// /* -------------------- SCREEN -------------------- */

// export default function Index() {


//   useEffect(() => {
//   if (!db) {
//     console.log('❌ DB not ready yet');
//     return;
//   }

//   try {
//     const tables = db.getAllSync(
//       "SELECT name FROM sqlite_master WHERE type='table';"
//     );
//     console.log('✅ Tables:', tables);

//     const count = db.getAllSync(
//       'SELECT COUNT(*) as count FROM places;'
//     );
//     console.log('✅ Places count:', count);

//     const sample = db.getAllSync(
//       'SELECT title, country, rent FROM places LIMIT 3;'
//     );
//     console.log('✅ Sample rows:', sample);
//   } catch (e) {
//     console.error('❌ DB query failed:', e);
//   }
// }, []);





























































//   const router = useRouter();

//   /* ---------- animations ---------- */
//   const scrollY = useRef(new Animated.Value(0)).current;
//   const buttonExpand = useRef(new Animated.Value(100)).current;

//   const topBarPaddingVertical = scrollY.interpolate({
//     inputRange: [0, 50],
//     outputRange: [7, 16],
//     extrapolate: 'clamp',
//   });

//   /* ---------- fonts ---------- */
//   const [fontsLoaded] = useFonts({
//     'DancingScript-Bold': require('../assets/fonts/DancingScript-Bold.ttf'),
//   });

//   /* ---------- UI state ---------- */
//   const [filterVisible, setFilterVisible] = useState(false);
//   const [isModalOpen, setModalOpen] = useState(false);

//   /* ---------- DATA STATE ---------- */
//   const [items, setItems] = useState<any[]>([]);
//   const [page, setPage] = useState(0);
//   const [loading, setLoading] = useState(false);

//   /* ---------- initial load ---------- */
//   useEffect(() => {
//     loadMore();
//   }, []);

//   /* ---------- pagination ---------- */
//   function loadMore() {
//     if (loading) return;

//     setLoading(true);

//     const rows = loadPage(page);

//     if (rows.length > 0) {
//       setItems(prev => [...prev, ...rows]);
//       setPage(prev => prev + 1);
//     }

//     setLoading(false);
//   }

//   if (!fontsLoaded) return null;

//   /* -------------------- CARD -------------------- */

//   const renderPlace = ({ item }: any) => (
//     <View style={styles.card}>
//       <Image
//         source={{ uri: item.background_image }}
//         style={styles.image}
//       />

//       <View style={styles.overlay}>
//         <View style={styles.topRow}>
//           <View style={styles.countryBadge}>
//             <Text style={styles.countryText}>{item.country}</Text>
//           </View>
//           <Text style={styles.wifi}>{item.wifi_}</Text>
//         </View>

//         <View style={styles.bottomInfo}>
//           <Text style={styles.city}>{item.title}</Text>
//           <View style={styles.bottomRow}>
//             <Text style={styles.cost}>${item.rent}/m</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );

//   /* -------------------- UI -------------------- */

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

//       {/* -------- TOP BAR -------- */}
//       <Animated.View
//         style={[
//           styles.topBar,
//           { paddingBottom: topBarPaddingVertical },
//         ]}
//       >
//         <Text style={styles.brandName}>NomadClub</Text>
//         <TouchableOpacity
//           style={styles.profileButton}
//           onPress={() => setModalOpen(true)}
//         >
//           <Feather name="user" size={22} color="#333" />
//         </TouchableOpacity>
//       </Animated.View>

//       {/* -------- LIST -------- */}
//       <Animated.FlatList
//         data={items}
//         renderItem={renderPlace}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={2}
//         contentContainerStyle={styles.grid}
//         columnWrapperStyle={styles.row}
//         onEndReached={loadMore}
//         onEndReachedThreshold={0.6}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           {
//             useNativeDriver: false,
//             listener: (event) => {
//               const { layoutMeasurement, contentOffset, contentSize } =
//                 event.nativeEvent;

//               const isEnd =
//                 layoutMeasurement.height + contentOffset.y >=
//                 contentSize.height - 20;

//               Animated.timing(buttonExpand, {
//                 toValue: isEnd ? 12 : 100,
//                 duration: 300,
//                 useNativeDriver: false,
//               }).start();
//             },
//           }
//         )}
//         scrollEventThrottle={16}
//         ListFooterComponent={
//           loading ? (
//             <Text style={{ textAlign: 'center', padding: 12 }}>
//               Loading…
//             </Text>
//           ) : null
//         }
//       />

//       {/* -------- BOTTOM BAR -------- */}
//       <View style={styles.bottomBar}>
//         <TouchableOpacity
//           onPress={() => setFilterVisible(true)}
//           activeOpacity={0.85}
//         >
//           <Animated.View
//             style={{
//               marginLeft: buttonExpand,
//               marginRight: buttonExpand,
//             }}
//           >
//             <AnimatedGradientBorder
//               colors={[
//                 '#ff6b6b',
//                 '#4ecdc4',
//                 '#45b7d1',
//                 '#f7b731',
//                 '#ff6b6b',
//               ]}
//               borderWidth={3}
//               borderRadius={28}
//             >
//               <View style={styles.filterButton}>
//                 <Feather
//                   name="sliders"
//                   size={16}
//                   color="#ffffff"
//                 />
//                 <Text style={styles.filterButtonText}>
//                   Preferences
//                 </Text>
//               </View>
//             </AnimatedGradientBorder>
//           </Animated.View>
//         </TouchableOpacity>
//       </View>

//       {/* -------- PROFILE MODAL (unchanged) -------- */}
//       <Modal
//         visible={isModalOpen}
//         animationType="slide"
//         transparent
//         onRequestClose={() => setModalOpen(false)}
//       >
//         <View style={styles.profileModalOverlay}>
//           <View style={styles.profileModalContent}>
//             <View style={styles.profileModalHeader}>
//               <Text style={styles.profileModalTitle}>Profile</Text>
//               <TouchableOpacity onPress={() => setModalOpen(false)}>
//                 <Feather name="x" size={24} color="#333" />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.profileModalBody}>
//               <Pressable
//                 style={styles.savedPlaces}
//                 onPress={() => {
//                   setModalOpen(false);
//                   requestAnimationFrame(() =>
//                     router.push('/saved-places')
//                   );
//                 }}
//               >
//                 <Feather name="map-pin" size={24} />
//                 <Text>Saved Places</Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* -------- FILTER MODAL (UI ONLY for now) -------- */}
//       <Modal
//         visible={filterVisible}
//         animationType="slide"
//         transparent
//         onRequestClose={() => setFilterVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Filters</Text>
//             <TouchableOpacity
//               style={styles.applyButton}
//               onPress={() => setFilterVisible(false)}
//             >
//               <Text style={styles.applyButtonText}>Apply</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }


























// function getWeatherIcon(condition) {
//   if (condition.includes('Rain')) return '🌧️';
//   if (condition.includes('Cloud')) return '☁️';
//   if (condition.includes('Partly')) return '⛅';
//   return '☀️';
// }

// const styles = StyleSheet.create({
//   topBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingRight: 25,
//     paddingLeft: 20,
//     paddingBottom: 10,
//     backgroundColor: 'transparent',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e5e5e5',
//     borderRadius: 18,
//   },
//   brandName: {
//     fontSize: 30,
//     fontFamily: 'DancingScript-Bold',
//     color: '#1a1a2e',
//   },
//   profileButton: {
//     width: 42,
//     height: 42,
//     marginTop: 8,
//     borderRadius: 22,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 2,
//     borderColor: '#f18282ff',
//   },
//   personSettingModal:{
//     visibility: 'false',
//   },
//   container: {
//     marginTop: 5,
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   grid: {
//     padding: 10,
//     paddingBottom: 78,
//   },
//   row: {
//     gap: 10,
//     marginBottom: 10,
//   },
//   card: {
//     flex: 1,
//     height: 200,
//     borderRadius: 16,
//     overflow: 'hidden',
//     // position: 'relative',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     position: 'absolute',
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.3)',
//     padding: 12,
//     justifyContent: 'space-between',
//   },
//   topRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   countryBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//     gap: 4,
//   },
//   countryFlag: {
//     fontSize: 14,
//   },
//   countryText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   wifi: {
//     color: 'white',
//     fontSize: 13,
//     fontWeight: '600',
//   },
//   bottomInfo: {
//     gap: 4,
//   },
//   city: {
//     color: 'white',
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   bottomRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   cost: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   weather: {
//     color: 'white',
//     fontSize: 13,
//   },
//   bottomBar: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'transparent',
//     paddingHorizontal: 12,
//     paddingBottom: 18,
//     paddingTop: 2,
    
//   },
//   buttonWrapper: {
//     marginLeft: 100,
//     marginRight: 100,
//   },
//   buttonWrapperExpanded: {
//     marginLeft: 12,
//     marginRight: 12,
//   },
//   filterButton: {
//     backgroundColor: '#1a1a2e',
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//     borderRadius: 25,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 8,

//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 6,
//   },
//   filterButtonText: {
//     color: '#ffffff',
//     fontSize: 15,
//     fontWeight: '600',
//     letterSpacing: 0.5,
//   },
//   noResults: {
//     textAlign: 'center',
//     padding: 40,
//     fontSize: 16,
//     color: '#666',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'flex-end',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: '80%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   closeButton: {
//     fontSize: 24,
//     color: '#666',
//   },
//   filterScroll: {
//     padding: 20,
//   },
//   filterSection: {
//     marginBottom: 24,
//   },
//   filterLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 12,
//     color: '#333',
//   },
//   chipContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   chip: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: '#f0f0f0',
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     marginRight: 8,
//   },
//   chipActive: {
//     backgroundColor: '#2563eb',
//     borderColor: '#2563eb',
//   },
//   chipText: {
//     fontSize: 14,
//     color: '#666',
//     fontWeight: '500',
//   },
//   chipTextActive: {
//     color: 'white',
//   },
//   resetButton: {
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   resetButtonText: {
//     color: '#666',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   applyButton: {
//     backgroundColor: '#2563eb',
//     padding: 16,
//     margin: 20,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   applyButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   // Replace profileModal with these two styles:

// profileModalOverlay: {
//   flex: 1,  // Takes full screen
//   backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   justifyContent: 'center',  // Centers the content
//   alignItems: 'center',
//   padding: 20,
// },
// profileModalContent: {
//   backgroundColor: 'white',
//   borderRadius: 20,
//   width: '90%',      // ← Controls width
//   height: '50%',     // ← Controls height
//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: 4 },
//   shadowOpacity: 0.3,
//   shadowRadius: 8,
//   elevation: 8,
//   overflow: 'hidden',
// },
// profileModalHeader: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   padding: 20,
//   paddingHorizontal:32,
//   borderBottomWidth: 1,
//   borderBottomColor: '#e5e5e5',
// },
// profileModalTitle: {
//   fontSize: 20,
//   color: '#1a1a2e',
// },
// profileModalBody: {
//   padding: 20,
//   flex: 1,
// },
// savedPlaces:{
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   padding:10,
//   paddingHorizontal:20,
//   paddingVertical:15,
//   borderBottomWidth: 1,
//   borderBottomColor: '#e5e5e5'
// },
// lastSavedPlaces:{
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   padding:10,
//   paddingHorizontal:20,
//   paddingVertical:15,
// }
// });





import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated, StatusBar, View } from 'react-native';

import BottomBar from '@/components/BottomBar';
import FilterModal from '@/components/FilterModal';
import PlaceCard from '@/components/PlaceCard';
import PlaceModal from '@/components/PlaceModal';
import ProfileModal from '@/components/ProfileModal';
import TopBar from '@/components/TopBar';
import { usePlaces } from '@/hooks/usePlaces';
import styles from '@/styles/index.styles';


type Filters = {
  budget?: { min: number; max: number };
  country?: string;
};


export default function Index() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const buttonExpand = useRef(new Animated.Value(100)).current;

  const topBarPaddingVertical = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [7, 16],
    extrapolate: 'clamp',
  });

  const [fontsLoaded] = useFonts({
    'DancingScript-Bold': require('../assets/fonts/DancingScript-Bold.ttf'),
    'Inter':require('../assets/fonts/Inter.ttf')
  });

  const [profileOpen, setProfileOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);
  const [filters, setFilters] = useState<Filters>({});


  const { items, loadMore, loading } = usePlaces();

  const filteredItems = items.filter(place => {
  // ---- Budget filter ----
  if (filters.budget) {
    const { min, max } = filters.budget;
    if (place.rent < min || place.rent > max) {
      return false;
    }
  }

  // ---- Country filter ----
  if (filters.country) {
    if (place.country !== filters.country) {
      return false;
    }
  }

  return true;
});



  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      <TopBar
        padding={topBarPaddingVertical}
        onProfile={() => setProfileOpen(true)}
      />

      <Animated.FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <PlaceCard
            item={item}
            onPress={() => {
              setSelectedPlace(item);
              setModalOpen(true);
            }}
          />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        onEndReached={loadMore}
        onEndReachedThreshold={0.6}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      />

      <BottomBar expand={buttonExpand} onPress={() => setFilterOpen(true)} />

      <ProfileModal
        visible={profileOpen}
        onClose={() => setProfileOpen(false)}
        onSaved={() => router.push('/saved-places')}
      />

      <FilterModal visible={filterOpen} onClose={() => setFilterOpen(false)} onApplyFilters={setFilters}/>
      <PlaceModal visible={modalOpen} place={selectedPlace} onClose={() => setModalOpen(false)}/>

    </View>
  );
}
