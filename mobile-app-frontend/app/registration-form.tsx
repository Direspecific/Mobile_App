import { Alert, View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "./components/InputField";
import RadioButton from "./components/RadioButton";
import { useState } from "react";
import { router } from "expo-router";
import Checkbox from "./components/CheckBox";
import { useRegistration } from "@/context/RegistrationContext";
import { Ionicons } from "@expo/vector-icons";
import { createVoterRegistration } from "@/services/api";

const initialForm = {
  lastName: "",
  firstName: "",
  middleName: "",
  suffix: "",
  province: "",
  city: "",
  barangay: "",
  street: "",
  dateOfBirth: "",
  placeOfBirth: "",
  cityYears: "",
  phYears: "",
  fatherLastName: "",
  fatherFirstName: "",
  fatherMiddleName: "",
  motherLastName: "",
  motherFirstName: "",
  motherMiddleName: "",
};

export default function RegistrationForm() {
  const [form, setForm] = useState(initialForm);
  const [citizenship, setCitizenship] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [sex, setSex] = useState("");
  const [isIndigenous, setIsIndigenous] = useState(false);
  const [isIlliterate, setIsIlliterate] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setStatus, user, token } = useRegistration();

  const updateField = (field: keyof typeof initialForm) => (value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!user || !token) {
      Alert.alert("Please sign in", "Log in before submitting voter registration.");
      router.replace("/login");
      return;
    }

    if (
      !form.lastName.trim() ||
      !form.firstName.trim() ||
      !form.province.trim() ||
      !form.city.trim() ||
      !form.barangay.trim() ||
      !citizenship ||
      !civilStatus ||
      !sex
    ) {
      Alert.alert("Missing details", "Please complete the required voter details.");
      return;
    }

    try {
      setIsSubmitting(true);
      await createVoterRegistration(
        {
          lastName: form.lastName.trim(),
          firstName: form.firstName.trim(),
          middleName: form.middleName.trim(),
          suffix: form.suffix.trim(),
          address: {
            province: form.province.trim(),
            city: form.city.trim(),
            barangay: form.barangay.trim(),
            street: form.street.trim(),
          },
          citizenship,
          civilStatus,
          sex,
          dateOfBirth: form.dateOfBirth.trim(),
          placeOfBirth: form.placeOfBirth.trim(),
          residence: {
            cityYears: Number.parseInt(form.cityYears, 10) || 0,
            phYears: Number.parseInt(form.phYears, 10) || 0,
          },
          flags: {
            indigenous: isIndigenous,
            illiterate: isIlliterate,
            pwd: isDisabled,
          },
          pwdDetails: "",
          accessiblePolling: isDisabled,
          parents: {
            father: [
              form.fatherFirstName,
              form.fatherMiddleName,
              form.fatherLastName,
            ]
              .filter(Boolean)
              .join(" "),
            mother: [
              form.motherFirstName,
              form.motherMiddleName,
              form.motherLastName,
            ]
              .filter(Boolean)
              .join(" "),
          },
          email: user.email,
          biometrics: {
            facial: true,
          },
        },
        user.id,
        token,
      );

      setStatus("pending");
      Alert.alert("Registration submitted", "Your voter registration is now pending review.");
      router.replace("/(dashboard)");
    } catch (error) {
      Alert.alert(
        "Submission failed",
        error instanceof Error ? error.message : "Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-orange-50" contentContainerStyle={{ paddingBottom: 48 }} keyboardShouldPersistTaps="handled">
      <SafeAreaView className="flex-row items-center" edges={["top"]}>
        <Pressable onPress={() => router.back()} className="p-4">
          <Ionicons name="arrow-back" size={24} color="#6b7280" />
        </Pressable>
        <View>
          <Text className="text-lg font-bold text-blue-500">Register Voter</Text>
          <Text className="text-sm text-gray-500">Add as new voter to the system</Text>
        </View>
      </SafeAreaView>

      <Text className="p-4 text-lg font-bold">Name</Text>

      <View className="gap-3 mx-4">
        <View className="flex-row gap-3">
          <InputField label="Last Name" value={form.lastName} onChangeText={updateField("lastName")} />
          <InputField label="First Name" value={form.firstName} onChangeText={updateField("firstName")} />
        </View>

        <View className="flex-row gap-3">
          <InputField label="Middle Name" value={form.middleName} onChangeText={updateField("middleName")} />
          <InputField label="Suffix (If any)" value={form.suffix} onChangeText={updateField("suffix")} />
        </View>
      </View>

      <Text className="p-4 text-lg font-bold">Residential Address</Text>

      <View className="gap-3 mx-4">
        <View className="flex-row gap-3">
          <InputField label="Province" value={form.province} onChangeText={updateField("province")} />
          <InputField label="City / Municipality" value={form.city} onChangeText={updateField("city")} />
        </View>

        <View className="flex-row gap-3">
          <InputField label="Barangay" value={form.barangay} onChangeText={updateField("barangay")} />
          <InputField label="House / Street No." value={form.street} onChangeText={updateField("street")} />
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
          <InputField label="Date of birth" value={form.dateOfBirth} onChangeText={updateField("dateOfBirth")} />
          <InputField label="Place of birth" value={form.placeOfBirth} onChangeText={updateField("placeOfBirth")} />
        </View>
      </View>

      <Text className="p-4 text-lg font-bold">Period of Residency</Text>

      <View className="gap-3 mx-4">
        <View className="flex-row gap-3">
          <InputField label="In the city" placeholder="YEAR" value={form.cityYears} onChangeText={updateField("cityYears")} />
          <InputField label="In the Philippines" placeholder="YEAR" value={form.phYears} onChangeText={updateField("phYears")} />
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

      <Text className="p-4 text-lg font-bold">Parent Name</Text>
      <View className="gap-3 mx-4">
        <Text className="text-sm font-semibold text-gray-500">Father</Text>
        <View className="flex-row gap-3">
          <InputField label="Last Name" value={form.fatherLastName} onChangeText={updateField("fatherLastName")} />
          <InputField label="First Name" value={form.fatherFirstName} onChangeText={updateField("fatherFirstName")} />
        </View>
        <InputField label="Middle Name" value={form.fatherMiddleName} onChangeText={updateField("fatherMiddleName")} />

        <Text className="text-sm font-semibold text-gray-500 mt-2">Mother</Text>
        <View className="flex-row gap-3">
          <InputField label="Last Name" value={form.motherLastName} onChangeText={updateField("motherLastName")} />
          <InputField label="First Name" value={form.motherFirstName} onChangeText={updateField("motherFirstName")} />
        </View>
        <InputField label="Middle Name" value={form.motherMiddleName} onChangeText={updateField("motherMiddleName")} />
      </View>

      <Text className="p-4 text-lg font-bold">Biometrics</Text>

      <Pressable
        onPress={!isSubmitting ? handleSubmit : undefined}
        disabled={isSubmitting}
        className={`bg-blue-500 p-4 rounded-full mx-4 mt-4 ${isSubmitting ? "opacity-50" : ""}`}
      >
        <Text className="text-white text-center font-semibold">
          {isSubmitting ? "Submitting..." : "Submit Registration"}
        </Text>
      </Pressable>

    </ScrollView>
  );
}
