import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { ComponentProps, useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IconName = ComponentProps<typeof Ionicons>["name"];

const tabs = [
  { name: "index", label: "Home", icon: "home-outline" as IconName },
  { name: "register", label: "Register", icon: "person-add-outline" as IconName },
  { name: "status", label: "Status", icon: "notifications-outline" as IconName },
  { name: "settings", label: "Settings", icon: "settings-outline" as IconName },
];

function AnimatedTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const translateX = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();
  const tabWidth = width / tabs.length;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * tabWidth,
      useNativeDriver: true,
      tension: 60,
      friction: 10,
    }).start();
  }, [state.index, tabWidth]);

  return (
    <View
      style={{
        flexDirection: "row",
        height: 70 + insets.bottom,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#f0f0f0",
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        paddingBottom: insets.bottom,
      }}
    >
      {/* sliding highlight */}
      <Animated.View
        style={{
          position: "absolute",
          top: 8,
          width: tabWidth - 24,
          left: 12,
          height: 46,
          backgroundColor: "#dbeafe",
          borderRadius: 12,
          transform: [{ translateX }],
        }}
      />

      {tabs.map((tab, index) => {
        const focused = state.index === index;
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => navigation.navigate(tab.name)}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
            activeOpacity={0.8}
          >
            <Ionicons
              name={tab.icon}
              size={22}
              color={focused ? "#3b82f6" : "gray"}
            />
            <Text
              style={{
                fontSize: 11,
                marginTop: 2,
                color: focused ? "#3b82f6" : "gray",
                fontWeight: focused ? "600" : "400",
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{ headerShown: false, animation: "fade" }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="register" options={{ title: "Register" }} />
      <Tabs.Screen name="status" options={{ title: "Status" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
    
  );
}