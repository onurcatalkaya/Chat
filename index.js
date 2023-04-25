// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDQzPMnHQqOahW7mSjvARcq2nkr01XGcho",
  authDomain: "jilachat-9ba7f.firebaseapp.com",
  projectId: "jilachat-9ba7f",
  storageBucket: "jilachat-9ba7f.appspot.com",
  messagingSenderId: "294786921605",
  appId: "1:294786921605:web:a84c626558c995340765ec",
  measurementId: "G-9BLN0J385W"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const username = prompt("Lutfen Bana Adini Soyle");

document.getElementById("message-form").addEventListener("submit", sendMessage);

function sendMessage(e) {
  document.getElementById("message-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      sendMessage(event);
    }
  });

  document.getElementById("message-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      sendMessage(event);
    }
  });

  e.preventDefault();

  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  if (!message) {
    return;
  }

  messageInput.value = "";

  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

function deleteMessage(key, messageUsername) {
  if (username === messageUsername) {
    db.ref("messages/" + key).remove();
    const message = document.getElementById(key);
    message.remove();
  }
}
const fetchChat = db.ref("messages/");


fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  let messageClass = "";

  if (username === messages.username) {
    messageClass = "sent";
  } else {
    messageClass = "receive";
  }

  let message = `<li id=${snapshot.key} class=${messageClass}><span>${messages.username}: </span>${messages.message}`;

  if (username === messages.username) {
    message += `<button class="delete" onclick="deleteMessage('${snapshot.key}', '${messages.username}')">Sil</button>`;
  }

  message += `</li>`;

  document.getElementById("messages").innerHTML += message;
});


fetchChat.on("child_removed", function (snapshot) {
  const message = document.getElementById(snapshot.key);
  message.remove();
});

const emojiButton = document.querySelector('.emoji');
emojiButton.addEventListener('click', sendHeart);

function sendHeart() {
  const timestamp = Date.now();
  const message = "❤️";

  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}
