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

  function movePostUp(postId: number, index: number) {
    if (index > 0) {
      [posts.value[index - 1], posts.value[index]] = [
        posts.value[index],
        posts.value[index - 1],
      ];

      actionsStore.recordAction(postId, index, index - 1);
    }
  }

  function movePostDown(postId: number, index: number) {
    if (index < posts.value.length - 1) {
      [posts.value[index + 1], posts.value[index]] = [
        posts.value[index],
        posts.value[index + 1],
      ];
      actionsStore.recordAction(postId, index, index + 1);
    }
  }

  return { posts, setPosts, movePostUp, movePostDown };
});
