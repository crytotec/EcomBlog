import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZ3_Lmu76NRMx1JMIO6F57bRhq_UF2KoQ",
  authDomain: "ecomblog.firebaseapp.com",
  projectId: "ecomblog",
  storageBucket: "ecomblog.appspot.com",
  messagingSenderId: "570930838337",
  appId: "1:570930838337:web:9d8c529e4c0e6ae127ffc0",
};

const app = initializeApp(firebaseConfig);

// 🔐 Authentication export
export const auth = getAuth(app);