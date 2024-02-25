import { Action } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import { usePosts } from "./postsStore";

export const useActions = defineStore("actions", () => {
  const actions = ref<Action[]>([]);

  const postStore = usePosts();

  function recordAction(postId: number, from: number, to: number) {
    actions.value = [{ postId, from, to }, ...actions.value];
  }

  function timeTravel(actionIndex: number) {
    for (let i = 0; i <= actionIndex; i++) {
      const action = actions.value[i];
      postStore.movePost(action.postId, action.to, action.from, false);
    }
    actions.value.splice(0, actionIndex + 1);
  }

  return { actions, recordAction, timeTravel };
});
