import useModal from '@/composables/use/use-modal';
import type { CustomEmit } from '@/types/common.types';
import { type PropType, onMounted, onUnmounted } from 'vue';

type Emits = 'close';

interface imagePath {
  imagePath: string;
}

interface Props {
  imagePathData: imagePath[];
}

const emits = ['close'];

const props = {
  imagePathData: {
    type: Array as PropType<Props['imagePathData']>,
    required: true as const,
  },
};

export default function previewModalComposable(emit: CustomEmit<Emits>, props: Props) {
  const {
    modal: previewModal,
    open: openTermsModal,
    close: closeTermsModal,
  } = useModal({
    title: '이미지 미리보기',
    scrollLock: true,
    isOpen: true,
    size: 'l',
    cancel: {
      title: '닫기',
      disabled: false,
      visible: true,
    },
  });

  onMounted(() => {
    openTermsModal();
  });

  onUnmounted(() => {
    closeTermsModal();
  });

  return {
    previewModal,
    openTermsModal,
    closeTermsModal,
  };
}

export { emits as previewModalEmits, props as previewModalProps };
