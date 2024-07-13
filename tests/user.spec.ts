import { test, expect, request } from "@playwright/test";

test.describe("GET /user", () => {
  test("it shoold get all users by admin", async ({ request }) => {
    type user = {
      username: string;
      password: string;
    };
    const adminCred: user = JSON.parse(process.env.ADMMIN_CREDENTIALS!);

    const respToken = await request.post(`/auth/token`, {
      data: {
        username: adminCred.username,
        password: adminCred.password,
      },
    });

    const token = await respToken.json();
    console.log(token.token);

    const respUser = await request.get("/users", {
      headers: {
        authorization: token.token,
      },
    });

    expect(respUser.status()).toBe(200);
    console.log(await respUser.json());
  });
});
