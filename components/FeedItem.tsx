import { colors } from "@/constants";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Octicons, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Post } from "@/types";
import Profile from "./Profile";
import useAuth from "@/hooks/queries/useAuth";
import { useActionSheet } from "@expo/react-native-action-sheet";
import useDeletePost from "@/hooks/queries/useDeletePost";
import { router } from "expo-router";
import ImagePreviewList from "./ImagePreviewList";

interface FeedItemProps {
  post: Post;
  isDetail?: boolean;
}

function FeedItem({ post, isDetail = false }: FeedItemProps) {
  const { auth } = useAuth();
  const likeUsers = post.likes?.map((like) => Number(like.userId));
  const isLiked = likeUsers?.includes(Number(auth?.id));
  const { showActionSheetWithOptions } = useActionSheet();
  const deletePost = useDeletePost();

  const handlePressOption = () => {
    const options = ["삭제", "수정", "취소"];
    const cancelButtonIndex = 2; // 취소 버튼 인덱스
    const destructiveButtonIndex = 0; // 삭제 버튼 인덱스
    showActionSheetWithOptions(
      { options, cancelButtonIndex, destructiveButtonIndex },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case destructiveButtonIndex: //삭제
            deletePost.mutate(post.id, {
              onSuccess: () => isDetail && router.back(),
            });
            break;
          case 1: //수정
            router.push(`/post/update/${post.id}`);
            break;
          case cancelButtonIndex: //취소
            break;
          default:
            break;
        }
      }
    );
  };

  const handlePressFeed = () => {
    if (!isDetail) {
      router.push(`/post/${post.id}`);
    }
  };

  const ContainerComponent = isDetail ? View : Pressable;

  return (
    <ContainerComponent style={styles.container} onPress={handlePressFeed}>
      <View style={styles.contentContainer}>
        <Profile
          imageUri={post.author.imageUri}
          nickname={post.author.nickname}
          createdAt={post.createdAt}
          option={
            auth?.id === post.author.id && (
              <Ionicons
                name="ellipsis-vertical"
                size={20}
                color={colors.BLACK}
                onPress={handlePressOption}
              />
            )
          }
          onPress={() => {}}
        />
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {post.description}
        </Text>
        <ImagePreviewList imageUris={post.imageUris} />
      </View>
      <View style={styles.menuContainer}>
        <Pressable style={styles.menu}>
          <Octicons
            name={isLiked ? "heart-fill" : "heart"}
            size={16}
            color={isLiked ? colors.ORANGE_600 : colors.BLACK}
          />
          <Text style={isLiked ? styles.activeMenuText : styles.menuText}>
            {post.likes.length || "좋아요"}
          </Text>
        </Pressable>
        <Pressable style={[styles.menu, styles.pressed]}>
          <MaterialCommunityIcons
            name="comment-processing-outline"
            color={colors.BLACK}
          />
          <Text style={styles.menuText}>{post.commentCount || "댓글"}</Text>
        </Pressable>
        <Pressable style={[styles.menu, styles.pressed]}>
          <Ionicons name="eye-outline" size={16} color={colors.BLACK} />
          <Text style={styles.menuText}>{post.viewCount}</Text>
        </Pressable>
      </View>
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    color: colors.BLACK,
    fontWeight: "600",
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    color: colors.BLACK,
    marginBottom: 14,
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopColor: colors.GRAY_300,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    width: "33%",
    gap: 4,
  },
  activeMenuText: {
    fontSize: 16,
    color: colors.ORANGE_600,
  },
  menuText: {
    fontSize: 16,
    color: colors.BLACK,
  },
  pressed: {
    opacity: 0.5,
  },
});

export default FeedItem;
