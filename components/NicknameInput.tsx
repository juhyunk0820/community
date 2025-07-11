import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

function NicknameInput() {
  const { control, setFocus } = useFormContext();

  return (
    <Controller
      name="nickname"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length < 2) {
            return "닉네임은 2자 이상이어야 합니다.";
          }
          if (data.length > 10) {
            return "닉네임은 10자 이하이어야 합니다.";
          }
          return true;
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          label="닉네임"
          placeholder="닉네임을 입력하세요."
          inputMode="text"
          returnKeyType="next"
          submitBehavior="submit"
          value={value}
          onChangeText={onChange}
          error={error?.message}
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={() => setFocus("introduce")}
        />
      )}
    />
  );
}

export default NicknameInput;
