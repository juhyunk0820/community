import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";
import { colors } from "@/constants";
import { TextInputProps } from "react-native";

interface passwordInputProps {
  submitBehavior?: TextInputProps["submitBehavior"];
}

function PasswordInput({
  submitBehavior = "blurAndSubmit",
}: passwordInputProps) {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      name="password"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length < 8) {
            return "비밀번호는 8자 이상 입력해야 합니다.";
          }
        },
      }}
      render={({ field: { ref, onChange, value } }) => (
        <InputField
          ref={ref}
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          secureTextEntry
          inputMode="text"
          textContentType="oneTimeCode"
          submitBehavior={submitBehavior}
          autoCapitalize="none"
          placeholderTextColor={colors.GRAY_500}
          value={value}
          onChangeText={onChange}
          onSubmitEditing={() => setFocus("passwordConfirm")}
        />
      )}
    />
  );
}

export default PasswordInput;
