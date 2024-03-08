import { type PropType, computed, toRefs } from 'vue';
import {
  type NavigationFailure,
  type RouteLocationNormalizedLoaded,
  type RouteLocationRaw,
  useRouter,
} from 'vue-router';

import type { ButtonCase, ButtonIcon } from '@/composables/elements/button';

interface Props {
  to: RouteLocationRaw;
  icon: ButtonIcon;
  case: ButtonCase;
  isExternal: boolean;
  beforeClick?: () => boolean | Promise<boolean>;
}

interface HandleMoveParams {
  isPass: boolean;
  to: Props['to'];
  route?: RouteLocationNormalizedLoaded;
}

type RouterLinkNavigate = (e?: MouseEvent | undefined) => Promise<void | NavigationFailure>;

const props = {
  to: {
    type: [String, Object] as PropType<Props['to']>,
    required: true as const,
  },
  icon: {
    type: String as PropType<Props['icon']>,
    default: 'text',
  },
  case: {
    type: String as PropType<Props['case']>,
    default: 'normal',
  },
  isExternal: {
    type: Boolean as PropType<Props['isExternal']>,
    default: false,
  },
  beforeClick: {
    type: Function as PropType<Props['beforeClick']>,
    default: undefined,
  },
};

export default function linkComposable(props: Props) {
  const router = useRouter();
  const { to: propsTo, isExternal, beforeClick } = toRefs(props);

  const targetRoute = computed(() => (!isExternal?.value ? router.resolve(propsTo.value) : propsTo.value));

  const handleClick = async (
    event: PointerEvent | MouseEvent,
    to: Props['to'],
    navigate?: RouterLinkNavigate,
    route?: RouteLocationNormalizedLoaded,
  ) => {
    const isPass = true;

    if (route) {
      event.preventDefault();
    }

    let resultOnClick;

    // click event 이전 처리 여부 확인
    if (beforeClick?.value) {
      resultOnClick = beforeClick.value();

      if (resultOnClick instanceof Promise) {
        resultOnClick.then((value) => {
          if (typeof value === 'boolean') {
            handleMove({
              to,
              route,
              isPass: value,
            });
          }
        });
      }
    } else {
      handleMove({
        isPass,
        to,
        route,
      });
    }
  };

  const handleMove = ({ to, isPass }: HandleMoveParams) => {
    if (!isPass) return false;

    const query = typeof propsTo.value === 'object' ? propsTo.value.query : undefined;

    if (query) router.push({ path: to, params: query });
    else router.push({ path: to });
  };

  return { propsTo, targetRoute, handleClick };
}

export { props as linkProps };
