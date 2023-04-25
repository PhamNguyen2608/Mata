// importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// importScripts(
//   "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
// );

// const firebaseConfig = {
//   apiKey: "AIzaSyBryS96v3YElA8-TBBjqjDb126nOqIhqmU",
//   projectId: "noname-2ebf0",
//   messagingSenderId: "773002362521",
//   appId: "1:773002362521:web:6207b513725f366f8d0208",
// };

// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };

//   //   self.registration.showNotification(notificationTitle, notificationOptions);
// });
import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBryS96v3YElA8-TBBjqjDb126nOqIhqmU",
  authDomain: "noname-2ebf0.firebaseapp.com",
  projectId: "noname-2ebf0",
  storageBucket: "noname-2ebf0.appspot.com",
  messagingSenderId: "773002362521",
  appId: "1:773002362521:web:6207b513725f366f8d0208",
  measurementId: "G-3KJ6V8BGJK",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };
  // self.registration.showNotification(notificationTitle, notificationOptions);
  
});
