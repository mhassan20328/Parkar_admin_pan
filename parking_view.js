    // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import {getFirestore,doc,getDocs,getDoc,collection} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";

const firebaseConfig = {

    apiKey: "AIzaSyC35TZ5fCp_duJkk-CJZhFBWj5vOJUCew4",

    authDomain: "parkar-2ab66.firebaseapp.com",

    projectId: "parkar-2ab66",

    storageBucket: "parkar-2ab66.appspot.com",

    messagingSenderId: "636129511176",

    appId: "1:636129511176:web:2f8d91902e81e90c7c4ebd",

    measurementId: "G-97MRMXF5ND",
    databaseURL: ""

  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const collectionRef = collection(db,`Parking Lot Status`);
  const storage = getStorage(app);




const startIterator = 0; 
const endIterator = 25;   

const fetchData = async () => {
  const testarray1 = [];
  const testarray2 = [];

  for (let iterator = startIterator; iterator <= endIterator; iterator++) {
    try {
      const docId = iterator.toString(); // Convert iterator to string
      const docRef = doc(collectionRef, docId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        // Document exists, retrieve data
        const data = docSnapshot.data();
        testarray1.push(docId);
        testarray2.push(data.status);
      } else {
        console.error(`Document with ID ${docId} does not exist`);
      }
    } catch (error) {
      console.error(`Error getting document with ID ${docId}: `, error);
    }
  }

  return testarray2;
};


    

    
/////////////////////////////////////////////////////////////////////////////////////////////////////
    // Function to get the image source based on the spot type
    function getImageSrc(spotType) {
        return spotType + '.png';
    }
    // Sample data
    const parkingspots=await fetchData();
    console.log(parkingspots);
    const spotTypes = ["disabilty", "disabilty", "disabilty", "electric","electric",
    "electric", "parking", "parking", "parking","parking","parking", "parking", "parking", "parking","parking","parking", "parking", "parking", "parking","parking",
    "parking", "parking", "parking", "parking","parking","parking"];
    const rowLimit = 15;
    



    const parkingContainer = document.getElementById('parkingContainer');
    const amountOfSpotsElement = document.getElementById('amountofspots');
    const spotsLeftElement = document.getElementById('spotsleft');
    const totalSpots = parkingspots.length;
    const availableSpots = parkingspots.filter(spot => spot === "space-empty").length;


    amountOfSpotsElement.textContent = `Amount of Spots: ${totalSpots}`;

    spotsLeftElement.textContent = `Amount of Spots Available: ${availableSpots}`;


    // Loop through the parking spots array
    for (let i = 0; i < parkingspots.length; i++) {
        // Create a div element for each parking spot
        const spotDiv = document.createElement('div');

        spotDiv.classList.add(parkingspots[i]);

        const img = document.createElement('img');
        img.src = getImageSrc(spotTypes[i]); 
        img.alt = spotTypes[i] + ' spot';

        if (parkingspots[i] === "space-occupied") {
            img.style.filter = "invert(37%) sepia(91%) saturate(745%) hue-rotate(0deg) brightness(89%) contrast(90%)";        } else {
            // Reset the filter for space-empty spots
            img.style.filter = "none";
        }

        // Append the image to the parking spot div
        spotDiv.appendChild(img);

        // Append the parking spot div to the container
        parkingContainer.appendChild(spotDiv);

        // Add a line break after every 'rowLimit' spots
        if ((i + 1) % rowLimit === 0) {
            parkingContainer.appendChild(document.createElement('br'));
        }
    }


;