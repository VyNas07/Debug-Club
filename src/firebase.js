import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAFCHKdFcMEJ-8Hq-MiSkGGZa49ZnIaclE',
  authDomain: 'debugclub-b32bb.firebaseapp.com',
  projectId: 'debugclub-b32bb',
  storageBucket: 'debugclub-b32bb.appspot.com',
  messagingSenderId: '87830476368',
  appId: '1:87830476368:web:36370b1f66fdfca722c355',
  measurementId: 'G-MR74YYK7Z7'
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
