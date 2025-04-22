// import firebase from 'firebase'
// // import { initializeApp, getApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// // import { getDatabase } from 'firebase/database';
// // import { getFirestore } from 'firebase/firestore';
// // Add or remove services depending on your use-case



// let app;

// console.log('getApp', firebase.apps.length)

// if (firebase.apps.length == 0) {
//     app = firebase.initializeApp(firebaseConfig);
// } else {
//     console.log('app already exists', firebase.apps)
//     // app = getApp();
// }
// export const firebaseInstance = app



// Optionally export services
// export const auth = getAuth(app)
// export const db = getFirestore(app)

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app"
// import firebase from 'firebase/app';
// import 'firebase/auth'; // for example, if you need auth
// import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import app from 'firebase/app'
// import _firebase from 'firebase/app'
// import 'firebase/auth'
// import 'firebase/database'
// import 'firebase/storage'
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// console.log('>>>>>>>>>>>', _firebase)
// const firebaseInstance = _firebase.initializeApp(config)

// if (process.env.NODE_ENV !== 'production') {
//     // _firebase.functions().useFunctionsEmulator(`http://localhost:5001`);
// }

// export const firebaseInstance = _firebaseInstance
// export const firebase = _firebase

// console.log('<<<<<<<<<<<', firebase.default)

// Initialize Firebase
// const analytics = getAnalytics(app)

// console.log('...........')
// export firebase.default = firebaseInstance