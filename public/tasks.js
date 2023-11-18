// async function user_login() {
//     // console.log(document.querySelector("#input_username").value)
//     const nameEl = document.querySelector("#input_username").value;
//     const passwordEl = document.querySelector("#input_password").value; 

//     const user = {
//         username: nameEl,
//         password: passwordEl,
//         tasks: [],
//         habits: []
//     };

//     // localStorage.setItem(nameEl, JSON.stringify(user));
//     let key_val = { key: nameEl, value: JSON.stringify(user) };
//     await fetch('/api/updateDictionary', {
//         method: 'POST',
//         headers: {'content-type': 'application/json'},
//         body: JSON.stringify(key_val),
//     }).catch(error => console.error('Error in fetch:', error));
    

//     // make it so their name shows up at the top
//     // localStorage.setItem("page_username", nameEl);
//     key_val = { key: "page_username", value: nameEl }
//     await fetch('/api/updateDictionary', {
//         method: 'POST',
//         headers: {'content-type': 'application/json'},
//         body: JSON.stringify(key_val),
//     }).catch(error => console.error('Error in fetch:', error));

//     console.log("logged in!!!")
//     window.location.href = "tasks.html";
// }

function logout() {
    window.location.href = "index.html";
}

async function getUser(email) {
    // See if we have a user with the given email.
    const response = await fetch(`/api/user/${email}`);
    if (response.status === 200) {
      return response.json();
    }
  
    return null;
  }

async function loadPage() {
    // update login button with username
    const user = localStorage.getItem('userName')
    let response = await fetch('/api/getDictionary', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: user,
    });
    const storage = await response.json();

    const storedUsername = storage.page_username;
    // const storedUsername = localStorage.getItem('page_username');

    if (storedUsername) { document.getElementById('login_button').textContent = storedUsername; }
}

loadPage();


class Card {
    constructor(title, list) {
        this.title = title || '[Add title]';
        this.list = list || [{ text: 'New task', checked: false }];
    }
}


// Function to load and display cards on page load
async function loadAndDisplayCards() {
    let response = await fetch('/api/getDictionary');
    const storage = await response.json();
    const storedUsername = storage.page_username;
    // const storedUsername = localStorage.getItem('page_username');


    if (storedUsername) {
        if (JSON.parse(storage[storedUsername]).tasks[0] != null) {             // this condition forces it to display the prompt to login to make a card (there's still a lag though, maybe look into fixing that)
            let response = await fetch('/api/getDictionary');
            const storage = await response.json();
    
            const user = JSON.parse(storage[storedUsername]);
            // const user = JSON.parse(localStorage.getItem(storedUsername));
            if (user && user.tasks) {
                const cardsContainer = document.querySelector('.cards_container');
                cardsContainer.innerHTML = ''; // Clear existing cards
    
                user.tasks.forEach((task) => {
                    const card = createCardElement(task);
                    cardsContainer.appendChild(card);
                });
            }
        }
    }
}

// Function to create a card element
function createCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.style.width = '25rem';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Title
    const title = document.createElement('h5');
    title.contentEditable = true;
    title.textContent = card.title;

    // Task list
    const taskList = document.createElement('ul');
    taskList.classList.add('list-group');

    card.list.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('list-group-item');

        const checkbox = document.createElement('input');
        checkbox.classList.add('form-check-input', 'me-1');
        checkbox.type = 'checkbox';
        checkbox.value = '';
        checkbox.checked = task.checked;

        const taskText = document.createElement('span');
        taskText.contentEditable = true;
        taskText.textContent = task.text;

        // add an event listener to the checkbox to update the task's check status
        checkbox.addEventListener('change', () => {
            task.checked = checkbox.checked;
            saveCardChanges();
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskList.appendChild(taskItem);
    });

    // plus button for adding a new task
    const plusButton = document.createElement('a');
    plusButton.href = '#';
    plusButton.classList.add('btn', 'btn-outline-secondary', 'plus-button');
    plusButton.textContent = '+';
    plusButton.addEventListener('click', () => addNewTask(cardDiv));

    // add everything to card body
    cardBody.appendChild(title);
    cardBody.appendChild(taskList);
    cardBody.appendChild(plusButton);

    // Add card body to card
    cardDiv.appendChild(cardBody);

    return cardDiv;
}


// Function to add a new task to a card
function addNewTask(cardElement) {
    const taskList = cardElement.querySelector('.list-group');
    const taskItem = document.createElement('li');
    taskItem.classList.add('list-group-item');
    taskItem.innerHTML = `
        <input class="form-check-input me-1" type="checkbox" value="" aria-label="...">
        <span contenteditable>New task</span>
    `;

    taskList.appendChild(taskItem);
    saveCardChanges();

}




// Function to add a new card
async function newCard() {
    const newCard = new Card();
    

    let response = await fetch('/api/getDictionary');
    const storage = await response.json();
    const storedUsername = storage.page_username;

    // const storedUsername = localStorage.getItem('page_username');
    const user = JSON.parse(storage[storedUsername]);
    // const user = JSON.parse(localStorage.getItem(storedUsername));

    if (user && user.tasks) {
        user.tasks.push(newCard);
    } else {
        user.tasks = [newCard];
    }
    // localStorage.setItem(storedUsername, JSON.stringify(user));
    key_val = { key: storedUsername, value: JSON.stringify(user) };
    await fetch('/api/updateDictionary', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(key_val),
    }).catch(error => console.error('Error in fetch:', error));
    loadAndDisplayCards();
}

// Function to save card changes
async function saveCardChanges() {
    let response = await fetch('/api/getDictionary');
    const storage = await response.json();
    const storedUsername = storage.page_username;
    // const storedUsername = localStorage.getItem('page_username');
    const user = JSON.parse(storage[storedUsername]);
    // const user = JSON.parse(localStorage.getItem(storedUsername));

    if (user && user.tasks) {
        const cards = document.querySelectorAll('.card');
        user.tasks = [];

        cards.forEach((cardElement) => {
            const title = cardElement.querySelector('h5').textContent;
            const taskItems = cardElement.querySelectorAll('li');
            const taskList = Array.from(taskItems).map((item) => {
                const checkbox = item.querySelector('input[type="checkbox"]');
                const text = item.querySelector('span').textContent;
                return { text, checked: checkbox.checked };
            });

            user.tasks.push(new Card(title, taskList));
        });

        // localStorage.setItem(storedUsername, JSON.stringify(user));
        key_val = { key: storedUsername, value: JSON.stringify(user) };
        await fetch('/api/updateDictionary', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(key_val),
        }).catch(error => console.error('Error in fetch:', error));
    }
}


// attach save changes function to the card container
const cardsContainer = document.querySelector('.cards_container');
cardsContainer.addEventListener('input', saveCardChanges);

// Load and display cards on page load
loadAndDisplayCards();

// Add an event listener to update the UI when changes occur
window.addEventListener('storage', async (event) => {
    let response = await fetch('/api/getDictionary');
    const storage = await response.json();

    if (event.key === 'page_username') {
        // Username changed; update login button
        await loadPage();
    } else if (event.key === storage.page_username) {
    // } else if (event.key === localStorage.getItem('page_username')) {
        // User's data (including tasks) changed; update tasks UI
        loadAndDisplayCards();
    }
});