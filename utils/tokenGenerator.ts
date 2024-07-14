import { APIRequestContext, request } from "@playwright/test";

type AuthCredentials = {
  username: string;
  password: string;
};

async function tokenGenerator(credentials: AuthCredentials): Promise<string> {
  const context: APIRequestContext = await request.newContext({
    baseURL: process.env.BASE_URL,
  });

  const respToken = await context.post("/auth/token", {
    data: credentials,
  });

  if (!respToken.ok()) {
    throw new Error(`Failed to get Token: ${respToken.status()}`);
  }

  const tokenResponse = await respToken.json();
  return tokenResponse.token;
}

export async function getAdminToken(): Promise<string> {
  const authCredentials: AuthCredentials = JSON.parse(
    process.env.ADMMIN_CREDENTIALS!
  );
  return tokenGenerator(authCredentials);
}

export async function getTeacherToken(): Promise<string> {
  const authCredentials: AuthCredentials = JSON.parse(
    process.env.TEACHER_CREDENTIALS!
  );
  return tokenGenerator(authCredentials);
}
