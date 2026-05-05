import { View, Text, TouchableOpacity } from "react-native";

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function RadioButton({ label, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 flex-row items-center gap-2"
    >
      <View className={`w-5 h-5 rounded-full mr-2 ${selected ? "bg-orange-500" : "bg-black"}`} />
      <Text className="text-gray-600">{label}</Text>
    </TouchableOpacity>
  );
}