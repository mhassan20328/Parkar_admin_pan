// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import {getFirestore,doc,getDocs,collection} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
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
  const collectionRef = collection(db,`report`);
  const storage = getStorage(app);


//


const IDarray = [];
const descriptionArray = [];
const LPNarray = [];
const ImageArray = [];
const locationarray = [];




  getDocs(collectionRef)
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
                IDarray.push(doc.id);
                descriptionArray.push(doc.data().Description);
                locationarray.push(doc.data().LatLng);
                LPNarray.push(doc.data().LPN);
          });
      })
      .catch((error) => {
          console.error("Error getting documents: ", error);
      });


      function populateTable(IDarray, descriptionArray, LPNarray, ImageArray, locationarray) {
        const tableBody = document.getElementById('data-table-body');
      
        // Clear existing rows in the table
        tableBody.innerHTML = '';
      
        // Iterate through the data arrays and create rows
        for (let i = 0; i < IDarray.length; i++) {
          const newRow = tableBody.insertRow();
      
          // Insert data into cells
          const reportIdCell = newRow.insertCell(0);
          reportIdCell.textContent = IDarray[i];
      
          const descriptionCell = newRow.insertCell(1);
          descriptionCell.textContent = descriptionArray[i];
      
          const lpnCell = newRow.insertCell(2);
          lpnCell.textContent = LPNarray[i];

      
          const imageCell = newRow.insertCell(3);
          const img = document.createElement('img');
          img.src = ImageArray[i];
          img.alt = 'Report Image';
          img.style.width = '50px'; // Adjust the size as needed
          imageCell.appendChild(img);

          const locationcell = newRow.insertCell(4);
          locationcell.textContent = locationarray[i];

        }
      }
//wait for 10 seconds
setTimeout(function() {

    // loop through the ID array, set the imageurl to the ID array value, and place it in the storageRef
    var imageurl=IDarray[0];
    // console.log(imageurl);
    const storageRef = ref(storage, `Report Violation Images/${imageurl}`);
    for (let i = 0; i < IDarray.length; i++) {
        imageurl=IDarray[i];
        console.log(imageurl);
        const storageRef = ref(storage, `Report Violation Images/${imageurl}`);
        getDownloadURL(storageRef).then((url) => {
            // console.log(url)
            // console.log("URL WORKED")
            ImageArray.push(url);
            if(ImageArray.length==IDarray.length){
                populateTable(IDarray, descriptionArray, LPNarray, ImageArray,locationarray);
            }
            // console.log(ImageArray);
            }).catch((error) => {
            // Handle any errors
            console.log(error)
            });
            // console.log(ImageArray);
    }
}, 3000);
// Output Array Values
console.log("IDARRAY");
console.log(IDarray);
// console.log("DATA WORKED")
console.log("DESCRIPTIONARRAY");
console.log(descriptionArray);
console.log("LPNARRAY");
console.log(LPNarray);
console.log("IMAGEARRAY");
console.log(ImageArray);

