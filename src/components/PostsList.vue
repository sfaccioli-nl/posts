<script lang="ts" setup>
import { onMounted } from "vue";
import { usePosts } from "@/stores/postsStore";
import { getPosts } from "@/api/postsAPI";
import { Post } from "@/types";
import PostCard from "./PostCard.vue";

const postsStore = usePosts();

onMounted(() => {
  getPosts().then((result: Post[]) => {
    const firstFivePosts = result.slice(0, 5);
    postsStore.setPosts(firstFivePosts);
  });
});
</script>

<template>
  <div>
    <h1 class="text-4xl text-white mb-8">Sortable Post List</h1>
    <PostCard v-for="post in postsStore.posts" :key="post.id" :post="post.id" />
  </div>
</template>
