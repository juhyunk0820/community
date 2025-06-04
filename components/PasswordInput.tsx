import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";
import { colors } from "@/constants";

function PasswordInput() {
  const { control } = useFormContext();
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
      render={({ field: { onChange, value } }) => (
        <InputField
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          secureTextEntry
          placeholderTextColor={colors.GRAY_500}
          value={value}
          onChangeText={onChange}
        />
      )}
    />
  );
}

export default PasswordInput;
