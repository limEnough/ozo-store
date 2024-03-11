import { inject, onMounted, reactive } from 'vue';
import MemberLoginService, { type MemberLoginForm } from '@/services/member/login';
import { useI18n } from 'vue-i18n';
import { useForm } from 'vee-validate';
import createCustomField, { createValidationSchema } from '@/composables/use/use-custom-field';
import { isEmpty } from '@/utils/validator';
import formConfig from '@/configs/form.config';
import { ALLOWED_REGEXS } from '@/constants/regex.constants';
import type { CheckboxModel } from '@/types/common.types';
import type { APICode } from '@/types/api.types';
import { useRouter } from 'vue-router';
import { MAIN_PAGE_NAMES } from '@/constants/path-constants';
import { SAVE_EMAIL_COOKIE } from '@/constants/member-constants';
import type { VueCookies } from 'vue-cookies';
import { useLayoutStore } from '@/stores/layout';

interface LoginForm {
  email: string;
  password: string;
  useSaveEmail: CheckboxModel<boolean>;
}

export default function loginComposable() {
  const router = useRouter();
  const messages = useI18n();
  const layoutStore = useLayoutStore();

  // #region Data
  const pageTitle = reactive({
    main: 'Welcome back!',
    sub: 'Sign to continue',
  });
  // #endregion

  // #region Options
  const loginOptions = reactive<APICode<boolean>[]>([
    {
      code: true,
      codeName: 'Save Email',
    },
  ]);
  // #endregion

  // #region Form
  const { handleSubmit: veeHandleSubmit, resetForm: veeResetForm } = useForm<LoginForm>();

  const validationSchema = createValidationSchema<LoginForm>({
    email: (value: LoginForm['email']) => {
      if (isEmpty(value)) {
        return messages.t('validation.requiredItem', { name: '이메일' });
      }
      return true;
    },
    password: (value: LoginForm['password']) => {
      if (isEmpty(value)) {
        return messages.t('validation.requiredItem', { name: '비밀번호' });
      }
      return true;
    },
  });
  // #endregion

  // #region fields
  const email = reactive(
    createCustomField<LoginForm['email']>(
      'email',
      validationSchema.email,
      {
        initialValue: '',
      },
      {
        max: formConfig.max.email,
        regex: ALLOWED_REGEXS.ALL_KEYBOARD_CHARACTERS,
      },
    ),
  );

  const password = reactive(
    createCustomField<LoginForm['password']>(
      'password',
      validationSchema.password,
      {
        initialValue: '',
      },
      {
        max: formConfig.max.password,
        regex: ALLOWED_REGEXS.ALL_KEYBOARD_CHARACTERS,
      },
    ),
  );

  const useSaveEmail = reactive(
    createCustomField<LoginForm['useSaveEmail']>('useSaveEmail', undefined, {
      initialValue: [],
    }),
  );
  // #endregion

  // #region Api
  const pageService = new MemberLoginService();
  const $cookies = inject<VueCookies>('$cookies') as VueCookies;

  const getUserAuth = async (values: LoginForm) => {
    const params: MemberLoginForm = { email: values.email, password: values.password };
    const result = await pageService.getUserAuth(params);

    if (typeof result !== 'object') {
      alert(result);
      return false;
    }

    if (values.useSaveEmail[0]) {
      $cookies.set(SAVE_EMAIL_COOKIE['KEY'], result.email, SAVE_EMAIL_COOKIE['MAXAGE']);
    } else {
      $cookies.remove(SAVE_EMAIL_COOKIE['KEY']);
    }

    return result;
  };
  // #endregion

  // #region Events
  const onValidSuccess = async (values: LoginForm) => {
    const result = await getUserAuth(values);

    if (!result) return;

    layoutStore.saveAuth({ authToken: result.authToken, expirationTime: result.expirationTime });

    alert('환영합니다!');

    router.push({
      name: MAIN_PAGE_NAMES['main'],
    });
  };

  const onValidFail = () => {
    alert(email.errorMessage.length ? email.errorMessage : password.errorMessage);
  };

  const handleSubmit = veeHandleSubmit(onValidSuccess, onValidFail);
  // #endregion

  onMounted(() => {
    // 이메일 저장한 쿠키 정보 있는지 확인
    const getSavedEmail = $cookies.get(SAVE_EMAIL_COOKIE['KEY']);

    if (getSavedEmail) {
      veeResetForm({
        values: {
          email: getSavedEmail,
          password: '',
          useSaveEmail: loginOptions,
        },
      });
    }
  });

  return {
    pageTitle,
    loginOptions,
    email,
    password,
    useSaveEmail,
    handleSubmit,
  };
}
