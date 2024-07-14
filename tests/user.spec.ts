import {
  test,
  expect,
  request as baseRequest,
  APIRequestContext,
} from "@playwright/test";
import { getAdminToken, getTeacherToken } from "../utils/tokenGenerator";
import User from "../types/user";
import exp from "constants";

let request: APIRequestContext;
let adminToken: string;
let teacherToken: string;
let users: User[];

test.beforeAll(async () => {
  request = await baseRequest.newContext();
  adminToken = await getAdminToken();
  teacherToken = await getTeacherToken();
});

test.describe("GET /user", () => {
  test("it shoold get all users by admin", async () => {
    const respUser = await request.get("/users", {
      headers: {
        authorization: `Bearer ${adminToken}`,
      },
    });

    users = await respUser.json();

    expect(users[0]).toHaveProperty("username");
  });

  test("should NOT get  users by teacher", async () => {
    const respUser = await request.get("/users", {
      headers: {
        authorization: `Bearer ${teacherToken}`,
      },
    });

    expect(respUser.status()).toBe(401);
  });
});

test.describe("GET /users/id", () => {
  test("should get user by username", async () => {
   
    const respUser = await request.get(`/users/${users[0].username}`, {
      headers: {
        authorization: `Bearer ${adminToken}`,
      },
    });

    const user: User = await respUser.json();

    expect(respUser.status()).toBe(200);
    expect(user).toEqual(users[0]);
  });
});
