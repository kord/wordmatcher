import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";

function firebaseInit() {
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyAw2xNF0EGIDndFvEaPQTe6Cfkc8wntE5Q",
        authDomain: "matchergame-4b658.firebaseapp.com",
        projectId: "matchergame-4b658",
        storageBucket: "matchergame-4b658.appspot.com",
        messagingSenderId: "366748739388",
        appId: "1:366748739388:web:8eda2499c0d2588fdc2039",
        measurementId: "G-6PEEYT8PYZ"
    };

// Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
}

export function init() {
    firebaseInit();

}
