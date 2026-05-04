import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

type TermsConditionModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function TermsConditionModal({
  visible,
  onClose,
}: TermsConditionModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/25">
        <Pressable className="flex-1" onPress={onClose} />

        <View
          style={{ height: "80%" }}
          className="rounded-t-[28px] bg-[#F6F6F1] px-4 pb-6 pt-3"
        >
          <View className="mb-4 h-1.5 w-14 self-center rounded-full bg-neutral-300" />

          <View className="mb-2 flex-row items-center justify-between">
            <Text className="text-h3 font-bold text-neutral-900">
              Terms & Condition
            </Text>

            <Pressable onPress={onClose} className="active:opacity-70">
              <Ionicons name="close" size={20} color="#555" />
            </Pressable>
          </View>

          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <Text className="mb-2 border-b border-neutral-400 pb-2 text-bodySm text-neutral-900">
              Privacy Notice & Agreement
            </Text>

            <Text className="mb-5 text-bodySm text-neutral-700">
              Last updated April 24, 2026
            </Text>

            <Text className="mb-5 text-bodySm leading-6 text-neutral-800">
              By creating an account and using the VOTELEC mobile application,
              you agree to this Privacy Notice and User Agreement. This explains
              how your personal information may be collected, used, protected,
              and shared when using the app.
            </Text>

            <Text className="mb-3 text-bodySm font-semibold text-neutral-900">
              1. Information We Collect
            </Text>

            <Text className="mb-5 text-bodySm leading-6 text-neutral-800">
              We may collect personal information that you provide, such as your
              full name, email address, phone number, address, username,
              password, and verification details. When needed, the app may also
              request access to device features such as the camera and push
              notifications.
            </Text>

            <Text className="mb-3 text-bodySm font-semibold text-neutral-900">
              2. How We Use Your Information
            </Text>

            <Text className="mb-5 text-bodySm leading-6 text-neutral-800">
              Your information may be used to create and manage your account,
              verify your identity and voter eligibility, process voter
              registration requests, update or correct registration records,
              send important notices, prevent fraud, and maintain the security
              and performance of the app.
            </Text>

            <Text className="mb-3 text-bodySm font-semibold text-neutral-900">
              3. Sharing of Information
            </Text>

            <Text className="mb-5 text-bodySm leading-6 text-neutral-800">
              We may share your information only when necessary with authorized
              government entities, data storage providers, security providers,
              identity verification services, analytics services, or other
              service providers needed to operate the application. We do not
              sell your personal information.
            </Text>

            <Text className="mb-3 text-bodySm font-semibold text-neutral-900">
              4. Data Security
            </Text>

            <Text className="mb-5 text-bodySm leading-6 text-neutral-800">
              We use reasonable technical and organizational measures to protect
              your personal information. However, no electronic transmission or
              storage system is completely secure, so users must also access the
              app in a safe and secure environment.
            </Text>

            <Text className="mb-3 text-bodySm font-semibold text-neutral-900">
              5. Data Retention
            </Text>

            <Text className="mb-5 text-bodySm leading-6 text-neutral-800">
              Your personal information will only be kept for as long as needed
              for voter registration processing, account management, security,
              legal compliance, or other valid purposes. When no longer needed,
              the information may be deleted, anonymized, or securely stored as
              required by law.
            </Text>

            <Text className="mb-3 text-bodySm font-semibold text-neutral-900">
              6. Your Privacy Rights
            </Text>

            <Text className="mb-5 text-bodySm leading-6 text-neutral-800">
              You may request to access, review, update, correct, or delete your
              personal information. You may also withdraw consent when
              applicable. Some requests may be limited by legal, security, or
              registration requirements.
            </Text>

            <Text className="mb-3 text-bodySm font-semibold text-neutral-900">
              7. App Permissions
            </Text>

            <Text className="mb-5 text-bodySm leading-6 text-neutral-800">
              The app may request permissions such as camera access for identity
              or document verification and push notifications for account,
              registration status, schedule, requirement, or deadline updates.
              You may manage these permissions through your device settings.
            </Text>

            <Text className="mb-3 text-bodySm font-semibold text-neutral-900">
              8. Voter Registration Processing
            </Text>

            <Text className="mb-5 text-bodySm leading-6 text-neutral-800">
              Information submitted through the app may be used only for
              voter-registration-related purposes, including identity
              verification, registration processing, status updates, appointment
              scheduling, and compliance with election and data privacy
              requirements. Users must provide truthful, complete, and accurate
              information.
            </Text>

            <Text className="mb-3 text-bodySm font-semibold text-neutral-900">
              9. Updates to This Notice
            </Text>

            <Text className="mb-5 text-bodySm leading-6 text-neutral-800">
              This notice may be updated when necessary to comply with laws or
              improve transparency. Continued use of the app means you accept the
              updated version.
            </Text>

            <Text className="mb-3 text-bodySm font-semibold text-neutral-900">
              10. Contact Information
            </Text>

            <Text className="mb-5 text-bodySm leading-6 text-neutral-800">
              For privacy questions, concerns, or requests, you may contact us
              at comelec@gmail.com.
            </Text>

            <Text className="mb-3 text-bodySm font-semibold text-neutral-900">
              11. User Consent
            </Text>

            <Text className="mb-8 text-bodySm leading-6 text-neutral-800">
              By pressing “I Agree,” you confirm that you have read and
              understood this Privacy Notice and User Agreement, that the
              information you provide is accurate, and that you consent to the
              collection and use of your information as described above.
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}