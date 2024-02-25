<script lang="ts" setup>
import { defineProps } from "vue";

type Props = {
  post: number;
};

const props = defineProps<Props>();
</script>
<template>
  <div class="bg-white py-6 px-4 rounded-lg shadow-lg mb-4">
    {{ `Post ${props.post}` }}
  </div>
</template>
