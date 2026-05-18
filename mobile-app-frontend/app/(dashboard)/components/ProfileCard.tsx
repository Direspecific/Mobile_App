import { useRegistration } from "@/context/RegistrationContext";
import { Text, View } from "react-native";

export default function ProfileCard() {
  const { accountProfile, user } = useRegistration();
  const displayName = accountProfile?.fullName || user?.email || "User";
  const displayEmail = user?.email || "No email available";
  const accountStatus = user ? "Verified Account" : "Not signed in";

  return (
    <View className="mt-3 rounded-card border border-primary-muted bg-primary-pale px-4 py-4 shadow-md">
      <View className="flex-row items-center">
        <View className="mr-4 h-14 w-14 items-center justify-center rounded-full bg-primary">
          <Text className="text-body font-bold text-white">
            {displayName.slice(0, 2).toUpperCase()}
          </Text>
        </View>

        <View className="flex-1">
          <Text className="text-body font-bold text-neutral-900">
            {displayName}
          </Text>

          <Text className="mt-1 text-caption text-neutral-600">
            {displayEmail}
          </Text>

          <View className="mt-1 flex-row items-center">
            <View className="mr-1 h-2 w-2 rounded-full bg-success" />

            <Text className="text-caption text-success">
              {accountStatus}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
