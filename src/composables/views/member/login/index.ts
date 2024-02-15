import { reactive, ref } from 'vue';

export default function loginComposable() {
  const userEmail = ref('');
  const userPassword = ref('');

  const pageTitle = reactive({
    main: 'Welcome back!',
    sub: 'sign to continue',
  });

  return {
    userEmail,
    userPassword,
    pageTitle,
  };
}
