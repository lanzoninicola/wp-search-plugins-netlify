import { getFirestore } from "firebase-admin/firestore";
import app from "./firebase-service";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
