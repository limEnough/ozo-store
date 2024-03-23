import { db } from '@/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { MemberCreateAccount } from '@/services/member/create';

export default class LayoutService {
  private readonly collectionId = 'users';

  /**
   * 현재 유저 정보 조회
   */
  public async getUserInfo(email: string): Promise<MemberCreateAccount> {
    const usersCollectionRef = collection(db, this.collectionId);

    const q = await query(usersCollectionRef, where('email', '==', email));
    const { docs } = await getDocs(q);

    const userData = docs[0].data() as MemberCreateAccount;

    return userData;
  }
}
