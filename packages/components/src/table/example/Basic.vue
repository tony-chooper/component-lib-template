<template>
  <div class="bg-[#f9f9f9]">
    <YtoTable ref="tableRef" :columns="columns" :data="data" :requestApi="handleUpdateData" :headerbg="true"
      :finished="finished" v-model:loading="loading" :defaultSort="defaultSort" @on-sort="handleSort"
      @on-body-cell-click="handleBodyCellClick">
    </YtoTable>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, useTemplateRef, unref } from "vue";
const handleSort = (sortInof: any) => {
  console.log('handleSort----', sortInof)
}
const columns = [
  {
    label: '姓名',
    prop: 'name',
    sort: { prop: 'name' }
  },
  {
    label: '年龄',
    prop: 'age',
    sort: { prop: 'age' }
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

const pageNum = ref(1)
const pageSize = ref(10)
const finished = ref(false)
const data = ref([])
const loading = ref(false)

const getData = (pageNum: number, pageSize: number) => {
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
const handleBodyCellClick = (row: any) => {
  console.log('handleBodyCellClick---', row)
}
const handleUpdateData = async () => {
  loading.value = true
  const result = await getData(pageNum.value, pageSize.value) as any
  data.value = data.value.concat(result.list)
  finished.value = result.list.length < pageSize.value
  loading.value = false
  if (!finished.value) {
    pageNum.value++
  }
}
handleUpdateData()
onMounted(() => {
  console.log('tableRef---', unref(tableRef))
  setTimeout(() => {
    defaultSort.value = { prop: 'name', order: 'ASC' }
  }, 3000)
})
</script>
