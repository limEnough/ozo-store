import { sampleGoodsData } from '@/services/sample/goods';
import type { Goods } from '@/types/common.types';
import { ref } from 'vue';

export default function goodsListComposable() {
  const goodsList = ref<Goods[]>(sampleGoodsData());

  return { goodsList };
}
