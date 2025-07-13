import { baseUrls } from "@/api/axios";
import CustomButton from "@/components/CustomButton";
import FixedBottomCTA from "@/components/FixedBottomCTA";
import IntroduceInput from "@/components/IntroduceInput";
import NicknameInput from "@/components/NicknameInput";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import { router } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { Image, Platform, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

type FormValues = {
  nickname: string;
  introduce: string;
};

export default function EditProfileScreen() {
  const { auth, editProfileMutation } = useAuth();

  const profileForm = useForm({
    defaultValues: {
      nickname: auth.nickname,
      introduce: auth.introduce,
    },
  });

  const onSubmit = (formvalues: FormValues) => {
    editProfileMutation.mutate(
      {
        nickname: formvalues.nickname,
        introduce: formvalues.introduce,
      },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "프로필 수정 성공",
            text2: "프로필이 성공적으로 수정되었습니다.",
          });
          router.back();
        },
        onError: (error) => {
          console.error("프로필 수정 실패:", error);
        },
      }
    );
  };

  return (
    <FormProvider {...profileForm}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
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
            variant="outlined"
            label="아바타 변경"
            size="medium"
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
            }}
            onPress={() => router.push("/my/avatar")}
          />
        </View>
        <View style={styles.inputContainer}>
          <NicknameInput />
          <IntroduceInput />
        </View>
      </View>
      <FixedBottomCTA
        label="저장"
        onPress={profileForm.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 16,
    position: "relative",
  },
  avatar: {
    width: 154,
    height: 154,
    borderRadius: 154,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_500,
  },
  inputContainer: {},
});
