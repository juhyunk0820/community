import { getMe, postLogin, postSignup } from "@/api/auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { removeSecureStore, saveSecureStore } from "@/utils/secureStore";
import { removeHeader, setHeader } from "@/utils/header";
import queryClient from "@/api/queryClient";
import { useEffect } from "react";

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
      queryClient.fetchQuery({
        queryKey: ["auth", "getMe"],
      });
      router.replace("/");
    },
  });
}

function useGetMe() {
  const { data, isError } = useQuery({
    queryFn: getMe,
    queryKey: ["auth", "getMe"],
  });

  useEffect(() => {
    if (isError) {
      removeHeader("Authorization");
      removeSecureStore("accessToken");
    }
  }, [isError]);
  return { data };
}

function useAuth() {
  const { data } = useGetMe();
  const loginMutation = useLogin();
  const signupMutation = useSignup();

  return {
    auth: {
      id: data?.id ?? "",
    },
    loginMutation,
    signupMutation,
  };
}

export default useAuth;
