import type { Goods } from '@/composables/modules/goods.ts';

export const sampleGoodsData = (): Goods[] => {
  return [
    {
      goodsId: 100,
      displayGoodsName: 'Zomier',
      brandName: 'Bubble Puff Sofa',
      displayGoodsDesc:
        'High-elastic foam fillings are added to make it more comfortable, and the skin-contacting area is finished with thick grain leather to create a luxurious atmosphere.',
      imagePath: 'https://i.pinimg.com/564x/19/ce/1f/19ce1f51c2a523a72901fbf05a7c0d9c.jpg',
      originPrice: {
        number: 460000,
        currencyCode: 'KRW',
      },
      salePrice: {
        number: 331200,
        currencyCode: 'KRW',
      },
      discountRate: 28,
      displaySaleStatusEnum: {
        code: 'GOODS.DISPLAY_SALE_STATUS.SALE',
        codeName: '판매중',
      },
      options: [
        {
          name: 'color',
          value: 'blue',
        },
      ],
      saleStock: 100,
      isWish: false,
    },
    {
      goodsId: 101,
      displayGoodsName: 'Pausa',
      brandName: 'Eichholtz Bernd Sofa',
      displayGoodsDesc:
        'High-elastic foam fillings are added to make it more comfortable, and the skin-contacting area is finished with thick grain leather to create a luxurious atmosphere.',
      imagePath: 'https://i.pinimg.com/564x/19/ce/1f/19ce1f51c2a523a72901fbf05a7c0d9c.jpg',
      originPrice: {
        number: 500000,
        currencyCode: 'KRW',
      },
      salePrice: {
        number: 450000,
        currencyCode: 'KRW',
      },
      discountRate: 10,
      displaySaleStatusEnum: {
        code: 'GOODS.DISPLAY_SALE_STATUS.SALE',
        codeName: '판매중',
      },
      options: [
        {
          name: 'color',
          value: 'beige',
        },
        {
          name: 'size',
          value: 'small',
        },
      ],
      saleStock: 100,
      isWish: false,
    },
    {
      goodsId: 102,
      displayGoodsName: 'Upholstery Unleashed',
      brandName: 'Rico',
      displayGoodsDesc:
        'High-elastic foam fillings are added to make it more comfortable, and the skin-contacting area is finished with thick grain leather to create a luxurious atmosphere.',
      imagePath: 'https://i.pinimg.com/564x/19/ce/1f/19ce1f51c2a523a72901fbf05a7c0d9c.jpg',
      originPrice: null,
      salePrice: {
        number: 890000,
        currencyCode: 'KRW',
      },
      discountRate: 0,
      displaySaleStatusEnum: {
        code: 'GOODS.DISPLAY_SALE_STATUS.SALE',
        codeName: '판매중',
      },
      saleStock: 100,
      isWish: false,
    },
    {
      goodsId: 103,
      displayGoodsName: 'Contemporary Wood Chair',
      brandName: '1stDibs',
      displayGoodsDesc:
        'High-elastic foam fillings are added to make it more comfortable, and the skin-contacting area is finished with thick grain leather to create a luxurious atmosphere.',
      imagePath: 'https://i.pinimg.com/564x/19/ce/1f/19ce1f51c2a523a72901fbf05a7c0d9c.jpg',
      originPrice: null,
      salePrice: {
        number: 260000,
        currencyCode: 'KRW',
      },
      discountRate: 0,
      displaySaleStatusEnum: {
        code: 'GOODS.DISPLAY_SALE_STATUS.OUT_OF_STOCK',
        codeName: '품절',
      },
      saleStock: 0,
      isWish: false,
    },
    {
      goodsId: 104,
      displayGoodsName: 'Mia Chair',
      brandName: 'Shake',
      displayGoodsDesc:
        'High-elastic foam fillings are added to make it more comfortable, and the skin-contacting area is finished with thick grain leather to create a luxurious atmosphere.',
      imagePath: 'https://i.pinimg.com/564x/19/ce/1f/19ce1f51c2a523a72901fbf05a7c0d9c.jpg',
      originPrice: {
        number: 1280000,
        currencyCode: 'KRW',
      },
      salePrice: {
        number: 1088000,
        currencyCode: 'KRW',
      },
      discountRate: 15,
      displaySaleStatusEnum: {
        code: 'GOODS.DISPLAY_SALE_STATUS.STOP',
        codeName: '판매중지',
      },
      saleStock: 2,
      isWish: false,
    },
  ];
};
