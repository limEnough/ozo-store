import { computed, reactive, ref } from 'vue';
import { useForm, type InvalidSubmissionContext } from 'vee-validate';
import createCustomField, { createValidationSchema } from '@/composables/use/use-custom-field';
import { isEmpty, isPhoneEmpty, validateEmail, validatePassword, validateTotalPhoneNumber } from '@/utils/validator';
import { useI18n } from 'vue-i18n';
import formConfig from '@/configs/form.config';
import { ALLOWED_REGEXS } from '@/constants/regex.constants';
import type { APICode } from '@/types/api.types';
import { getYearList, getMonthList, getDateList } from '@/utils/date';
import { type selectboxRow, makePlaceholder } from '@/composables/elements/selectbox';
import type { CheckboxModel } from '@/types/common.types';
import type { MemberGenderCode, MemberTermsCode } from '@/constants/member-constants';
import type { CheckboxOption } from '@/composables/elements/checkbox';
import { termsData, type TermsData } from '@/composables/modules/modals/terms-modal';
import { isEqual } from 'lodash-es';

interface CreateAccountForm {
  termsAgreement: CheckboxModel<CheckboxOption<MemberTermsCode>>;
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phoneNumber: string;
  gender: APICode<MemberGenderCode>;
  birthYear: selectboxRow;
  birthMonth: selectboxRow;
  birthDate: selectboxRow;
}

export default function createComposable() {
  const messages = useI18n();

  // #region Form
  const { handleSubmit: veeHandleSubmit } = useForm<CreateAccountForm>();

  const validationSchema = createValidationSchema<CreateAccountForm>({
    termsAgreement: (value: CreateAccountForm['termsAgreement']) => {
      const termsRequiredOptions = termsAgreementOptions.value.filter((option) => option.required);
      const checkedRequiredOptions = value.filter((checkedOption) => checkedOption.required);

      // 필수값 선택 여부 체크
      if (!isEqual(termsRequiredOptions, checkedRequiredOptions)) {
        return messages.t('validation.termsAgreement');
      }

      return true;
    },
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
        return messages.t('validation.required');
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
    birthYear: (value: CreateAccountForm['birthYear']) => {
      if (isEmpty(value.code)) {
        return messages.t('validation.required');
      }

      return true;
    },
    birthMonth: (value: CreateAccountForm['birthMonth']) => {
      if (isEmpty(value.code)) {
        return messages.t('validation.required');
      }

      return true;
    },
    birthDate: (value: CreateAccountForm['birthDate']) => {
      if (isEmpty(value.code)) {
        return messages.t('validation.required');
      }

      return true;
    },
  });
  // #endregion

  // #region options
  const termsAgreementOptions = ref<TermsData[]>(termsData.value);

  const genderOptions = ref<APICode<MemberGenderCode>[]>([
    {
      code: 'GENDER.MALE',
      codeName: '남성',
    },
    {
      code: 'GENDER.FEMALE',
      codeName: '여성',
    },
  ]);

  const birthPlaceholderOption = makePlaceholder('선택');

  const birthOptions = reactive({
    year: [...[birthPlaceholderOption], ...getYearList(-50)],
    month: [...[birthPlaceholderOption], ...getMonthList()],
    date: [birthPlaceholderOption],
  });
  // #endregion

  // #region field
  const termsAgreement = reactive(
    createCustomField<CreateAccountForm['termsAgreement']>('termsAgreement', validationSchema.termsAgreement, {
      initialValue: termsAgreementOptions.value,
      validateOnValueUpdate: true,
    }),
  );

  const email = reactive(
    createCustomField<CreateAccountForm['email']>(
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
        regex: ALLOWED_REGEXS.ONLY_KOREAN_ENGLISH,
      },
    ),
  );

  const phoneNumber = reactive(
    createCustomField<CreateAccountForm['phoneNumber']>(
      'phoneNumber',
      validationSchema.phoneNumber,
      {
        initialValue: '',
      },
      {
        regex: ALLOWED_REGEXS.ONLY_NUMBER,
      },
    ),
  );

  const gender = reactive(
    createCustomField<CreateAccountForm['gender']>('gender', validationSchema.gender, {
      initialValue: genderOptions.value[0],
    }),
  );

  const birthYear = reactive(
    createCustomField<CreateAccountForm['birthYear']>('birthYear', validationSchema.birthYear, {
      initialValue: birthOptions.year[0],
      validateOnValueUpdate: true,
    }),
  );

  const birthMonth = reactive(
    createCustomField<CreateAccountForm['birthMonth']>('birthMonth', validationSchema.birthMonth, {
      initialValue: birthOptions.month[0],
      validateOnValueUpdate: true,
    }),
  );

  const birthDate = reactive(
    createCustomField<CreateAccountForm['birthDate']>('birthDate', validationSchema.birthDate, {
      initialValue: birthOptions.date[0],
      validateOnValueUpdate: true,
    }),
  );
  // #endregion

  const birthErrorMessage = computed(() => {
    return birthYear.errorMessage || birthMonth.errorMessage || birthDate.errorMessage;
  });

  // #region Terms
  const selectedTermsCode = ref<MemberTermsCode | null>(null);

  const isOpenTermsModal = ref<boolean>(false);

  const closeTermsModal = () => {
    isOpenTermsModal.value = false;
  };
  // #endregion

  // #region Events
  const changedBirthMonth = (value: selectboxRow) => {
    if (!value.code) return;

    const selectedMonth = parseInt(value.code);
    birthOptions.date = [...[birthPlaceholderOption], ...getDateList(selectedMonth)];
  };

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

  const handleOpenTermsModal = (code: MemberTermsCode) => {
    selectedTermsCode.value = code;
    isOpenTermsModal.value = true;
  };
  // #endregion

  return {
    termsAgreementOptions,
    genderOptions,
    birthOptions,

    termsAgreement,
    email,
    password,
    name,
    passwordConfirm,
    phoneNumber,
    gender,
    birthYear,
    birthMonth,
    birthDate,
    birthErrorMessage,

    changedBirthMonth,
    handleClickCancel,
    handleSubmit,
    handleOpenTermsModal,

    selectedTermsCode,
    isOpenTermsModal,
    closeTermsModal,
  };
}
