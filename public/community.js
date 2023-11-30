function user_login() {
    console.log(document.querySelector("#input_username").value)
    const nameEl = document.querySelector("#input_username").value;
    const passwordEl = document.querySelector("#input_password").value;

    const user = {
        username: nameEl,
        password: passwordEl,
        tasks: [],
        habits: []
      };

    localStorage.setItem(nameEl, JSON.stringify(user));

    // make it so their name shows up at the top
    localStorage.setItem("page_username", nameEl);

    window.location.href = "index.html";
}

function logout() {
    window.location.href = "index.html";
    localStorage.removeItem('userName');
    fetch(`/api/auth/logout`, {
      method: 'delete',
    }).then(() => (window.location.href = '/'));
}

function loadPage() {
    // update login button with username
    const storedUsername = localStorage.getItem('page_username');
    if (storedUsername) { document.getElementById('login_button').textContent = storedUsername; }
}

loadPage();


// Advice functionality
function displayAdvice(data) {
    fetch('https://api.adviceslip.com/advice')
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#quote');
  
        const quoteEl = document.createElement('p');
        quoteEl.classList.add('quote');
  
        quoteEl.textContent = data.slip.advice;
        
        containerEl.appendChild(quoteEl);
      });
  }

displayAdvice();



// CHAT FUNCTIONALITY
// // Select elements
// const messageInput = document.getElementById("message-input");
// const sendButton = document.getElementById("send-button");
// const chatMessages = document.getElementById("chat-messages");

// // Event listener for sending messages
// sendButton.addEventListener("click", () => {
//     const message = messageInput.value;
//     if (message) {
//         displayMessage("You", message);
//         messageInput.value = ""; // Clear the input field
//     }

//     saveChat();
// });

// // Function to display messages
// function displayMessage(sender, message) {
//     const messageElement = document.createElement("div");
//     messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
//     chatMessages.appendChild(messageElement);
// }

// function saveChat() {
//     const chat_content = document.getElementById('chat-messages').innerHTML
//     localStorage.setItem('community_chat', JSON.stringify(chat_content));
// }

// function populateChat() {
//     document.getElementById('chat-messages').innerHTML = JSON.parse(localStorage.getItem('community_chat'));
// }

// populateChat();


// WEBSOCKET CHAT FUNCTIONALITY
// Adjust the webSocket protocol to what is being used for HTTP
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

// Display that we have opened the webSocket
socket.onopen = (event) => {
  appendMsg('system', 'websocket', 'connected');
};

// Display messages we receive from our friends
socket.onmessage = async (event) => {
  const text = await event.data.text();
  const chat = JSON.parse(text);
  appendMsg('friend', chat.name, chat.msg);
};

// If the webSocket is closed then disable the interface
socket.onclose = (event) => {
  appendMsg('system', 'websocket', 'disconnected');
  document.querySelector('#name-controls').disabled = true;
  document.querySelector('#chat-controls').disabled = true;
};

// Send a message over the webSocket
function sendMessage() {
    const msgEl = document.querySelector('#new-msg');
    const msg = msgEl.value;
    if (!!msg) {
      appendMsg('me', 'me', msg);
      const name = document.querySelector('#my-name').value;
      socket.send(`{"name":"${name}", "msg":"${msg}"}`);
      msgEl.value = '';
    }
    scrollDown();
  }

function scrollDown() {
    var chatContainer = document.getElementById('chat-messages');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

// Create one long list of messages
function appendMsg(cls, from, msg) {
    const chatText = document.querySelector('#chat-messages');
    chatText.innerHTML = chatText.innerHTML + `<div><span class="${cls}">${from}</span>: ${msg}</div>`;
  }
  
// Send message on enter keystroke
const input = document.querySelector('#new-msg');
input.addEventListener('keydown', (e) => {
if (e.key === 'Enter') {
    sendMessage();
}
});

// Disable chat if no name provided
const chatControls = document.querySelector('#chat-controls');
const myName = document.querySelector('#my-name');
myName.addEventListener('keyup', (e) => {
chatControls.disabled = myName.value === '';
});