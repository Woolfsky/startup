// STUFF FOR HABITS

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

class Habit {
    constructor(title) {
        this.title = title || '[Add habit title]';
        this.streak = 0;
        this.lastLoggedDate = null;
    }
}

function loadAndDisplayHabits() {
    const storedUsername = localStorage.getItem('page_username');
    if (storedUsername) {
        const user = JSON.parse(localStorage.getItem(storedUsername));
        if (user && user.habits) {
            const habitsContainer = document.querySelector('.habits_container');
            habitsContainer.innerHTML = ''; // Clear existing habit cards

            user.habits.forEach((habit) => {
                const card = createHabitCardElement(habit);
                habitsContainer.appendChild(card);
            });
        }
    }
}

function createHabitCardElement(habit) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.style.width = '25rem';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Habit title
    const title = document.createElement('h5');
    title.contentEditable = true;
    title.textContent = habit.title;
    title.addEventListener('input', (event) => {
        habit.title = event.target.textContent;
        saveHabitChanges();
    });

    // Habit streak and Log Today button
    const streakElement = document.createElement('p');
    streakElement.textContent = `Streak: ${habit.streak} days`;

    const logTodayButton = document.createElement('button');
    logTodayButton.textContent = 'Log Today';
    logTodayButton.addEventListener('click', () => logToday(habit));

    // Add everything to card body
    cardBody.appendChild(title);
    cardBody.appendChild(streakElement);
    cardBody.appendChild(logTodayButton);

    // Add card body to card
    cardDiv.appendChild(cardBody);

    return cardDiv;
}

function logToday(habit) {
    const today = new Date().toDateString();
    
    // Check if the habit was logged today
    if (habit.lastLoggedDate !== today) {
        habit.streak++;
        habit.lastLoggedDate = today;

        // Save the changes immediately
        saveHabitChanges();

        // Reload and display the habits
        loadAndDisplayHabits();
    }
}



function saveHabitChanges() {
    const storedUsername = localStorage.getItem('page_username');
    const user = JSON.parse(localStorage.getItem(storedUsername));

    if (user && user.habits) {
        localStorage.setItem(storedUsername, JSON.stringify(user));
    }
}

function newHabit() {
    const newHabit = new Habit();
    const storedUsername = localStorage.getItem('page_username');
    const user = JSON.parse(localStorage.getItem(storedUsername));

    if (user && user.habits) {
        user.habits.push(newHabit);
    } else {
        user.habits = [newHabit];
    }

    localStorage.setItem(storedUsername, JSON.stringify(user));
    loadAndDisplayHabits();
}

loadAndDisplayHabits();