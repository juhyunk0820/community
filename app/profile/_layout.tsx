import { Link, router, Stack } from "expo-router";
import "react-native-reanimated";
import Foundation from "@expo/vector-icons/Foundation";
import { colors } from "@/constants";
import { Pressable } from "react-native";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerBackButtonDisplayMode: "minimal",
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Foundation name="arrow-left" size={28} color={"black"} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
