"use server";
import {
  axiosInstance,
  configGetWithAuthFetch,
} from "@/config/api/axios-config";
import { UserInformation } from "@/types";
import { cookies } from "next/headers";

export async function checkUser(
  accessToken: string
): Promise<UserInformation | null> {
  if (accessToken) {
    const response = await configGetWithAuthFetch<UserInformation>({
      endpoint: "/website/user/information/",
      cache: "no-cache",
      tags: ["getSessionsAction"],
    });
    if (response.status === 200) {
      return response.body;
    } else {
      return null;
    }
  }
  return null;
}

export async function createShadowUser() {
  // try {
  const res = await axiosInstance.post("/website/user/create-ghost/");
  cookies().set({
    name: "authorization",
    value: res.data.access,
    maxAge: res.data.access_exp / 1000,
  });
  cookies().set({
    name: "refresh",
    value: res.data.refresh,
    maxAge: res.data.refresh_exp / 1000,
  });
  const cookieStore = cookies();
  const authorizationShadow = cookieStore.get("authorization")?.value;
  const BearerAuth = authorizationShadow
    ? `Bearer ${authorizationShadow}`
    : null;
  return BearerAuth;
  //   return `Bearer ${res.data.access}` || "";
  // } catch (error) {
  //   const err = error as any;
  //   if (err.response) {
  //     throw new Error(`${err.response.data.message}`);
  //   }
  // }
}
