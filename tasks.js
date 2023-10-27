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

function loadPage() {
    // update login button with username
    const storedUsername = localStorage.getItem('page_username');
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
function loadAndDisplayCards() {
    const storedUsername = localStorage.getItem('page_username');
    if (storedUsername) {
        const user = JSON.parse(localStorage.getItem(storedUsername));
        if (user && user.tasks) {
            const cardsContainer = document.querySelector('.cards_container');
            cardsContainer.innerHTML = ''; // Clear existing cards

            user.tasks.forEach((task) => {
                const card = createCardElement_sessions(task);
                cardsContainer.appendChild(card);
            });
        }
    }
}

// Function to create a card element
function createCardElement_sessions(card) {
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

        // Attach an event listener to the checkbox to update the task's completion status
        checkbox.addEventListener('change', () => {
            task.checked = checkbox.checked;
            saveCardChanges_sessions();
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);

        taskList.appendChild(taskItem);
    });

    // Plus button for adding a new task
    const plusButton = document.createElement('a');
    plusButton.href = '#';
    plusButton.classList.add('btn', 'btn-outline-secondary', 'plus-button');
    plusButton.textContent = '+';
    plusButton.addEventListener('click', () => addNewTask(cardDiv));

    // Add everything to card body
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
    saveCardChanges_sessions();

    // Prevent the default behavior of the anchor link
    event.preventDefault();
}




// Function to add a new card
function newCard() {
    const newCard = new Card();
    const storedUsername = localStorage.getItem('page_username');
    const user = JSON.parse(localStorage.getItem(storedUsername));

    if (user && user.tasks) {
        user.tasks.push(newCard);
    } else {
        user.tasks = [newCard];
    }

    localStorage.setItem(storedUsername, JSON.stringify(user));
    loadAndDisplayCards();
}

// Function to save card changes
function saveCardChanges_sessions() {
    const storedUsername = localStorage.getItem('page_username');
    const user = JSON.parse(localStorage.getItem(storedUsername));

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

        localStorage.setItem(storedUsername, JSON.stringify(user));
    }
}


// Attach the "Save Changes" function to the card container
const cardsContainer = document.querySelector('.cards_container');
cardsContainer.addEventListener('input', saveCardChanges_sessions);

// Load and display cards on page load
loadAndDisplayCards();

// Add an event listener to update the UI when changes occur
window.addEventListener('storage', (event) => {
    if (event.key === 'page_username') {
        // Username changed; update login button
        loadPage();
    } else if (event.key === localStorage.getItem('page_username')) {
        // User's data (including tasks) changed; update tasks UI
        loadAndDisplayCards();
    }
});

// Call the function to load and display tasks when the page loads
loadAndDisplayCards();