import { computed, ref, type PropType } from 'vue';
import { type CustomEmit } from '@/types/common.types';

interface Suggestion {
  query: string;
  url: string;
}

type Emits = '';

interface Props {
  propsName: '';
}

const emits: Emits[] = [''];

const props = {
  propsName: {
    type: String as PropType<Props['propsName']>,
    default: '',
  },
};

export default function searchBarComposable(emit: CustomEmit<Emits>, props: Props) {
  // #region 제안 검색어
  const getSearchSuggestion = (): Suggestion | null => {
    return {
      query: 'sofa',
      url: '/shop/goodsList',
    };
  };

  const searchSuggestion = computed(() => getSearchSuggestion());

  const hasSearchSuggestion = computed(() => {
    if (!searchSuggestion.value) return false;

    const { query } = searchSuggestion.value;

    return !!query;
  });
  // #endregion

  const searchKeyword = ref('');
  return { hasSearchSuggestion, searchKeyword };
}

export { props as searchBarProps, emits as searchBarEmits };
