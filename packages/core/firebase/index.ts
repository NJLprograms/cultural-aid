import Firebase from 'firebase';
import firebaseConfig from './firebase-sdk.json';

function loadFirebase() {
  try {
    Firebase.initializeApp(firebaseConfig);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }

  return Firebase;
}

export const firebase = loadFirebase();
