import { ref } from 'vue';

export default function createComposable() {
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');

  const handleClickCancel = () => {
    console.log('취소');
  };

  const submitForm = () => {
    console.log('저장');
  };

  return { handleClickCancel, submitForm, email, password, confirmPassword };
}
