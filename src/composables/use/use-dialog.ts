import { reactive } from 'vue';
import { v4 as uuidV4 } from 'uuid';

interface Dialog {
  id: string;
  isOpen: boolean;
  scrollLock: boolean;
  title: string;
}

const SCROLL_LOCK_CLASS = 'scroll--lock';

const openDialogs = new Set<Dialog['id']>([]);

export default function useDialog() {
  // alert/confirm/modal에 사용되는 공통 dialog 객체 생성
  const dialog = reactive<Dialog>({
    id: uuidV4(),
    isOpen: false,
    scrollLock: true,
    title: '',
  });

  // alert/confirm/modal 열 때, scroll lock 처리를 위한 함수
  const onDialogOpen = (dialog: Dialog) => {
    if (dialog.scrollLock) {
      openDialogs.add(dialog.id);

      document?.body?.classList.add(SCROLL_LOCK_CLASS);
    }
  };

  // alert/confirm/modal 닫을 때, scroll lock 처리를 위한 함수
  const onDialogClose = (dialog: Dialog) => {
    if (dialog.scrollLock) {
      openDialogs.delete(dialog.id);

      document?.body?.classList.remove(SCROLL_LOCK_CLASS);
    }
  };

  return {
    dialog,

    onDialogOpen,
    onDialogClose,
  };
}

export type { Dialog };
