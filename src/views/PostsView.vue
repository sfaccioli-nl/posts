<script setup lang="ts">
import PostsList from "@/components/PostsList.vue";
</script>

<template>
  <div class="relative bg-[#691edd] min-h-screen">
    <div
      class="absolute bottom-0 bg-[#f9f9ff] z-2 w-full h-[98%] rounded-tl-[200px]"
    ></div>

    <div class="relative z-10 flex px-12 pt-20">
      <PostsList />
    </div>
  </div>
</template>
