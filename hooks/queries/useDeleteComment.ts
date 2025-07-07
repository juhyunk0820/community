import { deleteComment } from "@/api/comment";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";

function useDeleteComment() {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (postId: number) => {
      queryClient.invalidateQueries({
        //추가설정
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });
    },
  });
}

export default useDeleteComment;
