// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCvb5UaSTAHxPrp3ydKfb-y4zzZ19TeAiM",
  authDomain: "job-portal-d6dba.firebaseapp.com",
  projectId: "job-portal-d6dba",
  messagingSenderId: "548585385155",
  appId: "1:548585385155:web:1b5fe50d2c95254ed0c676",
  storageBucket: 'gs://job-portal-d6dba.appspot.com'
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage, app as default}
