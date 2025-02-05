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
  apiKey: "AIzaSyDAb1Icl_-xVlMwkpcIGDd1O137WkCv3xI",
  authDomain: "portfolio-v1-7a9f3.firebaseapp.com",
  projectId: "portfolio-v1-7a9f3",
  storageBucket: "portfolio-v1-7a9f3.firebasestorage.app",
  messagingSenderId: "195593745014",
  appId: "1:195593745014:web:43694e79338dc06f722557",
  measurementId: "G-30JXECCMDG",
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

function clearform() {
  document.getElementById("submitForm").reset();
}

function berhasilSubmit() {
  const toast = document.getElementById("toast-success");
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("opacity-0");
  }, 3000);
}

function gagalSubmit() {
  const toast = document.getElementById("toast-failed");
  toast.classList.remove("opacity-0", "hidden");

  setTimeout(() => {
    toast.classList.add("opacity-0");
  }, 3000);
}

document.getElementById("submitForm").addEventListener("submit", function (e) {
  console.log(e);
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phoneNum = document.getElementById("phoneNum").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!name || !email || !phoneNum || !description) {
    gagalSubmit();
    return;
  }

  pushData(name, email, phoneNum, description);

  clearform();
  berhasilSubmit();
});
