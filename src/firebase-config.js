import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { } from 'firebase/auth';
import { } from 'firebase/firestore';
import { } from 'firebase/storage';

//claramente este archivo es no debería estar en github o deberia tener varibales
// de entorno para la seguridad de la app.

const config = {
    apiKey: "AIzaSyC9L5grguG3PJs3YGkQipiMJqJkr8bGANA",

  authDomain: "chatsofkatester.firebaseapp.com",

  projectId: "chatsofkatester",

  storageBucket: "chatsofkatester.appspot.com",

  messagingSenderId: "907787447579",

  appId: "1:907787447579:web:edc13fe2919794622bb7be",

  databaseURL: "https://testfront-ferresofka-default-rtdb.firebaseio.com/"

};

const app = firebase.initializeApp(config);
export const auth = getAuth(app);
export const db = getDatabase(app);