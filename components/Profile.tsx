import { colors } from "@/constants";
import React, { ReactNode } from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { baseUrls } from "@/api/axios";
dayjs.extend(relativeTime);
dayjs.locale("ko");

interface ProfileProps {
  onPress: () => void;
  imageUri?: string;
  nickname: string;
  createdAt: string;
  option?: ReactNode;
}

function Profile({
  onPress,
  imageUri,
  nickname,
  createdAt,
  option,
}: ProfileProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.profileContainer} onPress={onPress}>
        <Image
          style={styles.avartar}
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
        <View style={{ gap: 4 }}>
          <Text style={styles.nickname}>{nickname}</Text>
          <Text style={styles.createdAt}>{dayjs(createdAt).fromNow()}</Text>
        </View>
      </Pressable>
      {option}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avartar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_300,
  },
  nickname: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.BLACK,
  },
  createdAt: {
    fontSize: 14,
    color: colors.GRAY_500,
  },
});

export default Profile;
