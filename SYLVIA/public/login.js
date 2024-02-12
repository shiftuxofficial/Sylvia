 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
 import { getAuth,GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
 
const firebaseConfig = {
apiKey: "AIzaSyCV3n05BviD7e9j4pd7ZGiy67eaagH4amE",
authDomain: "noor-web-81037.firebaseapp.com",
projectId: "noor-web-81037",
storageBucket: "noor-web-81037.appspot.com",
messagingSenderId: "868596895389",
appId: "1:868596895389:web:866241cccccf18eae58e74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();


const googleLogin = document.getElementById("google");
googleLogin.addEventListener("click", function(){
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user);
        window.location.href = "/public/form.html";
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
})