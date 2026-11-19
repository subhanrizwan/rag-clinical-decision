import { NextResponse } from "next/server";
import { authApiUrl } from "@/lib/auth-config";

type RegisterResponse = {
  user?: unknown;
  message?: unknown;
};

export async function POST(request: Request) {
  let account: unknown;
  try {
    account = await request.json();
  } catch {
    return NextResponse.json({ message: "Enter valid account details." }, { status: 400 });
  }

  if (
    !account ||
    typeof account !== "object" ||
    !("name" in account) ||
    !("email" in account) ||
    !("password" in account) ||
    !("role" in account) ||
    typeof account.name !== "string" ||
    typeof account.email !== "string" ||
    typeof account.password !== "string" ||
    (account.role !== "patient" && account.role !== "doctor")
  ) {
    return NextResponse.json({ message: "Enter valid account details." }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(authApiUrl("/api/auth/register"), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: account.name,
        email: account.email,
        password: account.password,
        role: account.role,
      }),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { message: "The registration service is unavailable. Please try again later." },
      { status: 503 },
    );
  }

  let result: RegisterResponse;
  try {
    result = (await upstream.json()) as RegisterResponse;
  } catch {
    return NextResponse.json(
      { message: "The registration service returned an invalid response." },
      { status: 502 },
    );
  }

  if (!upstream.ok) {
    return NextResponse.json(
      { message: typeof result.message === "string" ? result.message : "Registration failed." },
      { status: upstream.status },
    );
  }

  return NextResponse.json(
    {
      message: typeof result.message === "string" ? result.message : "Account created.",
      user: result.user,
    },
    { status: upstream.status },
  );
}
