import initializeApp from 'firebase/auth';
import getAuth from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA_50qp1vugTBRMRqLIEh82USDZuyclppM",
  authDomain: "ai-companion-da3ed.firebaseapp.com",
  projectId: "ai-companion-da3ed",
  storageBucket: "ai-companion-da3ed.firebasestorage.app",
  messagingSenderId: "231739847308",
  appId: "1:231739847308:web:cd87676d0b3eea1affc1a9",
  measurementId: "G-SWWF4GTYWP"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);