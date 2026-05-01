import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// For a real app, you would download the service account JSON from Firebase Console
// and either point to it or paste its contents in an environment variable.
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) 
  : null;

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else {
  console.warn("Firebase Service Account not found. Running in mock mode.");
}

export const db = serviceAccount ? admin.firestore() : null;
export default admin;
