<template>
  <button class="yto-button text-red-500" :class="buttonStyle">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import "./style/index.scss";
import { computed } from "vue";
defineOptions({ name: "Button" });
type ButtonProps = {
  type?: string;
};
const buttonProps = defineProps<ButtonProps>();

const buttonStyle = computed(() => {
  return { [`yto-button--${buttonProps.type}`]: buttonProps.type };
});
</script>
