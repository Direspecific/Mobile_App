import { Modal, Pressable, Text, View } from "react-native";

type LogoutModalProps = {
  visible: boolean;
  onCancel: () => void;
  onLogout: () => void;
};

export default function LogoutModal({
  visible,
  onCancel,
  onLogout,
}: LogoutModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/40 px-6">
        <View className="w-full rounded-2xl bg-white p-7 shadow-xl">
         
          <Text className="text-center text-h4 font-bold text-gray-800">
            Confirm logout
          </Text>

     
          <Text className="mt-4 text-center text-body text-gray-500">
            You're about to log out of this device.
          </Text>

       
          <View className="mt-6 flex-row gap-3">
            <Pressable
              onPress={onLogout} 
              className="flex-1 rounded-xl border-2 border-error py-3 bg-surface active:opacity-80"
            >
              <Text className="text-center text-error font-semibold">
                Log out
              </Text>
            </Pressable>

            <Pressable
              onPress={onCancel} 
              className="flex-1 rounded-xl border-2 border-primary py-3 bg-primary active:opacity-80"
            >
              <Text className="text-center text-surface font-semibold">
                Stay logged in
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}