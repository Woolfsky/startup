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