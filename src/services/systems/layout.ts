import { db } from '@/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { RouteMeta, RouteRecordRaw } from 'vue-router';
import type { UserState } from '@/stores/user';

export interface LayoutMenuList {
  /** 메뉴 하위 리스트 */
  menuList?: LayoutMenuList[];
  /** 메뉴 코드 */
  code: RouteMeta['pageCode'];
  /** 메뉴명 */
  name: string;
  /** 메뉴 URL */
  url: RouteRecordRaw['path'];
}

export default class LayoutService {
  private readonly collectionId = 'users';

  /**
   * 현재 유저 정보 조회
   */
  public async getUserInfo(email: string): Promise<UserState> {
    const usersCollectionRef = collection(db, this.collectionId);

    const q = await query(usersCollectionRef, where('userKey', '==', email));

    const { docs } = await getDocs(q);

    const userData = docs[0].data() as UserState;

    return userData;
  }
}
