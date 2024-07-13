import { test, expect, request } from "@playwright/test";

test.describe("Authorization Test", () => {
  test("Get Token", async ({ request }) => {
    const resp = await request.post("https://comatt.onrender.com/auth/token", {
      data: {
        username: "erkanturker",
        password: "12345",
      },
    });

    const token = await resp.json();
    console.log(token.token);

    expect(resp.ok).toBeTruthy();
  });
});
