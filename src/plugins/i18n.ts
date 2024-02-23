import { createI18n } from 'vue-i18n';
import { LANG, type Lang } from '@/constants/i18n-constants';

async function importMessages(lang: Lang = LANG.KO) {
  return (await import(`../i18n/${lang}/messages.ts`)).default();
}

export default async function createCustomI18n({ lang = LANG.KO }: { lang: Lang }) {
  const messages = await importMessages(lang);

  return createI18n<false>({
    // you must set `false`, to use Composition API
    legacy: false,
    locale: lang,
    globalInjection: true,
    fallbackLocale: LANG.KO,
    messages: {
      [lang]: messages,
    },
  });
}
