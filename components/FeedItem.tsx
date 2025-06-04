import { colors } from "@/constants";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Octicons, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Post } from "@/types";

interface FeedItemProps {
  post: Post;
}

function FeedItem({ post }: FeedItemProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const pressLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {post.description}
        </Text>
      </View>
      <View style={styles.menuContainer}>
        <Pressable
          style={({ pressed }) => [styles.menu, pressed && styles.pressed]}
          onPress={pressLike}
        >
          <Octicons
            name={isLiked ? "heart-fill" : "heart"}
            size={16}
            color={isLiked ? colors.ORANGE_600 : colors.BLACK}
          />
          <Text style={isLiked ? styles.activeMenuText : styles.menuText}>
            {post.voteCount}
          </Text>
        </Pressable>
        <Pressable style={[styles.menu, styles.pressed]}>
          <MaterialCommunityIcons
            name="comment-processing-outline"
            color={colors.BLACK}
          />
          <Text style={styles.menuText}>{post.commentCount}</Text>
        </Pressable>
        <Pressable style={[styles.menu, styles.pressed]}>
          <Ionicons name="eye-outline" size={16} color={colors.BLACK} />
          <Text style={styles.menuText}>{post.viewCount}</Text>
        </Pressable>
      </View>
    </View>
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
