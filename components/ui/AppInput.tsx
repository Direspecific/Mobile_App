import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

type AppInputProps = TextInputProps & {
  label: string;
  leftIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  error?: string;
  isPassword?: boolean;
  className?: string;
};

export default function AppInput({
  label,
  leftIcon,
  error,
  isPassword = false,
  secureTextEntry,
  className = "",
  ...props
}: AppInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const shouldHidePassword = isPassword ? !showPassword : secureTextEntry;

  return (
    <View className="mb-4">
      <Text className="mb-2 text-bodySm text-neutral-600">{label}</Text>

      <View
        className={`h-14 flex-row items-center rounded-button border bg-background px-4 ${
          error ? "border-error" : "border-neutral-300"
        }`}
      >
        {leftIcon && (
          <MaterialCommunityIcons
            name={leftIcon}
            size={25}
            color="#949CA3"
          />
        )}

        <TextInput
          className={`ml-3 flex-1 text-base text-neutral-900 ${className}`}
          secureTextEntry={shouldHidePassword}
          placeholderTextColor="#949CA3"
          multiline={false}
          scrollEnabled={false}
          {...props}
        />

        {isPassword && (
          <Pressable
            onPress={() => setShowPassword((prev) => !prev)}
            hitSlop={10}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={25}
              color="#949CA3"
            />
          </Pressable>
        )}
      </View>

      {!!error && <Text className="mt-1 text-caption text-error">{error}</Text>}
    </View>
  );
}