import { getSecureStore } from "@/utils/secureStore";
import axiosInstance from "./axios";
import { Profile } from "@/types";

// Function to handle user login

type RequestUser = {
  email: string;
  password: string;
};

async function postSignup(body: RequestUser): Promise<void> {
  const { data } = await axiosInstance.post("/auth/signup", body, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}

async function postLogin(body: RequestUser): Promise<{ accessToken: string }> {
  const { data } = await axiosInstance.post("/auth/signin", body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
}

async function getMe(): Promise<Profile> {
  const accessToken = getSecureStore("accessToken");
  const { data } = await axiosInstance.get("/auth/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
}

export { postSignup, postLogin, getMe };
