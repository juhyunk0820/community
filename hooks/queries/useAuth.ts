import { postLogin, postSignup } from "@/api/auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { saveSecureStore } from "@/utils/secureStore";
import { setHeader } from "@/utils/header";

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: (data) => {
      router.replace("/auth/login");
    },
    onError: (error) => {
      console.error("Signup failed:", error);
    },
  });
}

function useLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }) => {
      setHeader("Authorization", `Bearer ${accessToken}`);
      await saveSecureStore("accessToken", accessToken);
      router.replace("/(tabs)");
    },
  });
}

function useAuth() {
  const loginMutation = useLogin();
  const signupMutation = useSignup();

  return {
    loginMutation,
    signupMutation,
  };
}

export default useAuth;
