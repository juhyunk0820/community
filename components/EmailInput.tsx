import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";
import { colors } from "@/constants";

function EmailInput() {
  const { control } = useFormContext();
  return (
    <Controller
      name="email"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length === 0) {
            return "이메일을 입력해주세요";
          }
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data)) {
            return "올바른 이메일 형식이 아닙니다";
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          label="이메일"
          placeholder="이메일을 입력해주세요"
          placeholderTextColor={colors.GRAY_500}
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
}

export default EmailInput;
