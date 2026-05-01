import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

type ChangePasswordModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (newPassword: string) => void;
};

export default function ChangePasswordModal({
  visible,
  onClose,
  onSave,
}: ChangePasswordModalProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [visible]);

  const handleSave = () => {
    if (newPassword === confirmPassword) {
      onSave(newPassword);
      onClose();
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 bg-black/25 justify-end">
        <Pressable className="flex-1" onPress={onClose} />
        <View className="rounded-t-[28px] bg-[#F6F6F1] px-4 pb-6 pt-3">
          <View className="mb-4 self-center h-1.5 w-14 rounded-full bg-neutral-300" />

          <Text className="text-center mb-4 text-h3 font-bold text-neutral-900 ">Change Password</Text>

          <Text className="ml-4 text-bodySm text-neutral-600 mb-2">New Password</Text>
          <View className="flex-row items-center border border-neutral-300 rounded-full px-4 py-1 mb-4">
            <TextInput
              secureTextEntry={!isPasswordVisible}
              value={newPassword}
              onChangeText={setNewPassword}
              className="flex-1"
            />
            <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={22} color="#BFC6CC" />
            </Pressable>
          </View>

          <Text className="ml-4 text-bodySm text-neutral-600 mb-2">Confirm Password</Text>
          <View className="flex-row items-center border border-neutral-300 rounded-full px-4 py-1 mb-6">
            <TextInput
              secureTextEntry={!isConfirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              className="flex-1"
            />
            <Pressable onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
              <Ionicons name={isConfirmPasswordVisible ? "eye-off-outline" : "eye-outline"} size={22} color="#BFC6CC" />
            </Pressable>
          </View>

          <Pressable
            onPress={handleSave}
            className="items-center rounded-full bg-primary py-4 active:opacity-80"
          >
            <Text className="text-bodySm font-semibold text-white">Confirm</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}