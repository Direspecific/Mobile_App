import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

type LanguageModalProps = {
  visible: boolean;
  onClose: () => void;
  selectedLanguage: string;
  onSelectLanguage: (language: string) => void;
};

const languages = [
  "English",
  "Filipino",
  "Español",
  "Mandarin",
  "Nihonggo",
  "French",
  "Bisakol",
];

export default function LanguageModal({
  visible,
  onClose,
  selectedLanguage,
  onSelectLanguage,
}: LanguageModalProps) {
  const handleSelectLanguage = (language: string) => {
    onSelectLanguage(language);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/25">
        <Pressable className="flex-1" onPress={onClose} />

        <View className="rounded-t-[28px] bg-[#F6F6F1] px-4 pb-5 pt-3">
          <View className="mb-4 h-1.5 w-14 self-center rounded-full bg-neutral-300" />

          <Text className="mb-4 text-h3 font-bold text-neutral-900">
            Language
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {languages.map((language) => {
              const isSelected = selectedLanguage === language;

              return (
                <Pressable
                  key={language}
                  onPress={() => handleSelectLanguage(language)}
                  className="flex-row items-center justify-between py-3"
                >
                  <Text className="text-bodySm text-neutral-900">
                    {language}
                  </Text>

                  {isSelected ? (
                    <Ionicons name="checkmark" size={20} color="#1449E8" />
                  ) : null}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}