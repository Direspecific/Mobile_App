import { Image, ImageSourcePropType, Pressable, Text } from "react-native";

type SocialButtonProps = {
  title: string;
  imageSource: ImageSourcePropType;
  onPress?: () => void;
  className?: string;
  disabled?: boolean;
};

export default function SocialButton({
  title,
  imageSource,
  onPress,
  className = "",
  disabled = false,
}: SocialButtonProps) {
  return (
    <Pressable
      onPress={!disabled ? onPress : undefined}
      disabled={disabled}
      hitSlop={5}
      className={`flex-row items-center justify-center gap-2 rounded-full border border-neutral-300 bg-surface py-4 ${
        disabled ? "opacity-50" : "active:opacity-80"
      } ${className}`}
    >
      <Image
        source={imageSource}
        className="h-5 w-5"
        resizeMode="contain"
      />
      <Text className="text-body text-neutral-700">{title}</Text>
    </Pressable>
  );
}