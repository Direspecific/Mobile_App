import { View, Text, TouchableOpacity } from "react-native";

type Props = {
  label: string;
  checked: boolean;
  onPress: () => void;
};

export default function Checkbox({ label, checked, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 flex-row items-center gap-2"
    >
      <View className={`w-5 h-5 rounded mr-2 items-center justify-center ${checked ? "bg-orange-500" : "bg-black"}`}>
        {checked && <Text className="text-white text-xs font-bold">✓</Text>}
      </View>
      <Text className="text-gray-600">{label}</Text>
    </TouchableOpacity>
  );
}