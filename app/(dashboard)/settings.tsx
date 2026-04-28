import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";
import ProfileCard from "./components/ProfileCard";
import SettingsRow from "./components/SettingRow";

type SectionTitleProps = {
  title: string;
};

function SectionTitle({ title }: SectionTitleProps) {
  return (
    <Text className="mb-3 mt-5 text-body uppercase text-neutral">
      {title}
    </Text>
  );
}

export default function Settings() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar style="dark" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="ml-3 mt-4 flex-row items-start justify-between">
          <View>
            <Text className="text-h2 font-bold text-neutral-900">
              Settings
            </Text>

            <Text className="text-body text-neutral-600">
              Manage your preferences
            </Text>
          </View>

          <Pressable className="active:opacity-70">
            <Ionicons name="log-out-outline" size={35} />
          </Pressable>
        </View>

        <Pressable className="active:opacity-70"
        onPress={() => router.push("/profile")}
        >
          <ProfileCard />
        </Pressable>

        <SectionTitle title="Account" />

        <SettingsRow
          icon="notifications-outline"
          title="Notifications"
          iconBgClass="bg-secondary"
        />

        <SettingsRow
          icon="lock-closed-outline"
          title="Privacy & Security"
          iconBgClass="bg-primary"
        />

        <SettingsRow
          icon="globe-outline"
          title="Language"
          rightText="English"
          iconBgClass="bg-primary"
        />

        <SectionTitle title="Support" />

        <SettingsRow
          icon="help-circle-outline"
          title="Contact Comelec"
          iconBgClass="bg-primary"
        />

        <SettingsRow
          icon="document-text-outline"
          title="Terms & Condition"
          iconBgClass="bg-primary"
        />
      </ScrollView>
    </SafeAreaView>
  );
}