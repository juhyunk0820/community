import { baseUrls } from "@/api/axios";
import AuthRoute from "@/components/AuthRoute";
import CustomButton from "@/components/CustomButton";
import Tab from "@/components/Tab";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import { useState } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";

export default function MyScreen() {
  const { auth } = useAuth();
  const [currentTab, setCurrentTab] = useState<0 | 1>(0);

  const handleTabPress = (tabIndex: 0 | 1) => {
    setCurrentTab(tabIndex);
  };

  return (
    <AuthRoute>
      <View style={styles.headerContainer}>
        <Image
          style={styles.image}
          source={
            auth.imageUri
              ? {
                  uri: `${
                    Platform.OS === "ios" ? baseUrls.ios : baseUrls.android
                  }/${auth.imageUri}`,
                }
              : require("@/assets/images/default-avatar.png")
          }
        />
        <CustomButton
          size="medium"
          variant="outlined"
          label="프로필 편집"
          style={{ position: "absolute", right: 16, bottom: 16 }}
        />

        {/* <View style={styles.profileEditButtonContainer}>
          <CustomButton size="medium" variant="outlined" label="프로필 편집" />
        </View> */}
      </View>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Text style={styles.nickname}>{auth.nickname}</Text>
          <Text style={styles.introduce}>{auth.introduce}</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <Tab isActive={currentTab === 0} onPress={() => setCurrentTab(0)}>
          게시물
        </Tab>
        <Tab isActive={currentTab === 1} onPress={() => setCurrentTab(1)}>
          게시물
        </Tab>
      </View>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: "relative",
    backgroundColor: colors.ORANGE_200,
    width: "100%",
    height: 154,
    flexDirection: "row",
  },
  image: {
    position: "absolute",
    top: 77,
    left: 16,
    width: 154,
    height: 154,
    borderRadius: 77,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_500,
  },
  profileEditButtonContainer: {
    position: "absolute",
    top: 50,
    right: 16,
    width: 154,
    height: 154,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginTop: 77,
  },
  profile: {
    padding: 16,
    gap: 16,
  },
  nickname: {
    fontSize: 24,
    fontWeight: "bold",
  },
  introduce: {
    fontSize: 14,
    color: colors.GRAY_700,
  },
  tabContainer: {
    flexDirection: "row",
  },
});
