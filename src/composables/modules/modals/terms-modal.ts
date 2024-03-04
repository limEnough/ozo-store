import useModal from '@/composables/use/use-modal';
import type { MemberTermsCode } from '@/constants/member-constants';
import type { CustomEmit } from '@/types/common.types';
import { type PropType, toRefs, onMounted, onUnmounted, ref, computed } from 'vue';

type Emits = 'close';

interface Props {
  termsCode: MemberTermsCode;
}

interface TermsData {
  code: MemberTermsCode;
  codeName: string;
  contentHtml: string | null;
  required: boolean;
}

const emits = ['close'];

const props = {
  termsCode: {
    type: String as PropType<Props['termsCode']>,
    required: true as const,
  },
};

// TODO: 추후 데이터로 받아오는 로직 만들기
export const termsData = ref<TermsData[]>([
  {
    code: 'TERMS.AGREE.OVER14',
    codeName: '만 14세이상입니다.',
    contentHtml: null,
    required: true,
  },
  {
    code: 'TERMS.AGREE.USE',
    codeName: 'OZO 스토어 이용 약관',
    contentHtml:
      '<div>제1장 총칙<br><br>제1조(목적) <br>이 약관은 주식회사 OZO 스토어(이하 “회사”)가 운영하는 사이버 몰에서 제공하는 인터넷 관련 서비스를 이용함에 있어 사이버 몰과 “이용자”의 권리․의무 및 책임사항을 규정함을 목적으로 합니다.<br><br>제2조(정의)<br>①  “몰”이란 회사가 재화 또는 용역(이하 “재화 등”)을 “이용자”에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 사이버몰을 말합니다.<br>② “이용자”란 “몰”에 접속하여 이 약관에 따라 “회사”가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.<br>③ “회원”이라 함은 “몰”에 회원 가입을 한 자로서, 계속적으로 “몰”이 제공하는 서비스를 이용할 수 있는 자를 말합니다.<br>④ “비회원”이란 회원으로 가입하지 않고 “몰”이 제공하는 서비스를 이용하는 자를 말합니다.<br>⑤ “판매자”란 “회사”와 “인터넷 쇼핑몰 입점 계약”을 체결하고 “몰”에서 재화 등을 판매하는 자를 말합니다.<br><br></div>',
    required: true,
  },
  {
    code: 'TERMS.AGREE.PRIVACY',
    codeName: '개인정보 수집 및 이용 동의',
    contentHtml:
      '<div></div><p>(주)OZO는 아래의 목적으로 개인정보를 수집 및 이용하며, 회원의 개인정보를 안전하게 처리하는데 최선을 다하고 있습니다. 아래의 내용을 확인 후 동의하여 주시기 바랍니다.</p><br><div><span>1.수집 및 이용 목적</span><ul><li>회원 가입 의사 확인, 회원제 서비스 제공</li><li>이용자 식별, 본인 인증</li><li>서비스 및 상품 제공에 관한 계약 이행 및 요금 정산</li><li>고객 상담, 불만, 민원 사무 처리</li><li>서비스 및 약관 변경 고지, 안내사항 전달</li><li>상품∙서비스 이용 실적 정보 통계∙분석</li><li>상품∙서비스 개선 및 추천, 불법∙부정 이용 방지</li></ul></div><div><span>2. 수집항목</span><ul><li>회원가입 시 아이디, 비밀번호, 이메일</li></ul></div>',
    required: true,
  },
  {
    code: 'TERMS.AGREE.MARKETINGRECEIVE',
    codeName: '광고성 정보 수신 동의',
    contentHtml: null,
    required: false,
  },
]);

export default function termsModalComposable(emit: CustomEmit<Emits>, props: Props) {
  const { termsCode } = toRefs(props);

  const termsTitle = computed(() => {
    return termsData.value.filter((data) => data.code === termsCode.value)[0].codeName ?? '';
  });

  const termsContents = computed(() => {
    return termsData.value.filter((data) => data.code === termsCode.value)[0].contentHtml ?? null;
  });

  const {
    modal: termsModal,
    open: openTermsModal,
    close: closeTermsModal,
  } = useModal({
    title: termsTitle.value,
    scrollLock: true,
    isOpen: true,
    cancel: {
      title: '닫기',
      disabled: false,
      visible: true,
    },
  });

  onMounted(() => {
    openTermsModal();
  });

  onUnmounted(() => {
    closeTermsModal();
  });

  return {
    termsModal,
    termsContents,
    openTermsModal,
    closeTermsModal,
  };
}

export { emits as termsModalEmits, props as termsModalProps };
export type { TermsData };
