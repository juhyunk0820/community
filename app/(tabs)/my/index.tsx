import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function MyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CustomButton
        label="테스트"
        onPress={() => router.push("/auth")}
        variant="outlined"
      />
      <Text>내 화면</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
  },
});
