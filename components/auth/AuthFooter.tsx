import { Pressable, Text, View } from "react-native";

type AuthFooterProps = {
  text: string;
  actionText: string;
  onPress: () => void;
};

export default function AuthFooter({
  text,
  actionText,
  onPress,
}: AuthFooterProps) {
  return (
    <View className="mt-6 flex-row items-center justify-center gap-1">
      <Text className="text-caption text-neutral-500">{text}</Text>

      <Pressable onPress={onPress} hitSlop={5}>
        <Text className="text-caption font-semibold text-primary">
          {actionText}
        </Text>
      </Pressable>
    </View>
  );
}