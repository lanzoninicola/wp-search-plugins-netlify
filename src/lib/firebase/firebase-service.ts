import { cert, initializeApp } from "firebase-admin/app";

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
};

// Initialize Firebase
const app = initializeApp({
  credential: cert(firebaseConfig),
});

export default app;
