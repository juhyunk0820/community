import useAuth from "@/hooks/queries/useAuth";
import { router, useFocusEffect } from "expo-router";
import React, { Children, ReactNode } from "react";
import { StyleSheet } from "react-native";

interface AuthRouteProps {
  children: ReactNode;
}

function AuthRoute({ children }: AuthRouteProps) {
  const { auth } = useAuth();

  useFocusEffect(() => {
    !auth.id && router.replace("/auth");
  });
  return <>{children}</>;
}

const styles = StyleSheet.create({});

export default AuthRoute;
