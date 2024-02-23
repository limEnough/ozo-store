import { reactive, ref } from 'vue';
import { useForm, type InvalidSubmissionContext } from 'vee-validate';
import createCustomField, { createValidationSchema } from '@/composables/use/use-custom-field';
import { isEmpty, isPhoneEmpty, validateEmail, validatePassword, validateTotalPhoneNumber } from '@/utils/validator';
import { useI18n } from 'vue-i18n';
import formConfig from '@/configs/form.config';
import { ALLOWED_REGEXS } from '@/constants/regex.constants';

// TODO: address, file
interface CreateAccountForm {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  birth: string;
  phoneNumber: string;
  gender: string;
}

export default function createComposable() {
  const messages = useI18n();

  // #region Form
  const { handleSubmit: veeHandleSubmit } = useForm<CreateAccountForm>();

  const validationSchema = createValidationSchema<CreateAccountForm>({
    email: (value: CreateAccountForm['email']) => {
      if (isEmpty(value)) {
        return messages.t('validation.required');
      }

      if (!validateEmail(value) || (!!email.max && value.length > email.max)) {
        return messages.t('validation.emailForm');
      }

      return true;
    },
    password(value: CreateAccountForm['password']) {
      if (isEmpty(value)) {
        return messages.t('validation.required');
      }

      if (!validatePassword(value)) {
        return messages.t('validation.passwordForm');
      }

      return true;
    },
    passwordConfirm(value: CreateAccountForm['passwordConfirm']) {
      if (isEmpty(value)) {
        return messages.t('validation.required');
      }

      if (password.value !== value) {
        return messages.t('validation.passwordConfirm');
      }

      return true;
    },
    name: (value: CreateAccountForm['name']) => {
      if (isEmpty(value)) {
        return messages.t('validation.passwordForm');
      }

      return true;
    },
    birth: (value: CreateAccountForm['birth']) => {
      if (isEmpty(value)) {
        return messages.t('validation.passwordForm');
      }

      return true;
    },
    phoneNumber: (value: CreateAccountForm['phoneNumber']) => {
      if (isPhoneEmpty(value)) {
        return messages.t('validation.required');
      }

      if (!validateTotalPhoneNumber(value)) {
        return messages.t('validation.totalPhoneForm');
      }

      return true;
    },
    gender: (value: CreateAccountForm['gender']) => {
      if (isEmpty(value)) {
        return messages.t('validation.required');
      }

      return true;
    },
  });
  // #endregion

  // #region fielda
  const email = reactive(
    createCustomField<CreateAccountForm['email']>(
      'email',
      validationSchema.email,
      {
        initialValue: '',
      },
      {
        max: formConfig.max.email,
        regex: ALLOWED_REGEXS.ALL_KEYBOARD_CHARACTERS_SPACE,
      },
    ),
  );

  const password = reactive(
    createCustomField<CreateAccountForm['password']>(
      'password',
      validationSchema.password,
      {
        initialValue: '',
      },
      {
        regex: ALLOWED_REGEXS.ALL_KEYBOARD_CHARACTERS,
      },
    ),
  );

  const passwordConfirm = reactive(
    createCustomField<CreateAccountForm['passwordConfirm']>(
      'passwordConfirm',
      validationSchema.passwordConfirm,
      {
        initialValue: '',
      },
      {
        regex: ALLOWED_REGEXS.ALL_KEYBOARD_CHARACTERS,
      },
    ),
  );

  const name = reactive(
    createCustomField<CreateAccountForm['name']>(
      'name',
      validationSchema.name,
      {
        initialValue: '',
      },
      {
        max: formConfig.max.name,
        regex: ALLOWED_REGEXS.ALL_KEYBOARD_CHARACTERS_SPACE,
      },
    ),
  );
  // #endregion

  // #region Events
  const onValidSuccess = (values: CreateAccountForm) => {
    alert('검증 성공하였습니다.');

    console.log('values: ', values);
  };

  const onValidFail = (values: InvalidSubmissionContext<CreateAccountForm>) => {
    alert('검증 실패하였습니다.');

    console.log('values: ', values);
  };

  const handleSubmit = veeHandleSubmit(onValidSuccess, onValidFail);

  const handleClickCancel = () => {
    const answer = confirm(messages.t('confirm.cancelSave'));

    if (answer) {
      console.log('취소하겠습니다!');
    }
  };
  // #endregion

  return { handleClickCancel, handleSubmit, email, password, name, passwordConfirm };
}
