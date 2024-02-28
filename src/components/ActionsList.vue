<script setup lang="ts">
import ActionCard from "./ActionCard.vue";
import { useActions } from "@/stores/actionsStore";

const actionsStore = useActions();
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
