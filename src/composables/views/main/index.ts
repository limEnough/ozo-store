import { onMounted, reactive, ref } from 'vue';
import MainService from '@/services/main';
import type { Goods } from '@/types/common.types';
import { sampleGoodsData } from '@/services/sample/goods';

export default function mainComposable() {
  // #region 타이틀
  const pageTitle = reactive({
    main: 'Best Furniture',
    sub: 'Perfect Choice OZO!',
  });
  // #endregion

  // #region 베스트 상품
  const bestGoods = ref<Goods[]>(sampleGoodsData());
  // #endregion

  // #region 비주얼 배너
  const visualUseYn = ref(false);
  const visualBanner = ref([]);
  // #endregion

  // #region TODO: fethces
  const isLoading = ref(false);
  // #endregion

  // #region Api
  const pageService = new MainService();

  const getMainPageInfo = async () => {
    isLoading.value = true;

    const pageInfo = await pageService.getPageInfo();

    if (!pageInfo) return;

    visualUseYn.value = pageInfo.visualUseYn;
    visualBanner.value = pageInfo.visualBanner;

    isLoading.value = false;
  };
  // #endregion

  const init = async () => {
    // await getMainPageInfo();
  };

  onMounted(async () => {
    await init();
  });

  return { pageTitle, isLoading, visualUseYn, visualBanner, bestGoods };
}
