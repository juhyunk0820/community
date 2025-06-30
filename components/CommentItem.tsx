import { colors } from "@/constants";
import { Comment } from "@/types";
import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import Profile from "./Profile";
import useAuth from "@/hooks/queries/useAuth";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import InputField from "./InputField";
import { useActionSheet } from "@expo/react-native-action-sheet";
import useDeleteComment from "@/hooks/queries/useDeleteComment";

interface CommentItemProps {
  comment: Comment;
  parentCommentId?: number | null;
  onReply?: () => void;
  onCancelReply?: () => void;
  isReply?: boolean;
}

function CommentItem({
  comment,
  parentCommentId,
  onReply,
  onCancelReply,
  isReply = false,
}: CommentItemProps) {
  const { auth } = useAuth();
  const { showActionSheetWithOptions } = useActionSheet();
  const deleteComment = useDeleteComment();

  const getCommentBackground = () => {
    if (parentCommentId === comment.id) {
      return colors.ORANGE_100;
    }
    if (isReply) {
      return colors.GRAY_50;
    }
    return colors.WHITE;
  };

  const handlePressOption = () => {
    const options = ["삭제", "취소"];
    const destructiveButtonIndex = 0; // 삭제 버튼 인덱스
    const cancelButtonIndex = 1; // 취소 버튼 인덱스

    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex,
        cancelButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            deleteComment.mutate(comment.id);
            break;
          case cancelButtonIndex:
            break;
          default:
            break;
        }
      }
    );
  };
  return (
    <View
      style={[styles.container, { backgroundColor: getCommentBackground() }]}
    >
      <View style={styles.profileContainer}>
        {isReply && (
          <MaterialCommunityIcons
            name="arrow-right-bottom"
            size={24}
            color={colors.BLACK}
          />
        )}
        <Profile
          imageUri={comment.isDeleted ? "" : comment.user.imageUri}
          nickname={comment.isDeleted ? "(삭제)" : comment.user.nickname}
          createdAt={comment.createdAt}
          onPress={() => {}}
          option={
            auth.id === comment.user.id &&
            !comment.isDeleted && (
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color={colors.BLACK}
                onPress={handlePressOption}
              />
            )
          }
        />
      </View>
      <InputField
        editable={false}
        value={comment.isDeleted ? "삭제된 댓글입니다." : comment.content}
      />
      {!comment.isDeleted && !isReply && (
        <View style={styles.replyButtonContainer}>
          <Pressable onPress={onReply}>
            <Text style={styles.replyButtonText}>답글 남기기</Text>
          </Pressable>
          {parentCommentId === comment.id && (
            <Pressable onPress={onCancelReply}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: 16,
    gap: 12,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  replyButtonContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  replyButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.ORANGE_600,
    textDecorationLine: "underline",
  },
  cancelButtonText: {
    fontWeight: "bold",
    fontSize: 12,
    color: colors.GRAY_500,
  },
});

export default CommentItem;
