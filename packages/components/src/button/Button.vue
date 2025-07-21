<template>
  <button class="yto-button" :class="buttonStyle">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import './style/index.scss'
import { computed } from "vue";
defineOptions({ name: "yto-button" });
type ButtonProps = {
  type?: string;
};
const buttonProps = defineProps<ButtonProps>();

const buttonStyle = computed(() => {
  return { [`yto-button--${buttonProps.type}`]: buttonProps.type };
});
</script>