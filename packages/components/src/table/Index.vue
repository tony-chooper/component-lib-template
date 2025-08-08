<template>
  <div class="yto-table">
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
    <!-- 表格内容 -->
    <div class="table-body text-[12px]">
      <div v-for="(item, index) in data" :key="index"
        class="body-row min-h-[32px] py-0 px-[10px] flex items-center break-all"
        :class="{ 'bg-[#fff]': (index + 1) % 2 === 0 }">
        <div v-for="column in columns" :key="column.prop" class="body-cell flex px-[3px] py-[4px]" :class="[
          column.align === 'left' ? 'justify-start' : column.align === 'right' ? 'justify-end' : 'justify-center',
          column.width ? '' : 'flex-1'
        ]" :style="getStyles(column.width)" @click="handleBodyCellClick(item, column, index)">
          <template v-if="column.type === 'index'">
            {{ padZero(index + 1) }}
          </template>
          <template v-else-if="slots[column.prop]">
            <slot :name="column.prop" :row="item" />
          </template>
          <template v-else-if="column.render">
            <span>{{ column.render(item) }}</span>
          </template>
          <template v-else>
            <span :style="`${column.link && !isNil(item[column.prop]) ? 'color: var(--van-primary-color)' : ''}`">{{
              isNil(item[column.prop]) ?
                emptyCellText :
                item[column.prop] }}</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends BaseRecord">
import { reactive, watchEffect, Slots, useSlots } from 'vue';
import { isNil, debounce } from '../../utils/utils';
import { tableProps, Column, SortType, BaseRecord } from './props';
import './style/index.scss'

defineOptions({ name: "Table" });
const { defaultSort, columns, data, emptyCellText } = defineProps(tableProps<T>());
const emit = defineEmits<
  {
    'on-sort': [sortInof: SortType],
    'on-header-cell-click': [info: Column<T>],
    'on-body-cell-click': [info: T, column: Column<T>, index: number],
  }
>();
const DEBOUNCE_DELAY = 300;
enum SORT_ORDER {
  ASC = 'ASC',
  DESC = 'DESC'
}
const sort = reactive({ ...defaultSort });
const slots: Slots = useSlots();

const handleHeaderCellClick = debounce((column: Column<T>) => {
  const { sort: columnSort, prop } = column
  const { order } = sort
  if (columnSort) {
    Object.assign(sort, { prop, order: order === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC })
    emit("on-sort", { ...columnSort, ...sort })
    return
  }
  emit('on-header-cell-click', column)
}, DEBOUNCE_DELAY);

const handleBodyCellClick = debounce((row: T, column: Column<T>, index: number) => {
  console.log('on-body-cell-click---', row, column, index)
  emit('on-body-cell-click', row, column, index)
}, DEBOUNCE_DELAY);
const padZero = (n: number) => {
  return n < 10 ? '0' + n : n
}
const getStyles = (width?: number | string) => {
  if (!width) return {};
  return { width: typeof width === 'string' ? width : width + 'px' }
}

watchEffect(() => {
  console.log('watchEffect--', defaultSort)
  Object.assign(sort, defaultSort)
})
</script>
