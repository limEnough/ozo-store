import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import type { MemberGenderCode, MemberTermsCode } from '@/constants/member-constants';

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

  public async getSameEmailUser(email = '') {
    const usersCollectionRef = collection(db, this.collectionId);

    const q = await query(usersCollectionRef, where('email', '==', email));

    const data = await getDocs(q);
    const newData = data.docs.map((doc) => ({
      ...doc.data(),
    }));

    return newData.length > 0;
  }

  public async putNewUserInfo(values: Account) {
    const usersCollectionRef = collection(db, this.collectionId);

    await addDoc(usersCollectionRef, values);

    try {
      const res = await addDoc(usersCollectionRef, values);
      console.log(res); // res는 undefined
    } catch (error) {
      // TODO:
      console.error(error);
    }
  }
}

export type { Account as MemberCreateAccount };
