import React from 'react';

import './tasks.css';

export function Tasks() {
  class Card {
    constructor(title, list) {
        this.title = title || '[Add title]';
        this.list = list || [{ text: 'New task', checked: false }];
    }
  }

  // Function to load and display cards on page load
  async function loadAndDisplayCards() {
    // console.log("load and display cards function called")
    const userName = localStorage.getItem('userName')
    const userNameObject = {"userName": userName}
    let response = await fetch('/api/getDictionary', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(userNameObject),
    });
    const storage = await response.json()
    const key_ = userName.split("@")[0]
    const stringified_stuff = storage[key_]
    const user = eval('(' + stringified_stuff + ')')
    if (user && user.tasks) {
        const cardsContainer = document.querySelector('.cards_container');
        cardsContainer.addEventListener('input', () => {saveCardChanges()}) //added this line!!!
        cardsContainer.innerHTML = ''; // Clear existing cards
        user.tasks.forEach((task) => {
            const card = createCardElement(task);
            cardsContainer.appendChild(card);
        });
    }
  }

  // Function to create a card element
  function createCardElement(card) {
    // console.log('create card element function called')
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
        // checkbox.addEventListener('change', () => {
        //     task.checked = checkbox.checked;
        //     saveCardChanges();
        // });
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
    // console.log("add new task function called")
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
    // console.log("new card function called")
    const newCard = new Card();

    const userName = localStorage.getItem('userName')
    const userNameObject = {"userName": userName}
    let response = await fetch('/api/getDictionary', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(userNameObject),
    });
    const storage = await response.json()

    const key_ = userName.split("@")[0]
    const stringified_stuff = storage[key_]

    const user = eval('(' + stringified_stuff + ')')

    if (user && user.tasks) {
        user.tasks.push(newCard);
    } else {
        user.tasks = [newCard];
    }

    let key_val = { key: userName, value: JSON.stringify(user) };
    await fetch('/api/updateDictionary', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(key_val),
    }).catch(error => console.error('Error in fetch:', error));
    loadAndDisplayCards();
  }

  // Function to save card changes
  async function saveCardChanges() {
    // console.log("save card changes called")
    const userName = localStorage.getItem('userName')
    const userNameObject = {"userName": userName}
    let response = await fetch('/api/getDictionary', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(userNameObject),
    });
    const storage = await response.json()

    const key_ = userName.split("@")[0]
    const stringified_stuff = storage[key_]

    const user = eval('(' + stringified_stuff + ')')

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
        let key_val = { key: userName, value: JSON.stringify(user) };
        await fetch('/api/updateDictionary', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(key_val),
        }).catch(error => console.error('Error in fetch:', error));
    }
  }

  React.useEffect(() => {
    loadAndDisplayCards();
    // console.log("load and display effect rendered")
  }, [])

  return (
    <main>
      <h2 className="my_cards">My Cards</h2>
      <input type="button" value="New Card" className="btn btn-outline-secondary" onClick={() => newCard()}></input>
      <div className="cards_container"></div>
    </main>
  );
}