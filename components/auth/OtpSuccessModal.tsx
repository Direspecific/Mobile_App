import { Modal, Text, View } from "react-native";

import AppButton from "@/components/ui/AppButton";

type OtpSuccessModalProps = {
  visible: boolean;
  onConfirm: () => void;
};

export default function OtpSuccessModal({
  visible,
  onConfirm,
}: OtpSuccessModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/20 px-6">
        <View className="w-full rounded-[36px] bg-white px-7 pb-6 pt-40 shadow-lg">
          <Text className="text-center text-bodySm leading-6 text-neutral-600">
            Welcome to TaSKReg — you can now register as voter via Mobile and
            participate in upcoming Election.
          </Text>

          <AppButton title="Confirm" onPress={onConfirm} className="mt-5" />
        </View>
      </View>
    </Modal>
  );
}

type ResetPasswordSuccessModalProps = {
  visible: boolean;
  onConfirm: () => void;
};

export function ResetPasswordSuccessModal({
  visible,
  onConfirm,
}: ResetPasswordSuccessModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/20 px-6">
        <View className="w-full rounded-[36px] bg-white px-7 pb-6 pt-40 shadow-lg">
          <Text className="text-center text-bodySm leading-6 text-neutral-600">
            Your password has been successfully reset. You can now log in using
            your new password.
          </Text>

          <AppButton title="Confirm" onPress={onConfirm} className="mt-5" />
        </View>
      </View>
    </Modal>
  );
}