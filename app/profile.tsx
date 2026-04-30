import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

type ProfileInfoProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
};

function ProfileInfo({ icon, label, value }: ProfileInfoProps) {
  return (
    <View className="mb-3 min-h-[72px] flex-row items-center rounded-card border border-border bg-surface shadow-sm px-4 py-3">
      <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-primary-pale">
        <Ionicons name={icon} size={20} color="#1449E8" />
      </View>

      <View className="flex-1">
        <Text className="text-caption text-neutral-500">{label}</Text>
        <Text className="text-bodySm font-semibold text-neutral-900">
          {value}
        </Text>
      </View>
    </View>
  );
}

export default function Profile() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar style="dark" />

      {/* Fixed Content */}
      <View className="flex-1 px-4 pb-24">
        {/* Header */}
        <View className="mt-4">
          <Text className="ml-3 text-h2 font-bold text-neutral-900">
            My Profile
          </Text>

          <Text className="ml-3 text-bodySm text-neutral-600">
            View and manage your information
          </Text>
        </View>

        <View className="mt-4 items-center rounded-card border border-primary-muted bg-primary-pale p-5">
          <View className="h-20 w-20 items-center justify-center rounded-full bg-primary">
            <Text className="text-h4 font-bold text-white">C8</Text>
          </View>

          <Text className="mt-2 text-h3 font-bold text-neutral-900">
            C8nnect
          </Text>

          {/* account status */}
          <View className="mt-2 flex-row items-center  px-3 py-1">
            <Ionicons name="ellipse" size={15} color="#00C04C"/>

            <Text className="ml-1 text-caption font-semibold text-success">
              Verified Account
            </Text>
          </View>
        </View>

        {/* Profile Details */}
        <View className="mt-4">
          <ProfileInfo
            icon="person-outline"
            label="Full Name"
            value="C8nnect"
          />

          <ProfileInfo
            icon="mail-outline"
            label="Email"
            value="helloC8nnect@gmail.com"
          />

          <ProfileInfo
            icon="call-outline"
            label="Phone Number"
            value="+63 912 345 6789"
          />

          <ProfileInfo
            icon="calendar-outline"
            label="Date of Birth"
            value="January 01, 2000"
          />

          <ProfileInfo
            icon="location-outline"
            label="Address"
            value="General Santos City, Philippines"
          />
        </View>
      </View>

      <View
        className="absolute left-4 right-4 flex-row items-center"
        style={{ bottom: Math.max(insets.bottom, 25) }}
      >
        <Pressable
          onPress={() => router.back()}
          className="h-12 w-12 items-center justify-center rounded-full bg-primary active:opacity-80"
        >
          <Ionicons name="chevron-back" size={22} color="white" />
        </Pressable>

        <Pressable className="ml-3 h-12 flex-1 items-center justify-center rounded-full bg-primary active:opacity-80">
          <Text className="text-bodySm font-bold text-white">
            Edit Profile
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}