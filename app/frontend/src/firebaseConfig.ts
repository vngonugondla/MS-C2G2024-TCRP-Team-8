import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCI7-xsAfkDrCPEMm1C9knWGkpQAV8Mny8",
  authDomain: "ms-c2g2024-tcrp-team8.firebaseapp.com",
  projectId: "ms-c2g2024-tcrp-team8",
  storageBucket: "ms-c2g2024-tcrp-team8.appspot.com",
  messagingSenderId: "924628428989",
  appId: "1:924628428989:web:d67faac5b596d19a28efd4",
  measurementId: "G-HT2GL8B717"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };