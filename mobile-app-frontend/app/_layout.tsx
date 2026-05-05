import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { RegistrationProvider } from "@/context/RegistrationContext";
import "./global.css";

export default function RootLayout() {
  return (
    <RegistrationProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
        
      />
    </RegistrationProvider>
  );
}