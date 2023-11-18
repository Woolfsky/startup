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
}

function loadPage() {
    // update login button with username
    const storedUsername = localStorage.getItem('page_username');
    if (storedUsername) { document.getElementById('login_button').textContent = storedUsername; }
}

loadPage();


// CHAT FUNCTIONALITY
// Select elements
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatMessages = document.getElementById("chat-messages");

// Event listener for sending messages
sendButton.addEventListener("click", () => {
    const message = messageInput.value;
    if (message) {
        displayMessage("You", message);
        messageInput.value = ""; // Clear the input field
    }

    saveChat();
});

// Function to display messages
function displayMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
}

function saveChat() {
    const chat_content = document.getElementById('chat-messages').innerHTML
    localStorage.setItem('community_chat', JSON.stringify(chat_content));
}

function populateChat() {
    document.getElementById('chat-messages').innerHTML = JSON.parse(localStorage.getItem('community_chat'));
}

populateChat();


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

