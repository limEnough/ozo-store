import { type PropType } from 'vue';

interface Props {
  isShowDockbar: boolean;
  isShowFooter: boolean;
}

const props = {
  isShowDockbar: {
    type: Boolean as PropType<Props['isShowDockbar']>,
    default: true,
  },
  isShowFooter: {
    type: Boolean as PropType<Props['isShowFooter']>,
    default: true,
  },
};

export default function defaultLayoutComposable(props: Props) {
  return {};
}

export { props as defaultLayoutProps };
