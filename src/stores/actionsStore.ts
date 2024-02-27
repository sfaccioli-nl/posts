import { Action } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import { usePosts } from "./postsStore";

export const useActions = defineStore("actions", () => {
  const actions = ref<Action[]>([]);

  const postStore = usePosts();

  function recordAction(postId: number, from: number, to: number) {
    const snapshot = JSON.parse(JSON.stringify(postStore.posts));
    actions.value = [{ postId, from, to, snapshot }, ...actions.value];
  }

  function timeTravel(actionIndex: number) {
    if (actions.value[actionIndex + 1]) {
      postStore.posts = actions.value[actionIndex + 1].snapshot;
    } else {
      postStore.resetPosts();
    }
    actions.value.splice(0, actionIndex + 1);
  }

  return { actions, recordAction, timeTravel };
});
