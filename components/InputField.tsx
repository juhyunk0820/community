import { colors } from "@/constants";
import React from "react";
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
}

function InputField({ label, variant = "filled", ...props }: InputFieldProps) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, styles[variant]]}>
        <TextInput style={styles.input} {...props} />
      </View>
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
});

export default InputField;
