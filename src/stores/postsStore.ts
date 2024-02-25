import { Post } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useActions } from "./actionsStore";

export const usePosts = defineStore("posts", () => {
  const posts = ref<Post[]>([]);

  const actionsStore = useActions();

  function setPosts(newPosts: Post[]) {
    posts.value = newPosts;
  }

  function movePost(
    postId: number,
    fromIndex: number,
    toIndex: number,
    recordAction = true
  ) {
    const post = posts.value.splice(fromIndex, 1)[0];
    posts.value.splice(toIndex, 0, post);
    if (recordAction) {
      actionsStore.recordAction(postId, fromIndex, toIndex);
    }
  }

  return { posts, setPosts, movePost };
});
