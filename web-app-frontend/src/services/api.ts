export type RegistrationStatus = "unregistered" | "pending" | "approved" | "rejected";

export type AuthUser = {
  id: string;
  email: string;
  role: string;
  status: RegistrationStatus;
  name?: string;
  avatar?: string;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

export const ADMIN_ROLE = "ADMIN";

type BackendStatus = "UNREGISTERED" | "PENDING" | "VERIFIED" | "REJECTED";

type BackendAuthResponse = {
  token: string;
  userId: string;
  email: string;
  role: string;
  status: BackendStatus;
};

type BackendRegisteredUserResponse = {
  id: string;
  email: string;
  role: string;
  status: BackendStatus;
};

type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  token?: string | null;
  body?: unknown;
};

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

function toRegistrationStatus(status: BackendStatus): RegistrationStatus {
  if (status === "PENDING") {
    return "pending";
  }

  if (status === "VERIFIED") {
    return "approved";
  }

  if (status === "REJECTED") {
    return "rejected";
  }

  return "unregistered";
}

function getMessageFromResponse(data: unknown) {
  if (data && typeof data === "object" && "message" in data) {
    return String(data.message);
  }

  if (data && typeof data === "object" && "error" in data) {
    return String(data.error);
  }

  return "Request failed. Please try again.";
}

export function isAdminUser(user: Pick<AuthUser, "role"> | null | undefined) {
  return user?.role?.toUpperCase() === ADMIN_ROLE;
}

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
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(getMessageFromResponse(data));
  }

  return data as T;
}

export async function loginAccount(email: string, password: string): Promise<AuthResponse> {
  const response = await apiRequest<BackendAuthResponse>("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });

  return {
    token: response.token,
    user: {
      id: response.userId,
      email: response.email,
      role: response.role,
      status: toRegistrationStatus(response.status),
      name: response.email.split("@")[0] || "Admin",
    },
  };
}

export async function registerAccount(email: string, password: string) {
  const user = await apiRequest<BackendRegisteredUserResponse>("/api/auth/register", {
    method: "POST",
    body: { email, password },
  });

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    status: toRegistrationStatus(user.status),
  };
}
