<template>
  <div>
    <Button type="primary">主要按钮</Button>
    <Card></card>
    <adaption-container :list="list" :min-num="3" :min-width="230">
      <template #default="{ info }">
        <div class="bg-[skyblue] h-[50px] flex justify-center items-center text-[16px]">{{ info }}</div>
      </template>
    </adaption-container>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
// import { Button, AdaptionContainer } from "yto-custom-components";
// import { Button, Card, AdaptionContainer } from "elementEnhance";

const list = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24])
</script>
