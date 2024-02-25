<script setup lang="ts">
import ActionsList from "@/components/ActionsList.vue";
import PostsList from "@/components/PostsList.vue";
</script>

<template>
  <div class="relative bg-[#691edd]">
    <div
      class="absolute bottom-0 bg-[#f9f9ff] z-2 w-full h-[80%] rounded-tl-[200px]"
    ></div>

    <div class="relative z-10 flex flex-wrap justify-around px-12 pt-20">
      <PostsList />
      <ActionsList />
    </div>
  </div>
</template>
