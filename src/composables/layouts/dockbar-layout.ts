import { ref, type PropType, computed } from 'vue';
import { type CustomEmit } from '@/types/common.types';
import { useRoute } from 'vue-router';

interface Props {
  isScrollDown?: boolean;
}

const emits: Emits[] = [''];

const props = {
  isScrollDown: {
    type: Boolean as PropType<Props['isScrollDown']>,
    default: false,
  },
};

export default function dockbarLayoutComposable(emit: CustomEmit<Emits>, props: Props) {
  const route = useRoute();
  const refDrawerModal = ref();

  const handleDrawerOpen = () => {
    alert('LNB 개발중입니다.');

    if (!refDrawerModal.value) return;

    refDrawerModal.value.openDrawer();
  };

  const currentRouteName = computed(() => route.meta.pageCode);

  return {
    refDrawerModal,
    handleDrawerOpen,
    currentRouteName,
  };
}

export { props as dockbarLayoutProps, emits as dockbarLayoutEmits };
