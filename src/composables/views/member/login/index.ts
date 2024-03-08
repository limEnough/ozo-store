import { reactive } from 'vue';
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

interface LoginForm {
  email: string;
  password: string;
  isRememberEmail: CheckboxModel<boolean>;
}

export default function loginComposable() {
  const router = useRouter();
  const messages = useI18n();

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
  const { handleSubmit: veeHandleSubmit } = useForm<LoginForm>();

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

  const isRememberEmail = reactive(
    createCustomField<LoginForm['isRememberEmail']>('isRememberEmail', undefined, {
      initialValue: [],
    }),
  );
  // #endregion

  // #region Api
  const pageService = new MemberLoginService();

  const getUserAuth = async (params: MemberLoginForm) => {
    return await pageService.getUserAuth(params);
  };
  // #endregion

  // #region Events
  const onValidSuccess = async (values: LoginForm) => {
    const params = Object.assign(values, {
      isRememberEmail: values.isRememberEmail.length ? values.isRememberEmail[0].code : false,
    });

    if (!params) return;

    const result = await getUserAuth(params);

    if (typeof result !== 'object') alert(result);
    else {
      alert('환영합니다!');

      router.push({
        name: MAIN_PAGE_NAMES['main'],
      });
    }
  };

  const onValidFail = () => {
    alert(email.errorMessage.length ? email.errorMessage : password.errorMessage);
  };

  const handleSubmit = veeHandleSubmit(onValidSuccess, onValidFail);
  // #endregion

  return {
    pageTitle,
    loginOptions,
    email,
    password,
    isRememberEmail,
    handleSubmit,
  };
}
