<script lang="ts" setup>
import Button from "@/components/ui/Button.vue";
</script>

<template>
  <div :class="[$attrs.class, 'bg-white flex items-center p-4']">
    <p class="mr-4">Moved post 1 from index 0 to index 1</p>
    <Button size="md" variant="secondary">Time travel</Button>
  </div>
</template>
