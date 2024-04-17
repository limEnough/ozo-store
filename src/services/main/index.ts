import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import type { Goods } from '@/types/common.types';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase';

interface BannerInfo {
  /** 이미지 파일 URL */
  imagePath: string;
  /** 배너 URL */
  url: string;
}

interface PageInfo {
  visualUseYn: boolean;
  visualBanner: BannerInfo[] | null;
  bestGoodsUseYn: boolean;
  bestGoods: Goods[] | null;
}

export default class MainService {
  private readonly collectionId = 'main';

  public async getPageInfo(): Promise<PageInfo | undefined> {
    try {
      const docRef = doc(db, this.collectionId, 'pageInfo');
      const data = await getDoc(docRef);

      if (!data.exists()) return undefined;

      const result = data.data();

      // #region visual banner
      const visualBanner = result.visual;

      if (result.visualUseYn && visualBanner.length) {
        for (let i = 0; i < visualBanner.length; i++) {
          const imageName = `main-visual-${i}.png`;
          const imageRef = ref(storage, imageName);

          await getDownloadURL(imageRef).then((url) => {
            visualBanner[i].imagePath = url;
          });
        }
      }
      // #endregion

      // #region best goods
      const bestGoods = result.bestGoods;

      if (result.bestGoodsUseYn && bestGoods.length) {
        for (let i = 0; i < bestGoods.length; i++) {
          const imageName = `shop/goods/thumb/img-goods-10${i}.jpg`;
          const imageRef = ref(storage, imageName);

          await getDownloadURL(imageRef).then((url) => {
            bestGoods[i].imagePath = url;
          });
        }
      }
      // #endregion

      return {
        visualUseYn: result.visualUseYn ?? false,
        visualBanner: result.visual ?? null,
        bestGoodsUseYn: result.bestGoodsUseYn ?? false,
        bestGoods: result.bestGoods ?? null,
      };
    } catch (error) {
      console.error(error);
    }
  }
}

export type { PageInfo as MainPageInfo };
