function newCard() {
    // Create a new card element
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '25rem';
  
    // Create a card body element
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
  
    // Append the card body element to the card element
    card.appendChild(cardBody);
  
    // Append the card element to the cards container element
    const cardsContainer = document.querySelector('.cards_container');
    cardsContainer.appendChild(card);
  }

function newCard() {
    // Get the first card element
    const firstCard = document.querySelector('.cards_container .card');
  
    // Create a new card element
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '25rem';
  
    // Create a card body element
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
  
    // Copy the text from the first card to the new card
    cardBody.innerHTML = firstCard.querySelector('.card-body').innerHTML;
  
    // Append the card body element to the card element
    card.appendChild(cardBody);
  
    // Append the card element to the cards container element
    const cardsContainer = document.querySelector('.cards_container');
    cardsContainer.appendChild(card);
  }