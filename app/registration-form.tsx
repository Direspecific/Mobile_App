import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "./components/InputField";
import RadioButton from "./components/RadioButton";
import { useState } from "react";
import { router } from "expo-router";
import Checkbox from "./components/CheckBox";
import { useRegistration } from "@/context/RegistrationContext";

export default function RegistrationForm() {
  const [citizenship, setCitizenship] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [sex, setSex] = useState("");
  const [isIndigenous, setIsIndigenous] = useState(false);
  const [isIlliterate, setIsIlliterate] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { setStatus } = useRegistration();

  return (
    <ScrollView className="flex-1 bg-orange-50" contentContainerStyle={{ paddingBottom: 48 }} keyboardShouldPersistTaps="handled">
      <SafeAreaView className="flex-row items-center justify-between" edges={['top']}>
        <View className="p-4">
          <Text className="text-lg font-bold text-orange-500">
            Register Voter
          </Text>
          <Text className="text-sm text-gray-500">
            Add as new voter to the system
          </Text>
        </View>
      </SafeAreaView>

      <Text className="p-4 text-lg font-bold">Name</Text>

      <View className="gap-3 mx-4">
        <View className="flex-row gap-3">
          <InputField label="Last Name"/>
          <InputField label="First Name"/>
        </View>

        <View className="flex-row gap-3">
          <InputField label="Middle Name"/>
          <InputField label="Suffix (If any)"/>
        </View>
      </View>

      <Text className="p-4 text-lg font-bold">Residential Address</Text>

      <View className="gap-3 mx-4">
        <View className="flex-row gap-3">
          <InputField label="Province"/>
          <InputField label="City / Municipality"/>
        </View>

        <View className="flex-row gap-3">
          <InputField label="Barangay"/>
          <InputField label="House / Street No."/>
        </View>
      </View>

      <Text className="p-4 text-lg font-bold">Citizenship</Text>
      <View className="gap-3 mx-4">
        <View className="flex-row gap-3">
          <RadioButton
            label="By birth"
            selected={citizenship === "by_birth"}
            onPress={() => setCitizenship("by_birth")}
          />
          <RadioButton
            label="Reacquired"
            selected={citizenship === "reacquired"}
            onPress={() => setCitizenship("reacquired")}
          />
        </View>

        <View className="flex-row gap-3">
          <RadioButton
            label="Naturalized"
            selected={citizenship === "naturalized"}
            onPress={() => setCitizenship("naturalized")}
          />
        </View>
      </View>

      <Text className="p-4 text-lg font-bold">Civil Status</Text>
      <View className="gap-3 mx-4">
        <View className="flex-row gap-3">
          <RadioButton
            label="Single"
            selected={civilStatus === "single"}
            onPress={() => setCivilStatus("single")}
          />
          <RadioButton
            label="Married"
            selected={civilStatus === "married"}
            onPress={() => setCivilStatus("married")}
          />
        </View>

        <View className="flex-row gap-3">
          <RadioButton
            label="Widow"
            selected={civilStatus === "widow"}
            onPress={() => setCivilStatus("widow")}
          />
          <RadioButton
            label="Legally Separated"
            selected={civilStatus === "legally_separated"}
            onPress={() => setCivilStatus("legally_separated")}
          />
        </View>
      </View>

      <Text className="p-4 text-lg font-bold">Sex</Text>
  
      <View className="gap-3 mx-4">
        <View className="flex-row gap-3">
          <RadioButton
            label="Male"
            selected={sex === "male"}
            onPress={() => setSex("male")}
          />
          <RadioButton
            label="Female"
            selected={sex === "female"}
            onPress={() => setSex("female")}
          />
        </View>

        <View className="flex-row gap-3">
          <InputField label="Date of birth"/>
          <InputField label="Place of birth"/>
        </View>
      </View>

      <Text className="p-4 text-lg font-bold">Period of Residency</Text>

      <View className="gap-3 mx-4">
        <View className="flex-row gap-3">
          <InputField label="In the city" placeholder="YEAR"/>
          <InputField label="In the Philippines" placeholder="YEAR" />
        </View>

        <Checkbox
          label="Indigenous People"
          checked={isIndigenous}
          onPress={() => setIsIndigenous(!isIndigenous)}
        />
        <Checkbox
          label="Illiterate"
          checked={isIlliterate}
          onPress={() => setIsIlliterate(!isIlliterate)}
        />
        <Checkbox
          label="Person with Disability"
          checked={isDisabled}
          onPress={() => setIsDisabled(!isDisabled)}
        />
      </View>

      <Text className="p-4 text-lg font-bold">Parent's Name</Text>

      <View className="gap-3 mx-4">
        <View className="gap-3">
          <InputField label="Father's Name"/>
          <InputField label="Mother's Name"/>
        </View>
      </View>

      <Text className="p-4 text-lg font-bold">Biometrics</Text>

      <Pressable
        onPress={() => {
          setStatus("approved");
          router.push("/(dashboard)");
        }}
        className="bg-orange-500 p-4 rounded-full mx-4 mt-4"
      >
        <Text className="text-white text-center font-semibold">
          Register
        </Text>
      </Pressable>

    </ScrollView>
  );
}