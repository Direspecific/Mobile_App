import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type AppCheckboxProps = {
  checked: boolean;
  label: string;
  onPress: () => void;
};

export default function Checkbox({
  checked,
  label,
  onPress,
}: AppCheckboxProps) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      className="flex-row items-center gap-2"
    >
      <View
        className={`h-5 w-5 items-center justify-center rounded-sm border ${
          checked
            ? "border-primary bg-primary"
            : "border-neutral-400 bg-transparent"
        }`}
      >
        {checked && (
          <Ionicons name="checkmark" size={14} color="white" />
        )}
      </View>

      <Text className="text-caption text-neutral-500">{label}</Text>
    </Pressable>
  );
}