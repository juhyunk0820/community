import AuthRoute from "@/components/AuthRoute";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function MyScreen() {
  return (
    <AuthRoute>
      <SafeAreaView style={styles.container}>
        <Text>내 화면</Text>
      </SafeAreaView>
    </AuthRoute>
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
