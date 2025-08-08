<template>
  <div class="bg-[#f9f9f9]">
    <YtoButton type="primary">主要按钮</YtoButton>

    <!-- <div class="flex gap-2">
      <div class="cursor-pointer" v-copy="'测试一下'">测试一下Copy</div>
    </div> -->
    <YtoTable ref="tableRef" :columns="columns" :data="staticData">
    </YtoTable>
    <yto-adaption-container :list="list" :min-num="3" :min-width="230">
      <template #default="{ info }">
        <div class="bg-[skyblue] h-[50px] flex justify-center items-center text-[16px]">
          {{ info }}
        </div>
      </template>
    </yto-adaption-container>
    <YtoListTable ref="tableRef" :columns="columns" :onLoad="getData" :defaultSort="defaultSort" @on-sort="handleSort"
      @on-body-cell-click="handleBodyCellClick">
      <template #name="{ row }">
        <span class="text-red">{{ row.name }}</span>
      </template>
    </YtoListTable>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, useTemplateRef, unref } from "vue";
// import { Button, AdaptionContainer } from "yto-custom-components";
// import { YtoButton, YtoCard, YtoAdaptionContainer, YtoTable } from "ytoCustomH5";
// import { Copy as vCopy } from 'ytoCustomH5/directives'
// console.log('copy---', vCopy)
const handleSort = (sortInof: any) => {
  console.log('handleSort----', sortInof)
}
const list = ref([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
]);
const columns = [
  {
    label: '姓名',
    prop: 'name',
    sort: { prop: 'name' },
  },
  {
    label: '年龄',
    prop: 'age',
    sort: { prop: 'age' },
    link: true
  },
  {
    label: '爱好',
    prop: 'hobby'
  }
]
const defaultSort = ref({ order: 'DESC', prop: 'age' })
const tableRef = useTemplateRef('tableRef')
const totalData = Array.from({ length: 35 }, (_, i) => ({
  name: `用户${i + 1}`,
  age: 18 + (i % 10),
  hobby: ['篮球', '足球', '乒乓球'][i % 3]
}))
const staticData = totalData.toSpliced(0, 27)


const getData = ({ pageNum = 1, pageSize = 10 }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (pageNum - 1) * pageSize
      const end = start + pageSize
      const list = totalData.slice(start, end)
      resolve({
        total: totalData.length,
        list
      })
    }, 2000)
  })
}
const handleBodyCellClick = (row: any, column: any) => {
  console.log('handleBodyCellClick---', row, column)
}

onMounted(() => {
  console.log('tableRef---', unref(tableRef))
  setTimeout(() => {
    defaultSort.value = { prop: 'name', order: 'ASC' }
  }, 3000)
  unref(tableRef)?.updateList(true)
})
</script>
