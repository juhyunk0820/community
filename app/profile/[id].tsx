import { baseUrls } from "@/api/axios";
import AuthRoute from "@/components/AuthRoute";
import Tab from "@/components/Tab";
import UserFeedList from "@/components/UserFeedList";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import useGetUserProfile from "@/hooks/queries/useGetUserProfile";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { View, Image, Platform, StyleSheet, Text } from "react-native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { auth } = useAuth();
  const { id: userId } = useLocalSearchParams();
  const { data: profile } = useGetUserProfile(Number(userId));
  const { nickname, introduce, imageUri } = profile || {};

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.ORANGE_200,
      },
    });
  }, [navigation]);

  if (Number(userId) === Number(auth.id)) {
    return <Redirect href="/my" />;
  }

  return (
    <AuthRoute>
      <View style={styles.headerContainer}>
        <Image
          style={styles.image}
          source={
            imageUri
              ? {
                  uri: `${
                    Platform.OS === "ios" ? baseUrls.ios : baseUrls.android
                  }/${imageUri}`,
                }
              : require("@/assets/images/default-avatar.png")
          }
        />

        {/* <View style={styles.profileEditButtonContainer}>
        <CustomButton size="medium" variant="outlined" label="프로필 편집" />
      </View> */}
      </View>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Text style={styles.nickname}>{nickname}</Text>
          <Text style={styles.introduce}>{introduce}</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <Tab isActive>게시물</Tab>
      </View>
      <UserFeedList userId={Number(userId)} />
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: "relative",
    backgroundColor: colors.ORANGE_200,
    width: "100%",
    height: 77,
    flexDirection: "row",
  },
  image: {
    position: "absolute",
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
