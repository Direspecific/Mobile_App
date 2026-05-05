import { useRef } from "react";
import { TextInput, View } from "react-native";

type OtpInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

export default function OtpInput({ value, onChange }: OtpInputProps) {
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, "");

    const newValue = [...value];
    newValue[index] = digit;
    onChange(newValue);

    if (digit && index < value.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (key: string, index: number) => {
    if (key === "Backspace" && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="flex-row justify-between">
      {value.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            if (ref) inputs.current[index] = ref;
          }}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) =>
            handleBackspace(nativeEvent.key, index)
          }
          keyboardType="number-pad"
          maxLength={1}
          className="h-14 w-12 square-xl border border-neutral-300 bg-white text-center text-body text-neutral-900"
        />
      ))}
    </View>
  );
}