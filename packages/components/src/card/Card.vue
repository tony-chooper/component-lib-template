<template>
  <div class="yto-card" :class="cardStyle">
    <slot>
      <p class="bg-gray-400 text-blue-500">我是个卡片</p>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import "./style/index.scss";
import { computed } from "vue";
defineOptions({ name: "Card" });
type CardProps = {
  type?: string;
};
const cardProps = defineProps<CardProps>();

const cardStyle = computed(() => {
  return { [`yto-card--${cardProps.type}`]: cardProps.type };
});
</script>
<style lang="scss" scoped>
.yto-card {
  p {
    @apply text-light-700;
  }
}
</style>
