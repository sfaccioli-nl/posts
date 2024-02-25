import { Action } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useActions = defineStore("actions", () => {
  const actions = ref<Action[]>([]);

  function recordAction(postId: number, from: number, to: number) {
    actions.value = [{ postId, from, to }, ...actions.value];
  }

  return { actions, recordAction };
});
