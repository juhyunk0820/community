import { colors } from "@/constants";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Alert,
} from "react-native";
import VoteInput from "./VoteInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { VoteOption } from "@/types";

function VoteModal() {
  const { control, setValue } = useFormContext();
  const [voteOptions, isVoteOpen] = useWatch({
    control,
    name: ["voteOptions", "isVoteOpen"],
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "voteOptions",
  });

  const handleAppendVote = () => {
    const priorities = voteOptions.map(
      (vote: VoteOption) => vote.displayPriority
    );
    const nextPriority = Math.max(...priorities) + 1;
    append({
      displayPriority: nextPriority,
      content: "",
    });
  };

  const handleSubmitVote = () => {
    if (voteOptions.length < 2) {
      Alert.alert("투표 항목 부족", "최소 2개의 투표 항목이 필요합니다.");
      return;
    }
    setValue("isVoteAttached", true);
    setValue("isVoteOpen", false);
  };

  return (
    <Modal visible={isVoteOpen} animationType="slide">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.headerLeft}
            onPress={() => setValue("isVoteOpen", false)}
          >
            <Feather name="arrow-left" size={28} color={colors.BLACK} />
          </Pressable>
          <Text style={styles.headerTitle}>투표</Text>
          <Text style={styles.headerRight} onPress={handleSubmitVote}>
            첨부
          </Text>
        </View>
        <KeyboardAwareScrollView
          contentContainerStyle={{ gap: 12, padding: 16 }}
        >
          {fields.map((field, index) => {
            return (
              <VoteInput
                key={field.id}
                index={index}
                onRemove={() => remove(index)}
              />
            );
          })}
          <Pressable onPress={handleAppendVote}>
            <Text style={styles.addVoteText}>항목 추가</Text>
          </Pressable>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 18,
    color: colors.BLACK,
    fontWeight: "600",
  },
  headerRight: {
    fontSize: 14,
    color: colors.ORANGE_600,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  addVoteText: {
    fontSize: 14,
    color: colors.GRAY_500,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default VoteModal;
