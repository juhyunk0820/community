import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function AuthScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.logo}
          source={require("@/assets/images/logo.png")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton label="이메일 로그인" />
        <Link href={"/"} style={styles.signupText}>
          이메일로 가입하기
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
  },
  logo: {
    width: 112,
    height: 112,
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 32,
  },
  signupText: {
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 20,
  },
});
