import { reactive, ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

export default function mypageMainComposable() {
  const userStore = useUserStore();
  const { userInfo } = storeToRefs(userStore);

  return { userInfo };
}
