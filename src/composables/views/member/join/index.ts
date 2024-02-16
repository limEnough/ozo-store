import { ref } from 'vue';
import { useForm } from 'vee-validate';

interface JoinForm {
  id: string;
  password: string;
}

export default function joinComposable() {
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
