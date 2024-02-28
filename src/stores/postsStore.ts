import { Post } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useActions } from "./actionsStore";

export const usePosts = defineStore("posts", () => {
  const posts = ref<Post[]>([]);
  const initialPosts = ref<Post[]>([]);

  const actionsStore = useActions();

  function initializePosts(newPosts: Post[]) {
    posts.value = newPosts;
    initialPosts.value = JSON.parse(JSON.stringify(newPosts));
  }

  function resetPosts() {
    posts.value = JSON.parse(JSON.stringify(initialPosts.value));
  }

  function movePost(postId: number, fromIndex: number, toIndex: number) {
    const post = posts.value.splice(fromIndex, 1)[0];
    posts.value.splice(toIndex, 0, post);

    actionsStore.recordAction(postId, fromIndex, toIndex);
  }

  return { posts, initializePosts, resetPosts, movePost };
});
