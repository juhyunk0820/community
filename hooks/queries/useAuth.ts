import { getMe, postLogin, postSignup } from "@/api/auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import {
  getSecureStore,
  removeSecureStore,
  saveSecureStore,
} from "@/utils/secureStore";
import { removeHeader, setHeader } from "@/utils/header";
import queryClient from "@/api/queryClient";
import { useEffect } from "react";

function useGetMe() {
  const { data, isError, isSuccess } = useQuery({
    queryFn: getMe,
    queryKey: ["auth", "getMe"],
  });

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        await getSecureStore("accessToken").then((accessToken) => {
          setHeader("Authorization", `Bearer ${accessToken}`);
        });
      } else {
        removeHeader("Authorization");
      }
    })();
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader("Authorization");
      removeSecureStore("accessToken");
    }
  }, [isError]);

  return { data };
}

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => router.replace("/auth/login"),
    onError: () => {
      //
    },
  });
}

function useLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }) => {
      setHeader("Authorization", `Bearer ${accessToken}`);
      await saveSecureStore("accessToken", accessToken);
      queryClient.fetchQuery({ queryKey: ["auth", "getMe"] });
      router.replace("/");
    },
    onError: () => {
      //
    },
  });
}

function useAuth() {
  const { data } = useGetMe();
  const loginMutation = useLogin();
  const signupMutation = useSignup();

  const logout = () => {
    removeHeader("Authorization");
    removeSecureStore("accessToken");
    queryClient.resetQueries({ queryKey: ["auth"] });
  };

  return {
    auth: {
      id: data?.id ?? "",
      nickname: data?.nickname ?? "",
    },
    loginMutation,
    signupMutation,
    logout,
  };
}

export default useAuth;
