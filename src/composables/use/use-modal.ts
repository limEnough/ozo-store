import { reactive } from 'vue';
import useDialog, { type Dialog } from '@/composables/use/use-dialog';
import type { Sizes } from '@/constants/ui-constants';

type ModalSize = Omit<Sizes, 'xs' | 'xl'>;

interface Modal extends Dialog {
  size: ModalSize;
  showClose: boolean;
  hideHeader: boolean;
  hideTitle: boolean;
  hideFooter: boolean;
  closeOnClickOutside: boolean;
  cancel?: {
    title?: string;
    disabled?: boolean;
    visible?: boolean;
  };
  submit?: {
    title?: string;
    disabled?: boolean;
    visible?: boolean;
  };
  onClose?: FunctionConstructor | undefined;
  onSubmit?: FunctionConstructor | undefined;
}

export default function useModal(option?: Partial<Modal>) {
  const { dialog, onDialogOpen, onDialogClose } = useDialog();

  const modal = reactive<Modal>({
    // dialog 기본 옵션 복사
    ...dialog,

    // 디폴트 값 설정
    size: 'm',
    hideClose: false,
    hideFooter: false,
    hideHeader: false,
    closeOnClickOutside: true,

    // 커스텀 옵션으로 덮어쓰기
    ...option,
  });

  const open = () => {
    modal.isOpen = true;

    onDialogOpen(modal);
  };

  const close = () => {
    modal.isOpen = false;

    onDialogClose(modal);
  };

  return {
    modal,

    open,
    close,
  };
}

export type { Modal, ModalSize };
