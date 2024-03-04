import { ref, type PropType, watch, nextTick, onMounted } from 'vue';
import { type CustomEmit } from '@/types/common.types';
import { convertStringToHTML } from '@/utils/string';
import { useI18n } from 'vue-i18n';

type Emits = 'loaded';

interface Props {
  contentHtml: string;
}

const emits: Emits[] = ['loaded'];

const props = {
  contentHtml: {
    type: String as PropType<Props['contentHtml']>,
    required: true as const,
  },
};

export default function shadowDomComposable(emit: CustomEmit<Emits>, props: Props) {
  const messages = useI18n();
  const refHTMLContainer = ref<HTMLElement>();
  const rootDom = ref<HTMLElement | ShadowRoot>();

  const styleSheet = `
    <style>
      * {
        max-width: 100%;
        word-break: break-all;
        white-space: pre-line;
        font-size: 0.9em;
      }

      p {
        margin: 0;
      }

      table {
        width: 100%;
        border-spacing: 0;
        margin: 0 0 1em;
      }

      table td {
        min-width: 1px;
        padding: .2em .3em;
      }

      table,
      table td {
        outline: 0;
        border: 1px dotted #ccc;
      }

      table th {
        outline: 0;
        border: 1px dotted #999;
      }
    </style>
  `;

  /**
   * ShadowDom 초기화
   */
  const initShadowDom = () => {
    if (!refHTMLContainer.value) return;

    if (!rootDom.value) rootDom.value = refHTMLContainer.value;
    rootDom.value = refHTMLContainer.value.attachShadow({ mode: 'open' });

    appendShadowDom();
    emit('loaded');

    watch(
      () => props.contentHtml,
      async () => {
        await nextTick();

        appendShadowDom();
      },
    );
  };

  /**
   * ShadowDom 내 contentHtml append
   */
  const appendShadowDom = () => {
    if (!rootDom.value) throw new Error(messages.t('NotInitialized'));

    rootDom.value.innerHTML = `
    ${styleSheet}
    <div class="shadow-dom">${convertStringToHTML(props.contentHtml)}</div>
      `;
  };

  onMounted(async () => {
    initShadowDom();
  });

  return { refHTMLContainer };
}

export { props as shadowDomProps, emits as shadowDomEmits };
