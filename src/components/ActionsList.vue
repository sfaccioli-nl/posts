<script setup lang="ts">
import { computed } from "vue";
import ActionCard from "./ActionCard.vue";
import { useActions } from "@/stores/actionsStore";

const actionsStore = useActions();

const addBorderBottom = computed(() => {
  return (index: number) => {
    return index !== actionsStore.actions.length - 1;
  };
});

const addBorderRadiusBottom = computed(() => {
  return (index: number) => {
    return index === actionsStore.actions.length - 1;
  };
});

const addBorderRadiusTop = computed(() => {
  return (index: number) => {
    return index === 0;
  };
});
</script>
<template>
  <div
    class="flex flex-col bg-gray-200 rounded-lg h-fit shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl flex-grow min-w-0"
  >
    <div class="bg-white h-full rounded-t-lg p-5">
      <p class="text-xl font-medium">List of actions commited</p>
    </div>
    <div v-if="actionsStore.actions.length > 0" class="m-5">
      <transition-group name="list" tag="div" class="list-container">
        <ActionCard
          v-for="(action, index) in actionsStore.actions"
          :key="action.postId"
          :action="action"
          :index="index"
          :class="{
            'border-b border-gray-200': addBorderBottom(index),
            'rounded-b': addBorderRadiusBottom(index),
            'rounded-t': addBorderRadiusTop(index),
          }"
        />
      </transition-group>
    </div>
    <div v-else class="m-5">
      <p class="text-center">No actions commited yet</p>
    </div>
  </div>
</template>

<style scoped>
.list-move {
  transition: transform 0.5s ease;
}
</style>
