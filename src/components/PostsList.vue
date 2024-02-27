<script lang="ts" setup>
import { computed } from "vue";
import { usePosts } from "@/stores/postsStore";
import PostCard from "./PostCard.vue";

type Props = {
  error: string;
};

const props = defineProps<Props>();

const postsStore = usePosts();

const posts = computed(() => {
  return postsStore.posts;
});
</script>

<template>
  <div
    class="mb-8 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl flex-grow min-w-0"
  >
    <div v-if="!props.error">
      <h1 class="text-4xl text-white mb-10">Sortable Post List</h1>
      <transition-group name="list" tag="div" class="list-container">
        <PostCard
          v-for="(post, index) in posts"
          :key="post.id"
          :post="post"
          :index="index"
          :show-up-icon="index !== 0"
          :show-down-icon="index !== posts.length - 1"
        />
      </transition-group>
    </div>

    <div v-else class="h-full">
      <h1 class="text-4xl text-white mb-10">Sortable Post List</h1>

      <p class="text-lg">There was an error fetching the posts</p>
    </div>
  </div>
</template>

<style scoped>
.list-move {
  transition: transform 0.5s ease;
}
</style>
