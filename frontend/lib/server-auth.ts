import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, authApiUrl } from "./auth-config";

export type WorkspaceRole = "patient" | "doctor" | "admin";

export type AuthenticatedUser = {
  id: string;
  name: string;
  email: string;
  role: WorkspaceRole;
};

function isAuthenticatedUser(value: unknown): value is AuthenticatedUser {
  if (!value || typeof value !== "object") return false;
  const user = value as Record<string, unknown>;
  return (
    typeof user.id === "string" &&
    typeof user.name === "string" &&
    typeof user.email === "string" &&
    (user.role === "patient" || user.role === "doctor" || user.role === "admin")
  );
}

export async function requireWorkspaceUser(
  requiredRole: WorkspaceRole,
): Promise<AuthenticatedUser> {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
  if (!token) redirect("/login");

  let response: Response;
  try {
    response = await fetch(authApiUrl("/api/auth/me"), {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    });
  } catch {
    redirect("/login");
  }

  if (!response.ok) redirect("/login");

  const result: unknown = await response.json();
  if (
    !result ||
    typeof result !== "object" ||
    !("user" in result) ||
    !isAuthenticatedUser(result.user)
  ) {
    redirect("/login");
  }

  if (result.user.role !== requiredRole) {
    redirect(`/${result.user.role}`);
  }

  return result.user;
}
