export const AUTH_COOKIE_NAME = "rcds_session";

export function authApiUrl(path: string) {
  const baseUrl = process.env.AUTH_API_URL ?? "http://127.0.0.1:5000";
  return `${baseUrl.replace(/\/$/, "")}${path}`;
}
