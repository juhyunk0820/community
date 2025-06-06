import { colors } from "@/constants";
import React, { ForwardedRef, forwardRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  variant?: "standard" | "outlined" | "filled";
  error?: string;
}

function InputField(
  { label, variant = "filled", error, ...props }: InputFieldProps,
  ref?: ForwardedRef<TextInput>
) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          styles[variant],
          props.multiline && styles.multiLine,
          Boolean(error) && styles.inputError,
        ]}
      >
        <TextInput
          ref={ref}
          style={styles.input}
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          {...props}
        />
      </View>
      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.GRAY_700,
    fontSize: 12,
    marginBottom: 5,
  },
  inputContainer: {
    height: 44,
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  standard: {},
  outlined: {},
  filled: {
    backgroundColor: colors.GRAY_100,
  },
  input: {
    fontSize: 16,
    padding: 0,
    flex: 1,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    marginTop: 5,
  },
  inputError: {
    backgroundColor: colors.RED_100,
  },
  multiLine: {
    alignItems: "flex-start",
    height: 200,
    paddingVertical: 10,
  },
});

export default forwardRef(InputField);
