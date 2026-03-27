import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { showToast } from './utils.js';

const email = document.getElementById("email");
const password = document.getElementById("password");
const username = document.getElementById("username");

document.getElementById("signup-btn").onclick = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(user => {
      set(ref(db, 'users/' + user.user.uid), {
        username: username.value,
        bio: "חדש כאן 🚀"
      });
      showToast("נרשמת בהצלחה");
      window.location.href = "profile.html";
    })
    .catch(e => showToast(e.message));
};

document.getElementById("login-btn").onclick = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      showToast("ברוך הבא!");
      window.location.href = "profile.html";
    })
    .catch(e => showToast(e.message));
};