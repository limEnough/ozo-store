/**
 * MEMO: [공식문서] 참조
 * https://github.com/bluwy/create-vite-extra/blob/master/template-ssr-vue-ts/src/entry-server.ts
 */
import { renderToString } from 'vue/server-renderer';
import { createApp } from './main';
import type { VueServerContext } from './types/common.types';

export async function render(context: VueServerContext, url: string) {
  const { app, router } = await createApp();

  // passing SSR context object which will be available via useSSRContext()
  // @vitejs/plugin-vue injects code into a component's setup() that registers
  // itself on ctx.modules. After the render, ctx.modules would contain all the
  // components that have been instantiated during this render call.
  const ctx = {
    serverContext: context,
  } as any;

  // vue redirect 체크
  const currentPath = router.currentRoute.value.fullPath;
  const isRedirected = !!router.currentRoute.value.redirectedFrom;

  const html = await renderToString(app, ctx);
  // MEMO: ssr에서 teleport를 이용해 렌더링된 컴포넌트가 있을 경우 ctx.teleports를 통해 가져올 수 있다.
  const teleports = ctx.teleports;

  return { html, teleports, currentPath, isRedirected };
}
