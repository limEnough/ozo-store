module.exports = {
  root: true,
  env: {
    node: true,
    // 'vue/setup-compiler-macros': true
  },

  extends: [
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    // https://github.com/vuejs/eslint-config-prettier#readme
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: true,
        useTabs: false,
        printWidth: 120,
        trailingComma: 'all',
        tabWidth: 2,
        vueIndentScriptAndStyle: true,
        endOfLine: 'auto',
        singleAttributePerLine: true,
        // eslintIntegration: true,
        bracketSpacing: true,
        importOrder: [
          '^vue(.*)$',
          '<THIRD_PARTY_MODULES>', // 외부 모듈
          '^@/services/(.*)$',
          '^@/utils/(.*)$',
          '^@/configs/(.*)$',
          '^@/composables/(.*)$',
          '^@/components/(.*)$',
          '^@/views/(.*)$',
          '^@/stores/(.*)$',
          '^@/constants/(.*)$',
          '^@/types/(.*)$',
          '^@/styles/(.*)$',
          '^[./]',
        ],
        // 각 범주마다 공백 한줄 추가
        importOrderSeparation: false,
        // 설정한 범주 내에서 정렬 여부
        importOrderSortSpecifiers: true,
      },
      {
        usePrettierrc: false,
      },
    ],
    // 'prettier/prettier': 'error',
    // semi: [2, "always"],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // quotes: ["error", "single"],
    '@typescript-eslint/no-var-requires': 'off',
    'object-shorthand': ['error', 'always'],
    // "brace-style": ["error", "stroustrup"],
    // "keyword-spacing": [
    //   "error",
    //   {
    //     before: true,
    //     after: true,
    //   },
    // ],
    // "space-before-function-paren": [
    //   "error",
    //   {
    //     anonymous: "never",
    //     named: "never",
    //     asyncArrow: "always",
    //   },
    // ],
    // indent: [
    //   "error",
    //   2,
    //   {
    //     SwitchCase: 1,
    //   },
    // ],

    // #region vue
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 1,
        switchCase: 1,
      },
    ],
    'vue/html-self-closing': 'off',
    'vue/first-attribute-linebreak': [
      'error',
      {
        singleline: 'ignore',
        multiline: 'below',
      },
    ],
    'vue/no-reserved-props': [
      'error',
      {
        vueVersion: 3, // or 2
      },
    ],

    'vue/valid-define-props': 'off',
    'vue/valid-define-emits': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/attributes-order': [
      'warn',
      {
        order: [
          'DEFINITION', // 'is', 'v-is'
          'LIST_RENDERING', // 'v-for item in items'
          'CONDITIONALS', // 'v-if', 'v-else-if', 'v-else', 'v-show', 'v-cloak'
          'RENDER_MODIFIERS', // 'v-once', 'v-pre'
          'TWO_WAY_BINDING', // 'v-model'
          'SLOT', // 'v-slot', 'slot'.
          'OTHER_DIRECTIVES', // 'v-custom-directive'
          'ATTR_DYNAMIC', // 'v-bind:prop="foo"', ':prop="foo"'
          'UNIQUE', // 'ref', 'key'
          'GLOBAL', // 'id'
          'ATTR_STATIC', // 'prop="foo"', 'custom-prop="foo"'
          'ATTR_SHORTHAND_BOOL', // 'boolean-prop'
          'EVENTS', // '@click="functionCall"', 'v-on="event"'
          'CONTENT', // 'v-text', 'v-html'
        ],
      },
    ],
    // #endregion
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
      },
    },
  ],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
  },
};
