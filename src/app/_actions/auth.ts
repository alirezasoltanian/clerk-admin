"use server"
// import { SignInType, UserInformation } from "@/types";
// import { ResetPasswordType, SignUpType } from "@/types/authType";
import { GetServerSidePropsContext } from "next";
import { cookies } from "next/headers";
import { checkUser } from "./action-auth";
export interface ReturnSignin {
  access: string;
  access_exp: number
  refresh: string
  refresh_exp: number
}


export const getUser = async () => {
  let isAuthenticated = false;
  let accessToken = null;
  let user = null;
  if (cookies().get("authorization"))
    accessToken = cookies().get("authorization")?.value;
  if (cookies().get("refresh")) {
    if (!accessToken && cookies().get("refresh")?.value) {
      // const setCookies = await refreshToken(cookies().get("refresh")?.value);
      accessToken = cookies().get("authorization")?.value;
      
    }
    if (accessToken) {
      user = await checkUser(accessToken);

      if (user) isAuthenticated = true;
    } else user = null;
  } else {
    user = null;
  }

  return {
    isAuthenticated,
    user,
  };
};


