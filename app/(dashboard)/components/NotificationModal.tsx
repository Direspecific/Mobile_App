import React, { useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

// Import the SettingToggleCard component
import SettingToggleCard from "./SettingToggleCard";

// Type for notification settings
export type NotificationSettings = {
  push: boolean;
  email: boolean;
  sms: boolean;
};

// Prop types for the modal component
type NotificationModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (settings: NotificationSettings) => void;
  initialValues?: NotificationSettings;
};

export default function NotificationModal({
  visible,
  onClose,
  onSave,
  initialValues = {
    push: true,
    email: false,
    sms: false,
  },
}: NotificationModalProps) {
  const [settings, setSettings] = useState<NotificationSettings>(initialValues);

  // Sync settings when the modal visibility changes
  useEffect(() => {
    if (visible) {
      setSettings(initialValues);
    }
  }, [visible, initialValues]);


  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/25 justify-end">
        <Pressable className="flex-1" onPress={onClose} />

        <View className="rounded-t-[28px] bg-[#F6F6F1] px-4 pb-6 pt-3">
          <View className="mb-4 self-center h-1.5 w-14 rounded-full bg-neutral-300" />

          <Text className="mb-4 text-h3 font-bold text-neutral-900">
            Notifications
          </Text>

         
          <SettingToggleCard
            title="Push Notification"
            subtitle="Alerts on your device"
            value={settings.push}
            onValueChange={(value) =>
              setSettings((prev) => ({ ...prev, push: value }))
            }
          />

          <SettingToggleCard
            title="Email Notification"
            subtitle="Updates to your inbox"
            value={settings.email}
            onValueChange={(value) =>
              setSettings((prev) => ({ ...prev, email: value }))
            }
          />

          <SettingToggleCard
            title="SMS Alert"
            subtitle="Text message alerts"
            value={settings.sms}
            onValueChange={(value) =>
              setSettings((prev) => ({ ...prev, sms: value }))
            }
          />

        
          <Pressable
            onPress={handleSave}
            className="mt-4 items-center rounded-full bg-primary py-4 active:opacity-80"
          >
            <Text className="text-bodySm font-semibold text-white">
              Save Preferences
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}