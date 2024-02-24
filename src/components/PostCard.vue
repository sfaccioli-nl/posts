<script lang="ts" setup>
import { defineProps } from "vue";
import { Post } from "@/types";

type Props = {
  post: Post;
};

const props = defineProps<Props>();
</script>
<template>
  <div class="bg-white py-6 px-4 rounded-lg shadow-lg mb-4">
    {{ props.post.title }}
  </div>
</template>
