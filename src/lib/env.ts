function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  TURSO_DATABASE_URL: requireEnv("TURSO_DATABASE_URL"),
  TURSO_AUTH_TOKEN: requireEnv("TURSO_AUTH_TOKEN"),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: requireEnv(
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  ),
  CLERK_SECRET_KEY: requireEnv("CLERK_SECRET_KEY"),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: requireEnv("NEXT_PUBLIC_CLERK_SIGN_IN_URL"),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: requireEnv("NEXT_PUBLIC_CLERK_SIGN_UP_URL"),
  NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL: requireEnv(
    "NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL",
  ),
  NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL: requireEnv(
    "NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL",
  ),
};
