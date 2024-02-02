import { ref } from 'vue';

export default function loginComposable() {
  const userEmail = ref('');
  const userPassword = ref('');

  return {
    userEmail,
    userPassword,
  };
}
