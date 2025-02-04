// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASURMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fungsi untuk mengecek bahwa sudah masuk ke dalam firebase atau belum
async function testFirestore() {
  try {
    const testRef = collection(db, "users");
    const docSnap = await getDocs(testRef);
    console.log("Firestore Berhasil Terhubung!", docSnap.docs.length);
  } catch (error) {
    console.error("Firestore Error:", error);
  }
}
testFirestore();

// Fungsi untuk Push Data
async function pushData(nama, email, phoneNum, description) {
  console.log(nama, email, phoneNum, description);
  try {
    await addDoc(collection(db, "users"), {
      nama,
      email,
      phoneNum,
      description,
    });
  } catch (error) {
    console.log("gagal push data", error);
  }
}

document.getElementById("submitForm").addEventListener("submit", function (e) {
  console.log(e);
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phoneNum = document.getElementById("phoneNum").value;
  const description = document.getElementById("description").value;
  pushData(name, email, phoneNum, description);
});
