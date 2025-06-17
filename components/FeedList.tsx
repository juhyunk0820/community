import React from "react";
import { FlatList, StyleSheet } from "react-native";
import FeedItem from "./FeedItem";
import { colors } from "@/constants";
import useGetInfinitePosts from "@/hooks/queries/useGetInfinitePosts";

// const dummyData = [
//   {
//     id: 1,
//     userId: 1,
//     title: "뿌룽",
//     description:
//       "뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종",
//     author: {
//       id: 1,
//       nickname: "홍길동",
//     },
//     imageUris: [],
//     likes: [],
//     hasVote: true,
//     voteCount: 1,
//     commentCount: 2,
//     viewCount: 2,
//     createdAt: "2023년10월1일",
//   },
//   {
//     id: 2,
//     userId: 1,
//     title: "뿌룽",
//     description:
//       "뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종",
//     author: {
//       id: 1,
//       nickname: "홍길동",
//     },
//     imageUris: [],
//     likes: [],
//     hasVote: true,
//     voteCount: 1,
//     commentCount: 2,
//     viewCount: 2,
//     createdAt: "2023년10월1일",
//   },
//   {
//     id: 3,
//     userId: 1,
//     title: "뿌룽",
//     description:
//       "뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종",
//     author: {
//       id: 1,
//       nickname: "홍길동",
//     },
//     imageUris: [],
//     likes: [],
//     hasVote: true,
//     voteCount: 1,
//     commentCount: 2,
//     viewCount: 2,
//     createdAt: "2023년10월1일",
//   },
//   {
//     id: 4,
//     userId: 1,
//     title: "뿌룽",
//     description:
//       "뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종뿌지지직 대한민국 썹종",
//     author: {
//       id: 1,
//       nickname: "홍길동",
//     },
//     imageUris: [],
//     likes: [],
//     hasVote: true,
//     voteCount: 1,
//     commentCount: 2,
//     viewCount: 2,
//     createdAt: "2023년10월1일",
//   },
// ];

function FeedList() {
  const { data: posts } = useGetInfinitePosts();
  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
});

export default FeedList;
