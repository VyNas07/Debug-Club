import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBF0rmKT8uJJLJ4_a0tJzGaKOG0hIYOvy8",
  authDomain: "debug-club.firebaseapp.com",
  projectId: "debug-club",
  storageBucket: "debug-club.appspot.com",
  messagingSenderId: "377935123161",
  appId: "1:377935123161:web:2c93b065b1c45b1fc3a4c8",
  measurementId: "G-N17LCLESNJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
