function newCard() {
    // grab first card element
    const firstCard = document.querySelector('.cards_container .card');
  
    // new card
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '25rem';
  
    // card body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
  
    // copy first
    cardBody.innerHTML = firstCard.querySelector('.card-body').innerHTML;
  
    // append
    card.appendChild(cardBody);
  
    // append to container
    const cardsContainer = document.querySelector('.cards_container');
    cardsContainer.appendChild(card);
  }

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