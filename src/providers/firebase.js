import firebase from 'firebase';


//STOP undo here: 4/4/2021
var firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

export const auth = firebase.auth();
export const db = firebase.database();

