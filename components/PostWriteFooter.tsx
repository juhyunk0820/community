import { colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import useUploadImages from "@/hooks/queries/useUploadImages";
import { getFormDataImages } from "@/utils/image";

function PostWriteFooter() {
  const insets = useSafeAreaInsets();
  const uploadImages = useUploadImages();

  const handleOpenImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsMultipleSelection: true, //여러장 선택 옵션
    });

    if (result.canceled) {
      // 사용자가 선택을 취소한 경우
      return;
    }
    const formData = getFormDataImages("images", result.assets);

    uploadImages.mutate(formData, {
      onSuccess: (data: string[]) => {
        console.log("data", data);
      },
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Pressable style={styles.footerIcon} onPress={handleOpenImagePick}>
        <Ionicons name="camera" size={20} color={colors.BLACK} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 12,
    bottom: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
    flexDirection: "row",
    gap: 10,
  },
  footerIcon: {
    backgroundColor: colors.GRAY_100,
    padding: 10,
    borderRadius: 5,
  },
});

export default PostWriteFooter;
