import { type PropType, computed, onMounted, ref, useAttrs, watch } from 'vue';
import type { CustomEmit } from '@/types/common.types';

type Emits = 'update:phoneNumber';
const emits: Emits[] = ['update:phoneNumber'];

interface Props {
  phoneNumber: string;
  disabled: boolean;
  errorMessage: string;
}

const props = {
  phoneNumber: {
    type: String as PropType<Props['phoneNumber']>,
    required: true as const,
  },
  disabled: {
    type: Boolean as PropType<Props['disabled']>,
    default: false,
  },
  errorMessage: {
    type: String as PropType<Props['errorMessage']>,
    default: '',
  },
};

export default function InputPhoneComposable(emit: CustomEmit<Emits>, props: Props) {
  const attrs = useAttrs();

  const frontNumber = ref('');
  const middleNumber = ref('');
  const endNumber = ref('');

  const fullNumber = computed(() => {
    const first = frontNumber.value;
    const middle = '-' + middleNumber.value;
    const last = endNumber.value ? '-' + endNumber.value : '';
    // const last = endNumber.value.includes('**') || regex.end.test(endNumber.value) ? '-' + endNumber.value : '';
    return first + middle + last;
  });

  const styleAttrs = computed(() => {
    if (attrs.class) return { class: attrs.class };
    else if (attrs.style) return { class: attrs.style };
    else return {};
  });

  const functionalAttrs = computed(() => {
    if (attrs.class) return { ...attrs, class: '' };
    else return attrs;
  });

  /**
   * @description 각 자리수 할당 함수
   *
   * @param phoneNumber
   */
  const setPhoneNumber = (phoneNumber: string) => {
    let [front, middle, end] = phoneNumber && phoneNumber.includes('-') ? phoneNumber.split('-') : [phoneNumber || ''];

    middle = middle?.trim() ?? '';
    end = end?.trim() ?? '';

    frontNumber.value = front;
    middleNumber.value = middle;
    endNumber.value = end;
  };

  onMounted(() => {
    watch(
      () => props.phoneNumber,
      (newVal) => {
        if (newVal === fullNumber.value) return;
        setPhoneNumber(props.phoneNumber);
      },
    );

    watch(fullNumber, (newFullNumber) => {
      emit('update:phoneNumber', newFullNumber);
    });
  });

  const init = () => {
    setPhoneNumber(props.phoneNumber);
    emit('update:phoneNumber', fullNumber.value);
  };

  init();

  return {
    frontNumber,
    middleNumber,
    endNumber,

    styleAttrs,
    functionalAttrs,
  };
}

export { emits as InputPhoneEmits, props as InputPhoneProps };
