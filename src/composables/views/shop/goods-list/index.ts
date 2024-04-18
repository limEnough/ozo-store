import { sampleGoodsData } from '@/services/sample/goods';
import type { Goods } from '@/composables/modules/goods.ts';
import { ref } from 'vue';

export default function goodsListComposable() {
  const goodsList = ref<Goods[]>(sampleGoodsData());

  return { goodsList };
}
