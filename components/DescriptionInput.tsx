import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";
import { colors } from "@/constants";

function DescriptionInput() {
  const { control } = useFormContext();
  return (
    <Controller
      name="description"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length === 0) {
            return "내용을 입력하세요";
          }
        },
      }}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label="내용"
          placeholder="내용을 입력하세요"
          placeholderTextColor={colors.GRAY_500}
          value={value}
          returnKeyType="next"
          onChangeText={onChange}
          error={error?.message}
          multiline
        />
      )}
    />
  );
}

export default DescriptionInput;
