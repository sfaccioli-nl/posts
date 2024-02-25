<script setup lang="ts">
import { computed } from "vue";
import ActionCard from "./ActionCard.vue";

const actionsListMock = [
  {
    id: 1,
    action: "Moved post 1 from index 0 to index 1",
    time: "2021-10-10T12:00:00Z",
  },
  {
    id: 2,
    action: "Moved post 2 from index 1 to index 0",
    time: "2021-10-10T12:00:00Z",
  },
];

const addBorderBottom = computed(() => {
  return (index: number) => {
    return index !== actionsListMock.length - 1;
  };
});

const addBorderRadiusBottom = computed(() => {
  return (index: number) => {
    return index === actionsListMock.length - 1;
  };
});

const addBorderRadiusTop = computed(() => {
  return (index: number) => {
    return index === 0;
  };
});
</script>
<template>
  <div class="flex flex-col bg-gray-200 rounded-lg h-fit shadow-lg">
    <div class="bg-white h-full w-full rounded-t-lg p-5">
      <p class="text-xl">List of actions commited</p>
    </div>
    <div class="m-5">
      <ActionCard
        v-for="(action, index) in actionsListMock"
        :key="action.id"
        :class="{
          'border-b border-gray-200': addBorderBottom(index),
          'rounded-b': addBorderRadiusBottom(index),
          'rounded-t': addBorderRadiusTop(index),
        }"
      />
    </div>
  </div>
</template>
