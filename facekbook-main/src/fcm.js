// // import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging";

// // const firebaseConfig = {
// //   apiKey: "AIzaSyD8bk57MfPgPmzRQU6fA2x89AZ4ldQlS80",
// //   authDomain: "backbook-370316.firebaseapp.com",
// //   projectId: "backbook-370316",
// //   storageBucket: "backbook-370316.appspot.com",
// //   messagingSenderId: "398150721140",
// //   appId: "1:398150721140:web:d93f0193496929a5037b21",
// //   measurementId: "G-VVEDB7NXXQ",
// // };

// // export const app = initializeApp(firebaseConfig);
// // export const messaging = getMessaging(app);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBryS96v3YElA8-TBBjqjDb126nOqIhqmU",
//   authDomain: "noname-2ebf0.firebaseapp.com",
//   projectId: "noname-2ebf0",
//   storageBucket: "noname-2ebf0.appspot.com",
//   messagingSenderId: "773002362521",
//   appId: "1:773002362521:web:6207b513725f366f8d0208",
//   measurementId: "G-3KJ6V8BGJK"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const messaging = getMessaging(app);
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBryS96v3YElA8-TBBjqjDb126nOqIhqmU",
  authDomain: "noname-2ebf0.firebaseapp.com",
  projectId: "noname-2ebf0",
  storageBucket: "noname-2ebf0.appspot.com",
  messagingSenderId: "773002362521",
  appId: "1:773002362521:web:6207b513725f366f8d0208",
  measurementId: "G-3KJ6V8BGJK",
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
