import { computed } from 'vue';
import type { PropType } from 'vue';

interface TitleData {
  main: string;
  sub: string;
}

interface Props {
  data: TitleData;
}

const props = {
  data: {
    type: Object as PropType<Props['data']>,
    default: () => ({
      main: '',
      sub: '',
    }),
    required: true as const,
  },
};

export default function titleComposables(props: Props) {
  const titleInfo = computed(() => props.data);
  const hasSubTitle = computed(() => props.data.sub.length);

  return { titleInfo, hasSubTitle };
}

export { props as titleProps };
