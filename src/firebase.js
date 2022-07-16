import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDa-ZuH7QswJFdQvCjvJNzvXTVzKLp7wps",
  authDomain: "upload-video-c70a2.firebaseapp.com",
  projectId: "upload-video-c70a2",
  storageBucket: "upload-video-c70a2.appspot.com",
  messagingSenderId: "526140646098",
  appId: "1:526140646098:web:18caad2b1c28db6555030b",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
