import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

type ProfileInfoProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  editable: boolean;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "email-address" | "phone-pad";
};

function ProfileInfo({
  icon,
  label,
  value,
  editable,
  onChangeText,
  keyboardType = "default",
}: ProfileInfoProps) {
  return (
    <View className="mb-3 min-h-[72px] flex-row items-center rounded-card border border-border bg-surface px-4 py-3 shadow-sm">
      <View className="mr-4 h-10 w-10 items-center justify-center">
        <Ionicons name={icon} size={20} color="#BFC6CC" />
      </View>

      <View className="flex-1">
        <Text className="text-caption text-neutral-500">{label}</Text>

        {editable ? (
          <TextInput
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            className="mt-1 rounded-lg border border-border px-3 py-1 text-bodySm font-semibold text-neutral-900"
            placeholder={`Enter ${label}`}
          />
        ) : (
          <Text className="text-bodySm font-semibold text-neutral-900">
            {value}
          </Text>
        )}
      </View>
    </View>
  );
}

export default function Profile() {
  const insets = useSafeAreaInsets();

  const [isEditing, setIsEditing] = useState(false); // Track edit mode

  const [profile, setProfile] = useState({
    fullName: "C8nnect",
    email: "helloC8nnect@gmail.com",
    phone: "+63 912 345 6789",
    dateOfBirth: "January 01, 2000",
    address: "General Santos City, Philippines",
  });

  const updateProfile = (field: keyof typeof profile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditSave = () => {
    if (isEditing) {
      console.log("Saved profile:", profile);
    
    }

    setIsEditing(!isEditing); 
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar style="dark" />

      <View className="flex-1 px-4 pb-24">
       
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
            {profile.fullName}
          </Text>

          <View className="mt-2 flex-row items-center px-3 py-1">
            <Ionicons name="ellipse" size={15} color="#00C04C" />

            <Text className="ml-1 text-caption text-success">
              Verified Account
            </Text>
          </View>
        </View>

       
        <View className="mt-4">
          <ProfileInfo
            icon="person-outline"
            label="Full Name"
            value={profile.fullName}
            editable={isEditing}
            onChangeText={(text) => updateProfile("fullName", text)}
          />

          <ProfileInfo
            icon="mail-outline"
            label="Email"
            value={profile.email}
            editable={isEditing}
            keyboardType="email-address"
            onChangeText={(text) => updateProfile("email", text)}
          />

          <ProfileInfo
            icon="call-outline"
            label="Phone Number"
            value={profile.phone}
            editable={isEditing}
            keyboardType="phone-pad"
            onChangeText={(text) => updateProfile("phone", text)}
          />

          <ProfileInfo
            icon="calendar-outline"
            label="Date of Birth"
            value={profile.dateOfBirth}
            editable={isEditing}
            onChangeText={(text) => updateProfile("dateOfBirth", text)}
          />

          <ProfileInfo
            icon="location-outline"
            label="Address"
            value={profile.address}
            editable={isEditing}
            onChangeText={(text) => updateProfile("address", text)}
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

        <Pressable
          onPress={handleEditSave}
          className="ml-3 h-12 flex-1 items-center justify-center rounded-full bg-primary active:opacity-80"
        >
          <Text className="text-bodySm font-bold text-white">
            {isEditing ? "Save Profile" : "Edit Profile"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}