import { Post } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePosts = defineStore("posts", () => {
  const posts = ref<Post[]>([]);

  function setPosts(newPosts: Post[]) {
    posts.value = newPosts;
  }

  return { posts, setPosts };
});
