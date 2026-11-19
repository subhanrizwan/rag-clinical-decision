import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, authApiUrl } from "@/lib/auth-config";

type LoginResponse = {
  token?: unknown;
  user?: unknown;
  message?: unknown;
};

export async function POST(request: Request) {
  let credentials: unknown;
  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json({ message: "Enter a valid email and password." }, { status: 400 });
  }

  if (
    !credentials ||
    typeof credentials !== "object" ||
    !("email" in credentials) ||
    !("password" in credentials) ||
    typeof credentials.email !== "string" ||
    typeof credentials.password !== "string"
  ) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
  }

  const requestedRole = "role" in credentials ? credentials.role : undefined;
  if (
    requestedRole !== undefined &&
    requestedRole !== "patient" &&
    requestedRole !== "doctor" &&
    requestedRole !== "admin"
  ) {
    return NextResponse.json({ message: "Choose a valid workspace." }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(authApiUrl("/api/auth/login"), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        ...(requestedRole ? { role: requestedRole } : {}),
      }),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { message: "The sign-in service is unavailable. Please try again later." },
      { status: 503 },
    );
  }

  let result: LoginResponse;
  try {
    result = (await upstream.json()) as LoginResponse;
  } catch {
    return NextResponse.json(
      { message: "The sign-in service returned an invalid response." },
      { status: 502 },
    );
  }

  if (!upstream.ok) {
    return NextResponse.json(
      { message: typeof result.message === "string" ? result.message : "Sign-in failed." },
      { status: upstream.status },
    );
  }

  if (
    typeof result.token !== "string" ||
    !result.user ||
    typeof result.user !== "object"
  ) {
    return NextResponse.json(
      { message: "The sign-in service returned an invalid response." },
      { status: 502 },
    );
  }

  const user = result.user as Record<string, unknown>;
  if (typeof user.id !== "string") {
    return NextResponse.json(
      { message: "The sign-in service returned an invalid account." },
      { status: 502 },
    );
  }
  if (
    typeof user.name !== "string" ||
    typeof user.email !== "string" ||
    (user.role !== "patient" && user.role !== "doctor" && user.role !== "admin")
  ) {
    return NextResponse.json(
      { message: "The sign-in service returned an invalid account." },
      { status: 502 },
    );
  }

  const response = NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
  response.cookies.set(AUTH_COOKIE_NAME, result.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return response;
}
