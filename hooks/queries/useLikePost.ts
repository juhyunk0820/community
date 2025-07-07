import { likePost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { Post, Profile } from "@/types";
import { useMutation } from "@tanstack/react-query";

function useLikePost() {
  return useMutation({
    mutationFn: likePost,
    // onSuccess: (postId) => {
    //   queryClient.invalidateQueries({
    //     queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    //   });
    //   queryClient.invalidateQueries({
    //     queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
    //   });
    // },
    onMutate: async (postId) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS, postId],
      });

      const user = queryClient.getQueryData<Profile>([
        queryKeys.AUTH,
        queryKeys.GET_ME,
      ]);
      const userId = Number(user?.id);
      const previousPost = queryClient.getQueryData<Post>([
        queryKeys.POST,
        queryKeys.GET_POSTS,
        postId,
      ]);

      const newPost = { ...previousPost };
      const likedIndex =
        previousPost?.likes?.findIndex((like) => like.userId === userId) ?? -1;

      likedIndex >= 0
        ? newPost.likes?.splice(likedIndex, 1)
        : newPost.likes?.push({ userId });

      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, postId],
        newPost
      );

      return { previousPost, newPost };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, context?.previousPost?.id], // 쿼리키 수정
        context?.previousPost
      );
    },
    onSettled: (data, error, variables, context) => {
      //게시글 상태 업데이트
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, variables],
      });

      //게시글 목록 업데이트
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
}

export default useLikePost;
