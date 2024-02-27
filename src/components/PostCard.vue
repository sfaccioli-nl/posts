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
  postsStore.movePost(props.post.id, props.index, props.index - 1);
}

function moveDown() {
  postsStore.movePost(props.post.id, props.index, props.index + 1);
}
</script>
<template>
  <div
    :id="`post-${props.post.id}`"
    class="post-card bg-white py-2 px-4 rounded-lg shadow-lg mb-4 flex items-center justify-between h-[72px]"
  >
    <p>{{ `Post ${props.post.id}` }}</p>

    <div
      class="flex flex-col justify-between h-full"
      :class="{
        'h-full': props.showUpIcon && props.showDownIcon,
        'h-min': !props.showUpIcon || !props.showDownIcon,
      }"
    >
      <ChevronUpIcon
        v-if="props.showUpIcon"
        class="chevron-up h-5 w-5 hover:cursor-pointer"
        @click="moveUp"
      />
      <ChevronDownIcon
        v-if="props.showDownIcon"
        class="chevron-down h-5 w-5 hover:cursor-pointer"
        @click="moveDown"
      />
    </div>
  </div>
</template>
