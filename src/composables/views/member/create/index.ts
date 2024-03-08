import { computed, reactive, ref } from 'vue';
import { useForm } from 'vee-validate';
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
import { termsData, type TermsData } from '@/composables/modules/modals/terms-modal';
import { isEqual } from 'lodash-es';
import MemberCreateService from '@/services/member/create';
import type { MemberCreateAccount } from '@/services/member/create';
import { useRouter } from 'vue-router';
import { MEMBER_PAGE_NAMES } from '@/constants/path-constants';

interface CreateAccountForm {
  termsAgreement: CheckboxModel<MemberTermsCode>;
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
  const router = useRouter();
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

      if (!isPassDuplicateCheck.value) {
        return messages.t('validation.emailDuplicate');
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

  // #region fields
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

  // #region Data
  const birthErrorMessage = computed(() => {
    return birthYear.errorMessage || birthMonth.errorMessage || birthDate.errorMessage;
  });

  const isPassDuplicateCheck = ref(false);
  // #endregion

  // #region Terms
  const selectedTermsCode = ref<MemberTermsCode | null>(null);

  const isOpenTermsModal = ref<boolean>(false);

  const closeTermsModal = () => {
    isOpenTermsModal.value = false;
  };
  // #endregion

  // #region Parameter
  const createPutParams = (values: CreateAccountForm): MemberCreateAccount => {
    const { termsAgreement, email, password, name, phoneNumber, gender, birthYear, birthMonth, birthDate } = values;

    return {
      birth: `${birthYear.code}.${birthMonth.code}.${birthDate.code}`,
      email,
      gender: gender.code,
      name,
      password,
      phoneNumber,
      termsAgreement: termsAgreement.map((terms) => terms.code),
    };
  };
  // #endregion

  // #region Api
  const pageService = new MemberCreateService();

  const getDuplicatedEmailUser = async (email: string): Promise<boolean> => {
    if (!email || !email.length) alert('입력하신 이메일을 확인해주세요.');

    const result = await pageService.getDuplicatedEmailUser(email);
    return result;
  };

  const postNewAccount = async (params: MemberCreateAccount) => {
    try {
      await pageService.postNewAccount(params);

      return true;
    } catch (error) {
      // TODO: 에러 대응 어떻게 할 것인가?
      console.error(error);
    }

    return false;
  };
  // #endregion

  // #region Events
  const changedBirthMonth = (value: selectboxRow) => {
    if (!value.code) return;

    const selectedMonth = parseInt(value.code);
    birthOptions.date = [...[birthPlaceholderOption], ...getDateList(selectedMonth)];
  };

  const onVerifyEmail = async () => {
    const inputValue = email.value;

    // 1. 중복체크를 한다.
    const isDuplicated = await getDuplicatedEmailUser(inputValue);

    if (isDuplicated) {
      return alert('중복된 이메일입니다.');
    } else {
      isPassDuplicateCheck.value = true;

      // email field 검증 재실행
      email.validate();
    }

    // TODO: 2. 이메일 인증을 한다.
  };

  const onValidSuccess = async (values: CreateAccountForm) => {
    const params = createPutParams(values);

    if (!params) return;

    const result = await postNewAccount(params);

    if (result) {
      alert('회원가입이 완료되었습니다!');

      router.replace({
        name: MEMBER_PAGE_NAMES['member-login'],
      });
    }
  };

  const onValidFail = () => {
    alert('alert.validationFailed');
  };

  const handleSubmit = veeHandleSubmit(onValidSuccess, onValidFail);

  const handleClickCancel = () => {
    const answer = confirm(messages.t('confirm.cancelSave'));

    if (answer) {
      router.replace({
        name: MEMBER_PAGE_NAMES['member-login'],
      });
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
    isPassDuplicateCheck,

    changedBirthMonth,
    onVerifyEmail,
    handleClickCancel,
    handleSubmit,
    handleOpenTermsModal,

    selectedTermsCode,
    isOpenTermsModal,
    closeTermsModal,
  };
}
