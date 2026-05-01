import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ChangePasswordModal from "./components/ChangePassword";
import LogoutModal from "./components/LogoutModal";
import NotificationModal, {
  NotificationSettings,
} from "./components/NotificationModal";
import PrivacyModal, {
  PrivacySettings,
} from "./components/PrivacyAndSecurity";

import ProfileCard from "./components/ProfileCard";
import SettingsRow from "./components/SettingRow";

type SectionTitleProps = {
  title: string;
};

function SectionTitle({ title }: SectionTitleProps) {
  return (
    <Text className="mb-3 my-4 text-body uppercase text-neutral-600">
      {title}
    </Text>
  );
}

export default function Settings() {
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);
  const [privacyVisible, setPrivacyVisible] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false); // State for the Change Password modal

  const [notifSettings, setNotifSettings] = useState<NotificationSettings>({
    push: true,
    email: false,
    sms: false,
  });

  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    biometric: false,
    faceID: false,
  });

  const handleLogout = () => {
    setLogoutVisible(false);
    // router.replace("/login"); // Uncomment if you want to navigate after logout
  };

  const handleSaveNotifications = (settings: NotificationSettings) => {
    setNotifSettings(settings);
    console.log("Saved notification settings:", settings);
  };

  const handleSavePrivacy = (settings: PrivacySettings) => {
    setPrivacySettings(settings);
    console.log("Saved privacy settings:", settings);
  };

  const handleSavePassword = (newPassword: string) => {
    console.log("New password saved:", newPassword);
    // Implement password change logic here 
  };

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
            <Text className="text-h2 font-bold text-neutral-900">Settings</Text>
            <Text className="text-body text-neutral-600">
              Manage your preferences
            </Text>
          </View>

          <Pressable
            onPress={() => setLogoutVisible(true)}
            className="active:opacity-70"
          >
            <Ionicons name="log-out-outline" size={35} color="#E4221F" />
          </Pressable>
        </View>

        <Pressable
          className="active:opacity-70"
          onPress={() => router.push("/profile")}
        >
          <ProfileCard />
        </Pressable>

        <SectionTitle title="Account" />

        <SettingsRow
          icon="notifications-outline"
          title="Notifications"
          iconBgClass="bg-secondary"
          onPress={() => setNotifVisible(true)}
        />

        <SettingsRow
          icon="lock-closed-outline"
          title="Privacy & Security"
          iconBgClass="bg-primary"
          onPress={() => setPrivacyVisible(true)}
        />

        <SettingsRow
          icon="key-outline"
          title="Change Password"
          iconBgClass="bg-primary"
          onPress={() => setChangePasswordVisible(true)} 
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

      <LogoutModal
        visible={logoutVisible}
        onCancel={() => setLogoutVisible(false)}
        onLogout={handleLogout}
      />

      <NotificationModal
        visible={notifVisible}
        onClose={() => setNotifVisible(false)}
        onSave={handleSaveNotifications}
        initialValues={notifSettings}
      />

      <PrivacyModal
        visible={privacyVisible}
        onClose={() => setPrivacyVisible(false)}
        onSave={handleSavePrivacy}
        initialValues={privacySettings}
      />

      <ChangePasswordModal
        visible={changePasswordVisible} 
        onClose={() => setChangePasswordVisible(false)} 
        onSave={handleSavePassword} 
      />
    </SafeAreaView>
  );
}