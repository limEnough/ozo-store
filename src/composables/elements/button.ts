import { type PropType, computed, toRefs } from 'vue';

type Icon = 'visible' | 'back' | 'clear' | 'search' | 'close' | 'edit' | 'setting' | 'add';
type Case = 'normal' | 'process' | 'continue' | 'success' | 'delete' | 'text';

interface Props {
  tag: 'button' | 'a' | 'router-link';
  type: 'button' | 'submit';
  case: Case;
  size: '' | 's' | 'm' | 'l';
  width?: '' | 'full' | 'half';
  icon?: Icon;
  iconOnly: boolean;
  disabled?: boolean;
  loading: boolean;
}

const props = {
  tag: {
    type: String as PropType<Props['tag']>,
    default: 'button',
  },
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

export default function buttonComposable(props: Props) {
  const { case: caseProp, size, width, iconOnly } = toRefs(props);

  const mapClasses = (mapping: ClassMapping, propValue: string) => {
    // TODO: [스킬] console.log
    return Object.fromEntries(Object.entries(mapping).map(([key, value]) => [value, key === propValue]));
  };

  const buttonClasses = computed(() => {
    const caseClasses = mapClasses(
      {
        normal: 'case--normal',
        process: 'case--process',
        continue: 'case--continue',
        success: 'case--success',
        delete: 'case--delete',
        text: 'case--text',
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

export { props as buttonProps, type Icon as ButtonIcon, type Case as ButtonCase };
