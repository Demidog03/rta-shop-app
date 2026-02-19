import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import {Provider} from "react-redux";
import {persistor, store} from "@/store/store";
import {PersistGate} from "redux-persist/integration/react";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
      <Provider store={store}>
          <PersistGate persistor={persistor}>
            <GluestackUIProvider mode="light">
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                        <Stack>
                            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                        </Stack>
                        <StatusBar style="auto" />
                    </ThemeProvider>
                </GestureHandlerRootView>
            </GluestackUIProvider>
          </PersistGate>
      </Provider>
  );
}
