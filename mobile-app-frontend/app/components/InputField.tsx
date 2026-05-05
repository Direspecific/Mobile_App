import { TextInput, View, Text } from "react-native";
import { useState } from "react";

type Props = {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
};

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View className="flex-1">
      {label && (
        <Text className="text-gray-600 mb-1">
          {label}
        </Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ borderColor: focused ? "#f97316" : "#d1d5db" }}
        className="bg-white border rounded-lg p-3"
      />
    </View>
  );
}