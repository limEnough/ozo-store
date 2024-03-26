import { ref, type PropType } from 'vue';
import { type CustomEmit } from '@/types/common.types';

type Emits = '';

interface Props {
  imagePath: string;
}

const emits: Emits[] = [''];

const props = {
  imagePath: {
    type: String as PropType<Props['imagePath']>,
    default: '',
  },
};

export default function mypageProfileComposable(emit: CustomEmit<Emits>, props: Props) {
  const isOpenPreviewModal = ref<boolean>(false);

  const imagePathData = [{ imagePath: props.imagePath }];

  const closePreviewModal = () => {
    isOpenPreviewModal.value = false;
  };

  const handleOpenPreviewModal = () => {
    isOpenPreviewModal.value = true;
  };

  return { handleOpenPreviewModal, isOpenPreviewModal, closePreviewModal, imagePathData };
}

export { props as mypageProfileProps, emits as mypageProfileEmits };
