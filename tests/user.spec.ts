import { test, expect, request } from "@playwright/test";

test.describe("GET /user", () => {
  test("it shoold get all users by admin", async ({ request }) => {
    const respToken = await request.post(
      "https://comatt.onrender.com/auth/token",
      {
        data: {
          username: "erkanturker",
          password: "12345",
        },
      }
    );

    const token = await respToken.json();
    console.log(token.token);

    const respUser = await request.get("https://comatt.onrender.com/users", {
      headers: {
        authorization: token.token,
      },
    });

    expect(respUser.status()).toBe(200);
    console.log(await respUser.json());
  });
});
