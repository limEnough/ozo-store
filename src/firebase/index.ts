import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC6r4qa9NQPcHbkpsfHo5zHsRFZ4HXn1Tw',
  authDomain: 'ozo-store-da015.firebaseapp.com',
  projectId: 'ozo-store-da015',
  storageBucket: 'ozo-store-da015.appspot.com',
  messagingSenderId: '404092900257',
  appId: '1:404092900257:web:0e3d4906fbe7607a8631e0',
  measurementId: 'G-94TR25270W',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
