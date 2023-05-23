import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoRxiEazpN93ZXUiOCkEVHs-aV3sT8hEg",
  authDomain: "miniblog-692a3.firebaseapp.com",
  projectId: "miniblog-692a3",
  storageBucket: "miniblog-692a3.appspot.com",
  messagingSenderId: "281261378177",
  appId: "1:281261378177:web:40cc3b9e61aa5f12ee9b80"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}