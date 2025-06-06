import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";
import { colors } from "@/constants";

function TitleInput() {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      name="title"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length === 0) {
            return "제목을 입력하세요";
          }
          if (data.length > 30) {
            return "제목은 30자 이내로 입력해주세요";
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          label="제목"
          placeholder="제목을 입력하세요"
          placeholderTextColor={colors.GRAY_500}
          value={value}
          autoFocus
          submitBehavior="submit"
          onSubmitEditing={() => setFocus("description")}
          returnKeyType="next"
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
}

export default TitleInput;
