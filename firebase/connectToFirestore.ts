import admin from "firebase-admin";
import path from "path";

const firestoreKeyPath = path.resolve(
  __dirname,
  "../../../firebase/firestore_key.json"
);
console.log(firestoreKeyPath);

async function connectToFirestore() {
  try {
    //if not already initialized
    if (!admin.apps.length) {
      await admin.initializeApp({
        credential: admin.credential.cert(path.resolve(String(process.env.FIRESTORE_KEY_PATH))),
      });
    }
  } catch (err) {
    console.log("error connecting to firestore");
    console.log(err);
  }
}

connectToFirestore();

export default admin.firestore();
