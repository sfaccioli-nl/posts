<script lang="ts" setup>
import { defineProps } from "vue";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/vue/solid";
import { Post } from "@/types";
import { usePosts } from "@/stores/postsStore";

type Props = {
  post: Post;
  index: number;
  showUpIcon: boolean;
  showDownIcon: boolean;
};

const props = defineProps<Props>();

const postsStore = usePosts();

function moveUp() {
  postsStore.movePostUp(props.post.id, props.index);
}

function moveDown() {
  postsStore.movePostDown(props.post.id, props.index);
}
</script>
<template>
  <div
    class="bg-white py-6 px-4 rounded-lg shadow-lg mb-4 flex items-center justify-between"
  >
    {{ `Post ${props.post.id}` }}

    <div>
      <ChevronUpIcon v-if="showUpIcon" class="h-5 w-5" @click="moveUp" />
      <ChevronDownIcon v-if="showDownIcon" class="h-5 w-5" @click="moveDown" />
    </div>
  </div>
</template>
