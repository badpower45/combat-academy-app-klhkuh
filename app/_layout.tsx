
import "react-native-reanimated";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SystemBars } from "react-native-edge-to-edge";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Alert } from "react-native";
import { useNetworkState } from "expo-network";
import { StatusBar } from "expo-status-bar";
import { WidgetProvider } from "@/contexts/WidgetContext";
import { LocalizationProvider } from "@/contexts/LocalizationContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const networkState = useNetworkState();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  React.useEffect(() => {
    if (
      !networkState.isConnected &&
      networkState.isInternetReachable === false
    ) {
      Alert.alert(
        "🔌 You are offline",
        "You can keep using the app! Your changes will be saved locally and synced when you are back online."
      );
    }
  }, [networkState.isConnected, networkState.isInternetReachable]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" animated />
      <ThemeProvider>
        <LocalizationProvider>
          <AuthProvider>
            <WidgetProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen name="auth/login" />
                  <Stack.Screen name="auth/register" />
                  <Stack.Screen name="auth/role-selection" />
                  <Stack.Screen name="tickets" />
                  <Stack.Screen name="register" />
                  <Stack.Screen name="competition-details" />
                  <Stack.Screen
                    name="modal"
                    options={{
                      presentation: "modal",
                      title: "Standard Modal",
                    }}
                  />
                  <Stack.Screen
                    name="formsheet"
                    options={{
                      presentation: "formSheet",
                      title: "Form Sheet Modal",
                      sheetGrabberVisible: true,
                      sheetAllowedDetents: [0.5, 0.8, 1.0],
                      sheetCornerRadius: 20,
                    }}
                  />
                  <Stack.Screen
                    name="transparent-modal"
                    options={{
                      presentation: "transparentModal",
                      headerShown: false,
                    }}
                  />
                </Stack>
                <SystemBars style="auto" />
              </GestureHandlerRootView>
            </WidgetProvider>
          </AuthProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}
