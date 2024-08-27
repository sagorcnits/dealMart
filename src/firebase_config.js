import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKnAZJTFpIhu9dwgmyRtm8SgfQHUhz_Fs",
  authDomain: "dealmart-761ad.firebaseapp.com",
  projectId: "dealmart-761ad",
  storageBucket: "dealmart-761ad.appspot.com",
  messagingSenderId: "618986996237",
  appId: "1:618986996237:web:dc8e534f9ceb9ec3a60b44",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
