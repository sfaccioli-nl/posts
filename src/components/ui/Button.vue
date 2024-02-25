<template>
  <button :class="buttonClasses" @mouseover="onHover" @mouseleave="onLeave">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "secondary";

const props = withDefaults(
  defineProps<{
    size: ButtonSize;
    variant: ButtonVariant;
  }>(),
  {
    size: "md",
    variant: "primary",
  }
);

const isHovered = ref(false);

const onHover = () => (isHovered.value = true);
const onLeave = () => (isHovered.value = false);

const buttonClasses = computed(() => {
  const sizeClasses = {
    sm: "text-sm px-2 py-1",
    md: "text-md px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  const variantClasses = {
    primary: {
      default:
        "bg-[#691edd] text-[#f9f9ff] p-4 rounded border border-[#691edd]",
      hover:
        "hover:bg-[#f9f9ff] hover:text-[#691edd] hover:border hover:border-[#c2b3ff]",
    },
    secondary: {
      default:
        "bg-[#00ff86] text-[#0f0017] p-4 rounded border border-[#00ff86]",
      hover:
        "hover:border hover:border-[#00ff86] hover:shadow-[0_0_0_2px_rgba(22,204,134,1)]",
    },
  };

  return [
    sizeClasses[props.size],
    variantClasses[props.variant].default,
    isHovered.value ? variantClasses[props.variant].hover : "",
  ].join(" ");
});
</script>
