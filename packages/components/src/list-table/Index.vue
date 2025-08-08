<template>
  <van-list v-bind="$attrs" :finished-text="finishedText" v-model:loading="loading" :finished="finished"
    v-model:error="error" :error-text="errorText" :immediate-check="immediateCheck" @load="updateList"
    :ref="(instance: any) => listRef(instance)">
    <slot :data="listData">
      <Table :data="listData" v-bind="$attrs">
        <template v-for="name in slotNames" #[name]="slotProps" :key="String(name)">
          <slot :name="name" v-bind="slotProps" />
        </template>
      </Table>
    </slot>
  </van-list>
</template>

<script setup lang="ts">
import './style/index.scss';
import { unref, ref, getCurrentInstance, ComponentInternalInstance, useSlots, computed, Ref, Slots } from 'vue';
import Table from '../table/Index.vue';
import { listTableProps, TableRow } from './props';
import { isFunction } from 'vant/es/utils';

// 新增接口定义
interface LoadParams {
  pageNum: number;
  pageSize: number;
}

const DEFAULT_PAGE_SIZE = 10;
const slots: Slots = useSlots();
const slotNames: Ref<string[]> = computed(() => Object.keys(slots));

const { onLoad, finishedText, immediateCheck, loadKey } = defineProps(listTableProps);

const finished = ref(false);
const loading = ref(false);
const error = ref(false);
const listData = ref<TableRow[]>([]);
const currentPage = ref(1);
const updateList = async (params = { reset: false }): Promise<void> => {
  const { reset, ...others } = params;
  const { totalKey, listKey } = loadKey;
  if (reset) { handleReset() }
  if (!isFunction(onLoad)) {
    throw new Error('onLoad 必须是个 function');
  }
  try {
    loading.value = true;
    error.value = false;
    const params: LoadParams = {
      pageNum: unref(currentPage),
      pageSize: DEFAULT_PAGE_SIZE,
      ...others,
    };
    const result = await onLoad(params);

    if (!result) {
      throw new Error('加载数据失败：返回结果为空');
    }
    const list = result[listKey] || [];
    const total = result[totalKey] || 0;

    if (unref(currentPage) === 1) {
      listData.value = list;
    } else {
      listData.value = [...listData.value, ...list];
    }
    finished.value = total <= listData.value.length;
    currentPage.value++;

  } catch (err) {
    console.error('加载数据错误:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
}
// 优化 reset 函数
const handleReset = (): void => {
  listData.value = [];
  currentPage.value = 1;
  finished.value = false;
  error.value = false;
}

const vm = getCurrentInstance() as ComponentInternalInstance
const listRef = (listInstance: ComponentInternalInstance) => {
  vm.exposeProxy = vm.exposed = Object.assign({}, listInstance, { updateList })
}
</script>
