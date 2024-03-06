export default () => {
  const messages = {
    //#region 페이지 관련
    NotInitialized: '페이지가 초기화 돠지 않았습니다.',
    //#endregion

    // #region 유효성 검사
    validation: {
      required: '필수 항목입니다.',
      requiredItem: '{name}을/를 입력해주세요.',
      onlyNumber: '숫자만 입력 가능합니다.',
      passwordForm: '비밀번호는 8자 이상, 16자 이하 영문자, 숫자 및 특수문자를 조합해서 입력해 주세요.',
      passwordConfirm: '입력한 비밀번호가 일치하지 않습니다.',
      emailForm: '올바른 이메일 형식이 아닙니다.',
      emailDuplicate: '이메일 중복 체크를 완료해주세요.',
      totalPhoneForm: '올바른 전화번호 형식이 아닙니다.',
      termsAgreement: '필수 약관에 동의해주세요.',
    },
    // #endregion

    // #region alert
    alert: {
      validationFailed: '입력 정보를 확인해 주세요.',
      saveSuccess: '저장이 완료되었습니다.',
      deleteSuccess: '삭제가 완료되었습니다.',
      systemError: '시스템 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.',
      networkError: '네트워크 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.',
    },
    // #endregion

    // #region confirm
    confirm: {
      cancelSave: '해당 정보가 저장되지 않았습니다.\n그래도 페이지를 취소하시겠습니까?',
      delete: '삭제 하시겠습니까?',
    },
    // #endregion
  } as const;

  return messages;
};
