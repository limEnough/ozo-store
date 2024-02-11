import { type PropType, computed, useSlots } from 'vue';
import { type CustomEmit } from '@/types/common.types';
import usePageTitle from '@/composables/use/use-page-title';

type Emits = 'cancel' | 'submit';

interface Props {
  cancel?: {
    title?: string;
    disabled?: boolean;
  };
  submit?: {
    title?: string;
    disabled?: boolean;
  };
  onCancel?: FunctionConstructor | undefined;
  onSubmit?: FunctionConstructor | undefined;
}

const cancelDefault = {
  title: '취소',
  disabled: false,
};

const submitDefault = {
  title: '저장',
  disabled: false,
};

const emits: Emits[] = ['cancel', 'submit'];

const props = {
  cancel: {
    type: Object as PropType<Props['cancel']>,
    default: () => cancelDefault,
  },
  submit: {
    type: Object as PropType<Props['submit']>,
    default: () => submitDefault,
  },
  onCancel: {
    type: [Function, undefined] as PropType<Props['onCancel']>,
    default: undefined,
  },
  onSubmit: {
    type: [Function, undefined] as PropType<Props['onSubmit']>,
    default: undefined,
  },
};

export default function formLayoutComposable(emit: CustomEmit<Emits>, props: Props) {
  const slots = useSlots();
  const { pageTitle } = usePageTitle();

  const cancelOption = computed(() => Object.assign({}, cancelDefault, props.cancel));
  const submitOption = computed(() => Object.assign({}, submitDefault, props.submit));

  const isVisibleFooter = computed(() => {
    const hasSlot = Object.keys(slots).find((slotName) => {
      return ['actions'].includes(slotName);
    });

    const hasHandleAction = [typeof props.onCancel, typeof props.onSubmit].includes('function');

    return hasSlot || hasHandleAction;
  });

  return {
    pageTitle,
    slots,
    cancelOption,
    submitOption,
    isVisibleFooter,
  };
}

export { props as formLayoutProps, emits as formLayoutEmits };

export type { Props as FormLayoutProps, Emits as FormLayoutEmits };
