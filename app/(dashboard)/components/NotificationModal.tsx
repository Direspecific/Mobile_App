import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  Switch,
  Text,
  View,
} from "react-native";

export type NotificationSettings = {
  push: boolean;
  email: boolean;
  sms: boolean;
};

type NotificationModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (settings: NotificationSettings) => void;
  initialValues?: NotificationSettings;
};

type NotificationRowProps = {
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

function NotificationRow({
  title,
  subtitle,
  value,
  onValueChange,
}: NotificationRowProps) {
  return (
    <View className="mb-3 flex-row items-center rounded-[18px] border border-border bg-white px-4 py-4">
      <View className="flex-1 pr-3">
        <Text className="text-bodySm font-semibold text-neutral-900">
          {title}
        </Text>
        <Text className="mt-1 text-caption text-neutral-500">
          {subtitle}
        </Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#E5E7EB", true: "#AFC3FF" }}
        thumbColor={value ? "#1449E8" : "#F9FAFB"}
        ios_backgroundColor="#E5E7EB"
      />
    </View>
  );
}

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

          <NotificationRow
            title="Push Notification"
            subtitle="Alerts on your device"
            value={settings.push}
            onValueChange={(value) =>
              setSettings((prev) => ({ ...prev, push: value }))
            }
          />

          <NotificationRow
            title="Email Notification"
            subtitle="Updates to your inbox"
            value={settings.email}
            onValueChange={(value) =>
              setSettings((prev) => ({ ...prev, email: value }))
            }
          />

          <NotificationRow
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