import { onMounted, reactive, ref } from 'vue';
import MainService, { type MainPageInfo } from '@/services/main';

export default function mainComposable() {
  // #region 타이틀
  const pageTitle = reactive({
    main: 'Best Furniture',
    sub: 'Perfect Choice OZO!',
  });
  // #endregion

  // #region 베스트 상품
  const bestGoodsUseYn = ref<MainPageInfo['bestGoodsUseYn']>(false);
  const bestGoods = ref<MainPageInfo['bestGoods']>(null);
  // #endregion

  // #region 비주얼 배너
  // const visualUseYn = ref<MainPageInfo['visualUseYn']>(false);
  // const visualBanner = ref<MainPageInfo['visualBanner']>(null);
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

    bestGoodsUseYn.value = pageInfo.bestGoodsUseYn;
    bestGoods.value = pageInfo.bestGoods;

    // visualUseYn.value = pageInfo.visualUseYn;
    // visualBanner.value = pageInfo.visualBanner;

    isLoading.value = false;
  };
  // #endregion

  const init = async () => {
    await getMainPageInfo();
  };

  onMounted(async () => {
    await init();
  });

  return { pageTitle, isLoading, bestGoodsUseYn, bestGoods };
}
