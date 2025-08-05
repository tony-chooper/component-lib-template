<template>
  <div>
    <YtoButton type="primary">主要按钮</YtoButton>
    <YtoCard></YtoCard>
    <div class="flex gap-2">
      <div class="cursor-pointer" v-copy="'测试一下'">测试一下Copy</div>
      <el-button type="primary">el button</el-button>
    </div>
    <yto-adaption-container :list="list" :min-num="3" :min-width="230">
      <template #default="{ info }">
        <div class="bg-[skyblue] h-[50px] flex justify-center items-center text-[16px]">
          {{ info }}
        </div>
      </template>
    </yto-adaption-container>

  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
// import { Button, AdaptionContainer } from "yto-custom-components";
// import { Button, Card, AdaptionContainer } from "elementEnhance";
import { Copy as vCopy } from 'elementEnhance'
console.log('copy---', vCopy)
const list = ref([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24,
]);
</script>
