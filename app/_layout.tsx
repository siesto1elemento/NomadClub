import { initDB } from '@/openDB';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function start() {
      await initDB();   // copy + open places.db
      setReady(true);
    }

    start();
  }, []);

  // Prevent screens from rendering before DB exists
  if (!ready) {
    return null; // or <LoadingScreen />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
