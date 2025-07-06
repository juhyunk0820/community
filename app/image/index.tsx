import { colors } from "@/constants";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ImageZoomScreen() {
  const insets = useSafeAreaInsets();
  const { uri } = useLocalSearchParams<{ uri: string }>();
  return (
    <View style={[styles.container, { marginTop: insets.top + 10 }]}>
      <Pressable
        style={styles.backButton}
        onPress={() => {
          router.back();
        }}
      >
        <Feather name="arrow-left" size={28} color={colors.BLACK} />
      </Pressable>
      <Image
        style={{ width: Dimensions.get("window").width, height: "100%" }}
        resizeMode="contain"
        source={{ uri: uri }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    left: 15,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
