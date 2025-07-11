import { colors } from "@/constants";
import { Foundation } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";
import "react-native-reanimated";

export default function MyLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="edit"
        options={{
          headerShown: true,
          headerBackButtonDisplayMode: "minimal",
          headerShadowVisible: false,
          headerTitle: "프로필 편집",
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
