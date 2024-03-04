import { type PropType, computed, getCurrentInstance, onMounted, reactive, ref, toRefs, useAttrs } from 'vue';
import { type CustomEmit } from '@/types/common.types';
import { TELEPORT_TARGET } from '@/configs/app.config';
import { onClickOutside } from '@vueuse/core';
import type { Modal, ModalSize } from '@/composables/use/use-modal';

type Emits = 'close' | 'submit';

type Props = Omit<Modal, 'id'>;

const emits: Emits[] = ['close', 'submit'];

const cancelDefault = {
  title: '취소',
  disabled: false,
  visible: true,
};
const submitDefault = {
  title: '확인',
  disabled: false,
  visible: true,
};

const props = {
  isOpen: {
    type: Boolean as PropType<Props['isOpen']>,
    default: false,
  },
  title: {
    type: String as PropType<Props['title']>,
    default: '',
  },
  size: {
    type: String as PropType<Props['size']>,
    default: 'm' as ModalSize,
  },
  scrollLock: {
    type: Boolean as PropType<Props['scrollLock']>,
    default: true,
  },
  hideClose: {
    type: Boolean as PropType<Props['hideClose']>,
    default: false,
  },
  hideHeader: {
    type: Boolean as PropType<Props['hideHeader']>,
    default: false,
  },
  hideFooter: {
    type: Boolean as PropType<Props['hideFooter']>,
    default: false,
  },
  /** true일 경우 모달 컨텐츠 바깥 영역 클릭 시 close 이벤트 emit */
  closeOnClickOutside: {
    type: Boolean as PropType<Props['hideFooter']>,
    default: true,
  },
  /** 취소 버튼 커스텀 */
  cancel: {
    type: Object as PropType<Props['cancel']>,
    default: () => cancelDefault,
  },
  /** 저장/확인 버튼 커스텀 */
  submit: {
    type: Object as PropType<Props['submit']>,
    default: () => submitDefault,
  },
  /** 취소 버튼 클릭 시, 실행할 이벤트 */
  onClose: {
    type: [Function, undefined] as PropType<Props['onClose']>,
    default: undefined,
  },
  /** 저장 버튼 클릭 시, 실행할 이벤트 */
  onSubmit: {
    type: [Function, undefined] as PropType<Props['onSubmit']>,
    default: undefined,
  },
};

export default function modalComposable(emit: CustomEmit<Emits>, props: Props) {
  const { closeOnClickOutside, cancel, submit } = toRefs(props);

  // #region template refs
  const modalContentRef = ref<HTMLDivElement>();
  const modalBodyRef = ref<HTMLDivElement>();
  // #endregion

  const attrs = useAttrs();

  // 현재 실행중인 component의 instance 에 scoped 적용된 Id
  const scopeId = getCurrentInstance()?.vnode?.scopeId ?? '';

  const cancelOption = computed(() => Object.assign({}, cancelDefault, cancel?.value));
  const submitOption = computed(() => Object.assign({}, submitDefault, submit?.value));

  onMounted(() => {
    if (closeOnClickOutside.value) {
      // 모달 바깥 영역 클릭 시 close 이벤트 emit
      onClickOutside(modalContentRef, () => {
        emit('close');
      });
    }
  });

  return {
    TELEPORT_TARGET,

    attrs: reactive({
      ...attrs,
      // TODO: [확인] teleport 했을 때 scoped css 적용안되는 이슈 확인
      ...(scopeId.length && { [scopeId]: true }),
    }),

    modalContentRef,
    modalBodyRef,

    cancelOption,
    submitOption,
  };
}

export { props as modalProps, emits as modalEmits };
