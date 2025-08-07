<template>
  <div class="yto-table">
   
    <!-- 表格内容 -->
    <van-list :ref="(instance: any) => listRef(instance)" v-bind="$attrs"
      :finished-text="data.length ? finishedText : emptyText" :error-text="errorText" :immediate-check="immediateCheck"
      @load="onLoad">
       <!-- 表头 -->
    <div class="table-header bg-[#fff] flex text-[12px] p-[10px] leading-[16px]">
      <div v-for="col in columns" :key="col.prop" class="header-cell flex text-center px-[3px] text-[#999]" :class="[
        col.align === 'left' ? 'justify-start' : col.align === 'right' ? 'justify-end' : 'justify-center',
        col.width ? '' : 'flex-1'
      ]" :style="getStyles(col.width)">
        <div @click="handleHeaderCellClick(col)">
          {{ col.label }}
          <span class="relative w-[16px] h-[12px] inline-block" v-if="col.sort">
            <span class="absolute right-[3px] top-[2px] inline-flex flex-col items-center justify-center">
              <i class="up" :class="{ 'sort-up-act': sort.prop === col.prop && sort.order === SORT_ORDER.ASC }"></i>
              <i class="down"
                :class="{ 'sort-down-act': sort.prop === col.prop && sort.order === SORT_ORDER.DESC }"></i>
            </span>
          </span>
        </div>
      </div>
    </div>
      <div class="table-body text-[12px]">
        <div v-for="(item, index) in data" :key="index"
          class="body-row min-h-[32px] py-0 px-[10px] flex items-center break-all"
          :class="{ 'bg-[#fff]': (index + 1) % 2 === 0 }">
          <div v-for="column in columns" :key="column.prop" class="body-cell flex px-[3px] py-[4px]" :class="[
            column.align === 'left' ? 'justify-start' : column.align === 'right' ? 'justify-end' : 'justify-center',
            column.width ? '' : 'flex-1'
          ]" :style="getStyles(column.width)" @click="handleBodyCellClick(item)">
            <template v-if="column.type === 'index'">
              {{ padZero(index + 1) }}
            </template>
            <template v-else-if="$slots[column.prop]">
              <slot :name="column.prop" :row="item" />
            </template>
            <template v-else-if="column.render">
              <span>{{ column.render(item) }}</span>
            </template>
            <template v-else>
              <span>{{ isNil(item[column.prop]) ? emptyCellText : item[column.prop] }}</span>
            </template>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import { ComponentInternalInstance, reactive, watch, watchEffect } from 'vue';
import { isNil, debounce } from '../../utils/utils';
import { tableProps, Column, SortType, TableRow } from './props';
import './style/index.scss'
import { isFunction } from 'vant/es/utils';
import { getCurrentInstance } from 'vue'

defineOptions({ name: "Table" });
const { defaultSort, requestApi, columns, data, finishedText, errorText, immediateCheck, emptyText, emptyCellText } = defineProps(tableProps);
const emit = defineEmits<
  {
    'on-sort': [sortInof: SortType],
    'on-header-cell-click': [info: Column],
    'on-body-cell-click': [info: TableRow],
  }
>();
enum SORT_ORDER {
  ASC = 'ASC',
  DESC = 'DESC'
}
const sort = reactive({ ...defaultSort });

const handleHeaderCellClick = debounce((column: Column) => {
  const { sort: columnSort, prop } = column
  const { order } = sort
  if (columnSort) {
    Object.assign(sort, { prop, order: order === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC })
    emit("on-sort", { ...columnSort, ...sort })
    return
  }
  emit('on-header-cell-click', column)
}, 300);

const handleBodyCellClick = debounce((row: TableRow) => {
  console.log('on-body-cell-click---', row)
  emit('on-body-cell-click', row)
}, 300);


const padZero = (n: number) => {
  return n < 10 ? '0' + n : n
}

const getStyles = (width?: number | string) => {
  if (!width) return {};
  return { width: typeof width === 'string' ? width : width + 'px' }
}

const onLoad = () => {
  if (isFunction(requestApi)) { requestApi() }
}
const vm = getCurrentInstance() as ComponentInternalInstance
const listRef = (listInstance: ComponentInternalInstance) => {
  vm.exposeProxy = vm.exposed = listInstance || {}
}

watchEffect(() => {
  console.log('watchEffect--', defaultSort)
  Object.assign(sort, defaultSort)
})
</script>
