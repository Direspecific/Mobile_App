import React, { useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

import SettingToggleCard from "./SettingToggleCard";

export type PrivacySettings = {
  biometric: boolean;
  faceID: boolean;
};


type PrivacyModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (settings: PrivacySettings) => void;
  initialValues?: PrivacySettings;
};


export default function PrivacyModal({
  visible,
  onClose,
  onSave,
  initialValues = {
    biometric: false,
    faceID: false,
  },
}: PrivacyModalProps) {
  const [settings, setSettings] = useState<PrivacySettings>(initialValues);

 
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

        <View className="min-h-[68%] rounded-t-[28px] bg-[#F6F6F1] px-4 pb-6 pt-3">
          <View className="mb-4 self-center h-1.5 w-14 rounded-full bg-neutral-300" />

          <Text className="mb-4 text-h3 font-bold text-neutral-900">
            Privacy & Security
          </Text>

         
          <SettingToggleCard
            title="Biometric ID"
            value={settings.biometric}
            onValueChange={(value) =>
              setSettings((prev) => ({ ...prev, biometric: value }))
            }
          />

         
          <SettingToggleCard
            title="Face ID"
            value={settings.faceID}
            onValueChange={(value) =>
              setSettings((prev) => ({ ...prev, faceID: value }))
            }
          />

          
          <Pressable
            onPress={() => {
              // password functionality 
            }}
            className="mt-4 items-center rounded-full border border-primary bg-muted py-3 active:opacity-80"
          >
            <Text className="text-bodySm font-semibold border-error text-primary">
              Change Password
            </Text>
          </Pressable>

        
          <Pressable
            onPress={handleSave}
            className="mt-auto items-center rounded-full bg-primary py-4 active:opacity-80"
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