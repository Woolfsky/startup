import React from 'react';

import './sessions.css';

export function Sessions() {
  class Card {
    constructor(title, list) {
        this.title = title || '[Add title]';
        this.list = list || [{ text: 'New task', checked: false }];
    }
  }

  // Function to load task titles into the dropdown
  async function loadTaskTitles() {
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
          user.tasks.forEach((task) => {
            const option = document.createElement("option");
            option.value = task.title;
            option.textContent = task.title;
            taskSelect.appendChild(option);
            taskSelect.addEventListener('change', () => {displaySelectedTask_sessions();})
          });
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
          const selectedTask = user.tasks.find((task) => task.title === selectedTitle);
          if (selectedTask) {
            // Create a card element for the selected task
            const cardElement = createCardElement_sessions(selectedTask);
            cardElement.addEventListener('input', () => {saveCardChanges_sessions()}) //added this line!!!
            // Clear the previous card and add the new one
            const cardsContainer = document.querySelector(".cards_container");
            cardsContainer.innerHTML = "";
            cardsContainer.appendChild(cardElement);
          }
        }
  }


  // document.getElementById('taskSelect').addEventListener('change', function () {
  //     displaySelectedTask_sessions();
  // })

  // Function to save card changes
  async function saveCardChanges_sessions() {
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
          let key_val = { key: userName, value: JSON.stringify(user) };
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



  // Timer functionality
  let timer;
  let minutesInput = document.getElementById('minutes');
  let timerDisplay = document.getElementById('timer');
  let remainingSeconds = 0;

  function startTimer() {
    let minutes = parseInt(minutesInput.value, 10);
    let seconds = minutes * 60;

    if (remainingSeconds > 0) {
      seconds = remainingSeconds;
    }

    timer = setInterval(function() {
      if (seconds <= 0) {
        clearInterval(timer);
        timerDisplay.textContent = 'Time is up!';
      } else {
        let displayMinutes = Math.floor(seconds / 60);
        let displaySeconds = seconds % 60;

        timerDisplay.textContent = `${displayMinutes}:${displaySeconds < 10 ? '0' : ''}${displaySeconds}`;
        seconds--;
      }
    }, 1000);

    document.getElementById('start_button').disabled = true;
  }

  function stopTimer() {
    clearInterval(timer);
    remainingSeconds = calculateRemainingSeconds();
    document.getElementById('start_button').disabled = false;
  }

  function resetTimer() {
    clearInterval(timer);
    minutesInput.value = 25;
    timerDisplay.textContent = '00:00';
    remainingSeconds = 0;
    document.getElementById('start_button').disabled = false;
  }

  function calculateRemainingSeconds() {
    let displayTime = timerDisplay.textContent.split(':');
    let minutes = parseInt(displayTime[0], 10);
    let seconds = parseInt(displayTime[1], 10);
    return minutes * 60 + seconds;
  }

  React.useEffect(() => {
    loadTaskTitles()
  }, [])




  return (
    <main>
      <h2 className="my_cards" >Sessions</h2>
      <div>
          <div>
            <label className="sessionTask" >Session Task:</label>
            <select id="taskSelect" className="btn btn-outline-secondary dropdown-toggle">
              <option defaultValue="default" >Select Task Card</option>
            </select>
          </div>
          <br></br>
          <div className="sessionHolder"> 
            <label id="sessionLength" htmlFor="minutes">Session length (mins):</label>
            <input id="minutes" type="number" min="1" className='form-control' defaultValue="25"></input>
          </div>
      </div>

      <div className="cards_and_timer_container" >
        <div className="cards_container">
          <div className="card" >
            <div className="card-body">
              <h5 id="blankNote" >Select a card to view from the dropdown menu</h5>
            </div>
          </div>
        </div>

        <div>
          <div className="card" id="timerCard_">
            <div id="timer" >00:00</div>
            <br></br>
            <div id="timerHolder">
              <button id="start_button" className="btn btn-outline-success" onClick={() => startTimer()}>Start</button> 
              <button className="btn btn-outline-danger" onClick={() => stopTimer()}>Stop</button> 
              <button className="btn btn-outline-secondary" onClick={() => resetTimer()}>Reset</button>
            </div>
          </div>
      </div>
      </div>
      
    </main>
  );
}