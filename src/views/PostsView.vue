<script setup lang="ts">
import { getPosts } from "@/api/postsAPI";
import ActionsList from "@/components/ActionsList.vue";
import PostsList from "@/components/PostsList.vue";
import { usePosts } from "@/stores/postsStore";
import { onMounted, ref } from "vue";

const postsStore = usePosts();
const errorMessage = ref<string>("");

onMounted(async () => {
  try {
    const result = await getPosts();
    const firstFivePosts = result.slice(0, 5);
    postsStore.initializePosts(firstFivePosts);
  } catch (error) {
    console.error(error);
    errorMessage.value = "Failed to fetch posts" as string;
  }
});
</script>

<template>
  <div class="h-screen bg-[#f9f9ff] relative">
    <div class="relative bg-[#691edd]">
      <div
        class="absolute bottom-0 top-[145px] bg-[#f9f9ff] z-2 w-full rounded-tl-[200px]"
        :class="{ 'h-full': !errorMessage }"
      ></div>

      <div class="relative z-10 flex flex-wrap justify-around px-12 pt-20">
        <PostsList :error="errorMessage" />
        <ActionsList />
      </div>
    </div>
  </div>
</template>
