importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyBJw1au7R_3_WFN4qrVjdexWUpi-b9ImIs",
  authDomain: "food-zayka.firebaseapp.com",
  projectId: "food-zayka",
  storageBucket: "food-zayka.firebasestorage.app",
  messagingSenderId: "32034281430",
  appId: "1:32034281430:web:bcd65d3aaa4131bb6d3677",
  measurementId: "G-GRJ4NL9XRB",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});