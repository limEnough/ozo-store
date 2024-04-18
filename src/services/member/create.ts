import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '@/firebase';
import type { MemberGenderCode, MemberTermsCode } from '@/constants/member-constants';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import type { UserState } from '@/stores/user';

interface Account {
  termsAgreement: MemberTermsCode[];
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  gender: MemberGenderCode;
  birth: string;
}

export default class MemberCreateService {
  private readonly collectionId = 'users';

  public async getDuplicatedEmailUser(email = '') {
    const usersCollectionRef = collection(db, this.collectionId);

    const q = await query(usersCollectionRef, where('email', '==', email));

    const data = await getDocs(q);
    const duplicatedEmailData = data.docs.map((doc) => ({
      ...doc.data(),
    }));

    return duplicatedEmailData.length > 0;
  }

  public async postNewAccount(values: Account): Promise<boolean> {
    /**
     * MEMO: auth, database 저장
     * 회원가입 시, 해당 정보는 1. auth 2. database 두 저장소에 저장한다.
     * auth 를 이용하면 email, password를 받아 회원가입/로그인 구현이 가능하며 소셜로그인도 기능도 제공한다.
     * 그러나 두 데이터 만으로 회원가입을 진행 하기에는 무리가 있다. (약관동의/배송정보 등)
     * 따라서 동일한 데이터 (email, password) + 그 외 정보를 database('users')에 함께 저장하기로 한다.
     */

    // 1.auth 저장
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
    } catch (error) {
      // TODO: [고민] 에러 처리 어떻게 할 건지?
      console.error(error);
      return false;
    }

    // 2. database 저장
    const userStateValue: UserState = {
      userKey: values.email,
      info: values,
      cart: {
        total: 0,
        goods: [],
      },
      wish: [],
    };

    try {
      const usersCollectionRef = collection(db, this.collectionId);
      await addDoc(usersCollectionRef, userStateValue);
    } catch (error) {
      // TODO: [고민] 에러 처리 어떻게 할 건지?
      console.error(error);
      return false;
    }

    return true;
  }
}

export type { Account as MemberCreateAccount };
