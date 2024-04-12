import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAd_DwWUQdD7bgnT8alsZoW2HGW6UpHQtc",
  authDomain: "codep-745d5.firebaseapp.com",
  projectId: "codep-745d5",
  storageBucket: "codep-745d5.appspot.com",
  messagingSenderId: "1084797229677",
  appId: "1:1084797229677:web:8cd0ab5e6491467e4b3d64"
  };

  const app=getApps.length > 0 ? getApps() : initializeApp(firebaseConfig)

  const auth = getAuth(app);
  const db = getFirestore(app);

  export {app, auth, db};
  