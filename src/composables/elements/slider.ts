import { ref, type PropType } from 'vue';
import { v4 as uuidV4 } from 'uuid';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import type { CustomEmit } from '@/types/common.types';
import type Swiper from 'swiper';

type Emits = 'init' | 'slide-to' | 'slide-change' | 'destroy' | 'touch-start' | 'touch-move' | 'touch-end';
const emits: Emits[] = ['init', 'slide-to', 'slide-change', 'destroy', 'touch-start', 'touch-move', 'touch-end'];

interface Slides {
  [key: string]: any;
  link?: string;
  imagePath?: string;
  externalLink?: string;
}

interface Props {
  slides: Slides[];
  minimum: number;
  initialSlide: number;
  usePagination: boolean;
  isBoxType: boolean;
}

const props = {
  slides: {
    type: Object as PropType<Props['slides']>,
    required: true as const,
  },
  minimum: {
    type: Number as PropType<Props['minimum']>,
    default: 1,
  },
  /** 초기 슬라이드 셋팅 */
  initialSlide: {
    type: Number as PropType<Props['initialSlide']>,
    default: 0,
  },
  usePagination: {
    type: Boolean as PropType<Props['usePagination']>,
    default: true,
  },
  isBoxType: {
    type: Boolean as PropType<Props['isBoxType']>,
    default: false,
  },
};

export default function sliderComposable(emit: CustomEmit<Emits>, props: Props) {
  // #region swiper 기본세팅
  const uuid = uuidV4();

  // 슬라이더
  const refSlider = ref<Swiper>();

  // 모듈
  const modules = [Pagination, Navigation, Autoplay];
  const setSwiper = (swiper: Swiper) => {
    refSlider.value = swiper;
  };

  // #endregion

  // #region events
  const slideTo = (index: number) => {
    if (!refSlider.value) return;
    refSlider.value.slideTo(index ?? 0);
  };
  // #endregion

  const exposes = {
    slideTo,
    refSlider,
  };

  return {
    refSlider,

    uuid,
    modules,
    setSwiper,

    exposes,
  };
}

export { props as sliderProps, emits as sliderEmits };

export type { Slides };
