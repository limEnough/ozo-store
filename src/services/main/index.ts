import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
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
  visualBanner: BannerInfo[];
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
      const visualBannerLength = result.visual.length;

      if (visualBannerLength) {
        for (let i = 0; i < visualBannerLength; i++) {
          const imageName = `main-visual-${i}.png`;
          const imageRef = ref(storage, imageName);

          await getDownloadURL(imageRef).then((url) => {
            result.visual[i].imagePath = url;
          });
        }
      }
      // #endregion

      return {
        visualUseYn: result.visualUseYn ?? false,
        visualBanner: result.visual ?? [],
      };
    } catch (error) {
      console.error(error);
    }
  }
}
