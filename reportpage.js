// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import {getFirestore,doc,getDocs,collection} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "AIzaSyC35TZ5fCp_duJkk-CJZhFBWj5vOJUCew4",

    authDomain: "parkar-2ab66.firebaseapp.com",

    projectId: "parkar-2ab66",

    storageBucket: "parkar-2ab66.appspot.com",

    messagingSenderId: "636129511176",

    appId: "1:636129511176:web:2f8d91902e81e90c7c4ebd",

    measurementId: "G-97MRMXF5ND"

  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const collectionRef = collection(db, "report");
  
  getDocs(collectionRef)
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
          });
      })
      .catch((error) => {
          console.error("Error getting documents: ", error);
      });




 
