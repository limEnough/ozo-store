import { reactive } from 'vue';

export default function createComposable() {
  const pageTitle = reactive({
    main: 'Create Account',
    sub: 'create a new account',
  });

  return { pageTitle };
}
