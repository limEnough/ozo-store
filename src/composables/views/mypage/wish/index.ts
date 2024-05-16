import { sampleGoodsData } from '@/services/sample/goods';
import type { Goods } from '@/composables/modules/goods.ts';
import { reactive, ref } from 'vue';

export default function wishComposable() {
  const goodsList = ref<Goods[]>(sampleGoodsData());

  return { goodsList };
}
