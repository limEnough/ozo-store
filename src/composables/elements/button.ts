import { type PropType, computed, toRefs } from 'vue';

type Icons = 'visible' | 'clear' | 'search';

interface Props {
  type: 'button' | 'submit';
  case: 'normal' | 'process' | 'success' | 'delete' | 'edit';
  size: '' | 's' | 'm' | 'l';
  width?: '' | 'full' | 'half';
  icon?: Icons;
  iconOnly: boolean;
  disabled?: boolean;
  loading: boolean;
}

const props = {
  type: {
    type: String as PropType<Props['type']>,
    default: 'button',
  },
  case: {
    type: String as PropType<Props['case']>,
    default: 'normal',
  },
  size: {
    type: String as PropType<Props['size']>,
    default: 'm',
  },
  width: {
    type: String as PropType<Props['width']>,
    default: '',
  },
  icon: {
    type: String as PropType<Props['icon']>,
    default: '',
  },
  iconOnly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean as PropType<Props['disabled']>,
    default: false,
  },
  loading: {
    type: Boolean as PropType<Props['loading']>,
    default: false,
  },
};

interface ClassMapping {
  [key: string]: string;
}

export default function buttonComposables(props: Props) {
  const { case: caseProp, size, width, iconOnly } = toRefs(props);

  const mapClasses = (mapping: ClassMapping, propValue: string) => {
    // TODO: console.log
    return Object.fromEntries(Object.entries(mapping).map(([key, value]) => [value, key === propValue]));
  };

  const buttonClasses = computed(() => {
    const caseClasses = mapClasses(
      {
        normal: 'case--normal',
        process: 'case--process',
      },
      caseProp.value,
    );

    const sizeClasses = mapClasses(
      {
        s: 'size--s',
        m: 'size--m',
        l: 'size--l',
      },
      size.value,
    );

    const widthClasses = {
      'width--full': 'full' === width?.value,
      'width--half': 'half' === width?.value,
    };

    return {
      ...caseClasses,
      ...sizeClasses,
      ...widthClasses,

      ['icon-only']: iconOnly?.value,
    };
  });

  return { buttonClasses };
}

export { props as buttonProps };
