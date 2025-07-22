<template>
  <div class="yto-card" :class="cardStyle">
    <slot>
      <p>我是个卡片</p>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import "./style/index.scss";
import { computed } from "vue";
defineOptions({ name: "yto-card" });
type CardProps = {
  type?: string;
};
const cardProps = defineProps<CardProps>();

const cardStyle = computed(() => {
  return { [`yto-card--${cardProps.type}`]: cardProps.type };
});
</script>