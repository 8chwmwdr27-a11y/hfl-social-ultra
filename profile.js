import { auth, db } from './firebase.js';
import { ref, push, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { showToast } from './utils.js';

const userNameSpan = document.getElementById("user-name");
const postText = document.getElementById("post-text");
const postBtn = document.getElementById("post-btn");
const feedDiv = document.getElementById("feed");

let currentUser = null;

// בדיקת משתמש
onAuthStateChanged(auth, user => {
  if (user) {
    currentUser = user;
    userNameSpan.textContent = user.email.split("@")[0];
    loadFeed();
  } else {
    window.location.href = "index.html";
  }
});

// יצירת פוסט
postBtn.onclick = () => {
  if (!postText.value.trim()) {
    showToast("תכתוב משהו קודם 😅");
    return;
  }

  push(ref(db, 'posts'), {
    user: userNameSpan.textContent,
    text: postText.value,
    timestamp: Date.now()
  });

  showToast("פוסט פורסם 🚀");
  postText.value = "";
};

// טעינת פיד
function loadFeed() {
  onValue(ref(db, 'posts'), snapshot => {
    feedDiv.innerHTML = "";

    snapshot.forEach(child => {
      const data = child.val();

      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `<strong>${data.user}</strong><br>${data.text}`;

      feedDiv.prepend(div);
    });
  });
}