import { computed } from 'vue';
import type { PropType } from 'vue';

interface TitleData {
  main?: string;
  sub?: string;
}

interface Props {
  data: TitleData;
  isAlignCenter: boolean;
}

const props = {
  data: {
    type: Object as PropType<Props['data']>,
    required: true as const,
  },
  isAlignCenter: {
    type: Boolean as PropType<Props['isAlignCenter']>,
    default: false,
  },
};

export default function titleComposable(props: Props) {
  const titleInfo = computed(() => props.data);
  const hasMainTitle = computed(() => props.data.main?.length);
  const hasSubTitle = computed(() => props.data.sub?.length);

  return { titleInfo, hasMainTitle, hasSubTitle };
}

export { props as titleProps };
