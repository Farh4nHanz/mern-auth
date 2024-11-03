import admin from "firebase-admin";
import { readFileSync } from "fs";
import path from "path";

const __dirname = path.resolve();

const serviceAccount = JSON.parse(
  readFileSync(
    path.join(__dirname, "serviceAccountKey.json"),
    "utf-8"
  )
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
