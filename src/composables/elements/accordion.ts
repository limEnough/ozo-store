import { type PropType, computed, onMounted, onUnmounted, ref, useAttrs, useSlots, watch } from 'vue';
import type { CustomEmit } from '@/types/common.types';

type Emits = 'toggle';
const emits: Emits[] = ['toggle'];

interface Section {
  header: string;
  body: string;
}

interface Props {
  isOpen: boolean;
  size?: 's' | 'm' | 'l';
  useTransition: boolean;
  useHeaderToggle: boolean;
  onToggle?: FunctionConstructor;
}

const props = {
  isOpen: {
    type: Boolean as PropType<Props['isOpen']>,
    default: false,
  },
  size: {
    type: String as PropType<Props['size']>,
    default: 'm',
    required: false,
  },
  useTransition: {
    type: Boolean as PropType<Props['useTransition']>,
    default: false,
  },
  useHeaderToggle: {
    type: Boolean as PropType<Props['useHeaderToggle']>,
    default: false,
  },
  onToggle: {
    type: Function as PropType<Props['onToggle']>,
    default: undefined,
  },
};

export default function accordionComposable(emit: CustomEmit<Emits>, props: Props) {
  const isOpen = ref(props.isOpen);

  const attrs = useAttrs();
  const slots = useSlots();

  const refAccordionHeader = ref<HTMLDivElement>();

  const hasSlotHeader = computed(() => !!slots.header);

  const styleAttrs = computed(() => {
    if (attrs.class) return { class: attrs.class };
    else return {};
  });

  const accordionAttrs = computed(() => {
    if (attrs.class) return { ...attrs, class: '' };
    else return attrs;
  });

  const handleClick = () => {
    if (/* e.currentTarget instanceof HTMLDivElement && */ props.onToggle) {
      emit('toggle', !isOpen.value);
    }

    isOpen.value = !isOpen.value;
  };

  watch(
    () => props.isOpen,
    (newValue) => {
      isOpen.value = newValue;
    },
  );

  const handleTransition = {
    beforeEnter(el: HTMLElement) {
      el.style.height = '0';
    },
    enter(el: HTMLElement) {
      el.style.height = el.scrollHeight + 'px';
    },
    onAfterEnter(el: HTMLElement) {
      el.style.height = '';
    },
    beforeLeave(el: HTMLElement) {
      el.style.height = el.scrollHeight + 'px';
    },
    leave(el: HTMLElement) {
      el.style.height = '0';
    },
  };

  const isHeaderHover = ref(false);

  const toggleHover = (state: boolean) => {
    if (state) isHeaderHover.value = true;
    else isHeaderHover.value = false;
  };

  const enterEvent = () => {
    toggleHover(true);
  };
  const leaveEvent = () => {
    toggleHover(false);
  };

  onMounted(() => {
    if (refAccordionHeader.value) {
      refAccordionHeader.value.addEventListener('mouseenter', enterEvent);
      refAccordionHeader.value.addEventListener('mouseleave', leaveEvent);
    }
  });
  onUnmounted(() => {
    if (refAccordionHeader.value) {
      refAccordionHeader.value.removeEventListener('mouseenter', enterEvent);
      refAccordionHeader.value.removeEventListener('mouseleave', leaveEvent);
    }
  });

  return {
    refAccordionHeader,
    isOpen,
    isHeaderHover,
    styleAttrs,
    accordionAttrs,
    handleClick,
    handleTransition,
    hasSlotHeader,
  };
}

export { emits as accordionEmits, props as accordionProps };

export type { Props as AccordionProps, Section as AccordionSection };
