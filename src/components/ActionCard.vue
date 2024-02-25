<script lang="ts" setup>
import Button from "@/components/ui/Button.vue";
import { Action } from "@/types";

type Props = {
  action: Action;
};

const props = defineProps<Props>();
</script>

<template>
  <div
    :class="[$attrs.class, 'bg-white flex items-center justify-between p-4']"
  >
    <p class="mr-4">
      {{
        `Moved post ${props.action.postId} from index ${props.action.from} to index ${props.action.to}`
      }}
    </p>
    <Button size="md" variant="secondary">Time travel</Button>
  </div>
</template>
