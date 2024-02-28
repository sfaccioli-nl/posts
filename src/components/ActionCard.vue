<script lang="ts" setup>
import Button from "@/components/ui/Button.vue";
import { Action } from "@/types";

type Props = {
  action: Action;
  index: number;
};

const props = defineProps<Props>();

const emit = defineEmits(["timeTravel"]);

function emitTimeTravel() {
  emit("timeTravel", props.index);
}
</script>

<template>
  <div
    :class="[
      $attrs.class,
      'action-card bg-white flex items-center justify-between p-4 last:rounded-b last:border-b-none first:rounded-t border-b border-gray-200 ',
    ]"
  >
    <p class="mr-4">
      {{
        `Moved post ${props.action.postId} from index ${props.action.from} to index ${props.action.to}`
      }}
    </p>
    <Button
      class="time-travel-button"
      size="md"
      variant="secondary"
      @click="emitTimeTravel"
      >Time travel</Button
    >
  </div>
</template>
