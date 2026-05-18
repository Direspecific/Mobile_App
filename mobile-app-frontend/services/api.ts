import Constants from "expo-constants";
import { Platform } from "react-native";

export type RegistrationStatus = "unregistered" | "pending" | "approved";

export type AuthUser = {
  id: string;
  email: string;
  role: string;
  status: RegistrationStatus;
};

export type AuthResponse = {
  token: string;
  userId: string;
  email: string;
  role: string;
  status: RegistrationStatus;
};

export type RegisteredUserResponse = {
  id: string;
  email: string;
  role: string;
  status: RegistrationStatus;
};

type BackendStatus = "UNREGISTERED" | "PENDING" | "VERIFIED" | "REJECTED";

type BackendAuthResponse = Omit<AuthResponse, "status"> & {
  status: BackendStatus;
};

type BackendRegisteredUserResponse = Omit<RegisteredUserResponse, "status"> & {
  status: BackendStatus;
};

export type VoterPayload = {
  lastName: string;
  firstName: string;
  middleName: string;
  suffix: string;
  address: {
    province: string;
    city: string;
    barangay: string;
    street: string;
  };
  citizenship: string;
  civilStatus: string;
  sex: string;
  dateOfBirth: string;
  placeOfBirth: string;
  residence: {
    cityYears: number;
    phYears: number;
  };
  flags: {
    indigenous: boolean;
    illiterate: boolean;
    pwd: boolean;
  };
  pwdDetails: string;
  accessiblePolling: boolean;
  parents: {
    father: string;
    mother: string;
  };
  email: string;
  biometrics: {
    facial: boolean;
  };
};

export type VoterRegistration = VoterPayload & {
  id: string;
  userId: string;
};

const configuredApiUrl = process.env.EXPO_PUBLIC_API_URL;

function getApiBaseUrl() {
  if (configuredApiUrl) {
    return configuredApiUrl.replace(/\/$/, "");
  }

  const devHost = Constants.expoConfig?.hostUri?.split(":")[0];

  if (devHost) {
    return `http://${devHost}:8080`;
  }

  if (Platform.OS === "android") {
    return "http://10.0.2.2:8080";
  }

  return "http://localhost:8080";
}

const API_BASE_URL = getApiBaseUrl();

function toRegistrationStatus(status: BackendStatus): RegistrationStatus {
  if (status === "PENDING") {
    return "pending";
  }

  if (status === "VERIFIED") {
    return "approved";
  }

  return "unregistered";
}

type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  token?: string | null;
  body?: unknown;
};

async function apiRequest<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const text = await response.text();
  let data: unknown = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const message =
      data && typeof data === "object" && "message" in data
        ? String(data.message)
        : typeof data === "string"
          ? data
        : "Request failed. Please try again.";

    throw new Error(message);
  }

  return data as T;
}

export async function registerAccount(email: string, password: string) {
  const user = await apiRequest<BackendRegisteredUserResponse>("/api/auth/register", {
    method: "POST",
    body: { email, password },
  });

  return {
    ...user,
    status: toRegistrationStatus(user.status),
  };
}

export async function loginAccount(email: string, password: string) {
  const response = await apiRequest<BackendAuthResponse>("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });

  return {
    ...response,
    status: toRegistrationStatus(response.status),
  };
}

export function verifyOtp(email: string, otp: string) {
  return apiRequest<string>("/api/auth/verify-otp", {
    method: "POST",
    body: { email, otp },
  });
}

export function resendOtp(email: string) {
  return apiRequest<string>(
    `/api/auth/resend-otp?email=${encodeURIComponent(email)}`,
    {
      method: "POST",
    },
  );
}

export function createVoterRegistration(
  voter: VoterPayload,
  userId: string,
  token: string,
) {
  return apiRequest("/api/voters", {
    method: "POST",
    token,
    body: { voter, userId },
  });
}

export function getVoterRegistrationByUserId(userId: string, token: string) {
  return apiRequest<VoterRegistration>(`/api/voters/user/${userId}`, {
    token,
  });
}
