import { type RouteRecordRaw } from 'vue-router';
import { PAGE_CODE_DEPTH1, PAGE_CODE_DEPTH2 } from '@/constants/page-code-constants';
import { SHOP_PAGE_NAMES } from '@/constants/path-constants';
import GoodsView from '@/views/shop/goods-view/index.vue';
import GoodsList from '@/views/shop/goods-list/index.vue';

const getShopRoutes = (): RouteRecordRaw[] => {
  return [
    {
      path: '/shop',
      name: SHOP_PAGE_NAMES['shop'],
      redirect: '/shop/goodsList',
      meta: {
        pageTitle: '상품 목록',
        pageCode: PAGE_CODE_DEPTH1['SHOP'],
      },
      children: [
        {
          path: '/shop/goodsList',
          name: SHOP_PAGE_NAMES['shop-goods-list'],
          component: GoodsList,
          meta: {
            pageTitle: '상품 목록',
            pageCode: PAGE_CODE_DEPTH2['GOODS_LIST'],
          },
        },
        {
          path: '/shop/goodsView/:id',
          name: SHOP_PAGE_NAMES['shop-goods-view'],
          component: GoodsView,
          meta: {
            pageTitle: '상품 상세',
            pageCode: PAGE_CODE_DEPTH2['GOODS_VIEW'],
          },
        },
      ],
    },
  ];
};

export default getShopRoutes;
