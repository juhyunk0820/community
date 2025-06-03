import { colors } from "@/constants";
import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface CustomBtnProps extends PressableProps {
  label: string;
  size?: "small" | "large";
  variant?: "standard" | "outlined" | "filled";
}

function CustomButton({
  label,
  size = "large",
  variant = "filled",
  ...props
}: CustomBtnProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[size],
        styles[variant],
        pressed && styles.pressed,
      ]}
      {...props}
    >
      <Text style={[styles.labelText, styles[`${variant}Text`]]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 4,
    marginHorizontal: 30,
  },
  labelText: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  large: {
    width: "100%",
    height: 44,
  },
  small: {
    width: "50%",
    height: 36,
  },
  filled: {
    backgroundColor: colors.ORANGE_600,
  },
  outlined: {
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.ORANGE_600,
  },
  standard: {
    backgroundColor: "transparent",
  },
  filledText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.WHITE,
  },
  outlinedText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.ORANGE_600,
  },
  standardText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.ORANGE_600,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default CustomButton;
