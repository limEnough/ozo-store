import { onMounted, ref } from 'vue';
import MainService from '@/services/main';

export default function mainComposable() {
  // #region 비주얼 배너
  const visualUseYn = ref(false);
  const visualBanner = ref([]);
  // #endregion

  // #region TODO: fethces
  const isReady = ref(false);
  // #endregion

  // #region Api
  const pageService = new MainService();

  const getMainPageInfo = async () => {
    const pageInfo = await pageService.getPageInfo();

    if (!pageInfo) return;

    visualUseYn.value = pageInfo.visualUseYn;
    visualBanner.value = pageInfo.visualBanner;

    isReady.value = true;
  };
  // #endregion

  const init = async () => {
    await getMainPageInfo();
  };

  onMounted(async () => {
    await init();
  });

  return { isReady, visualUseYn, visualBanner };
}
