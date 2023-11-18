async function user_login() {
    // console.log(document.querySelector("#input_username").value)
    const nameEl = document.querySelector("#input_username").value;
    const passwordEl = document.querySelector("#input_password").value;

    const user = {
        username: nameEl,
        password: passwordEl,
        tasks: [],
        habits: []
    };

    // localStorage.setItem(nameEl, JSON.stringify(user));
    let key_val = { key: nameEl, value: JSON.stringify(user) };
    await fetch('/api/updateDictionary', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(key_val),
    });
    

    // make it so their name shows up at the top
    // localStorage.setItem("page_username", nameEl);
    key_val = { key: "page_username", value: nameEl }
    await fetch('/api/updateDictionary', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(key_val),
    });


    window.location.href = "index.html";
}

function logout() {
    window.location.href = "index.html";
}

async function loadPage() {
    // update login button with username
    let response = await fetch('/api/getDictionary');
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

// Function to load task titles into the dropdown
async function loadTaskTitles() {
    let response = await fetch('/api/getDictionary');
    const storage = await response.json();
    const storedUsername = storage.page_username;

    // const storedUsername = localStorage.getItem("page_username");
    if (storedUsername) {
        let response = await fetch('/api/getDictionary');
        const storage = await response.json();

        const user = JSON.parse(storage[storedUsername]);
    //   const user = JSON.parse(localStorage.getItem(storedUsername));
      if (user && user.tasks) {
        user.tasks.forEach((task) => {
          const option = document.createElement("option");
          option.value = task.title;
          option.textContent = task.title;
          taskSelect.appendChild(option);
        });
      }
    }
  }

loadTaskTitles()

// Function to create a card element
function createCardElement_sessions(card) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.style.width = '25rem';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Title
    const title = document.createElement('h5');
    title.contentEditable = false;
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

// Function to display the selected task card
async function displaySelectedTask_sessions() {
    const selectedTitle = taskSelect.value;
    let response = await fetch('/api/getDictionary');
    const storage = await response.json();
    const storedUsername = storage.page_username;
    // const storedUsername = localStorage.getItem("page_username");
    if (selectedTitle !== "default" && storedUsername) {
        const user = JSON.parse(storage[storedUsername]);
    //   const user = JSON.parse(localStorage.getItem(storedUsername));
      if (user && user.tasks) {
        const selectedTask = user.tasks.find((task) => task.title === selectedTitle);
        if (selectedTask) {
          // Create a card element for the selected task
          const cardElement = createCardElement_sessions(selectedTask);
          // Clear the previous card and add the new one
          const cardsContainer = document.querySelector(".cards_container");
          cardsContainer.innerHTML = "";
          cardsContainer.appendChild(cardElement);
        }
      }
    }
  }

document.getElementById('taskSelect').addEventListener('change', function () {
    displaySelectedTask_sessions();
})

// Function to save card changes
async function saveCardChanges_sessions() {
    let response = await fetch('/api/getDictionary');
    const storage = await response.json();
    const storedUsername = storage.page_username;
    // const storedUsername = localStorage.getItem('page_username');
    const user = JSON.parse(storage[storedUsername]);
    // const user = JSON.parse(localStorage.getItem(storedUsername));

    if (user && user.tasks) {
        const cards = document.querySelectorAll('.card');
        
        // Create a new array to store the updated tasks
        const updatedTasks = [];

        cards.forEach((cardElement) => {
            const titleElement = cardElement.querySelector('h5');
            if (titleElement) {
                const title = titleElement.textContent;
                const taskItems = cardElement.querySelectorAll('li');
                const taskList = Array.from(taskItems).map((item) => {
                    const checkbox = item.querySelector('input[type="checkbox"]');
                    const textElement = item.querySelector('span');
                    if (checkbox && textElement) {
                        const text = textElement.textContent;
                        return { text, checked: checkbox.checked };
                    }
                });

                // Find the existing task in user.tasks and update it
                const existingTask = user.tasks.find((task) => task.title === title);

                if (existingTask) {
                    existingTask.list = taskList;
                } else {
                    // If the task doesn't exist, add it to the updatedTasks array
                    updatedTasks.push(new Card(title, taskList));
                }
            }
        });

        // Concatenate the existing tasks with the updated tasks
        user.tasks = [...user.tasks, ...updatedTasks];

        // localStorage.setItem(storedUsername, JSON.stringify(user));
        key_val = { key: storedUsername, value: JSON.stringify(user) };
        await fetch('/api/updateDictionary', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(key_val),
        });
    }
}

// Function to add a new task to a card
function addNewTask(cardElement) {
    const taskList = cardElement.querySelector('.list-group');
    if (taskList) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('list-group-item');
        taskItem.innerHTML = `
            <input class="form-check-input me-1" type="checkbox" value="" aria-label="...">
            <span contenteditable>New task</span>
        `;

        taskList.appendChild(taskItem);
        saveCardChanges_sessions();
    }
}




// Attach the "Save Changes" function to the card container
const cardsContainer = document.querySelector('.cards_container');
// cardsContainer.addEventListener('input', saveCardChanges_sessions);



