import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

type ContactComelecModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function ContactComelecModal({
  visible,
  onClose,
}: ContactComelecModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/25">
        <Pressable className="flex-1" onPress={onClose} />

        <View className="min-h-[45%] rounded-t-[28px] bg-[#F6F6F1] px-4 pb-6 pt-3">
          <View className="mb-4 h-1.5 w-14 self-center rounded-full bg-neutral-300" />

          <Text className="mb-4 text-h3 font-bold text-neutral-900">
            Contact Comelec
          </Text>
        </View>
      </View>
    </Modal>
  );
}