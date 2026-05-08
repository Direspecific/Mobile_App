import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";

type IconName = ComponentProps<typeof Ionicons>["name"];

type Props = {
  icon: IconName;
  title: string;
  rightText?: string;
  iconBgClass?: string;
  onPress?: () => void;
};

export default function SettingsRow({
  icon,
  title,
  rightText,
  iconBgClass = "bg-primary",
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-4 flex-row items-center rounded-card border border-border bg-surface px-4 py-4 shadow-sm active:opacity-80"
    >
      <View
        className={`mr-4 h-11 w-11 items-center justify-center rounded-button ${iconBgClass}`}
      >
        <Ionicons name={icon} size={22} color="white" />
      </View>

      <Text className="flex-1 text-bodySm font-medium text-neutral-700">
        {title}
      </Text>

      {rightText ? (
        <Text className="mr-2 text-caption text-neutral-500">
          {rightText}
        </Text>
      ) : null}

      <Ionicons name="chevron-forward" size={18} color="#949CA3" />
    </Pressable>
  );
}