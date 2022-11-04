import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async ({ loginHandle, getProfile }) => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    localStorage.setItem("token", JSON.stringify(res._tokenResponse.idToken));
    localStorage.setItem("profile", JSON.stringify({ imageUrl: res._tokenResponse.photoUrl, givenName: res._tokenResponse.displayName }));
    Swal.fire({
      position: "mid",
      icon: "success",
      title: "Login success",
      showConfirmButton: false,
      timer: 1000,
    });
    loginHandle();
    getProfile();
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.response.data.message,
    });
  }
};
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const data = await signInWithEmailAndPassword(auth, email, password);
    console.log(data);
    localStorage.setItem("token", JSON.stringify(data._tokenResponse.idToken));
    localStorage.setItem("profile", JSON.stringify({ imageUrl: undefined, givenName: "dummy" }));
    Swal.fire({
      position: "mid",
      icon: "success",
      title: "Login success",
      showConfirmButton: false,
      timer: 1000,
    });

    setTimeout(() => {
      window.location.reload();
    }, 900);
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.message,
    });
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    localStorage.setItem("profile", JSON.stringify({ imageUrl: undefined, givenName: "dummy" }));
    localStorage.setItem("token", JSON.stringify(res._tokenResponse.idToken));
    Swal.fire({
      position: "mid",
      icon: "success",
      title: "Login success",
      showConfirmButton: false,
      timer: 1000,
    });
    setTimeout(() => {
      window.location.reload();
    }, 900);
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.message,
    });
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, signInWithGoogle, logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordResetEmail, logout, signInWithEmailAndPassword };
