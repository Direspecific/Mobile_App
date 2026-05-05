import { Pressable, Text } from "react-native";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
};

export default function AppButton({
  title,
  onPress,
  className = "",
  disabled = false,
  loading = false,
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={!isDisabled ? onPress : undefined}
      disabled={isDisabled}
      hitSlop={5}
      className={`rounded-full bg-primary py-4 ${
        isDisabled ? "opacity-50" : "active:opacity-80"
      } ${className}`}
    >
      <Text className="text-center text-body font-semibold text-white">
        {loading ? "Loading..." : title}
      </Text>
    </Pressable>
  );
}