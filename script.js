// --- Firebase (CDN compat) ---
// יש לכלול את הסקריפט הזה ב-html לפני script.js:
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js"></script>

const firebaseConfig = {
  apiKey: "AIzaSyDCBilrV_1v6TrJwtCqRrOEKLt3inxCLLA",
  authDomain: "test-9ff7a.firebaseapp.com",
  projectId: "test-9ff7a",
  storageBucket: "test-9ff7a.firebasestorage.app",
  messagingSenderId: "757686884213",
  appId: "1:757686884213:web:3e60f4c6ce00b603fde53c"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const storage = firebase.storage();

// --- Users & Bots Setup ---
const users = [
  {username:"ADMIN", password:"ADMIN0", type:"admin"},
  {username:"abir", password:"abir0", type:"user"},
  {username:"check", password:"check0", type:"user"}
];

let bots = [];
for(let i=1;i<=10;i++){
  bots.push({username:`user${i}`, password:`tob${i}`, type:"bot"}); // שמות אמינים
}

// --- Chat ---
const chatBox = document.querySelector('.chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendChatBtn');

function addMessage(user, msg){
  const div = document.createElement('div');
  div.classList.add('chatMessage','fadeIn');
  div.innerText = `${user}: ${msg}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
  // שמירת הודעה בפיירבייס
  db.ref('chat').push({user,msg,timestamp:Date.now()});
}

// שליחת הודעה משתמש רגיל
sendBtn.addEventListener('click', ()=>{
  if(chatInput.value.trim() !== ""){
    addMessage(currentUser.username, chatInput.value);
    chatInput.value = "";
  }
});

// --- Load messages from Firebase ---
db.ref('chat').on('child_added', snapshot=>{
  const {user,msg} = snapshot.val();
  const div = document.createElement('div');
  div.classList.add('chatMessage','fadeIn');
  div.innerText = `${user}: ${msg}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});

// --- Bot Simulation ---
const botMessages = [
  "Hello! 😄", "מה שלומך?", "Check this out!", "עוד יום יפה 🌞", 
  "How are you?", "טעים לי הקפה ☕", "LOL 😂", "מה חדש?"
];

function startBots(){
  bots.forEach(bot=>{
    setInterval(()=>{
      const msg = botMessages[Math.floor(Math.random()*botMessages.length)];
      addMessage(bot.username, msg);
    }, 4000 + Math.random()*4000);
  });
}

// --- Feed / Posts ---
const feedContainer = document.getElementById('feedContainer');

function createPost(user, text, imageUrl, isPublic){
  const post = document.createElement('div');
  post.classList.add('postCard','fadeIn');
  post.innerHTML = `
    <div class="postHeader">
      <img src="images/${user.toLowerCase()}.png" class="avatar">
      <strong>${user}</strong>
    </div>
    <p>${text}</p>
    ${imageUrl? `<img src="${imageUrl}" class="postImage">` : ''}
    <div class="postActions">
      <button title="Like">👍 <span>0</span></button>
      <button title="Comment">💬 <span>0</span></button>
    </div>
  `;
  feedContainer.prepend(post);
  // שמירה בפיירבייס
  const postRef = db.ref('posts').push();
  postRef.set({user,text,imageUrl,isPublic,timestamp:Date.now()});
}

// --- Create Post Modal ---
const modal = document.querySelector('.modal');
const openModalBtn = document.getElementById('createPostBtn');
const closeModalBtn = document.querySelector('.closeBtn');
const postText = document.getElementById('postText');
const postFile = document.getElementById('postFile');
const publicCheckbox = document.getElementById('publicCheckbox');

openModalBtn.addEventListener('click', ()=> modal.style.display='flex');
closeModalBtn.addEventListener('click', ()=> modal.style.display='none');

document.getElementById('submitPostBtn').addEventListener('click', async ()=>{
  let imageUrl = null;
  if(postFile.files[0]){
    const file = postFile.files[0];
    const storageRef = storage.ref(`posts/${file.name}`);
    await storageRef.put(file);
    imageUrl = await storageRef.getDownloadURL();
  }
  createPost(currentUser.username, postText.value, imageUrl, publicCheckbox.checked);
  postText.value = ''; postFile.value = ''; modal.style.display='none';
});

// --- Initialize ---
let currentUser = users[0]; // לדוגמה: ADMIN
window.onload = ()=>{
  startBots();
};