import { editProfile, getMe, postLogin, postSignup } from "@/api/auth";
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
import { queryKeys } from "@/constants";

function useGetMe() {
  const { data, isError, isSuccess } = useQuery({
    queryFn: getMe,
    queryKey: [queryKeys.AUTH, queryKeys.GET_ME],
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
      queryClient.fetchQuery({ queryKey: [queryKeys.AUTH, queryKeys.GET_ME] });
      router.replace("/");
    },
    onError: () => {
      //
    },
  });
}

function useEditProfile() {
  return useMutation({
    mutationFn: editProfile,
    onSuccess: (newProfile) => {
      queryClient.setQueryData([queryKeys.AUTH, queryKeys.GET_ME], newProfile);
      queryClient.invalidateQueries({
        queryKey: [
          queryKeys.GET_POSTS,
          queryKeys.GET_POST,
          queryKeys.GET_MY_POSTS,
          queryKeys.GET_LIKED_POSTS,
        ],
      });
    },
  });
}

function useAuth() {
  const { data } = useGetMe();
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const editProfileMutation = useEditProfile();

  const logout = () => {
    removeHeader("Authorization");
    removeSecureStore("accessToken");
    queryClient.resetQueries({ queryKey: [queryKeys.AUTH] });
  };

  return {
    auth: {
      id: data?.id ?? "",
      nickname: data?.nickname ?? "",
      imageUri: data?.imageUri ?? "",
      introduce: data?.introduce ?? "",
      hatId: data?.hatId ?? "",
      faceId: data?.faceId ?? "",
      topId: data?.topId ?? "",
      bottomId: data?.bottomId ?? "",
      handId: data?.handId ?? "",
      skinId: data?.skinId ?? "",
    },
    loginMutation,
    signupMutation,
    editProfileMutation,
    logout,
  };
}

export default useAuth;
