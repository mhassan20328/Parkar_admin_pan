
  // Import the functions you need from the SDKs you need

  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";

  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
  import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use

  // https://firebase.google.com/docs/web/setup#available-libraries


  // Your web app's Firebase configuration

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  const firebaseConfig = {

    apiKey: "AIzaSyC35TZ5fCp_duJkk-CJZhFBWj5vOJUCew4",

    authDomain: "parkar-2ab66.firebaseapp.com",

    projectId: "parkar-2ab66",

    storageBucket: "parkar-2ab66.appspot.com",

    messagingSenderId: "636129511176",

    appId: "1:636129511176:web:2f8d91902e81e90c7c4ebd",

    measurementId: "G-97MRMXF5ND"

  };


  // Initialize Firebase

  const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct")



const returnBtn = document.getElementById("return-btn");

var email, password



submitButton.addEventListener("click", function() {
  email = emailInput.value;
  console.log(email);
  password = passwordInput.value;
  console.log(password);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
    //   REMOVE THIS IN FINAL PRODUCT SECUIRTY RISK
      console.log(user.email)
      console.log(user.password)
    //log the email and passowrd returned by firebase
      window.alert("Success! Welcome back!");
      window.location.href = 'annotation_tool.html'; // Replace with the actual URL of your annotation page

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error occurred. Try again. For Account Creation Please Contact Parkar Support");
      window.alert("Error occurred. Try again. For Account Creation Please Contact Parkar Support");

    });
});
signupButton.addEventListener("click", function() {
    main.style.display = "none";
    createacct.style.display = "block";
});
returnBtn.addEventListener("click", function() {
    main.style.display = "block";
    createacct.style.display = "none";
});
  

