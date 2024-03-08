import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '@/firebase';
import type { MemberGenderCode, MemberTermsCode } from '@/constants/member-constants';
import { createUserWithEmailAndPassword } from 'firebase/auth';

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
    const newData = data.docs.map((doc) => ({
      ...doc.data(),
    }));

    return newData.length > 0;
  }

  public async postNewAccount(values: Account) {
    const usersCollectionRef = collection(db, this.collectionId);

    // await addDoc(usersCollectionRef, values);

    // try {
    //   const res = await addDoc(usersCollectionRef, values);
    //   console.log(res); // res는 undefined
    // } catch (error) {
    //   // TODO:
    //   console.error(error);
    // }

    // TODO: auth 이용하여 로그인 정보 저장하는 방법
    const email = 'test@naver.com';
    const password = 'qweasd12!@';

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      console.log(user);

      const { stsTokenManager, uid } = user;
      console.log(stsTokenManager, uid);
    } catch (error) {
      console.error(error);
    }
  }
}

export type { Account as MemberCreateAccount };
