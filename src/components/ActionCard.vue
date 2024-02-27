<script lang="ts" setup>
import Button from "@/components/ui/Button.vue";
import { useActions } from "@/stores/actionsStore";
import { Action } from "@/types";

type Props = {
  action: Action;
  index: number;
};

const props = defineProps<Props>();

const actionsStore = useActions();

function timeTravel() {
  actionsStore.timeTravel(props.index);
}
</script>

<template>
  <div
    :class="[
      $attrs.class,
      'action-card bg-white flex items-center justify-between p-4',
    ]"
  >
    <p class="mr-4 text-sm">
      {{
        `Moved post ${props.action.postId} from index ${props.action.from} to index ${props.action.to}`
      }}
    </p>
    <Button size="md" variant="secondary" @click="timeTravel"
      >Time travel</Button
    >
  </div>
</template>
